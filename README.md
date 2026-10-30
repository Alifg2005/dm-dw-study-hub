# Data Mining & Data Warehouse Study Hub

A personal academic study platform by **Ali Feras Alghanim**. It provides structured chapter reviews, 20-question quizzes, and written exam practice for the Data Mining & Data Warehouse course.

There are no accounts, backend, database, or API keys. All content is static data generated during development, so the deployed site runs on its own.

## Features

- Chapter reviews with definitions, comparisons, formulas, and worked examples
- Quizzes with free navigation, a submission check, local scoring, and a full answer review
- Written practice in up to eight formats, including interactive matching and fill-in-the-blank exercises
- Short and detailed model answers, plus a self-test mode
- Light and dark themes, and layouts for phones, tablets, and desktops
- Automatic chapter discovery

## Technology

React, TypeScript, Vite, Tailwind CSS, React Router, and Lucide icons. Fonts are self-hosted.

## Getting started

Requires Node.js 22.12 or later.

```bash
npm install       # install dependencies
npm run dev       # start the development server
npm run validate  # check chapter data and source-file protection
npm run build     # validate, type check, and build into dist/
npm run preview   # serve the production build locally
```

## Project structure

```
AGENTS.md                 Permanent rules for all future development
private-materials/        Your lecture files (git-ignored, never deployed)
scripts/                  Validation command
src/types/chapter.ts      The chapter content schema
src/data/chapters/        One data file per chapter
src/data/registry.ts      Automatic chapter discovery
src/components/, pages/   Shared templates used by every chapter
```

## Adding a chapter

1. Put the PDF or PowerPoint file in `private-materials/`.
2. Give your AI coding agent this instruction:

   > Read AGENTS.md and process the new chapter file in private-materials/ following section 16.

The agent reads the source, creates `src/data/chapters/chapter-NN.ts`, and runs the checks. The chapter then appears on the site with no UI changes. To add one by hand, follow the schema in `src/types/chapter.ts` and run `npm run validate`.

## Protecting private course materials

Lecture slides and PDFs may be copyrighted, so they must stay on your machine:

- Store them only in `private-materials/`. Git ignores this folder, along with `*.pdf`, `*.ppt`, and `*.pptx` everywhere in the repository.
- Never move them into `public/` or `src/`, because files there can be deployed.
- `.vercelignore` keeps them out of Vercel CLI uploads as well.
- `npm run validate` fails if a source file is tracked by Git or found in `public/` or `src/`. It runs on every build.
- If a file was tracked by mistake, run `git rm --cached "<file>"`. This keeps your local copy.

The site contains original study notes and questions written from the concepts in the course, not reproductions of the slides.

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New Project** and import the repository.
3. Keep the detected settings. `vercel.json` already sets the build command, the `dist` output, and the routing fallback.
4. Deploy. No environment variables are needed.

The Vercel CLI also works: run `vercel` from the project folder.
