import { assets } from "../../../assets";
const certificates = [
  { title: "CompTIA ITF+ Certified", year: "2023" },
  { title: "AI Fundamentals with IBM SkillsBuild", year: "2026" },
  { title: "AWS Academy Graduate - Cloud Foundations - Training Badge", year: "2026" },
  { title: "Data Analytics Essentials", year: "2026" },
  { title: "Javascript Essentials 1", year: "2024" },
];
export default function Certificates({ onCardClick }) {
  return <section id="certificates" aria-labelledby="certificates-title">
    <h2 id="certificates-title" className="display-heading">Certificates</h2>
    <p className="section-subtitle">Professional achievements and certificates</p>
    <div className="certificates-grid">{certificates.map(certificate => <article className="certificate-card" key={certificate.title}>
      <h3>{certificate.title}</h3>
      <div className="certificate-footer">
        <button onClick={() => onCardClick({ title: certificate.title, description: `Earned in ${certificate.year}. The certificate document has not been added to this portfolio yet.` })}><img src={assets["view-certificate.png"]} alt="" />View Certificate</button>
        <span>{certificate.year}</span>
      </div>
    </article>)}</div>
  </section>;
}
