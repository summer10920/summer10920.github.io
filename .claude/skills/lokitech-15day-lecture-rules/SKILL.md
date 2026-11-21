---
name: lokitech-15day-lecture-rules
description: >-
  Before writing, restructuring, or scheduling work on any
  summer10920.github.io lokiTech-15day course article (講義) or its
  studiesAdvanced demo files; holds Loki's agreed teaching model, writing,
  structure, and process rules.
---
# lokiTech 15-day 講義 rules

Repos (Loki's Mac): blog `/Users/loki/github/summer10920.github.io`, practice repo `/Users/loki/github/studiesAdvanced` (GitHub `summer10920/studiesAdvanced`, students fork branch `new-tech` and open the repo root in VS Code).

Ongoing lecture work commits on blog `master` and practice repo `new-tech` (students fork `new-tech`). Do not open or continue on `revise-15day` / `new-tech-revise` unless Loki asks. Demos and articles may still be renamed, merged or deleted when the course content changes.

## Teaching model (what the articles are for)
- Total 120 hours, about 15 days × 8h. Rough budget: 工具與 HTML 12h, CSS 12h, Tailwind 8h, JavaScript 24h, React 基礎與進階 18h, React Router 8h, 專案 32h, 緩衝 6h. Do not split by day.
- Loki does not live-code and students do not code in class. Loki copies each demo into VS Code, runs it, and explains the concept. Students fork studiesAdvanced and read the code afterward, and use Claude Code to help them learn. So: demos must be complete and runnable by copy-paste; articles teach concepts, they are not follow-along tutorials.
- Mainline (non-選讀) content = basic concepts everyone needs + concepts the final project uses. Everything else is `選讀：…`. Anything not marked 選讀 must fit the 120 hours. Article length and heading count are not a problem; the articles stay complete so students can read the 選讀 on their own later.
- No per-topic exercises. There is no 「換你試試」 and no `<details>` answers. Homework is one set per day, drawn from the final project (a component or page of it), not marked or explained in class (reference answers ship in the practice repo root `homework/<NN-name>/`, same file names as the starters, never inside the article); it ends each lecture article as a `# 回家作業` chapter (after the mainline, before `# 本篇重點回顧`), covering mainline content only. Tasks are drawn from the final project's data and components (sample data in a starter file under studiesAdvanced, answers only in `studiesAdvanced/homework/`, no class time), written as a goal, requirements and a check (expected result), not step-by-step. The course plan (hours, stages, homework list) lives in the practice repo `README.md`, not in a blog post.
- Content must be current mainstream and correct practice. Legacy features get a brief `{% note info %}` at the end of the related topic, no 選讀 section.
- When a later article or demo uses something taught only in a 選讀 section (e.g. `Math.random`, `Date`), do not re-teach it: add a one-line pointer with a link to that 選讀 section (`{% post_link … %}` to the article, naming the section).
- Prioritise: (1) concepts the project needs, (2) clear explanation, (3) completeness for self-study. Raise a concept to mainline when the project depends on it (e.g. destructuring, spread, ES module).

## Process
1. Discuss improvement points with Loki first; read the actual article before proposing (never guess its content).
2. Start or schedule work only after an explicit go. Agreeing on a detail is not a go.
3. Work and commit on blog `master` and practice `new-tech`. Commit locally after the build passes (`pnpm run build` in the blog, plus `pnpm build` in Vite projects). Push only when Loki says.
4. Revise one article as the template first (06-js-basics), get Loki's OK, then apply the same standard to the rest.
5. Report results briefly; Loki reads on his phone.

## Article structure
- Not flat: group chapters by real topic categories, ordered from basic to advanced; heading depth may go to `#####`.
- A short, thin section (a few paragraphs, one command) never gets its own `##`; group related short steps under one shared `##` and push them down to `###`/`####`.
- Every `#` chapter holds at least two substantial non-選讀 `##` sections, and no heading has a single child. Headings carry no parenthetical notes.
- Never skip a heading level (a `#` directly followed by `###` breaks the Hexo TOC layout).
- Headings use clear technical terms (「認識 JavaScript」「變數與常數」「迴圈」), never colloquial or metaphor-style titles.
- The first chapter of each new technology explains what it is, its role and where it runs before any syntax.
- Sequential short steps of one task stay under one parent section as small sub-headings 「步驟 N：…」, not independent chapters.
- Every chapter (each heading level that opens a section) starts with a short 前言 paragraph: what it covers and why. Keep it to a connected paragraph, not a list.
- Optional content uses headings exactly `選讀：標題`, placed under the related topic. No other "必教" marker is used.
- Core topics stay mainline (e.g. `switch`, including a deliberate fall-through example).
- Simple topics stay concise (e.g. 型別轉換): one-line purpose per item, let the demo carry the rest, merge closely related small units.
- Short supporting explanations go in a `{% note info %}` card next to the paragraph, not a separate heading.
- Diagrams use the NexT tag syntax `{% mermaid graph LR %}` … `{% endmermaid %}`, never a ```mermaid fenced block.
- Closing `# 本篇重點回顧` is 5–8 one-sentence bullets, then `# 專有名詞中英對照`: terms as `- 中文術語（English term）` bullet lists grouped under `##` headings that mirror the article's `#` chapters, ordered by first appearance, no table. Both are for students to read and search; they cost no class time.
- Series order and file naming: see Series below.

## Each knowledge point: three beats
1. **觀念** — plain words, one connected paragraph (or a short bullet list when the items are parallel), minimal syntax.
2. **Demo** — a complete, runnable file from studiesAdvanced, shown in full, kept in sync with the file.
3. **解析** — walk through the demo against what appears on screen (page or Console), as a bullet list, one point per bullet in full sentences. Cover what matters for the concept; do not narrate every line. Scale the length with the demo's complexity.

Method overviews: when a section introduces two or more related methods, properties or events, open it (after the 前言) with an 「一覽」: grouped bullets by purpose, one sentence each on what it does, returns and how it differs from siblings; add a mermaid diagram when there is a position, direction or flow relationship.

## Writing style
- Write for readers who are new to the topic. Say what it is, when to use it, its rules, what happens. Every paragraph needs one clear point; cut sentences that repeat the heading, the demo, or the previous sentence.
- Inline code: use `code` wherever a real code token appears (identifiers, file names and paths, routes, class names, config keys, literal values); never for ordinary words or whole phrases. Keep it readable: aim for about one or two spans per paragraph when defining a term, but going a little over is fine when each span is a distinct token — no hard limit and no special-casing. When a sentence turns into a wall of identifiers, split it or use a short bullet list or a commented demo block instead.
- Prose shape: a real explanation is one connected paragraph; several parallel short statements become a bullet list. Never a paragraph made of disconnected short sentences, and no paragraph that only lists terms.
- No tables (cramped in Hexo). Sole exception: the 05 Tailwind cheatsheet 公式表.
- The 05 Tailwind cheatsheet is a standalone reference that stays decoupled from the practice repo: no 練習檔 lines, no `studiesAdvanced/…` or `pages/…` paths, no filenames that can change when demos are renumbered.
- Concepts are explained in terms of the technology itself. Never use the course project's scenario (行程、旅遊、旅行社網站) as the rhetorical framing for a concept. Demo code may contain simple sample data; the project articles and homework may reference the project.
- When something errors or is disallowed, teach the rule first, then the consequence.
- No JS before the JS lessons (except 選讀); 06 has no DOM (console only), DOM starts in 07. Demos only use elements and concepts already taught.
- Install/setup instructions assume a freshly restored, clean student computer; add a note that students who already have the tool can skip the step. The Vite environment is set up once (in 04) and later stages start from a prepared source folder.
- JS code style: single quotes for strings (double quotes only when the string contains a single quote), template literals stay backticks, HTML attributes keep double quotes.

## Demos and practice files
- **Source of every demo is studiesAdvanced.** Open the matching file before writing or changing a demo and keep article and file in sync (create or update the file when the demo changes). Folder mapping: 02-html → `01-html-css-js/02-html/`, 03-css → `01-html-css-js/03-css/`, 06–08 JS → `01-html-css-js/04-js/`, 04-tailwind → `02-tailwind/`, React → `03-react/`, Router → `04-react-router/`, project → `05-project-prototype/`, `06-project-init/`, `07-project-final/`.
- Every demo code block has a caption with its real practice path, e.g. ```` ```html 02-html/pages/01-shell.html ````. Missing practice files get created; filenames stay unique across studiesAdvanced (except index.html).
- Demos are minimal: only what the concept needs plus what makes the file runnable. Boilerplate that is not the point (meta tags, unrelated styles) stays the same shape across demos so students stop noticing it.
- Demo filenames are `NN-js-name.html`; the number follows article order and must be unique across the repo. A second demo in the same step takes a letter suffix (`44b-js-combine.html`). Files of one demo (html + its js) share the number. After renaming or adding a demo, update `04-js/index.html` (menu) and `04-js/README.md` (page list) too; menu groups follow the article headings.
- Never put exercise-prompt comments (`// TODO: …`) in practice files or code fences.
- Multi-step demo: keep the first-step file plus the final file with `.final` appended; intermediate steps only in the article.
- Always leave a blank line after raw HTML blocks (`<details>`, etc.), otherwise the next heading is swallowed and the TOC nests wrongly.
- Concept demos the instructor copies alone (HTML/CSS/JS/React demo pages): show one complete runnable file in full; reuse of one path across sections is replaced by new files with letter suffixes. Do not use ```diff for those standalone demos.
- Project / setup walk-throughs that evolve the same file in place (12、13，以及入口檔如 `main.jsx` 暫時改引入): ```diff` with the practice path caption is appropriate and preferred so students see exactly which lines to change.
- Don't describe the practice repo in prose (no 檔案一覽, Live Server/menu instructions). Exceptions: 01-tools has one passage to fork `summer10920/studiesAdvanced` `new-tech`; 02-html opens with a short note on the menu+iframe practice site and why real sites don't do this.

## Series
- Files `lokiTech-15day-NN-name.md`, serials sequential; front-matter dates (2026-08-30, increasing times) give the category order; fix internal links when renumbering.
- Order: 01-tools, 02-html, 03-css, 04-tailwind, 05-tailwind-cheatsheet (選讀 appendix, no class time), 06-js-basics, 07-js-dom, 08-js-async, 09-react-basics, 10-react-advanced, 11-react-router, 12-project-travel (切版, about 32h), then the Firebase article as 選讀 (deployment walk-through; students use an AI agent to follow it in class if time allows, otherwise at home). Renumber when the order changes.
- React Router is taught as its own block before the project, trimmed to what the project uses (routes, layouts, dynamic routes, loader, action, fetcher, Form, redirect, errorElement, useNavigation, useSearchParams); the rest is 選讀. Teaching arc: copy `03-react` → `04-react-router`; rename hash `App.jsx` to `App-hash.jsx` (archive only), create a new router `App.jsx` (warehouse also keeps the smoke-test as `App-init.jsx`); wire layout/`Outlet` + index Home; then teach `Link`/`NavLink` and path params (`slug` + `DemoPage`) before converting `Menu` to `NavLink`; only then move search to `useSearchParams` (`?q=`). Reuse `demoRegistry`/`Menu`/`demos/`, do not extract hash App glue into the route table. Never put an API in an evolution diff before its concept section.
- 06 錯誤處理 is a whole 選讀 chapter (error types, reading messages, debugging, finally, custom errors, validation). The mainline basics of `try`/`catch`/`throw` are taught in 08 `## 錯誤處理基礎` (first section of `# Promise`), right before they are needed.
- 06 Math and Date (`# 選讀：內建物件`) are entirely 選讀; `while`/`break`/`continue` are 選讀; destructuring/spread is mainline; ES Module is 選讀 (React projects work without understanding it; point to it by link when the project first uses import/export).
- 07 (DOM) mainline: BOM `window`/`location` reading/`setTimeout`/`setInterval`, DOM selecting/operating/node manipulation, events (binding, event object, common events, delegation), forms, state-driven redraw. 選讀: module scripts, history navigation, window size/scroll/media query, navigator, clipboard, print/dialogs, rAF, capture/bubble, 打地鼠. The final React project barely touches the DOM directly, so DOM is taught as the concept React later replaces, not as a library to master.
- 08 (async) mainline: sync vs async, callbacks, Promise (create, chain, all/allSettled), async/await, JSON, fetch (GET/POST/PUT/PATCH/DELETE, loading/success/error states), basic try/catch/throw, Web Storage. 選讀: event loop, Promise.race/any, timers/image as Promise, abort/timeout, CORS, Cookie, Session/Token.
- 02 (HTML) 選讀: appearance tags, abbreviations/time/address/details, definition lists, video/audio/iframe, cell merging, progress/meter, responsive images (srcset/picture), SEO chapter, accessibility chapter. 03 (CSS) and 04 (Tailwind) keep the existing 選讀 marks (advanced selectors/@layer/fonts, margin collapse, logical properties, stacking, line-clamp, float, flip, container queries/dvh/@property in 03; Preflight, Play CDN, group/peer, nav bar, manual dark toggle, @layer/@utility in 04). Demo pages in 04 are standalone (no shared nav partial); the shared `src/style.css` holds only brand colors, spacing and font tokens; breakpoints and the container extension live in their own css files.
- Reference answers live in the practice repo root `homework/<NN-name>/` (e.g. `homework/02-html/02-homework.html`), complete versions of the starter files with identical names; the homework chapter's intro points to that folder.
- Article-level homework starters live in the practice repo: `02-html/homework/`, `03-css/homework/`, `02-tailwind/pages/homework-04.html`, `04-js/homework/` (06, 07, 08 + `data/`).
- 09/10/11 (React) mainline follows what the final project uses: components/JSX/props/state/events/lists/controlled forms, `useEffect` basics with the load-error-empty pattern, lifting state, then router data mode (loader, action, Form, redirect, errorElement, useFetcher, useNavigation, NavLink, query params). ESLint／Prettier／VS Code／jsconfig setup (with 觀念／解析) lives in 09 sandbox steps 3–5 mainline, not 選讀. 選讀: ES module syntax, useId, remote writes via effects, avoiding effects, custom hooks, Context, React Compiler vs manual memoization (useMemo/memo/useCallback), useRef, useReducer, form actions, declarative/framework router modes, location info, GitHub Pages deployment. The project enables the React Compiler, so memoization sections must stay honest about when manual memoization is still needed; versions: React 19.3, react-router 8 (`RouterProvider` from `react-router/dom`).
- The 03-react demo menu registry (`src/demoRegistry.js`) is regenerated from the article order (09 then 10) whenever demos are added or renamed; `Menu.jsx` is the sidebar UI and `App.jsx` only handles hash selection + mounting the current demo. `04-react-router` keeps the same `demos/` + `demoRegistry.js` (with `slug`), puts the route table in `App.jsx`, archives the copied hash App as `App-hash.jsx`, keeps smoke-test as `App-init.jsx`, evolves `Menu.jsx` first to `NavLink` with local search state, then to `useSearchParams` (`?q=`). The 04-js/02-html/03-css menus and READMEs are regenerated the same way.
- Course runtime is Node 26 (LTS since 2026-10-28; Node 24 is in maintenance). Node 26 no longer bundles corepack, so pnpm is installed with `npm install -g pnpm@latest` (pnpm 12 current). Practice repos use `engines.node >=26` and `.nvmrc` 26. Lecture prose states major versions only (Node 26, pnpm 12, Vite 8, Tailwind 4, React 19, React Router 8, ESLint 10, Prettier 3, MUI 9); patch/minor versions come from package.json and the lockfile. Re-check `node` release schedule and `npm view <pkg> version` for the stack before each course run.
- 04-tailwind keeps formulas minimal: concepts plus a few guided examples; 05 is a lookup appendix.
- JS 06–08 draw on the legacy lokiTech-js-baseclass-1~5 articles, dropping outdated ideas (var as default, jQuery).
- Style standard: whichever of the 15day articles is cleanest after revision; the first fully revised article (06) becomes the template for the rest.
