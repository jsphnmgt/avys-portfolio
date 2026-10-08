import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";
import { assets } from "../../../assets";
import watchlist from "./watchlistData.json";

const sections = [
  { id: "favorites", title: "Favorites", icon: "heart" },
  { id: "watching", title: "Currently Watching", icon: "play" },
  { id: "watched", title: "Watched", icon: "check" },
];


export default function Watchlist({ isOpen = false, onClose }) {
  return <Overlay className="watchlist-overlay" isOpen={isOpen} onClose={onClose}>
    <header className="watchlist-header">
      <h2 id="detail-title"><CollectionIcon name="clapperboard" />Watchlist</h2>
    </header>
    <div className="watchlist-scroll" role="region" aria-label="Watchlist collections" tabIndex={0}>
      {sections.map(section => <section className="watchlist-section" key={section.id} aria-labelledby={`watchlist-${section.id}`}>
        <h3 id={`watchlist-${section.id}`}><CollectionIcon name={section.icon} />{section.title}</h3>
        <ul className="watchlist-cards" aria-label={section.title}>
          {[...watchlist[section.id]].sort((a, b) => watchlist.catalog[a].title.localeCompare(watchlist.catalog[b].title, "en", { numeric: true, sensitivity: "base" })).map(id => {
            const item = watchlist.catalog[id];
            return <li key={id} className="watchlist-card">
              <div className="watchlist-poster" aria-hidden="true">{item.image ? <img src={assets[item.image]} alt="" loading="lazy" /> : <CollectionIcon name="film" />}</div>
              <div className="watchlist-card-caption"><span>{item.title}</span><span className="watchlist-card-type">{item.type}</span></div>
            </li>;
          })}
        </ul>
      </section>)}
    </div>
  </Overlay>;
}
