import { useEffect, useRef, useState } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import { assets } from "../../../assets";
import CollectionIcon from "./CollectionIcon";
import useCollectionPeek from "./useCollectionPeek";
import gameDetails from "./gameShelfData.json";

export { favorites, playing, collection };

const favorites = ["Stardew Valley", "Honkai Star Rail", "Wuthering Waves", "Split Fiction", "Peak", "Roblox"];
const playing = [
  { title: "Peak", image: "game-cover-peak.jpg" },
  { title: "Roblox", image: "game-cover-roblox.webp" },
  { title: "Stardew Valley", image: "game-cover-stardew-valley.png" },
  { title: "Celeste", image: "game-cover-celeste.jpg" },
  { title: "A Dance of Fire and Ice", image: "game-cover-a-dance-of-fire-and-ice.webp" },
  { title: "Dark Deception", image: "game-cover-dark-deception.jpg" },
];
const collection = [
  { title: "A Dance of Fire and Ice", image: "game-cover-a-dance-of-fire-and-ice.webp" },
  { title: "Call of Duty", image: "game-cover-call-of-duty.webp" },
  { title: "Celeste", image: "game-cover-celeste.jpg" },
  { title: "Dark Deception", image: "game-cover-dark-deception.jpg" },
  { title: "Honkai: Star Rail", image: "game-cover-honkai-star-rail.webp" },
  { title: "It Takes Two", image: "game-cover-it-takes-two.webp" },
  { title: "Minecraft", image: "game-cover-minecraft.webp" },
  { title: "Peak", image: "game-cover-peak.jpg" },
  { title: "Roblox", image: "game-cover-roblox.webp" },
  { title: "Split Fiction", image: "game-cover-split-fiction.jpg" },
  { title: "Stardew Valley", image: "game-cover-stardew-valley.png", imagePosition: "top" },
  { title: "Wuthering Waves", image: "game-cover-wuthering-waves.jpg" },
  { title: "Farlight 84", image: "game-cover-farlight-84.webp" },
  { title: "Subway Surfers", image: "game-cover-subway-surfers.jpg" },
  { title: "Among Us", image: "game-cover-among-us.png" },
  { title: "In Sink", image: "game-cover-in-sink.webp" },
  { title: "Plants vs. Zombies", image: "game-cover-plants-vs-zombies.webp" },
  { title: "Temple Run 2", image: "game-cover-temple-run-2.webp" },
  { title: "Temple Run", image: "game-cover-temple-run.jpg" },
  { title: "Penguin Diner 2", image: "game-cover-penguin-diner-2.png" },
  { title: "Tsuki’s Odyssey", image: "game-cover-tsukis-odyssey.png" },
  { title: "Toilet Time", image: "game-cover-toilet-time.webp" },
  { title: "Soul Knight", image: "game-cover-soul-knight.png" },
  { title: "Dumb Ways to Die", image: "game-cover-dumb-ways-to-die.webp" },
  { title: "Tomb of the Mask", image: "game-cover-tomb-of-the-mask.webp" },
  { title: "Good Pizza, Great Pizza", image: "game-cover-good-pizza-great-pizza.webp" },
  { title: "Rhythm Hive", image: "game-cover-rhythm-hive.png" },
  { title: "Smash Hit", image: "game-cover-smash-hit.jpg" },
  { title: "Penguin Diner", image: "game-cover-penguin-diner.webp" },
  { title: "Virtual Villagers: A New Home", image: "game-cover-virtual-villagers-a-new-home.png" },
  { title: "Super Mecha Champions", image: "game-cover-super-mecha-champions.webp" },
  { title: "Tower of Fantasy", image: "game-cover-tower-of-fantasy.webp" },
  { title: "Virtual Villagers Origins 2", image: "game-cover-virtual-villagers-origins-2.webp" },
  { title: "Arknights: Endfield", image: "game-cover-arknights-endfield.png" },
  { title: "Adorable Home", image: "game-cover-adorable-home.webp" },
  { title: "Daddy Long Legs", image: "game-cover-daddy-long-legs.avif" },
  { title: "Harvest Moon: Friends of Mineral Town", image: "game-cover-harvest-moon-friends-of-mineral-town.jpg" },
  { title: "Harvest Moon: More Friends of Mineral Town", image: "game-cover-harvest-moon-more-friends-of-mineral-town.jpg" },
  { title: "Neighbours from Hell", image: "game-cover-neighbours-from-hell.jpg" },
  { title: "Dumb Ways to Die 2: The Games", image: "game-cover-dumb-ways-to-die-2.png" },
].sort((a, b) => a.title.localeCompare(b.title));

