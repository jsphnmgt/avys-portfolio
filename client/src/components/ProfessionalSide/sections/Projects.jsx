/* PROJECTS DATA */
const projects = [
  {
    id: "proj-1",
    title: "CapsiCAM",
    description: "A mobile application for real-time chili pepper leaf disease classification using deep learning",
    techStack: ["Flutter", "Supabase", "TensorFlow"],
    imageUrl: "IMAGEURLHERE",
    repoUrl: "REPOHERE",
    featured: true,
  },
  {
    id: "proj-2",
    title: "Course Companion",
    description: "A course companion website helping students organize lessons, track progress, and access learning resources",
    techStack: ["React", "CSS"],
    imageUrl: "IMAGEURLHERE",
    repoUrl: "REPOHERE",
    featured: true,
  },
  {
    id: "proj-3",
    title: "HAUlam",
    description: "Haulam helps users discover, browse, bookmark, and interact with food stalls at Holy Angel University",
    techStack: ["Flutter", "Dart", "Supabase"],
    imageUrl: "IMAGEURLHERE",
    repoUrl: "REPOHERE",
    featured: true,
  },
  {
    id: "proj-4",
    title: "MYSTICA",
    description: "Mystica is a Studio Ghibli-inspired website featuring movies, characters, and its magical world",
    techStack: ["HTML", "CSS", "JavaScript"],
    imageUrl: "IMAGEURLHERE",
    repoUrl: "REPOHERE",
    featured: true,
  },
  {
    id: "proj-5",
    title: "Portfolio",
    description: "A CV website showcasing professional experience, education, skills, and achievements",
    techStack: ["React", "CSS"],
    imageUrl: "IMAGEURLHERE",
    repoUrl: "REPOHERE",
    featured: true,
  },
];

/* ----------------------------------------------------------------- */
function Projects({ onCardClick }) {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card" onClick={() => onCardClick(project)}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;