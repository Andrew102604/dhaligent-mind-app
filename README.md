# DhaLiGent Mind²⁰²⁶

**Think, Understand, Achieve** — a responsive, installable learning web app for Grade 8 plant transport lessons.

## Included client requirements

- Eight lessons based on `CHUNKED LESSON 1-8.docx`.
- Six required activities in sequence: Game (10), Story (5), Simulation (10), Discussion (5), Real-Life Example (5), Quiz (15).
- 50 total points per lesson; at least 45/50 (90%) is required to pass and unlock the next lesson.
- Five-heart game mechanic with a 60-second retry wait after all hearts are lost.
- Read-aloud for story, discussion slides, and real-life examples. Word feedback marks missed words red and repeated words yellow; each recognized reading mistake deducts 0.5 points from that activity.
- Star awards: 90–92% = 1, 93–94% = 2, 95–96% = 3, 97–98% = 4, and 99–100% = 5. Passing shows `EXCELLENT`; a score below 90% shows `YOU WILL MAKE IT` and requires a restart.
- Student profile/progress dashboard and teacher dashboard with student records and personalized quizzes.
- Existing React 18 + Vite + Express architecture and PWA install support are retained.

## Requirements

- Node.js 20 or newer (Node 22 recommended).
- npm.
- A Turso/libSQL database for production. The app uses `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`; a local `file:data.db` fallback is configured for local use where the platform's libSQL native driver is installed.

## Install and run locally

```bash
npm install
npm test
npm run dev
```

The development script starts the Express API on port 3000 and Vite on its development port. Vite proxies `/api` requests to Express.

To create the production frontend and run the server:

```bash
npm run build
npm start
```

The Express server serves the generated `dist` folder. Configure the deployment platform to run the build step before starting the server.

## Production environment variables

Set these in the deployment provider's environment settings; the server does not load `.env` files automatically.

- `TURSO_DATABASE_URL` — production Turso/libSQL URL.
- `TURSO_AUTH_TOKEN` — database authentication token.
- `JWT_SECRET` — long, unique secret used to sign login tokens (required in production).
- `ADMIN_USERNAME` — initial teacher/admin username.
- `ADMIN_PASSWORD` — initial teacher/admin password; use a strong secret.
- `ADMIN_NAME` — optional display name for the teacher/admin account.
- `ALLOW_SIGNUP` — set to `false` to disable public sign-up; otherwise sign-up is enabled.
- `PORT` — optional server port; the host normally supplies this.

Do not commit production credentials or database tokens to Git.

## Read-aloud requirements

The read-aloud activity uses the browser Web Speech Recognition API. Use a supported browser (Chrome or Edge recommended), allow microphone access, and serve the production app over HTTPS (localhost is also considered a secure context). If recognition is unavailable or microphone access fails, the activity asks the learner to retry instead of silently granting the reading points.

## Validation

Run `npm test` to validate lesson count/content, all 150 quiz questions, activity point values, passing threshold, star ranges, and key progression/dashboard source checks. The project must also pass `npm run build` before deployment.

## Client-approved 10-lesson structure

The current client setup contains ten lessons. The Quiz activity is populated with 15 multiple-choice questions per lesson (150 questions total), transcribed from the supplied QUIZ 1-10.docx and keyed using its answer keys. Game, Story, Discussion, and Simulation content remain empty pending their approved materials. The activity flow follows the app feature order: Game (10 pts), Story (10 pts), Discussion (5 pts), Simulation (10 pts), and Quiz (15 pts). Each lesson is worth 50 points; 45 points (90%) are required to pass. Star badges are awarded at 90–92% (1), 93–94% (2), 95–96% (3), 97–98% (4), and 99–100% (5).
