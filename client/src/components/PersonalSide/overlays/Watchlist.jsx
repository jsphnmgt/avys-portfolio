import Overlay from "../../ProfessionalSide/Overlay";

const sections = [
  { id: "favorites", title: "Favorites", icon: "heart", count: 6 },
  { id: "watching", title: "Currently Watching", icon: "play", count: 3 },
  { id: "watched", title: "Watched", icon: "check", count: 6 },
];

function WatchlistIcon({ name }) {
  return <svg className="watchlist-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {name === "heart" && <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />}
    {name === "play" && <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM10 8v8l6-4-6-4Z" />}
    {name === "check" && <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM7.2 12.5l3.6 3.6 6-7-1.5-1.3-4.6 5.4-2.1-2.1-1.4 1.4Z" />}
    {name === "clapperboard" && <><path d="M2 10h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10Z" /><path d="m2 8-.5-3A2 2 0 0 1 3 2.7l2.2-.4 3 4.3L2 8Zm8.4-1.8L7.4 2l4.3-.8 3 4.2-4.3.8Zm6.5-1.2-3-4.2 4.2-.8a2 2 0 0 1 2.3 1.6l.5 2.7-4 .7Z" transform="translate(0 1)" /></>}
    {name === "film" && <path fillRule="evenodd" d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v3h3V4H4Zm0 6v4h3v-4H4Zm0 7v3h3v-3H4ZM17 4v3h3V4h-3Zm0 6v4h3v-4h-3Zm0 7v3h3v-3h-3ZM9 5v6h6V5H9Zm0 8v6h6v-6H9Z" />}
  </svg>;
}

export default function Watchlist({ isOpen = false, onClose }) {
  return <Overlay className="watchlist-overlay" isOpen={isOpen} onClose={onClose}>
    <header className="watchlist-header">
      <h2 id="detail-title"><WatchlistIcon name="clapperboard" />Watchlist</h2>
    </header>
    <div className="watchlist-scroll" role="region" aria-label="Watchlist collections" tabIndex={0}>
      {sections.map(section => <section className="watchlist-section" key={section.id} aria-labelledby={`watchlist-${section.id}`}>
        <h3 id={`watchlist-${section.id}`}><WatchlistIcon name={section.icon} />{section.title}</h3>
        <ul className="watchlist-cards" aria-label={`${section.title} placeholders`}>
          {Array.from({ length: section.count }, (_, index) => <li key={index} className="watchlist-card">
            <div className="watchlist-poster" aria-hidden="true"><WatchlistIcon name="film" /></div>
            <div className="watchlist-card-caption"><span>Title goes here</span><span className="watchlist-card-type">Movie / Series</span></div>
          </li>)}
        </ul>
      </section>)}
    </div>
  </Overlay>;
}
