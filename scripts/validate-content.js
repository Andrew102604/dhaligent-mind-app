import CLIENT from '../src/client_lessons.js';
import { PHASES, POINTS_BY_PHASE, TOTAL_POINTS, PASSING_POINTS, starsFor } from '../src/mechanics.js';
import assert from 'node:assert/strict';

assert.equal(CLIENT.length, 10, 'There must be exactly 10 lesson shells.');
assert.deepEqual(CLIENT.map(x => x.title), [
  'Plant Organs and Their Functions',
  'Structure and Function of Roots',
  'Water Absorption and Osmosis in Roots',
  'Structure and Function of Stem',
  'Xylem',
  'Phloem',
  'Structure and Functions of Leaves',
  'Transpiration and the Movement of Water',
  'Integration of Roots, Stem, and Leaves in Plant Transport',
  'Factors Affecting Plant Transport'
]);
assert.deepEqual(PHASES, ['Game', 'Story', 'Discussion', 'Simulation', 'Quiz']);
assert.deepEqual(POINTS_BY_PHASE, [10, 10, 5, 10, 15]);
assert.equal(POINTS_BY_PHASE.reduce((a,b)=>a+b,0), TOTAL_POINTS);
assert.equal(TOTAL_POINTS, 50);
assert.equal(PASSING_POINTS, 45);
assert.deepEqual([90,93,95,97,99].map(starsFor), [1,2,3,4,5]);
for (const lesson of CLIENT) {
  for (const key of ['game','story','storyEnglish','simulation','discussion']) {
    assert.deepEqual(lesson[key], [], `${lesson.title}: ${key} should remain empty until supplied.`);
  }
  assert.equal(lesson.quiz.length, 15, `${lesson.title}: quiz must contain 15 questions.`);
  for (const [index, question] of lesson.quiz.entries()) {
    assert.ok(question.q.trim(), `${lesson.title}: question ${index+1} must have text.`);
    assert.equal(question.choices.length, 4, `${lesson.title}: question ${index+1} must have four choices.`);
    assert.ok(question.choices.every(choice => choice.trim()), `${lesson.title}: question ${index+1} has an empty choice.`);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4,
      `${lesson.title}: question ${index+1} has an invalid answer key.`);
  }
}
console.log('Validation passed: 10 lessons, 150 quiz questions, four choices and valid answer keys, 5 activities, 50-point mechanics, 90% passing, and star thresholds.');
