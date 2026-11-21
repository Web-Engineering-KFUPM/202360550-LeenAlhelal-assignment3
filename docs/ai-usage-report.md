# AI Usage Report – Assignment 3


---

## 1. Tools Used & Use Cases

| Tool (model) | How I used it |
|---|---|
| Claude (Opus 5.5), claude.ai | Step-by-step tutor and coding assistant: brainstorming which public API to use; explaining how APIs, `fetch`, `async/await`, and JSON responses work; generating and explaining the project pop-ups, the weather feature, and the contact form validation; reviewing my project structure; explaining Lighthouse and Core Web Vitals; drafting the documentation |


---

## 2. Benefits & Challenges

**Benefits**

**Challenges / limitations**
- some explanations were too complicated at first, and I had to ask for a simpler version._
- the AI wrote a URL from memory, so I rebuilt it myself from the official Open-Meteo docs._
- gave me the direct link to the API, and it had trouble giving me a simplistic method of accessing APIs

---

## 3. Learning Outcomes

How to choose a public API: why API keys can't be hidden in a frontend-only public repo; `fetch` + `response.ok` + `try/catch/finally`; the native `<dialog>` element; regular expressions (`\p{L}`); `aria-describedby` / `aria-invalid`; why client-side validation must be repeated on a backend; Lighthouse and Core Web Vitals; caching with a timestamp._

---

## 4. Responsible Use & Modifications

- I asked where the API URL came from, and rebuilt it myself with the official Open-Meteo URL builder.
- I asked for sources for the AI's explanation of the API response. When checked against the docs, the `interval` explanation turned out to be imprecise and was corrected.
- I checked the weather-code lists against the WMO table in the Open-Meteo docs.
- I asked for line-by-line explanations of the form validation code before using it.
- I rejected suggestions that didn't fit my portfolio (reading-related ideas, GitHub repository features).
- I wrote the project descriptions in the pop-ups myself. 
- I tested every feature in the browser: pop-ups (✕, Esc, click outside, keyboard), the API error message (by breaking the URL on purpose), form validation cases, dark and high-contrast mode, and Lighthouse.
- I made some changes to the HTML file eg. lists, paragraphs, to better structure the website 

---

## 5. Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it                                                                                                                          |
|----|--------------|------|---------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| C01 | Claude (Opus 5.5) | 2026-11-20 – 2026-11-21 | Choosing an API; building the weather feature, project pop-ups, and contact form validation; fixing project structure; Lighthouse; documentation drafts | `index.html`, `js/script.js`, `css/styles.css`, `.gitignore`, `README.md`, `docs/*` | Rebuilt the API URL from the official docs; checked weather codes against the WMO table; tested all features in Chrome; ran Lighthouse (mobile 99/100/100/100). _ |
| A01 | Claude (Opus 5.5) | 2026-11-21 | Generated `index.html` with "Learn more" buttons and two `<dialog>` pop-ups | `index.html` | Replaced placeholder text with my own project descriptions. Tested opening/closing with mouse and keyboard.                                                       |
| A02 | Claude (Opus 5.5) | 2026-11-21 | Generated JS for the pop-ups, Open-Meteo weather, and walking-condition rules | `js/script.js` | Asked for a fix for stale data (15-minute refresh). Verified codes against the docs. Tested the error message by breaking the URL.                                |
| A03 | Claude (Opus 5.5) | 2026-11-21 | Generated CSS for the pop-ups, weather panel, and form errors | `css/styles.css` | Checked in light, dark, and high-contrast modes.                                                                                                                  |
| A04 | Claude (Opus 5.5) | 2026-11-21 | Generated contact form validation (HTML, JS, CSS) | `index.html`, `js/script.js`, `css/styles.css` | Asked for a line-by-line explanation. Tested empty fields, a too-short name, an invalid email, and a short message.                                               |
| A05 | Claude (Opus 5.5) | 2026-11-21 | Drafted the README, technical documentation, and this report template | `README.md`, `docs/technical-documentation.md`, `docs/ai-usage-report.md` | _Let AI draft the template and I made changes and edits and wrote what I did                                                                                      |

---

## 6. Declaration

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Name:** Leen Alhelal
**Student ID:** 202360550
**Date:** 21 Nov 2026