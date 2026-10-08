import { useEffect, useRef, useState } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import { assets } from "../../../assets";

const favorites = ["Stardew Valley", "Honkai Star Rail", "Wuthering Waves", "Split Fiction", "Peak", "Roblox"];
const playing = [
  { title: "Peak", image: "game-peak.png" },
  { title: "Roblox", image: "game-roblox.png" },
  { title: "Stardew Valley", image: "game-stardew.png" },
];
const collection = [
  { title: "A Dance of Fire and Ice", label: 6 },
  { title: "Call of Duty", label: 8 },
  { title: "Celeste", label: 7 },
  { title: "Dark Deception", label: 12 },
  { title: "Honkai: Star Rail", label: 2 },
  { title: "It Takes Two", label: 5 },
  { title: "Minecraft", label: 10 },
  { title: "Peak", label: 11 },
  { title: "Roblox", label: 9 },
  { title: "Split Fiction", label: 1 },
  { title: "Stardew Valley", label: 4 },
  { title: "Wuthering Waves", label: 3 },
].sort((a, b) => a.title.localeCompare(b.title));

export default function GameShelf({ isOpen = false, onClose }) {
  const [selected, setSelected] = useState(1);
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
  const showFavorite = title => {
    const index = playing.findIndex(game => game.title === title);
    if (index >= 0) setSelected(index);
    goToCollection();
  };

  return <Overlay className="watchlist-overlay game-shelf-overlay" isOpen={isOpen} onClose={onClose}>
    <header className="watchlist-header">
      <h2 id="detail-title"><img className="watchlist-icon" src={assets["game-heading.png"]} alt="" />Game Shelf</h2>
    </header>
    <div className="watchlist-scroll" role="region" aria-label="Game Shelf" tabIndex={0}>
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
              <ul>{favorites.map(title => <li key={title}><button onClick={() => showFavorite(title)}><span aria-hidden="true">›</span>{title}</button></li>)}</ul>
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
                  return <button key={game.title} className={index === selected ? "is-selected" : ""} aria-pressed={index === selected} aria-label={`Select ${game.title}`} onClick={() => setSelected(index)}><img src={assets[game.image]} alt="" /></button>;
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
          <div className="game-cartridge-art" aria-hidden="true">
            <img className="game-cartridge-shell" src={assets["game-cartridge.png"]} alt="" />
            <img className="game-cartridge-label" src={assets[`game-label-${game.label}.png`]} alt="" />
          </div>
          <span className="game-cartridge-title">{game.title}</span>
        </li>)}</ul>
      </section>
    </div>
  </Overlay>;
}
