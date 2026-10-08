import { useRef, useState } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";
import { assets } from "../../../assets";

const tabs = [
  { id: "songs", label: "Songs", heading: "Favorite Songs" },
  { id: "playlists", label: "Playlists", heading: "Favorite Playlists" },
  { id: "genres", label: "Genres", heading: "Favorite Genres" },
  { id: "artists", label: "Artists", heading: "Favorite Artists" },
];
const songs = [
  { title: "Soho", artist: "Eirra", image: "music-soho.png", url: "https://open.spotify.com/track/6jp1yanUreiJO6hHP4c6Ph" },
  { title: "Setsuna Hanabi", artist: "TOMORROW X TOGETHER", image: "music-setsuna-hanabi.png" },
  { title: "Your Guardian Angel", artist: "The Red Jumpsuit Apparatus", image: "music-guardian-angel.png" },
  { title: "Tears in Your Eyes", artist: "MICO", image: "music-tears-in-your-eyes.png" },
];
const playlists = [
  { title: "story of a warrior", image: "music-playlist-story-of-a-warrior.jpg", url: "https://open.spotify.com/playlist/6hCoLfgfq3AIt7sXHZzB9S?si=8d66589a0787405f" },
  { title: "inner kogane", image: "music-playlist-inner-kogane.jpg", url: "https://open.spotify.com/playlist/0Mr3fPx1bl7SeckBzKDP4s?si=1ed62bd2a64f447e" },
  { title: "ethereal𓂃 ࣪˖𐀔", image: "music-playlist-ethereal.jpg", url: "https://open.spotify.com/playlist/1lJfOPgJWb47u78InWdEQ1?si=65586f3ca7534ae6" },
  { title: "serenity", image: "music-playlist-serenity.jpg", url: "https://open.spotify.com/playlist/1JtuMaI0wcEDNUt8mGs2vW?si=d2227eaa01df48be" },
];

const genres = ["Anime soundtracks", "OPM", "Pop Funk", "Pop", "J-Rock"];
const artists = [
  { title: "Jorge Rivera-Herrans", image: "favorite-artist-jorge.jpg" },
  { title: "Olivia Rodrigo", image: "favorite-artist-olivia.jpg" },
  { title: "TOMORROW X TOGETHER", image: "favorite-artist-txt.jpg" },
  { title: "BigRicePiano", image: "favorite-artist-bigricepiano.jpg" },
];

export default function Music({ isOpen = false, onClose }) {
  const [activeTab, setActiveTab] = useState("songs");
  const tabRefs = useRef([]);
  const current = tabs.find(tab => tab.id === activeTab);
  const navigateTabs = (event, index) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return <Overlay className="watchlist-overlay music-overlay" isOpen={isOpen} onClose={onClose} showCloseButton={false}>
    <header className="watchlist-header music-header">
      <h2 id="detail-title"><CollectionIcon name="music" />Music Corner</h2>
      <div className="music-navigation">
      <div className="music-tabs" role="tablist" aria-label="Music collections">
        {tabs.map((tab, index) => <button key={tab.id} role="tab" id={`music-tab-${tab.id}`} aria-selected={activeTab === tab.id} aria-controls="music-panel" tabIndex={activeTab === tab.id ? 0 : -1} ref={element => { tabRefs.current[index] = element; }} onClick={() => setActiveTab(tab.id)} onKeyDown={event => navigateTabs(event, index)}><span className="music-tab-label">{tab.label}</span></button>)}
      </div>
      <button className="music-close" onClick={onClose} aria-label="Close Music Corner"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg></button>
      </div>
    </header>
    <div className="watchlist-scroll music-scroll" role="region" aria-label="Music Corner content" tabIndex={0}>
      <div className="music-layout" style={{ "--music-card-count": activeTab === "genres" ? genres.length : 4 }}>
        <div className="music-record" aria-hidden="true"><img key={activeTab} src={assets["music-vinyl.png"]} alt="" /></div>
        <section key={activeTab} className="music-panel" id="music-panel" role="tabpanel" aria-labelledby={`music-tab-${activeTab}`} tabIndex={0}>
          <h3>{current.heading}</h3>
          {activeTab === "songs" ? <ul className="music-song-list">
            {songs.map(song => <li key={song.title}><a className="music-song-card" href={song.url || `https://open.spotify.com/search/${encodeURIComponent(song.title + " " + song.artist)}`} target="_blank" rel="noopener noreferrer" aria-label={`${song.url ? "Open" : "Find"} ${song.title} by ${song.artist} on Spotify (opens in a new tab)`}>
              <img src={assets[song.image]} alt="" />
              <span className="music-song-copy"><span className="music-song-title">{song.title}</span><span className="music-song-artist">{song.artist}</span></span>
            </a></li>)}
          </ul> : activeTab === "playlists" ? <ul className="music-song-list" aria-label="Favorite playlists">
            {playlists.map(playlist => <li key={playlist.title}><a className="music-song-card" href={playlist.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${playlist.title} on Spotify (opens in a new tab)`}>
              <img src={assets[playlist.image]} alt="" />
              <span className="music-song-title">{playlist.title}</span>
            </a></li>)}
          </ul> : activeTab === "genres" ? <ul className="music-song-list music-genre-list" aria-label="Favorite genres">
            {genres.map((genre, index) => <li key={genre}><div className="music-song-card">
              <span className="music-song-title">{genre}</span>
              <span className="music-genre-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </div></li>)}
          </ul> : <ul className="music-song-list" aria-label="Favorite artists">
            {artists.map(artist => <li key={artist.title}><div className="music-song-card"><img src={assets[artist.image]} alt="" /><span className="music-song-title">{artist.title}</span></div></li>)}
          </ul>}
        </section>
      </div>
    </div>
  </Overlay>;
}
