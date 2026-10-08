import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";

const sections = [
  { id: "favorites", title: "Favorites", icon: "heart", count: 6 },
  { id: "reading", title: "Currently Reading", icon: "bookmark", count: 3 },
  { id: "finished", title: "Finished Reading", icon: "check", count: 6 },
];

export default function ReadingList({ isOpen = false, onClose }) {
  return <Overlay className="watchlist-overlay reading-list-overlay" isOpen={isOpen} onClose={onClose}>
    <header className="watchlist-header">
      <h2 id="detail-title"><CollectionIcon name="book" viewBox="2 2 20 20" />Reading List</h2>
    </header>
    <div className="watchlist-scroll" role="region" aria-label="Reading List collections" tabIndex={0}>
      {sections.map(section => <section className="watchlist-section" key={section.id} aria-labelledby={`reading-list-${section.id}`}>
        <h3 id={`reading-list-${section.id}`}><CollectionIcon name={section.icon} />{section.title}</h3>
        <ul className="watchlist-cards" aria-label={`${section.title} placeholders`}>
          {Array.from({ length: section.count }, (_, index) => <li className="reading-list-card" key={index}>
            <div className="reading-list-cover-frame" aria-hidden="true">
              <div className="reading-list-cover"><CollectionIcon name="book" /></div>
            </div>
            <div className="reading-list-caption">
              <span className="reading-list-card-title">Title goes here</span>
              <span className="reading-list-card-author">Author goes here</span>
              <span className="reading-list-rating" role="img" aria-label="Rating to be added">
                {Array.from({ length: 5 }, (_, star) => <CollectionIcon name="star" key={star} />)}
              </span>
            </div>
          </li>)}
        </ul>
      </section>)}
    </div>
  </Overlay>;
}
