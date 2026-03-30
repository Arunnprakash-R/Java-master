# JavaMaster — AI-Powered Java Programming Tutor

A full-stack educational platform for learning Java programming, powered by Claude AI.

## Features

- **5-Unit Syllabus** covering Java fundamentals through JDBC
- **AI Chat Tutor** — Ask any Java question and get expert explanations with code examples
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

## Usage

1. Open http://localhost:5173 in your browser
2. Browse the **Course Overview** dashboard to see all 5 units
3. Click a unit card or expand units in the **sidebar** to pick a topic
4. Use **Quick Questions** or type your own Java question in the chat
5. Click **Mark Complete** to track your progress
6. Your progress is saved automatically in your browser

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18 + Vite + CSS Modules     |
| Backend  | Node.js + Express                 |
| AI       | Anthropic Claude (claude-sonnet-4-20250514) |
| Storage  | localStorage (client-side)        |
