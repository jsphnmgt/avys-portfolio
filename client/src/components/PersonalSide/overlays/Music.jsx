import { useRef, useState } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";
import { assets } from "../../../assets";
import useCollectionPeek from "./useCollectionPeek";

const tabs = [
  { id: "songs", label: "Songs", heading: "Favorite Songs" },
  { id: "playlists", label: "Playlists", heading: "Favorite Playlists" },
  { id: "genres", label: "Genres", heading: "Favorite Genres" },
  { id: "artists", label: "Artists", heading: "Favorite Artists" },
];
const songs = [
  { title: "Soho", artist: "Eirra", image: "music-soho.png", url: "https://open.spotify.com/track/6jp1yanUreiJO6hHP4c6Ph" },
  { title: "Setsuna Hanabi", artist: "TOMORROW X TOGETHER", image: "music-setsuna-hanabi.png", url: "https://open.spotify.com/track/2Hq8l2e9BkRVaQtJni4Ss9" },
  { title: "Your Guardian Angel", artist: "The Red Jumpsuit Apparatus", image: "music-guardian-angel.png", url: "https://open.spotify.com/track/2Guz1b911CbpG8L92cnglI" },
  { title: "Tears in Your Eyes", artist: "MICO", image: "music-tears-in-your-eyes.png", url: "https://open.spotify.com/track/21L7bgwJcZk1E7dxq1m1FI" },
];
const playlists = [
  { title: "story of a warrior", image: "music-playlist-story-of-a-warrior.jpg", url: "https://open.spotify.com/playlist/6hCoLfgfq3AIt7sXHZzB9S?si=8d66589a0787405f" },
  { title: "inner kogane", image: "music-playlist-inner-kogane.jpg", url: "https://open.spotify.com/playlist/0Mr3fPx1bl7SeckBzKDP4s?si=1ed62bd2a64f447e" },
  { title: "ethereal𓂃 ࣪˖𐀔", image: "music-playlist-ethereal.jpg", url: "https://open.spotify.com/playlist/1lJfOPgJWb47u78InWdEQ1?si=65586f3ca7534ae6" },
  { title: "serenity", image: "music-playlist-serenity.jpg", url: "https://open.spotify.com/playlist/1JtuMaI0wcEDNUt8mGs2vW?si=d2227eaa01df48be" },
];

const genres = ["Anime soundtracks", "OPM", "Pop Funk", "Pop", "J-Rock"];
const artists = [
  { title: "Jorge Rivera-Herrans", image: "favorite-artist-jorge.jpg", url: "https://open.spotify.com/artist/2kdmTOXncgNHSuYVMhdd5I" },
  { title: "Olivia Rodrigo", image: "favorite-artist-olivia.jpg", url: "https://open.spotify.com/artist/1McMsnEElThX1knmY4oliG" },
  { title: "TOMORROW X TOGETHER", image: "favorite-artist-txt.jpg", url: "https://open.spotify.com/artist/0ghlgldX5Dd6720Q3qFyQB" },
  { title: "BigRicePiano", image: "favorite-artist-bigricepiano.jpg", url: "https://open.spotify.com/artist/6NZehyzoXBTOmvFzJyp6RV" },
];