export default function GameShelf({ isOpen = false, onClose }) {
  const [selected, setSelected] = useState(1);
  const { selectedId, isPeekVisible, peekHeadingRef, openPeek, closePeek, onPeekKeyDown, onPeekTransitionEnd } = useCollectionPeek();
  const peekGame = collection.find(game => game.image === selectedId);
  const details = peekGame ? gameDetails[peekGame.title] : null;
  const normalizeTitle = title => title.replace(/:/g, "").toLowerCase();
  const statuses = peekGame ? [
    ...(favorites.some(title => normalizeTitle(title) === normalizeTitle(peekGame.title)) ? [{ title: "Favorite", icon: "heart" }] : []),
    ...(playing.some(game => game.image === selectedId) ? [{ title: "Currently Playing", icon: "play" }] : []),
    { title: "In My Collection", icon: "bookmark" },
  ] : [];
  const stageRef = useRef(null);
  const artRef = useRef(null);
  const collectionRef = useRef(null);
  const move = direction => setSelected(index => (index + direction + playing.length) % playing.length);

  useEffect(() => {
    if (!isOpen) return;
    const fit = () => {
      if (stageRef.current && artRef.current) {
        artRef.current.style.setProperty("--game-console-scale", stageRef.current.clientWidth / artRef.current.offsetWidth);
      }
    };
    const observer = new ResizeObserver(fit);
    observer.observe(stageRef.current);
    fit();
    return () => observer.disconnect();
  }, [isOpen]);

  const goToCollection = () => collectionRef.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  const showFavorite = (title, trigger) => {
    const index = playing.findIndex(game => game.title === title);
    if (index >= 0) setSelected(index);
    const game = collection.find(item => normalizeTitle(item.title) === normalizeTitle(title));
    if (game) openPeek(game.image, trigger);
  };

  return <Overlay className="watchlist-overlay game-shelf-overlay" isOpen={isOpen} onClose={onClose}>
    <header className="watchlist-header">
      <h2 id="detail-title"><img className="watchlist-icon" src={assets["game-heading.png"]} alt="" />Game Shelf</h2>
    </header>
    <div className={`reading-list-layout${peekGame ? " has-peek" : ""}`} onKeyDown={onPeekKeyDown}>
    <div className="watchlist-scroll reading-list-collections" role="region" aria-label="Game Shelf" tabIndex={0}>
      <div className="game-console-stage" ref={stageRef}>
        <div className="game-console-art" ref={artRef}>
          <img className="game-console-shell" src={assets["game-ds-shell.svg"]} alt="" />
          <img className="game-speaker game-speaker-left" src={assets["game-speaker-left.svg"]} alt="" />
          <img className="game-speaker game-speaker-right" src={assets["game-speaker-right.svg"]} alt="" />
          <div className="game-screen-bezel game-screen-bezel-top" />
          <div className="game-screen game-screen-top">
            <div className="game-status-rail" aria-hidden="true"><span className="game-signal">▂▄▆</span><span className="game-meter">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</span><span className="game-status-square" /></div>
            <section className="game-chat game-favorites" aria-labelledby="game-favorites-title">
              <h3 id="game-favorites-title" className="game-chat-tag">Favorites</h3>
              <ul>{favorites.map(title => <li key={title}><button onClick={event => showFavorite(title, event.currentTarget)} aria-controls="game-shelf-peek"><span aria-hidden="true">›</span>{title}</button></li>)}</ul>
            </section>
          </div>
          <div className="game-screen-bezel game-screen-bezel-bottom" />
          <div className="game-screen game-screen-bottom">
            <section className="game-chat game-playing" aria-labelledby="game-playing-title">
              <h3 id="game-playing-title" className="game-chat-tag">Currently Playing</h3>
              <span className="game-selected-title" aria-live="polite">{playing[selected].title}</span>
              <div className="game-playing-row">
                {[-1, 0, 1].map(offset => {
                  const index = (selected + offset + playing.length) % playing.length;
                  const game = playing[index];
                  return <button key={game.title} className={index === selected ? "is-selected" : ""} aria-label={`${offset === 0 ? "View details for" : "Select"} ${game.title}`} onClick={event => offset === 0 ? openPeek(game.image, event.currentTarget) : setSelected(index)}><img src={assets[game.image]} alt="" /></button>;
                })}
              </div>
              <div className="game-playing-caption">
                <span className="game-controls-hint">Use the buttons to switch games.</span>
              </div>
            </section>
          </div>
          <div className="game-dpad"><img src={assets["game-dpad.svg"]} alt="" />
            <button className="game-dpad-up" aria-label="Previous game" onClick={() => move(-1)} />
            <button className="game-dpad-left" aria-label="Previous game" onClick={() => move(-1)} />
            <button className="game-dpad-right" aria-label="Next game" onClick={() => move(1)} />
            <button className="game-dpad-down" aria-label="Next game" onClick={() => move(1)} />
          </div>
          {[{ label: "X", direction: -1 }, { label: "Y", direction: -1 }, { label: "A", direction: 1 }, { label: "B", direction: 1 }].map(control => <button key={control.label} className={`game-face-button game-face-${control.label.toLowerCase()}`} aria-label={`${control.label}: select ${control.direction > 0 ? "next" : "previous"} game`} onClick={() => move(control.direction)}><img src={assets["game-face-button.svg"]} alt="" /><span>{control.label}</span></button>)}
          <button className="game-small-button game-start" onClick={goToCollection}><img src={assets["game-small-button.svg"]} alt="" /><span>START</span></button>
          <button className="game-small-button game-select" onClick={() => move(1)}><img src={assets["game-small-button.svg"]} alt="" /><span>SELECT</span></button>
        </div>
      </div>
      <section className="watchlist-section game-collection" ref={collectionRef} aria-labelledby="game-collection-title">
        <h3 id="game-collection-title">Game Collection</h3>
        <ul className="game-cartridges">{collection.map(game => <li key={game.title} className="game-cartridge">
          <button className="reading-list-card-button game-cartridge-button" aria-label={`View details for ${game.title}`} aria-expanded={selectedId === game.image} aria-controls="game-shelf-peek" onClick={event => openPeek(game.image, event.currentTarget)}>
          <span className="game-cartridge-art" aria-hidden="true">
            <img className="game-cartridge-shell" src={assets["game-cartridge.png"]} alt="" />
            <img className="game-cartridge-label" src={assets[game.image]} style={{ objectPosition: game.imagePosition }} alt="" />
          </span>
          <span className="game-cartridge-title">{game.title}</span>
          </button>
        </li>)}</ul>
      </section>
    </div>
    {peekGame && <aside className={`reading-list-peek${isPeekVisible ? " is-visible" : ""}`} id="game-shelf-peek" aria-labelledby="game-shelf-peek-title" onTransitionEnd={onPeekTransitionEnd}>
      <div className="reading-list-peek-toolbar"><span>Game details</span><button className="reading-list-peek-close" onClick={closePeek} aria-label="Close game details"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m6.7 5.3 5.3 5.3 5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" /></svg></button></div>
      <div className="reading-list-peek-scroll watchlist-scroll" key={selectedId}>
        <div className="reading-list-peek-summary">
          <img className="reading-list-peek-cover" src={assets[peekGame.image]} alt="" />
          <h3 id="game-shelf-peek-title" ref={peekHeadingRef} tabIndex={-1}>{peekGame.title}</h3>
        </div>
        <div className="reading-list-peek-genres">{details.genres.map(genre => <span key={genre}>{genre}</span>)}</div>
        <dl className="reading-list-peek-meta"><div><dt>Playing status</dt><dd>{statuses.map(status => <span key={status.title}><CollectionIcon name={status.icon} />{status.title}</span>)}</dd></div></dl>
        <section className="reading-list-peek-section"><h4>About the game</h4><p>{details.description}</p></section>
        <section className="reading-list-peek-section"><h4>My thoughts</h4><p className={details.thoughts ? undefined : "reading-list-peek-placeholder"}>{details.thoughts || "I’ll add my thoughts here soon."}</p></section>
      </div>
    </aside>}
    </div>
  </Overlay>;
}
