import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";

const sections = [
  { id: "favorites", title: "Favorites", icon: "heart", count: 6 },
  { id: "watching", title: "Currently Watching", icon: "play", count: 3 },
  { id: "watched", title: "Watched", icon: "check", count: 6 },
];


export default function Watchlist({ isOpen = false, onClose }) {
  return <Overlay className="watchlist-overlay" isOpen={isOpen} onClose={onClose}>
    <header className="watchlist-header">
      <h2 id="detail-title"><CollectionIcon name="clapperboard" />Watchlist</h2>
    </header>
    <div className="watchlist-scroll" role="region" aria-label="Watchlist collections" tabIndex={0}>
      {sections.map(section => <section className="watchlist-section" key={section.id} aria-labelledby={`watchlist-${section.id}`}>
        <h3 id={`watchlist-${section.id}`}><CollectionIcon name={section.icon} />{section.title}</h3>
        <ul className="watchlist-cards" aria-label={`${section.title} placeholders`}>
          {Array.from({ length: section.count }, (_, index) => <li key={index} className="watchlist-card">
            <div className="watchlist-poster" aria-hidden="true"><CollectionIcon name="film" /></div>
            <div className="watchlist-card-caption"><span>Title goes here</span><span className="watchlist-card-type">Movie / Series</span></div>
          </li>)}
        </ul>
      </section>)}
    </div>
  </Overlay>;
}
