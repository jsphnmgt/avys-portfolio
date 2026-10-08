import { assets } from "../../../assets";
export default function Contact() {
  return <section id="contact" aria-labelledby="contact-title">
    <div className="ornament contact-divider" aria-hidden="true" />
    <h2 id="contact-title" className="display-heading">Contact me</h2>
    <div className="contact-card">
      <a href="mailto:jsphnmgt@gmail.com"><img src={assets["gmail-logo.png"]} alt="" /><h3>Gmail</h3><p>jsphnmgt@gmail.com</p></a>
      <a href="https://github.com/jsphnmgt" target="_blank" rel="noreferrer"><img src={assets["github-logo.png"]} alt="" /><h3>Github</h3><p>jsphnmgt</p></a>
      <a href="https://www.linkedin.com/in/josephine-magat-615076325/" target="_blank" rel="noreferrer"><img src={assets["linkedin-logo.png"]} alt="" /><h3>LinkedIn</h3><p>Maria Josephine Magat</p></a>
    </div>
  </section>;
}
