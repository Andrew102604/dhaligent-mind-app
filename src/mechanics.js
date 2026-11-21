// Official client-provided scoring and progression mechanics.
// Lesson activities remain empty until the client supplies their content.
export const PHASES = ['Game', 'Story', 'Discussion', 'Simulation', 'Quiz'];
export const POINTS_BY_PHASE = [10, 10, 5, 10, 15];
export const TOTAL_POINTS = 50;
export const PASSING_PERCENT = 90;
export const PASSING_POINTS = 45;
export const MISTAKE_DEDUCTION = 0.5;
export const HEART_COUNT = 5;
export const RETRY_WAIT_SECONDS = 60;

export function starsFor(percent) {
  if (percent >= 99) return 5;
  if (percent >= 97) return 4;
  if (percent >= 95) return 3;
  if (percent >= 93) return 2;
  if (percent >= 90) return 1;
  return 0;
}

export function scoreActivity(phaseIndex, mistakes = 0, rawScore = 0) {
  const base = POINTS_BY_PHASE[phaseIndex] || 0;
  const earned = phaseIndex === 4
    ? (Number(rawScore) || 0)
    : base - MISTAKE_DEDUCTION * Math.max(0, Number(mistakes) || 0);
  return Math.max(0, Math.min(base, earned));
}

export function scoreLesson(scores) {
  const total = scores.reduce((sum, score) => sum + (Number(score) || 0), 0);
  const percent = Math.round(total / TOTAL_POINTS * 10000) / 100;
  const passed = total >= PASSING_POINTS;
  return { total, percent, passed, stars: passed ? starsFor(percent) : 0 };
}
