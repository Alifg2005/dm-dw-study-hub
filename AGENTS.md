# AGENTS.md: Permanent Project Instructions

Every AI agent and contributor must read this file in full before modifying the project. It is the source of truth for all development and chapter generation.

**Critical rule:** never introduce a new architecture, design language, data structure, or naming convention when adding chapters. Reuse the standards below exactly.

## 1. Project identity

- **Owner:** ALi Feras Alghanim (keep this exact capitalization in the UI).
- **Course:** Data Mining & Data Warehouse.
- **Purpose:** a personal academic study platform for reviewing chapters, practicing written questions, and self-testing with MCQs.
- **Hard limits:** no authentication, backend, database, payments, runtime AI calls, or API keys. The site is a static frontend.

## 2. Technology stack

React 19, TypeScript (strict), Vite, Tailwind CSS v4 (Vite plugin), React Router, Lucide icons, self-hosted fonts through `@fontsource-variable`. Motion uses CSS only. Do not add a dependency unless the existing stack genuinely cannot do the job.

## 3. Folder architecture

```
private-materials/        Original lecture files. Git-ignored. Never deployed.
scripts/validate-chapters.ts   CLI for chapter validation and source-protection checks
src/
  types/chapter.ts        The chapter schema. The single content contract.
  data/
    registry.ts           Automatic discovery using import.meta.glob
    validation.ts         Pure validation rules shared by the CLI and the registry
    chapters/chapter-NN.ts One independent file per chapter. Data only.
  lib/                    Pure logic and hooks (quiz, theme, document title)
  components/
    layout/               Site shell, header, footer, theme toggle
    content/              Rich text and review content blocks
    home/ chapter/ quiz/ practice/   Feature components
  pages/                  Route-level templates shared by all chapters
```

Routes: `/`, `/chapters/:slug`, `/chapters/:slug/quiz`, `/chapters/:slug/practice`, and a not-found page.

## 4. Coding conventions

- Strict TypeScript. No `any`, no unused code, no placeholder content, no fake buttons.
- Components are small, focused, named exports in PascalCase files. Hooks and helpers live in `src/lib`.
- Educational data never lives in components. Presentation logic never lives in chapter files.
- **Never create a page or component for a specific chapter.** Never branch UI on a chapter number.
- Use semantic HTML, native controls (`button`, `input`, `select`, `dialog`), visible focus states, and keyboard-operable interactions.

## 5. Component architecture

- `pages/` load a chapter through `getChapter(slug)` and show `NotFoundPage` for unknown slugs.
- `components/content/ContentBlocks.tsx` renders every review block type. Add a new block type only if no existing type can express the content, and if you do, update the schema, the renderer, the validator, and this file together.
- `components/quiz/` holds the quiz flow. Scoring is the pure `scoreQuiz` in `lib/quiz.ts`.
- `components/practice/WrittenCard.tsx` dispatches on the written question `format`.

## 6. UI/UX design system

- **Character:** analytical and editorial. Asymmetric layouts, strong type hierarchy, generous space, content first.
- **Type:** Bricolage Grotesque Variable for display (`font-display`), Geist Variable for body, Geist Mono Variable for numerals and data labels (`font-mono`).
- **Color:** cool neutrals with one accent, cobalt. All colors are semantic tokens in `src/index.css`. Never use a raw Tailwind palette color in a component. `success` and `danger` are only for right/wrong states.
- **Shape:** cards use `rounded-2xl` (16px), controls use `rounded-xl` (12px), small tags use `rounded-md`. Shadows are rare and tinted.
- **Motion:** only `transform` and `opacity`, short durations, to communicate state or sequence. Everything collapses under `prefers-reduced-motion`.
- **Copy:** plain functional English. No em dashes or en dashes in visible text, anywhere. No filler marketing verbs.
- **Icons:** Lucide only, `strokeWidth` 1.75.

## 7. Theme implementation

`src/index.css` defines tokens on `:root` and overrides them on `html.dark`. An inline script in `index.html` applies the theme before first paint: stored preference (`localStorage` key `theme`), otherwise the OS preference. `lib/theme.ts` handles toggling and persistence. New UI must use tokens so both themes work without `dark:` variants.

## 8. Chapter content schema

`src/types/chapter.ts` is authoritative. A chapter file has this shape and default-exports a `Chapter`:

```ts
import type { Chapter } from '../../types/chapter'

const chapter: Chapter = {
  meta, overview, objectives, keyConcepts, definitions,
  sections, comparisons, examples, takeaways, examNotes,
  mcqs, written,
}
export default chapter
```

