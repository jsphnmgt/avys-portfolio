import { useEffect, useState } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import { assets } from "../../../assets";

function Icon({ name, className = "" }) {
  return <span className={`pc-icon ${className}`} aria-hidden="true"><img src={assets[`pc-${name}.svg`]} alt="" /></span>;
}

const folders = [
  { name: "Welcome", icon: "group4", detail: "group15" },
  { name: "About Me", icon: "group5", detail: "group11" },
  { name: "Favorites", icon: "group1" },
  { name: "Currents", icon: "group6" },
];

export default function PersonalComputer({ isOpen = false, onClose }) {
  const [currentFolder, setCurrentFolder] = useState("Welcome");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, [isOpen]);

  const iconFolder = (folder, className = "") => <span className={`pc-folder-icon ${className}`} aria-hidden="true"><img src={assets[`pc-${folder.icon}.svg`]} alt="" />{folder.detail && <img className={`pc-folder-detail${folder.detail === "group11" ? " pc-folder-detail-person" : ""}`} src={assets[`pc-${folder.detail}.svg`]} alt="" />}</span>;

  return <Overlay className="pc-overlay" isOpen={isOpen} onClose={onClose}>
    <h2 id="detail-title" className="pc-accessible-title">Personal Computer</h2>
    <div className="pc-desktop">
      <img className="pc-wallpaper" src={assets["pc-rectangle49.png"]} alt="" />
      <div className="pc-desktop-folders" aria-label="Desktop folders">
        {["HAU", "avys", "APSI"].map(name => <div className="pc-desktop-folder" key={name}><img src={assets["pc-image41.png"]} alt="" /><span>{name}</span></div>)}
      </div>
      <div className="pc-explorer" aria-label="File Explorer">
        <header className="pc-window-titlebar">
          <div className="pc-window-tab"><Icon name="group18" className="pc-icon-computer" /><span>This PC</span><span aria-hidden="true"><Icon name="system-add-remove" /></span></div>
          <span className="pc-new-tab" aria-hidden="true"><Icon name="system-add-remove1" /></span>
          <div className="pc-window-controls">
            <span aria-hidden="true"><Icon name="minimise" /></span>
            <span aria-hidden="true"><span className="pc-maximize-icon" /></span>
            <button aria-label="Close computer" onClick={onClose}><Icon name="close" /></button>
          </div>
        </header>
        <div className="pc-navigation-bar" aria-hidden="true">
          <div className="pc-history-controls">
            <Icon name="interface-direction" /><Icon name="interface-direction1" /><Icon name="interface-direction2" /><Icon name="interface-reload" />
          </div>
          <div className="pc-search"><span>Search</span><Icon name="interface-search" /></div>
        </div>
        <div className="pc-folder-tools" aria-hidden="true">
          <span><span className="pc-view-icon"><i /><i /><i /><i /></span>View</span><span><Icon name="spreadsheet-sorting" />Sorting</span><span><Icon name="group29" />Share</span><span><Icon name="system-properties" />Properties</span>
        </div>
        <div className="pc-explorer-body">
          <nav className="pc-sidebar" aria-label="Computer folders">
            <div className="pc-sidebar-group">
              <div className="pc-sidebar-heading">{iconFolder({ icon: "group19" })}<span>This PC</span><Icon name="interface-arrow" className="pc-small-arrow" /></div>
              {folders.map(folder => <button key={folder.name} aria-current={currentFolder === folder.name ? "page" : undefined} onClick={() => setCurrentFolder(folder.name)}>{iconFolder(folder, folder.name === "Favorites" ? "pc-icon-explorer" : "")}<span>{folder.name}</span><Icon name="interface-arrow1" className="pc-small-arrow" /></button>)}
            </div>
          </nav>
          <div className="pc-folder-content" aria-live="polite">
            {currentFolder === "Welcome" ? <div className="pc-welcome-copy"><p>Hi, welcome to my room!</p><p>I wanted a little space here for the things I enjoy outside of work—what I’m reading, the games I play, the shows I watch, and the music I keep coming back to.</p><p>Feel free to look around. You can click the objects in the room or use Explore Room to find a collection. If you’d like to get to know me a little better, start with About Me here on the computer.</p></div> : currentFolder === "About Me" ? <div className="pc-welcome-copy">
              <p>Hi! I’m Josie, a Computer Science student who enjoys building digital experiences and exploring different corners of tech. I like turning half-formed ideas into something real, one small piece at a time.</p>
              <p>Outside of coding, I spend my time drawing, watching movies and series, reading novels and stories, playing games, and listening to my favorite songs on repeat.</p>
              <p>I’m always curious about something new, whether it’s tech or a hobby. This room brings those interests together—feel free to look around and get to know the person behind the code.</p>
            </div> : <div><h3>{currentFolder}</h3><p>This folder is waiting to be filled.</p></div>}
          </div>
        </div>
      </div>
      <footer className="pc-taskbar">
        <div className="pc-taskbar-apps">
          <span aria-label="Windows"><Icon name="union" /></span>
          <span aria-label="Chrome"><img src={assets["pc-image56.png"]} alt="" /></span>
          <span className="pc-taskbar-active" aria-label="File Explorer — active"><img src={assets["pc-image41.png"]} alt="" /></span>
          <span aria-label="Spotify"><img src={assets["pc-spotify51.png"]} alt="" /></span>
          <span className="pc-discord" aria-label="Discord"><img className="pc-discord-circle" src={assets["pc-ellipse38.svg"]} alt="" /><img src={assets["pc-discord1.png"]} alt="" /></span>
        </div>
        <time dateTime={now.toISOString()}><span>{now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Singapore" })}</span><span>{now.toLocaleDateString("en-US", { timeZone: "Asia/Singapore" })}</span></time>
      </footer>
    </div>
  </Overlay>;
}