export default function Music({ isOpen = false, onClose }) {
  const [activeTab, setActiveTab] = useState("songs");
  const { selectedId, isPeekVisible, peekHeadingRef, openPeek, closePeek, resetPeek, onPeekKeyDown, onPeekTransitionEnd } = useCollectionPeek();
  const selected = [...songs, ...playlists].find(item => item.url === selectedId);
  const [cardOrigin, setCardOrigin] = useState({});
  const showPlayer = (item, trigger) => {
    const card = trigger.getBoundingClientRect();
    const list = trigger.closest("ul").getBoundingClientRect();
    setCardOrigin({
      "--music-card-origin-x": `${card.left - list.left}px`,
      "--music-card-origin-y": `${card.top - list.top}px`,
      "--music-card-origin-width": `${card.width}px`,
      "--music-selected-card-height": `${card.height}px`,
      "--music-card-list-height": `${list.height}px`,
    });
    openPeek(item.url, trigger);
  };
  const selectTab = id => {
    if (id === activeTab) return;
    resetPeek();
    setCardOrigin({});
    setActiveTab(id);
  };
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
    selectTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return <Overlay className="watchlist-overlay music-overlay" isOpen={isOpen} onClose={onClose} showCloseButton={false}>
    <header className="watchlist-header music-header">
      <h2 id="detail-title"><CollectionIcon name="music" />Music Corner</h2>
      <div className="music-navigation">
        <div className="music-tabs" role="tablist" aria-label="Music collections">
          {tabs.map((tab, index) => <button key={tab.id} role="tab" id={`music-tab-${tab.id}`} aria-selected={activeTab === tab.id} aria-controls="music-panel" tabIndex={activeTab === tab.id ? 0 : -1} ref={element => { tabRefs.current[index] = element; }} onClick={() => selectTab(tab.id)} onKeyDown={event => navigateTabs(event, index)}><span className="music-tab-label">{tab.label}</span></button>)}
        </div>
        <button className="music-close" onClick={onClose} aria-label="Close Music Corner"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg></button>
      </div>
    </header>
    <div className="watchlist-scroll music-scroll" role="region" aria-label="Music Corner content" tabIndex={0} onKeyDown={onPeekKeyDown}>
      <div className={`music-layout${selected ? " has-player" : ""}`} style={{ "--music-card-count": activeTab === "genres" ? genres.length : 4 }}>
        <div className="music-record-stage">
          <div className="music-record" aria-hidden="true"><img key={activeTab} src={assets["music-vinyl.png"]} alt="" /></div>
        </div>
        <section key={activeTab} className="music-panel" id="music-panel" role="tabpanel" aria-labelledby={`music-tab-${activeTab}`} tabIndex={0}>
          <h3>{current.heading}</h3>
          <div className={`music-card-area${selected ? " is-playing" : ""}`} style={cardOrigin}>
          {activeTab === "songs" ? <ul className="music-song-list" inert={selected ? "" : undefined}>
            {songs.map(song => <li key={song.title}><button className="music-song-card" onClick={event => showPlayer(song, event.currentTarget)} aria-expanded={selectedId === song.url} aria-controls="music-spotify-peek" aria-label={`Listen to ${song.title} by ${song.artist}`}>
              <img src={assets[song.image]} alt="" />
              <span className="music-song-copy"><span className="music-song-title">{song.title}</span><span className="music-song-artist">{song.artist}</span></span>
            </button></li>)}
          </ul> : activeTab === "playlists" ? <ul className="music-song-list" aria-label="Favorite playlists" inert={selected ? "" : undefined}>
            {playlists.map(playlist => <li key={playlist.title}><button className="music-song-card" onClick={event => showPlayer(playlist, event.currentTarget)} aria-expanded={selectedId === playlist.url} aria-controls="music-spotify-peek" aria-label={`Listen to ${playlist.title}`}>
              <img src={assets[playlist.image]} alt="" />
              <span className="music-song-title">{playlist.title}</span>
            </button></li>)}
          </ul> : activeTab === "genres" ? <ul className="music-song-list music-genre-list" aria-label="Favorite genres">
            {genres.map((genre, index) => <li key={genre}><div className="music-song-card">
              <span className="music-song-title">{genre}</span>
              <span className="music-genre-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </div></li>)}
          </ul> : <ul className="music-song-list" aria-label="Favorite artists">
            {artists.map(artist => <li key={artist.title}><a className="music-song-card" href={artist.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${artist.title} on Spotify (opens in a new tab)`}><img src={assets[artist.image]} alt="" /><span className="music-song-title">{artist.title}</span></a></li>)}
          </ul>}
          {selected && <div className={`music-card-player${isPeekVisible ? " is-visible" : ""}`} id="music-spotify-peek" role="region" aria-label={`Spotify player: ${selected.title}`} onTransitionEnd={onPeekTransitionEnd}>
            <div className="music-song-card music-selected-card">
              <button className="music-selected-toggle" onClick={closePeek} aria-label={`Close player for ${selected.title}`} aria-expanded={isPeekVisible} aria-controls="music-spotify-peek">
              <img src={assets[selected.image]} alt="" />
              <span className="music-song-copy"><span className="music-song-title">{selected.title}</span>{selected.artist && <span className="music-song-artist">{selected.artist}</span>}</span>
              </button>
              <button className="music-close music-player-close" ref={peekHeadingRef} onClick={closePeek} aria-label="Close Spotify player"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg></button>
            </div>
            <div className={`music-embed-unfold${selected.url.includes("/track/") ? " music-song-embed" : ""}`}><iframe key={selectedId} className="music-spotify-embed" title={`Spotify player: ${selected.title}`} src={`https://open.spotify.com/embed${new URL(selected.url).pathname}?utm_source=generator${selected.title === "inner kogane" ? "&theme=0" : ""}`} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen loading="lazy" /></div>
          </div>}
          </div>
        </section>
      </div>
    </div>
  </Overlay>;
}
