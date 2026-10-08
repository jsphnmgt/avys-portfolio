import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";
import { assets } from "../../../assets";
import readingList from "./readingListData.json";

const sections = [
  { id: "favorites", title: "Favorites", icon: "heart" },
  { id: "reading", title: "Currently Reading", icon: "bookmark" },
  { id: "finished", title: "Finished Reading", icon: "check" },
];

export default function ReadingList({ isOpen = false, onClose }) {
  return <Overlay className="watchlist-overlay reading-list-overlay" isOpen={isOpen} onClose={onClose}>
    <header className="watchlist-header">
      <h2 id="detail-title"><CollectionIcon name="book" viewBox="2 2 20 20" />Reading List</h2>
    </header>
    <div className="watchlist-scroll" role="region" aria-label="Reading List collections" tabIndex={0}>
      {sections.map(section => <section className="watchlist-section" key={section.id} aria-labelledby={`reading-list-${section.id}`}>
        <h3 id={`reading-list-${section.id}`}><CollectionIcon name={section.icon} />{section.title}</h3>
        <ul className="watchlist-cards" aria-label={section.title}>
          {[...readingList[section.id]].sort((a, b) => readingList.catalog[a].title.localeCompare(readingList.catalog[b].title, "en", { numeric: true, sensitivity: "base" })).map(id => {
            const item = readingList.catalog[id];
            return <li className="reading-list-card" key={id}>
              <div className="reading-list-cover-frame" aria-hidden="true">
                <div className="reading-list-cover"><img src={assets[item.image]} alt="" loading="lazy" /></div>
              </div>
              <div className="reading-list-caption">
                <span className="reading-list-card-title">{item.title}</span>
                <span className="reading-list-card-author">{item.author}</span>
                {item.rating !== null && <span className="reading-list-rating" role="img" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, star) => <span className={star < item.rating ? "is-rated" : undefined} key={star}><CollectionIcon name="star" /></span>)}
                </span>}
              </div>
            </li>;
          })}
        </ul>
      </section>)}
    </div>
  </Overlay>;
}
