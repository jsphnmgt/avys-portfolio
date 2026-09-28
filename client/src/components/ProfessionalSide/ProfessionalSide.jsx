import { useState } from "react";
import Overlay from "./Overlay";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Certificates from "./sections/Certificates";
import Contact from "./sections/Contact";

function ProfessionalSide() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <>
      <nav className="navbar">
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#" className="explore-room-btn">Explore My Room →</a>
      </nav>

      <main>
        <Hero />
        <Projects onCardClick={setActiveItem} />
        <Experience onCardClick={setActiveItem} />
        <Education onCardClick={setActiveItem} />
        <Certificates onCardClick={setActiveItem} />
        <Contact />
      </main>

      <Overlay isOpen={!!activeItem} onClose={() => setActiveItem(null)}>
        {activeItem && (
          <div>
            <h2>{activeItem.title}</h2>
            <p>{activeItem.description}</p>
          </div>
        )}
      </Overlay>
    </>
  );
}

export default ProfessionalSide;