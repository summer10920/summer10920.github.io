---
name: lokitech-lecture-diff
description: >-
  Use when writing or converting lokiTech 15-day 講義 reference answers (換你試試 /
  只改…) that only change a few lines: choose ```diff vs full file, and apply the
  path + // ... format.
---
# lokiTech 講義參考答案 Diff 規劃

For 換你試試 / 只改… answers (and any 「改完會長這樣」block that repeats a practice file). Demos that introduce a file for the first time stay full files.

## Choose format

Use ` ```diff <practice-path> ` when **all** of these hold:

1. The same practice path already appeared earlier in the article (or in a prior step of the same exercise) as a full file or prior answer.
2. Only a small part changes (a few lines, one prop, one value, one short block).
3. A diff with `// ...` is clearly shorter / easier to review than pasting the whole file again.

Keep a **full** fenced file (normal language fence + path caption) when any of these hold:

- First time this practice file appears in the article (intro / 示範).
- The change is large (new whole function/component, rewrite most of the file, structural HTML wrap that touches most of the tree).
- A short whole file where new rules already dominate (diff would not be shorter).
- Pathless short fragments (Console output, one-liner snippets, inline examples with no practice path) — leave as-is.
- Diff would be about as long as the full file (no win).

When an exercise only changes a JS/CSS file but the answer previously re-pasted an unchanged HTML twin, drop the duplicate HTML and diff only the file that actually changed.

## Diff fence format

````markdown
```diff 03-react/src/App.jsx
 // ...
-  const [page, setPage] = useState('01')
+  const [page, setPage] = useState('03')
 // ...
```
````

Rules:

- Info string is `diff` plus a single space plus the **practice-relative path** (same caption style as demos: e.g. `02-html/pages/01-shell.html`, `03-react/src/App.jsx`). Never omit the path on a diff fence.
- Unchanged ranges: one plain `// ...` line only. No prose ellipsis comments (`// 其餘不變`, `// rest of file`, `/* … */` narrating what stays).
- Show only the hunk(s) that matter: context lines optional; use `-` / `+` for real code changes.
- Multiple nearby edits in one file → one fence with several `// ...` separators, not several fences for the same path unless the steps are separate 換你試試.
- Language-agnostic: HTML / CSS / JS / JSX all use the `diff` fence; do not use `diff html` etc.
- Lecture/teaching comments added or removed for explanation are **not** marked as `-` / `+` code edits; only student-visible source changes are.

## Where it lives in the article

- Still wrap answers in `<details><summary>參考答案</summary>…</details>`.
- Leave a blank line after `</details>`.
- Keep a short prose why under or above the fence when the old answer had an explanation.

## Audit / convert pass (when asked to 盤查重構)

1. Scan each target article for `<details>` answers and repeated full-file dumps of the same path.
2. Skip articles with no such dumps (e.g. pure tools chapters) and skip formula-table articles unless asked.
3. Convert only dumps that meet the Choose-format rules; count conversions and list keep-full reasons per article.
4. Do not invent new exercises; do not change practice files in studiesAdvanced unless the answer and file were already out of sync and the user asked to fix that.
5. Run `pnpm run build` on the blog repo; report counts; commit/push only when Loki says.

## Anti-patterns

- Full-file paste after a one-line change.
- ` ```diff ` without a practice path.
- Descriptive ellipsis comments instead of `// ...`.
- Converting the first intro of a file into a diff.
- Marking 講義註解 add/remove as code `-` / `+`.
