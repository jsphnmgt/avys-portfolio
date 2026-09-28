import { assets } from "../../../assets";

const skills = [
  "HTML/CSS",
  "JAVASCRIPT",
  "REACT",
  "UI DESIGN",
  "GIT",
  "FIGMA",
];

function Hero() {
  return (
    <section id="home">
      <div className="hero-card-stack">
        <div className="hero-card-layer layer-back-2"></div>
        <div className="hero-card-layer layer-back-1"></div>
        <div className="hero-card-layer layer-front">
          <div className="hero-text">
            <h1>Hi, I'm Josie Magat</h1>
            <p className="tagline">Frontend developer, still figuring out the backend.</p>
            <p className="blurb">
              I'm a Computer Science student focused on front-end development,
              interface design, interaction, and details that make a product
              feel intuitive rather than functional. I care about where design
              and code meet, and I enjoy turning messy ideas into something
              clean, usable, and ready for people. I'm seeking an internship
              where I can bring that mindset to a team, learn from experienced
              people, and contribute to work that ships.
            </p>
          </div>

          <div className="hero-media">
            <img src={assets["profile-photo.jpg"]} alt="Josie Magat" />
            <div className="skills-list">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;