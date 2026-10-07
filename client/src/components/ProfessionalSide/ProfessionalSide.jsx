import { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";
import usePortfolioMotion from "./usePortfolioMotion";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Certificates from "./sections/Certificates";
import Contact from "./sections/Contact";
import { assets } from "../../assets";

export default function ProfessionalSide() {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const navbarRef = useRef(null);
  usePortfolioMotion(navbarRef);

  useEffect(() => {
    const navbar = navbarRef.current;
    const app = navbar.closest(".app");
    const observer = new ResizeObserver(() => {
      app.style.setProperty("--navbar-height", navbar.getBoundingClientRect().height + "px");
    });
    observer.observe(navbar);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = [...navbarRef.current.closest(".app").querySelectorAll("section[id]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = navbarRef.current.getBoundingClientRect().bottom + window.innerHeight * .2;
      let current = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = sections.at(-1)?.id;
      setActiveSection(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <>
      <nav ref={navbarRef} className="navbar" aria-label="Main navigation">
        <div className="nav-links">{["Home", "Projects", "Experience", "Education", "Contact"].map(label => <a key={label} href={`#${label.toLowerCase()}`} aria-current={activeSection === label.toLowerCase() ? "location" : undefined}>{label}</a>)}</div>
        <button className="explore-room-btn" onClick={() => setActiveItem({title: "Explore my room", description: "My personal room is coming soon. For now, explore my projects and get to know my professional side."})}>Explore my room <img src={assets["room-arrow.svg"]} alt="" /></button>
      </nav>
    <div className="blue-sky opening">
      <div><Hero /><Projects onCardClick={setActiveItem} /></div>
    </div>
    <div className="green-world"><Experience /><Education /></div>
    <div className="blue-sky closing"><Certificates onCardClick={setActiveItem} /><Contact /></div>
    <Overlay className={activeItem?.techStack ? "project-overlay" : ""} isOpen={!!activeItem} onClose={() => setActiveItem(null)}>{activeItem && (activeItem.techStack ? <div className="project-detail-scroll" tabIndex={0} aria-label="Project details">
      <div className="project-detail-layout">
        <div className="project-detail-preview"><img src={activeItem.image} alt={activeItem.title + " preview"} /></div>
        <div className="project-detail-copy">
          <span className="project-detail-label">{activeItem.projectType || "Selected project"}</span>
          <h2 id="detail-title">{activeItem.title}</h2>
          <p>{activeItem.description}</p>
          <div className="project-detail-technologies"><h3>Built with</h3><div className="tags">{activeItem.techStack.map(tag => <span key={tag}>{tag}</span>)}</div></div>
          {activeItem.githubUrl ? <a className="project-code-button" href={activeItem.githubUrl} target="_blank" rel="noreferrer"><img src={assets["github-logo.png"]} alt="" />GitHub code</a> : <button className="project-code-button" disabled title={activeItem.codeStatus || "Repository link hasn't been added yet"}><img src={assets["github-logo.png"]} alt="" />GitHub code</button>}
          {!activeItem.githubUrl && <span className="project-code-note">{activeItem.codeStatus}</span>}
        </div>
      </div>
    </div> : <>
      <h2 id="detail-title">{activeItem.title}</h2>
      {activeItem.image && <img className="detail-image" src={activeItem.image} alt={activeItem.title + " preview"} />}
      <p>{activeItem.description}</p>
    </>)}</Overlay>
  </>;
}
