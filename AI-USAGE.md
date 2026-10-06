# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

At least six entries. One per real use. Every entry needs a commit link.

### 2026-09-24 - Stripping the backend out of the template 

- **Tool: Claude**
- **What I asked for: Help deciding what to delete from the course template, since my portfolio has no backend.**
- **What it gave back: A list of leftovers (server/, compose.yml, both .env.example files, the API layer, the demo-mode notice), plus advice to trim vite.config.js and deploy-pages.yml.**
- **What I kept, what I changed, and why: I kept all of it, but I opened every file myself before deleting. I kept VITE_BASE_PATH in the workflow and config because GitHub Pages needs it, and removed only the unused API variables and the dev proxy.**
- **Commit: https://github.com/jsphnmgt/avys-portfolio/commit/f1aed5586713afc7f516c863f4235b3c8ce6944a** 

### 2026-09-24 - Structure for the professional side

- **Tool: Claude**
- **What I asked for: How to organize a one-page portfolio where the cards open an overlay.**
- **What it gave back: A layout with ProfessionalSide.jsx, one reusable Overlay.jsx, and one component per section, with the activeItem state kept in the parent.**
- **What I kept, what I changed, and why: I kept the section files, Overlay.jsx and the state pattern, and built the skeleton as empty stubs first so I could fill in one section at a time.**
- **Commit: https://github.com/jsphnmgt/avys-portfolio/commit/f1aed5586713afc7f516c863f4235b3c8ce6944a** 

### 2026-09-29 - Sticky navbar and scroll-snap

- **Tool: Claude**
- **What I asked for: A transparent sticky navbar and PowerPoint-style scrolling, one section per screen.**
- **What it gave back: position: sticky with a transparent background, and scroll-snap-type: y mandatory with scroll-snap-align: start on each section.**
- **What I kept, what I changed, and why: I kept the CSS. It suggested a separate Navbar.jsx, but I put the nav inline in ProfessionalSide.jsx because it's small and unlikely to grow.**
- **Commit: https://github.com/jsphnmgt/avys-portfolio/commit/f71b255fa842efe9209cfae1b4a563ba6024c7d4**

### 2026-10-07 - Implementing my Figma portfolio design

- **Tool: OpenAI Codex with the Figma plugin**
- **What I asked for: Implement my Figma portfolio design using the assets already in the project and the CSS variables in styles.css, without changing anything inside :root.**
- **What it gave back: React sections for projects, experience, education, certificates, and contact, with responsive styling, local assets, and interactive detail dialogs.**
- **What I kept, what I changed, and why: I kept the portfolio layout, assets, and styling that reused my existing CSS variables. I requested sticky navigation, a navy hover effect for “Explore my room,” restored slide-like scroll snapping, and a transparent navigation background to better match my intended appearance and behavior.**
- **Commit: https://github.com/jsphnmgt/avys-portfolio/actions/runs/37506473736**

### YYYY-MM-DD - short title

- **Tool:**
- **What I asked for:**
- **What it gave back:**
- **What I kept, what I changed, and why:**
- **Commit:** https://github.com/YOUR-USERNAME/YOUR-REPO/commit/SHA

## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - Assuming I had a backend

- **What it gave me: Advice built around the template's mock-API-versus-real-API setup, including a data/ folder described as a stand-in until I "wire up the real backend."**
- **What was wrong with it: My portfolio has no backend at all, so the mock/real API layer and the reasons for structuring things around it didn't apply. I had to tell it "i dont have a backend" before it changed course.**
- **What I did instead: I removed the whole API layer and the backend files, and treated my content as plain static data.**
- **Commit: https://github.com/jsphnmgt/avys-portfolio/commit/f1aed5586713afc7f516c863f4235b3c8ce6944a**

### Case 2 - short title

- **What it gave me:**
- **What was wrong with it:**
- **What I did instead:**
- **Commit:** https://github.com/YOUR-USERNAME/YOUR-REPO/commit/SHA

### Case 3 - short title

- **What it gave me:**
- **What was wrong with it:**
- **What I did instead:**
- **Commit:** https://github.com/YOUR-USERNAME/YOUR-REPO/commit/SHA

## 3. Who wrote what

At least a fifth of this project is code you wrote yourself. Name it, and explain
it in your own words.

> Group projects: give each member their own heading below, and use your GitHub
> handle as the heading. You are graded on your own section.

### Written by me

- **File: The data at the top of my section files (Projects.jsx, Experience.jsx, Education.jsx, Certificates.jsx and Contact.jsx)**
- **Commit: https://github.com/jsphnmgt/avys-portfolio/commit/f71b255fa842efe9209cfae1b4a563ba6024c7d4**
- **What it does and why it is built this way: Each section file stores its content as an array of objects. For example, projects include the title, description, tech stack, and image. The component maps over the array to render each item as a card. I wrote all the content myself and moved it out of the separate `data/` folder because it is easier to edit the content in the same file as the component.**

- **File:**
- **Commit:**
- **What it does and why it is built this way:**

### The AI-written part I understand best

- **File:**
- **Commit:**
- **What it does and why we kept it:**
