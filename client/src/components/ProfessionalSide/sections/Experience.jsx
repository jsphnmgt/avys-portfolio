import { assets } from "../../../assets";
const experience = [
  { role: "League of Outstanding Programmers Staff", description: "Assist in managing financial transactions, processing receipts, tracking expenses, maintaining accurate records, preparing financial reports, and monitoring budgets for LOOP while ensuring compliance with financial policies and procedures." },
  { role: "Alpha Fox Staff", description: "Assisted with financial transactions, receipt processing, expense tracking, recordkeeping, report preparation, and budget monitoring for Alpha Fox, a department organization, while ensuring compliance with financial policies and procedures." },
];
export default function Experience() {
  return <section id="experience" aria-labelledby="experience-title">
    <h2 id="experience-title" className="display-heading">Experience</h2>
    <div className="experience-layout">
      <div className="experience-list">{experience.map(item => <article className="experience-entry" key={item.role}>
        <img className="experience-star" src={assets["experience-star.png"]} alt="" />
        <p className="experience-date">2024-2025</p>
        <div><h3>{item.role}</h3><p>{item.description}</p><p className="organization">Holy Angel University</p></div>
      </article>)}</div>
      <img className="experience-photo" src={assets["green-photo.jpg"]} alt="A leafy green café with a warmly lit entrance" />
    </div>
  </section>;
}
