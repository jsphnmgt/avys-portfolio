# Weekly reports

Five minutes a week. Add a new section at the top; never edit an old one.

The value is entirely in writing them **while it is happening**. What took four
hours and why is invisible a month later, and it is exactly what your journal
needs.

---

## Week of 2026-09-14

**Done.** Started the professional mockup and completed roughly half of it. Removed the unused backend, API layers, environment examples, and deployment variables. Created the professional section components, content data files, and an overlay component. Added a professional/personal switch, with the personal side still a placeholder. The application was not yet working reliably locally, and deployment was not confirmed.

**Stuck.** Running npm run dev displayed a blank white page. The browser console had not been checked, so the cause was still unknown.

**Hours.** Approximately 7 hours

**Next.** Check the browser console and fix the blank page. Finish the professional mockup and begin the personal room mockup.

---

## Week of 2026-09-21

**Done.** Built the sticky, transparent navbar and section scroll snapping. Added the Hero content, photo and skills layout, color variables, and background gradient. Moved professional section data into the corresponding JSX files and added a reusable asset registry. These changes were developed locally; deployment was not confirmed in this entry.

**Stuck.** Hero referenced profile-photo.png, but the uploaded file was profile-photo.jpg. It also imported an asset registry before assets/index.js existed. Personal commitments reduced the time available for development.

**Hours.** Approximately 5 hours

**Next.** Finish the professional mockup and begin the personal mockup. Build the remaining professional sections and connect project and certificate cards to their detail overlays.

---

## Week of 2026-09-28

**Done.** Focused mainly on the mockups and finished the designs for both the professional portfolio and personal room. This week’s progress was in Figma rather than the deployed website.

**Stuck.** The professional side felt empty and boring. I struggled to balance the content, spacing, backgrounds, and decorative elements while keeping the layout readable and professional.

**Hours.** Approximately 25 hours, estimated from Figma’s version history and excluding breaks, spent designing and refining both mockups.

**Next.** Implement both the professional portfolio and the interactive personal room based on the completed mockups.

---

## Week of 2026-10-05

**Done.** Implemented both the professional portfolio and interactive personal room from the completed mockups. Added project and certificate overlays, collection detail peeks, PC summaries, collection counts, and Spotify players. Refined animations and responsive layouts, organized the source files and assets, and deployed the website to GitHub Pages.

**Stuck.** Some overlays stretched too much on wide screens, while detail panels and music players needed layout adjustments on smaller screens. Animations caused overlapping elements and glitches in the PC overlay. Selected music cards also remained visible after switching tabs. These issues required repeated testing and corrections.

**Hours.** Approximately 30 hours, estimated retrospectively from the week’s development, testing, and documentation work.

**Next.** Finish the project documentation and record the videos needed. 