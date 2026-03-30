# JavaMaster — Java Programming Tutor

A React + Vite educational app for learning Java programming with a built-in syllabus, question bank answers, and a local (offline-friendly) study experience.

## Features

- **5-Unit Syllabus** covering Java fundamentals through JDBC
- **Chat Tutor UI** — Ask questions and get guided help (local/offline-friendly; no cloud AI keys required)
- **Progress Tracking** — Mark topics complete and track your learning journey
- **Syntax-Highlighted Code** — Beautiful code blocks with copy-to-clipboard
- **Responsive Design** — Works on desktop, tablet, and mobile

## Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org/)

## Installation

```bash
npm install
```

## Configuration

No external AI keys are required. The tutor runs locally in the browser.

## Running the App

From the project root:

```bash
npm run dev
```

This starts the Vite dev server on http://localhost:5173. The backend route is now a simple stub (no Google/Gemini or other cloud AI calls).

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow that builds the app and publishes `dist/` to GitHub Pages.

1. Push to the `main` branch (already wired).
2. In your GitHub repo settings: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. After the workflow finishes, your site will be available at:

	https://baalaganeshr.github.io/Java-master/

### PWA (Installable) notes

- GitHub Pages is HTTPS, so service workers work.
- The service worker is registered only in production builds (not in `npm run dev`).
- Offline support is “after first visit” (assets are cached as they are fetched).

## Usage

1. Open http://localhost:5173 in your browser
2. Browse the **Course Overview** dashboard to see all 5 units
3. Click a unit card or expand units in the **sidebar** to pick a topic
4. Use **Quick Questions** or type your own Java question in the chat
5. Click **Mark Complete** to track your progress
6. Your progress is saved automatically in your browser

## Tech Stack

| Layer    | Technology                    |
|----------|-------------------------------|
| Frontend | React 18 + Vite + CSS Modules |
| Hosting  | GitHub Pages (static)          |
| Storage  | localStorage (client-side)     |