- `meta.slug` must equal the file name without the extension (`chapter-07`), and `meta.number` must match it.
- `meta.examScope` is `'midterm'` or `'final'`. It groups chapters on the home page.
- Rich text supports `**term**`, `` `code` ``, `_{sub}`, and `^{sup}`. Nothing else.
- Omit a section by leaving its array empty. Never pad a chapter to fill the template.

## 9. Educational content standards

1. Supplied course material is the primary and authoritative source. Read every slide or page, **including content only present in images** (formulas, tables, diagrams). Render those pages if text extraction misses them.
2. Never invent facts, definitions, formulas, or numbers. Verify every worked calculation.
3. Label content that goes beyond the source with a callout of tone `supplement`. Report source errors or inconsistencies with tone `source-note`, and do not silently change them.
4. Do not copy slides. Write original explanations in clear academic English, keep technical terms in English, and keep paragraphs short.
5. Cover all examinable topics. Topics a source marks as self-study still appear, labeled as such.
6. If a file cannot be read or appears corrupted, report it. Never pretend it was processed.

## 10. MCQ requirements

- **Exactly 20** per chapter, with **exactly 4** distinct options and one `correctIndex`.
- The UI shuffles options per attempt and scores by original option index, so order never affects scoring. Consequently never write "all of the above", "none of the above", or "both A and B".
- Each question sets `difficulty` (`easy`, `medium`, `hard`; include at least 3 of each) and `skill` (`definition`, `concept`, `application`, `comparison`, `scenario`, `analysis`, `technical`; use at least 4 kinds, and at most 6 `definition` questions).
- Cover the chapter's topics evenly. No duplicates or near-duplicates. Every explanation states why the correct answer is right.

## 11. Written question formats

Use only those that fit the chapter. Minimum 12 questions and 4 formats.

| `format` | Purpose | Extra fields |
| --- | --- | --- |
| `short` | Concise explanation | |
| `definition` | Term to definition, or the reverse | |
| `matching` | Interactive matching, at least 3 pairs | `pairs` |
| `compare` | Compare and contrast | `answerTable` recommended |
| `fill-blank` | Interactive, `___` marks each blank | `sentence`, `blanks` |
| `list` | Features, steps, advantages | |
| `explain` | Explain and discuss | |
| `scenario` | Apply concepts to a situation | |

Every question has `shortAnswer` (concise, memorizable) and `detailedAnswer` (paragraphs). Short answers appear by default, except on interactive exercises and in self-test mode, where they are revealed on request.

## 12. Chapter registration and discovery

`src/data/registry.ts` discovers `src/data/chapters/chapter-*.ts` with `import.meta.glob`. There is no manual list. A new valid file automatically appears on the home page, the header menu, and all routes. A chapter that fails validation is excluded at runtime with a console error and fails `npm run build`.

## 13. Validation

- `npm run validate` checks every chapter against the rules above, then checks that no source file is tracked by Git or placed in `public/`.
- `npm run build` runs validation, type checking, and the Vite build. `npm run check` runs validation and type checking only.

## 14. Copyright and source protection

- Original lecture files stay in `private-materials/`, which is git-ignored along with `*.pdf`, `*.ppt`, and `*.pptx`.
- Never commit them, copy them to `public/` or `src/`, expose them through a URL, or bundle them. Extract text to a temporary directory outside the repository.
- Never reproduce whole slides or lecture images in the app.
- If a source file is ever tracked, run `git rm --cached <file>`. Never delete the local copy.

## 15. Vercel deployment

Static build with `npm run build`, output `dist`. `vercel.json` rewrites all routes to `index.html` for client-side routing. No environment variables or server infrastructure.

## 16. Adding a future chapter

**The one instruction the owner will give:**

> Read AGENTS.md and process the new chapter file in private-materials/ following section 16.

**The agent must then do exactly this:**

1. Read this file.
2. Identify the new file by comparing `private-materials/` with existing chapter data. Determine the chapter number from the file's **contents**, not its name or position.
3. Read and analyze the complete source, including image-only content.
4. Extract the concepts, definitions, formulas, comparisons, and examples. Recalculate every worked example.
5. Generate the structured review.
6. Generate exactly 20 MCQs (section 10).
7. Generate written practice in suitable formats (section 11).
8. Provide short and detailed model answers for each.
9. Create `src/data/chapters/chapter-NN.ts` using the existing schema. Read an existing chapter first and match its depth and voice.
10. Confirm discovery: the chapter appears on the home page with no other code change.
11. Run `npm run validate`.
12. Run `npm run build`.
13. Confirm with `git status` that existing chapters and components are unchanged.
14. Confirm with `git ls-files` that no private source material is tracked.

**During routine chapter additions, the agent must not** redesign the site, modify unrelated components, restructure the project, or change the schema.
