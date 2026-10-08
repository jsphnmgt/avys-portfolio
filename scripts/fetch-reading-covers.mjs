import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "client/src/components/PersonalSide/overlays/readingListData.json");
const titles = [
  ["soul-cartel", "Soul Cartel", "fantasy/soul-cartel", 72, 5],
  ["freaking-romance", "Freaking Romance", "romance/freaking-romance", 1467, 5],
  ["daytime-star", "Daytime Star", "drama/daytime-star", 3908, 5],
  ["grim-reaper", "I'm the Grim Reaper", "supernatural/im-the-grim-reaper", 1697, null],
  ["morgana-and-oz", "Morgana and Oz", "fantasy/morgana-and-oz", 2964, null],
  ["winter-moon", "Winter Moon", "fantasy/winter-moon", 1093, null],
  ["your-smile", "Your Smile is a Trap", "romance/your-smile-is-a-trap", 2052, null],
  ["death-rescheduled", "Death: Rescheduled", "thriller/death-rescheduled", 3515, null],
  ["dear-x", "Dear X", "thriller/dearx", 2503, 5],
  ["flow", "Flow", "fantasy/flow", 101, 5],
  ["murrz", "Murrz", "slice-of-life/murrz", 1281, 5],
  ["muse-on-fame", "Muse on Fame", "drama/muse-on-fame", 5172, 5],
  ["nano-list", "Nano List", "sf/nano-list", 700, 5],
  ["nightmare-factory", "Nightmare Factory", "fantasy/nightmare-factory", 616, 5],
  ["no-scope", "No Scope", "sports/no-scope", 1572, 5],
  ["makeup-remover", "The Makeup Remover", "romance/the-makeup-remover", 2186, 5],
  ["soap-opera", "Trapped in a Soap Opera", "drama/trapped-in-a-soap-opera", 6751, 5],
  ["age-of-arrogance", "The Age of Arrogance", "fantasy/the-age-of-arrogance", 5839, 4],
  ["untouchable", "unTouchable", "romance/untouchable", 79, 3],
];
const favorites = ["soul-cartel", "freaking-romance", "daytime-star"];
const reading = ["grim-reaper", "morgana-and-oz", "winter-moon", "your-smile", "death-rescheduled"];
const finished = titles.filter(title => title[4] !== null).map(title => title[0]);
const decode = text => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)));
const plain = text => decode(text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
async function request(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://www.webtoons.com/" }, signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`${response.status}: ${url}`);
      return response;
    } catch (error) {
      if (attempt === 2) throw error;
      await new Promise(resolve => setTimeout(resolve, 1500 * (attempt + 1)));
    }
  }
}
let catalog = {};
try { catalog = JSON.parse(await fs.readFile(output, "utf8")).catalog; } catch {}
for (const [key, title, slug, id, rating] of titles) {
  if (catalog[key]?.image) continue;
  try {
    // The original WEBTOON page was removed; the wiki preserves its cover.
    if (key === "nightmare-factory") {
      const image = "reading-nightmare-factory.webp";
      const cover = "https://static.wikia.nocookie.net/webtoon/images/7/7b/Nightmare_Factory.jpg";
      await fs.writeFile(path.join(root, "client/src/assets", image), Buffer.from(await (await request(cover)).arrayBuffer()));
      catalog[key] = { title, author: "Snailords", rating, image, source: "https://webtoon.fandom.com/wiki/Nightmare_Factory", sourceTitle: title };
      console.log(`${key}: original cover | OK`);
      continue;
    }
    const source = `https://www.webtoons.com/en/${slug}/list?title_no=${id}`;
    const html = await (await request(source)).text();
    const imageUrl = decode(html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] || "").split("?")[0];
    const sourceTitle = decode(html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || "").replace(/\s*\|\s*WEBTOON.*$/i, "");
    const normalize = text => text.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (normalize(sourceTitle) !== normalize(title) && !(key === "death-rescheduled" && /life refunded/i.test(sourceTitle))) throw new Error(`Title mismatch: ${sourceTitle}`);
    const authorArea = html.match(/<div class="author_area">([\s\S]*?)<\/div>/)?.[1] || "";
    const author = plain(authorArea.replace(/<button[\s\S]*?<\/button>/g, ""));
    if (!imageUrl || !author) throw new Error("Cover or author metadata missing");
    const image = `reading-${key}.jpg`;
    const destination = path.join(root, "client/src/assets", image);
    try { await fs.access(destination); } catch { await fs.writeFile(destination, Buffer.from(await (await request(imageUrl)).arrayBuffer())); }
    catalog[key] = { title, author, rating, image, source, sourceTitle };
    await fs.writeFile(output, JSON.stringify({ catalog, favorites, reading, finished }, null, 2) + "\n");
    console.log(`${key}: ${sourceTitle} | ${author} | OK`);
  } catch (error) { console.log(`ERROR ${key}: ${error.message}`); }
}
for (const item of Object.values(catalog)) item.author = item.author.replace(/\s+,/g, ",").replace(/\s*\.\.\.$/, "");
const alphabetize = ids => ids.sort((a, b) => (catalog[a]?.title || a).localeCompare(catalog[b]?.title || b, "en", { numeric: true, sensitivity: "base" }));
await fs.writeFile(output, JSON.stringify({ catalog, favorites: alphabetize(favorites), reading: alphabetize(reading), finished: alphabetize(finished) }, null, 2) + "\n");
console.log("Missing:", titles.filter(title => !catalog[title[0]]?.image).map(title => title[0]));
