import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "client/src/components/PersonalSide/overlays/watchlistData.json");
const assets = path.join(root, "client/src/assets");
const manifestPath = path.join(root, "scripts/watchlist-cover-manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function request(url, json = true) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 PortfolioCoverImporter/1.0" }, signal: AbortSignal.timeout(12000) });
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      return json ? await response.json() : Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (attempt === 1) throw error;
      await delay(2000 + attempt * 2000);
    }
  }
}
let catalog = {};
try { catalog = JSON.parse(await fs.readFile(output, "utf8")).catalog; } catch {}
async function save(key, title, type, url, source, sourceTitle) {
  let image = null;
  if (url) {
    image = `watchlist-${key}.jpg`;
    const destination = path.join(assets, image);
    try { await fs.access(destination); } catch { await fs.writeFile(destination, await request(url, false)); }
  }
  catalog[key] = { title, type, image, source, sourceTitle };
  await fs.writeFile(output, JSON.stringify({ catalog, favorites: manifest.favorites, watching: ["one-piece"], watched: manifest.watched }, null, 2) + "\n");
  console.log(`${key}: ${sourceTitle} | ${type} | ${image ? "OK" : "MISSING"}`);
}
for (const [key, title, id] of manifest.anime) {
  if (catalog[key]?.image) continue;
  try {
    const source = `https://myanimelist.net/anime/${id}`;
    const html = (await request(source, false)).toString("utf8");
    const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    if (!image) throw new Error("No poster in anime metadata");
    const sourceTitle = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || title;
    const movieKeys = ["arrietty", "weathering", "spirited-away", "hello-world", "your-name", "kiki", "totoro", "mugen-train"];
    await save(key, title, movieKeys.includes(key) ? "Anime movie" : "Anime series", image, source, sourceTitle);
  } catch (error) { console.log(`ERROR ${key}: ${error.message}`); }
  await delay(1100);
}
for (const [key, title, language] of manifest.shows) {
  if (catalog[key]?.image) continue;
  try {
    const query = key.startsWith("hells-kitchen") ? "Hell's Kitchen" : key === "weightlifting" ? "Weightlifting Fairy" : title;
    const results = await request(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const show = results.map(result => result.show).find(show => show.language === language);
    if (!show) throw new Error("No matching-language show");
    let image = show.image;
    if (key.startsWith("hells-kitchen")) {
      const seasons = await request(`https://api.tvmaze.com/shows/${show.id}/seasons`);
      image = seasons.find(season => season.number === (key.endsWith("vegas") ? 19 : 21))?.image || image;
    }
    await save(key, title, { Korean: "K-drama series", Japanese: "Japanese series", English: "American series" }[language], image?.original, show.url, show.name);
  } catch (error) { console.log(`ERROR ${key}: ${error.message}`); }
}
for (const [key, title, page, type] of manifest.movies) {
  if (catalog[key]?.image) continue;
  try {
    const data = await request(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page)}`);
    const image = (data.originalimage || data.thumbnail)?.source;
    await save(key, title, type === "Movie" ? "American movie" : type, image ? image.split("?")[0] : null, data.content_urls.desktop.page, data.title);
  } catch (error) { console.log(`ERROR ${key}: ${error.message}`); }
}
console.log("Missing:", [...new Set([...manifest.favorites, ...manifest.watched, "one-piece"])].filter(key => !catalog[key]?.image));
