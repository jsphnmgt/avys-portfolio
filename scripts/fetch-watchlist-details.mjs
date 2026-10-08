import fs from "node:fs/promises";

const destination = new URL("../client/src/components/PersonalSide/overlays/watchlistData.json", import.meta.url);
const data = JSON.parse(await fs.readFile(destination, "utf8"));
const plain = text => text.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&#0*39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/\s+/g, " ").trim();
async function fetchSource(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), headers: { "User-Agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}
for (const [id, item] of process.argv.includes("--finalize") ? [] : Object.entries(data.catalog)) {
  try {
    let genres = [], year = null, episodes = null, synopsis = "";
    if (item.source.includes("myanimelist.net")) {
      const html = await (await fetchSource(item.source)).text();
      const info = name => html.match(new RegExp(`<span class="dark_text">${name}:<\\/span>([\\s\\S]*?)<\\/div>`))?.[1] || "";
      genres = [...info("Genres?").matchAll(/title="([^"]+)"/g)].map(match => plain(match[1]));
      year = plain(info("Aired")).match(/\b(?:19|20)\d{2}\b/)?.[0] || null;
      const count = plain(info("Episodes"));
      episodes = /^\d+$/.test(count) ? Number(count) : null;
      synopsis = plain(html.match(/<p itemprop="description">([\s\S]*?)<\/p>/)?.[1] || "").replace(/\[Written by MAL Rewrite\].*$/, "").trim();
    } else if (item.source.includes("tvmaze.com")) {
      const showId = item.source.match(/\/shows\/(\d+)/)?.[1];
      const show = await (await fetchSource(`https://api.tvmaze.com/shows/${showId}`)).json();
      genres = show.genres;
      year = show.premiered?.slice(0, 4) || null;
      synopsis = plain(show.summary || "");
      if (id.startsWith("hells-kitchen")) {
        const seasons = await (await fetchSource(`https://api.tvmaze.com/shows/${showId}/seasons`)).json();
        const season = seasons.find(entry => entry.number === (id.endsWith("vegas") ? 19 : 21));
        year = season?.premiereDate?.slice(0, 4) || year;
        episodes = season?.episodeOrder || null;
      }
    } else {
      const page = decodeURIComponent(item.source.split("/wiki/")[1]);
      const result = await (await fetchSource(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page)}`)).json();
      year = result.description?.match(/\b(?:19|20)\d{2}\b/)?.[0] || result.extract?.match(/\b(?:19|20)\d{2}\b/)?.[0] || null;
      synopsis = result.extract || "";
    }
    Object.assign(item, { year, genres: [...new Set(genres)], episodes, rating: item.rating ?? null, thoughts: item.thoughts ?? null });
    console.log(JSON.stringify({ id, year, genres: item.genres, episodes, description: synopsis.slice(0, 1100) }));
  } catch (error) { console.log(JSON.stringify({ id, error: error.message })); }
}
const synopses = JSON.parse(await fs.readFile(new URL("./watchlist-synopses.json", import.meta.url), "utf8"));
const movieGenres = {
  "enola-holmes": ["Mystery", "Adventure"], "enola-holmes-2": ["Mystery", "Adventure"],
  "witch": ["Sci-Fi", "Action", "Horror"], "ready-or-not": ["Horror", "Comedy"],
  "ready-or-not-2": ["Horror", "Comedy"], "infinity-castle": ["Action", "Fantasy"]
};
for (const [id, item] of Object.entries(data.catalog)) {
  item.synopsis = synopses[id] || item.synopsis || null;
  item.genres = movieGenres[id] || (item.genres || []).filter(genre => genre !== "Award Winning");
  item.rating ??= null;
  item.thoughts ??= null;
}
await fs.writeFile(destination, JSON.stringify(data, null, 2) + "\n");
