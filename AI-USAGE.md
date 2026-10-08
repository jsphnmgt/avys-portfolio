# AI usage

## 1. How I used AI

### 2026-09-24 - Stripping the backend out of the template 

- **Tool:** Claude
- **What I asked for:** Help deciding what to delete from the course template, since my portfolio has no backend.
- **What it gave back:** A list of leftovers (server/, compose.yml, both .env.example files, the API layer, the demo-mode notice), plus advice to trim vite.config.js and deploy-pages.yml.
- **What I kept, what I changed, and why:** I kept all of it, but I opened every file myself before deleting. I kept VITE_BASE_PATH in the workflow and config because GitHub Pages needs it, and removed only the unused API variables and the dev proxy.
- **Commit:** [f1aed55](https://github.com/jsphnmgt/avys-portfolio/commit/f1aed5586713afc7f516c863f4235b3c8ce6944a)

### 2026-09-24 - Structure for the professional side

- **Tool:** Claude
- **What I asked for:** How to organize a one-page portfolio where the cards open an overlay.
- **What it gave back:** A layout with ProfessionalSide.jsx, one reusable Overlay.jsx, and one component per section, with the activeItem state kept in the parent.
- **What I kept, what I changed, and why:** I kept the section files, Overlay.jsx and the state pattern, and built the skeleton as empty stubs first so I could fill in one section at a time.
- **Commit:** [f1aed55](https://github.com/jsphnmgt/avys-portfolio/commit/f1aed5586713afc7f516c863f4235b3c8ce6944a) 

### 2026-09-29 - Sticky navbar and scroll-snap

- **Tool:** Claude
- **What I asked for:** A transparent sticky navbar and PowerPoint-style scrolling, one section per screen.
- **What it gave back:** position: sticky with a transparent background, and scroll-snap-type: y mandatory with scroll-snap-align: start on each section.
- **What I kept, what I changed, and why:** I kept the CSS. It suggested a separate Navbar.jsx, but I put the nav inline in ProfessionalSide.jsx because it's small and unlikely to grow.
- **Commit:** [f71b255](https://github.com/jsphnmgt/avys-portfolio/commit/f71b255fa842efe9209cfae1b4a563ba6024c7d4)

### 2026-10-07 - Implementing my Figma portfolio design

- **Tool:** OpenAI Codex with the Figma plugin
- **What I asked for:** Implement my Figma portfolio design using the assets already in the project and the CSS variables in styles.css, without changing anything inside :root.
- **What it gave back:** React sections for projects, experience, education, certificates, and contact, with responsive styling, local assets, and interactive detail dialogs.
- **What I kept, what I changed, and why:** I kept the portfolio layout, assets, and styling that reused my existing CSS variables. I requested sticky navigation, a navy hover effect for “Explore my room,” restored slide-like scroll snapping, and a transparent navigation background to better match my intended appearance and behavior.
- **Commit:** [a46c416](https://github.com/jsphnmgt/avys-portfolio/commit/a46c41665f7430f772e2c0f959702d02a0c79205)

### 2026-10-08 - Building the interactive personal room

- **Tool:** OpenAI Codex with the Figma plugin
- **What I asked for** Implement my room design from Figma, position clickable objects over the matching objects in the room image, and make them glow yellow on hover.
- **What it gave back:** A room page with interactive objects, collection overlays, an Explore Room menu, and a door entrance animation.
- **What I kept, what I changed, and why:** I kept the room interactions but requested several changes to the door animation, glow timing, buttons, and menu transitions to match the smooth experience I wanted.
- **Commit:** [72e5e7b](https://github.com/jsphnmgt/avys-portfolio/commit/72e5e7bd0d3818765a174e72f39eedf4c28386d9)

### 2026-10-09 - Filling the personal collections

- **Tool:** OpenAI Codex
- **What I asked for:** Add my watchlist and reading list, find their covers online, arrange the titles alphabetically, and apply my ratings. Add my uploaded game covers as well.
- **What it gave back:** Collection data, cover references, alphabetical lists, and ratings for the Watchlist, Reading List, and Game Shelf.
- **What I kept, what I changed, and why:** I supplied the titles and ratings, confirmed unclear game names, replaced selected covers, and requested adjustments to image cropping and labels.
- **Commit:** [326cb13](https://github.com/jsphnmgt/avys-portfolio/commit/326cb1367e5e0d4961d4bf4c9654ba542e8bb101)

### 2026-10-09 - Adding collection detail popups

- **Tool:** OpenAI Codex
- **What I asked for:** Make collection cards clickable and open a side popup with more information.
- **What it gave back:** Detail popups for reading titles, watchlist entries, and games, using shared styling and animation
- **What I kept, what I changed, and why:** I moved the popup between sides before choosing the right side, refined its colors and borders, and requested smoother opening and closing transitions. I removed watchlist episode counts and excluded game platforms and ratings because they were unnecessary.
- **Commits:** [2894668](https://github.com/jsphnmgt/avys-portfolio/commit/2894668d4b8e701079b6cb825ec442f6aae5b19c), [4a62ed6](https://github.com/jsphnmgt/avys-portfolio/commit/4a62ed6b63c7cc6d4486ca27a6fe32f630ce31eb)

### 2026-10-09 - Integrating Spotify into Music Corner

- **Tool:** OpenAI Codex
- **What I asked for:** Use my Spotify embeds so clicking a song or playlist moves its card to the top and reveals the player underneath. Artist cards should open their Spotify profiles.
- **What it gave back:** Embedded Spotify players, clickable artist links, card transitions, and vinyl animation.
- **What I kept, what I changed, and why:** I replaced the original side-panel approach with the player beneath the selected card. I refined the timing and height, requested fixes for overlapping content and cards remaining after tab changes, and added closing by tapping the selected card again.
- **Commit:** [ddbe5f5](https://github.com/jsphnmgt/avys-portfolio/commit/ddbe5f5118be554a4f4cbd27819e4257740a7130)

## 2. Where the AI got it wrong

### Case 1 - Assuming I had a backend

- **What it gave me:** Advice built around the template's mock-API-versus-real-API setup, including a data/ folder described as a stand-in until I "wire up the real backend.
- **What was wrong with it:** My portfolio has no backend at all, so the mock/real API layer and the reasons for structuring things around it didn't apply. I had to tell it "i dont have a backend" before it changed course.
- **What I did instead:** I removed the whole API layer and the backend files, and treated my content as plain static data.
- **Commit:** [f1aed55](https://github.com/jsphnmgt/avys-portfolio/commit/f1aed5586713afc7f516c863f4235b3c8ce6944a)

### Case 2 - Stretched PC layout on wider screens

- **What it gave me:** A responsive PC overlay whose file explorer became too wide on larger screens.
- **What was wrong with it:** The window proportions and element sizes looked inconsistent. Several sizing adjustments still left the explorer looking stretched or squeezed.
- **What I did instead:** I provided screenshots at different screen sizes and requested further corrections until the monitor and explorer proportions looked consistent.
- **Commit:** [5de39b7](https://github.com/jsphnmgt/avys-portfolio/commit/5de39b73be794f526386e87b15eab74007b947ee)

### Case 3 - Spotify player stayed open after switching tabs

- **What it gave me:** A Music Corner where selecting a song or playlist opened its Spotify player.
- **What was wrong with it:** Switching tabs started the closing animation without immediately clearing the selection. The previous card could remain visible over the new tab’s content.
- **What I did instead:** I reported the issue with a screenshot and requested a fix. The revised implementation clears the selected card and player when switching tabs.
- **Commit:** [ddbe5f5](https://github.com/jsphnmgt/avys-portfolio/commit/ddbe5f5118be554a4f4cbd27819e4257740a7130)

## 3. Who wrote what

### Written by me

- **File:** The data at the top of my section files (Projects.jsx, Experience.jsx, Education.jsx, Certificates.jsx and Contact.jsx)
- **Commit:** [f71b255](https://github.com/jsphnmgt/avys-portfolio/commit/f71b255fa842efe9209cfae1b4a563ba6024c7d4)
- **What it does and why it is built this way:** Each section file stores its content as an array of objects. For example, projects include the title, description, tech stack, and image. The component maps over the array to render each item as a card. I wrote all the content myself and moved it out of the separate `data/` folder because it is easier to edit the content in the same file as the component.

- **File:** client/src/styles.css — the color variables in :root
- **Commit:** [8759747](https://github.com/jsphnmgt/avys-portfolio/commit/87597472835b118e893dbfb36a7544de310cef01)
- **What it does and why it is built this way:** I organized the website’s color palette into reusable CSS variables and assigned them to roles such as text, backgrounds, and outlines. This keeps the design consistent and lets me update colors in one place.

### The AI-written part I understand best

- **File:** client/src/components/PersonalSide/overlays/Music.jsx
- **Commit:** [ddbe5f5](https://github.com/jsphnmgt/avys-portfolio/commit/ddbe5f5118be554a4f4cbd27819e4257740a7130)
- **What it does and why we kept it:** Clicking a song or playlist passes its Spotify URL to a shared hook that manages the selected item and opening or closing state. Music.jsx uses that selection to show the card and build the iframe’s embed URL. Clicking the card again closes the player, while switching tabs resets the selection. We kept this approach so visitors can preview music inside the portfolio without leaving the website.
