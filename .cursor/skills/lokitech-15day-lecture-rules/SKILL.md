---
name: lokitech-15day-lecture-rules
description: >-
  Before writing, restructuring, or scheduling Cursor CLI work on any
  summer10920.github.io lokiTech-15day course article (講義) or its
  studiesAdvanced practice files; holds Loki's agreed writing, structure, and
  process rules.
---
# lokiTech 15-day 講義 rules

Repos (Loki's Mac): blog `/Users/loki/github/summer10920.github.io` branch `new-2026` (only `master` deploys); practice repo `/Users/loki/github/studiesAdvanced` branch `new-tech` (students fork it on day 1, open the repo root in VS Code).

## Process
1. Discuss improvement points with Loki first; read the actual article before proposing (never guess its content).
2. Start or schedule work only after an explicit go (ok / 開始 / do it / 排工作). Agreeing on a detail is not a go.
3. Run work via Cursor CLI on the Mac: `cursor-agent -p --trust --force --model grok-4.7-medium`, prompt in a file, nohup wrapper script with DONE log; never start dev/preview servers; keep the Mac awake (caffeinate) and use a progress-check routine.
4. Commit locally after build passes (`pnpm run build`, plus `pnpm build` in Vite projects); push only when Loki says.
5. Report results proactively and briefly (Loki reads on his phone).

## Article structure
- Not flat: group chapters by real topic categories, ordered from basic to advanced; heading depth may go to `#####`.
- Do not keep it flat: a short, thin section (a few paragraphs, one command) never gets its own `##`. Group related short steps under one shared `##` parent and push them down to `###`/`####`/`#####`. Before finishing, list the headings and check that each `##` holds substantial, multi-part content (example: 04 setup is `## 安裝 Node 工具鏈` holding Node/nvs/pnpm, and `## 用 Vite 建立 Tailwind 專案` holding Vite/sandbox/02-tailwind).
- Every `#` chapter holds at least two substantial non-選讀 `##` sections, and no heading has a single child; a thin `##` (one short demo, a few paragraphs) is demoted to `###` under a broader `##`. This applies to the first chapter too (e.g. 06 `# 認識 JavaScript` = `## JavaScript 是什麼` + `## 撰寫與執行 JavaScript`, each with `###`). Headings carry no parenthetical notes.
- Never skip a heading level (a `#` directly followed by `###` breaks the Hexo TOC layout).
- Headings use clear technical terms (「認識 JavaScript」「變數與常數」「迴圈」「認識區塊盒」), never colloquial or metaphor-style titles (「用名字記住一個值」).
- The first chapter of each new technology explains what it is, its role and where it runs before any syntax (e.g. 06 opens with what JavaScript is, not console.log; 02 opens with the HTML document skeleton).
- Readable layout: no tables (cramped; sole exception: the 05 Tailwind cheatsheet 公式表 keeps its tables for quick lookup), and avoid packing several inline `code` spans into one paragraph. Explain commands, files and class names with a demo code block plus comments instead, and keep prose plain.
- Sequential short steps of one task (e.g. install package, edit config, import CSS) stay under one parent section as small sub-headings titled 「步驟 N：…」 (one level below the parent), not as independently named chapters.
- Each knowledge point follows four beats: (1) 觀念 in plain words with minimal syntax; (2) a complete, runnable demo file from studiesAdvanced (shown in full, kept in sync); (3) 解析: walk the demo against what appears on screen, naming which classes/concepts produce each effect, written as a bullet list (one point per bullet in full sentences, continuation lines indented), never a paragraph of several short sentences; (4) 換你試試: a concrete modify/extend task on that same demo, answer in `<details>` — for the answer code format (full file vs ` ```diff path ` + `// ...`), follow [lokitech-lecture-diff](sand-workflow:lokitech-lecture-diff). Comment-only snippets are not demos.
- Demos use only elements and concepts already taught at that point. No JS before the JS lessons (except 選讀); 06 has no DOM (console only), DOM starts in 07.
- Every chapter (each heading level that opens a section) starts with a short 前言 paragraph explaining what it covers and why.
- Optional content uses headings exactly `選讀：標題`, placed under the related topic.
- Explain concepts directly in terms of the technology itself (what it is, when to use it, its rules, what happens). Never use the course project's scenario (行程、旅遊、旅行社網站) as the rhetorical framing for a concept, e.g. not 「行程要分成輕裝、標準、深度時…」. We teach the tech, not how to build a travel site. Demo code may still contain simple sample data; homework/project sections may reference the project. Applies to every article (02 onward).
- When something errors or is disallowed, teach the underlying rule first (e.g. naming: no leading digit, no reserved words), then the consequence.
- Legacy/outdated features (e.g. `var`) get no 選讀 section; cover them in a brief `{% note info %}` at the end of the related topic.
- Core topics stay mainline, not 選讀 (e.g. `switch`, including a deliberate fall-through example grouping several cases).
- Prose shape (前言, 觀念, everywhere): a real explanation is one connected paragraph; several parallel short statements become a bullet list. Never a paragraph made of disconnected short sentences.
- Method overviews: whenever a section introduces two or more related methods, properties or events, open it (right after the 前言) with an 「一覽」 — grouped bullets by purpose or direction, one sentence each on what it does, what it returns and how it differs from its siblings — plus a mermaid diagram when there is a position, direction or flow relationship (e.g. node relations, insertion positions, event propagation). Then the 觀念 and demos follow.
- Keep simple topics concise (e.g. 型別轉換): give a one-line purpose per item, let the demo and its Console output carry the rest, and merge closely related small units into one section.
- Diagrams use the NexT tag syntax `{% mermaid graph LR %}` … `{% endmermaid %}`, never a ```mermaid fenced block.
- Short supporting explanations go in a `{% note info %}` card next to the paragraph, not a separate heading.
- Closing `# 本篇重點回顧` is 5–8 one-sentence bullets.
- After the recap, every article ends with `# 專有名詞中英對照`: all technical terms that appear in the article, as Taiwanese term plus English keyword so students can search correctly. No table: group under `##` headings that mirror the article's `#` chapters (no single-child; merge thin groups), each a bullet list `- 中文術語（English term）`, ordered as they first appear; property, method, and keyword names that are already English (e.g. `display`) are listed only when the Chinese term differs.
- Style standard: 04-tailwind, plus the rewritten 02-html / 03-css / 06-js articles; deep content may be 選讀.
- Install/setup instructions assume a freshly restored, clean student computer; add a note that students who already have the tool can skip the step.

## Demos and practice files
- **Source of every demo is the separate practice repo studiesAdvanced** (`/Users/loki/github/studiesAdvanced`, branch `new-tech`, GitHub `summer10920/studiesAdvanced`), not the blog repo. Before writing or changing a demo, open the matching file in studiesAdvanced and keep the article and the file in sync (create or update the file there when the demo changes). Folder mapping: 02-html → `01-html-css-js/02-html/`, 03-css → `01-html-css-js/03-css/`, 06–08 JS → `01-html-css-js/04-js/`, 04-tailwind → `02-tailwind/`, React → `03-react/`, project → `04-project/`. Captions are paths relative to the repo's site folder (e.g. `02-html/pages/01-shell.html`, `02-tailwind/pages/04-button.html`).
- JS code style: string literals use single quotes ('text'); keep double quotes only when the string contains a single quote; template literals stay backticks; HTML attributes keep double quotes. Applies to articles and practice files.
- Every demo code block has a caption with its real practice path, e.g. ```` ```html 02-html/pages/01-shell.html ````. Missing practice files get created; filenames stay unique across studiesAdvanced (except index.html).
- Never put `// TODO: …換你試試…` (or equivalent exercise-prompt comments) in practice files or lecture code fences. 「換你試試」 belongs only in the article as a `{% note success %}` plus `<details>` answer. Demo comments may explain processing order or concepts, not restated exercises.
- Single-step demo: practice file is the runnable starter shown in the article (kept in sync); finished variants for the exercise live in the article answer, not as a TODO comment in the file.
- Multi-step demo: keep the first-step file plus the final file with `.final` appended (e.g. `index.html.final`); intermediate steps only in the article.
- Always leave a blank line after `</details>` (and around raw HTML blocks); otherwise the next Markdown heading is swallowed into the HTML block and the TOC nests it under the previous section.
- Exercises: 「換你試試」 after examples, answers in a collapsible `<details><summary>參考答案</summary>` block. Answer code format (when to use full file vs ` ```diff <practice-path> ` with plain `// ...` for unchanged ranges) is defined in [lokitech-lecture-diff](sand-workflow:lokitech-lecture-diff) — load that skill before writing or converting answers.
- Don't describe the practice repo in prose (no 檔案一覽, 練習檔 notes, Live Server/menu instructions). Exceptions: 01-tools has one passage to fork summer10920/studiesAdvanced `new-tech`; 02-html opens with a short note that the course starts from the practice repo and the menu+iframe practice site is temporary, plus an info card on why real sites don't do this.

## Series
- Files `lokiTech-15day-NN-name.md`, serials sequential; front-matter dates (2026-08-30, increasing times) give the category order; fix internal links when renumbering.
- Order: 00-plan, 01-tools, 02-html, 03-css, 04-tailwind, 05-tailwind-cheatsheet, 06-js-basics, 07-js-dom, 08-js-async, 09-react-basics, 10-react-advanced, 11-project-travel.
- 04-tailwind keeps formulas minimal: concepts + a few guided examples, students look up 05 cheatsheet. Node environment (nvs, Node 24, pnpm via corepack, Vite, manual Vite+Tailwind project, then switch to 02-tailwind) is first taught in 04, not 01.
- JS 06–08 draw on the legacy lokiTech-js-baseclass-1~5 articles (06 ← 1–2, 07 ← 3 with 打地鼠 as 選讀, 08 ← 5), dropping outdated ideas (var as default, jQuery).
