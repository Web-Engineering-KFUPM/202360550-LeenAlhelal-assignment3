# Leen Alhelal – Personal Portfolio (Assignment 3)

A responsive personal portfolio website for **Leen Alhelal**, a Software Engineering student at KFUPM with an interest in accessible technology.
It is built with plain **HTML, CSS, and JavaScript** (no frameworks) and builds on Assignments 1 and 2.

---

## Features

### From Assignments 1 & 2
- Dark / light mode toggle, remembered between visits
- Project filter by status (All / Ongoing / Completed)
- "Make this page yours" accessibility panel: text size, line spacing, high contrast, content width (saved on the device)
- Skip link, visible keyboard focus, and screen-reader-friendly labels and status messages
- Responsive layout for desktop, tablet, and mobile

### New in Assignment 3
- **Project detail pop-ups:** each project card has a "Learn more" button that opens a pop-up with more details. Built with the native HTML `<dialog>` element, so it can be closed with Esc, the ✕ button, or by clicking outside, and keyboard focus stays inside it.
- **Live walking conditions (Open-Meteo API):** the Accessibility-Aware Route Planner pop-up shows the current weather in Boston and explains what it means for blind and visually impaired pedestrians (good / caution / difficult). Data is refreshed at most every 15 minutes, and a friendly message is shown if the API fails.
- **Smart contact form validation:** custom checks for name, email, and message, with clear error messages under each field that screen readers announce. The form only submits when every field is valid.

---

## Project structure

```
202360550-LeenAlhelal-assignment3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

---

## How to run locally

No installation or build step is needed.

1. **Clone the repository**
   ```bash
   git clone https://github.com/Web-Engineering-KFUPM/202360550-LeenAlhelal-assignment3.git
   cd 202360550-LeenAlhelal-assignment3
   ```
2. **Open the site** using one of these options:
    - Double-click `index.html` to open it in your browser, **or**
    - In IntelliJ / WebStorm: open `index.html` and click a browser icon in the top-right of the editor, **or**
    - In VS Code: install the "Live Server" extension, right-click `index.html` → **Open with Live Server**.
3. An internet connection is needed for the live weather in the Route Planner pop-up. Everything else works offline.

---

## How to use the site

- **Theme:** use the "Switch to dark/light mode" button in the header.
- **Accessibility settings:** open "Customize page appearance" in the *Make this page yours* section.
- **Projects:** filter by status, then click **Learn more** on a card to see details. The Route Planner pop-up shows today's walking conditions in Boston.
- **Contact:** fill in the form. If something is missing or invalid, a message under the field explains how to fix it.

---

## Performance

Lighthouse (Chrome DevTools, mobile): **Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100**.
Details are in [`docs/technical-documentation.md`](docs/technical-documentation.md).

---

## AI use (summary)

I used **Claude (Opus 5.5)** as a step-by-step tutor and coding assistant: choosing a suitable public API, writing and explaining the pop-up, weather, and form validation code, and fixing a project structure problem.
I verified the AI's information against official documentation (for example, the Open-Meteo docs), tested every feature, and asked for explanations of code I did not understand.
Full details, the usage log, and my declaration are in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).

---

## Credits

- Weather data: [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0)