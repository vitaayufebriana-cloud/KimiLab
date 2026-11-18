/**
 * attemptContract.js – Contract utilities for quiz attempts.
 * Provides helper functions to compute a stable payload and to compare attempts.
 */

/**
 * List of fields that constitute the attempt payload.
 */
export function fields() {
  return [
    'moduleId',
    'stage',
    'answers', // object mapping questionId -> selected option
    'startedAt',
    'endedAt',
    'score',
    'version',
  ];
}

/**
 * Return a stable JSON string payload from an attempt object.
 */
export function payloadOf(attempt) {
  const f = fields();
  const payload = {};
  f.forEach((key) => {
    if (key in attempt) payload[key] = attempt[key];
  });
  return JSON.stringify(payload);
}

/**
 * Determine whether two attempts refer to the same logical attempt.
 */
export function sameAttempt(a, b) {
  if (!a || !b) return false;
  return (
    a.moduleId === b.moduleId &&
    a.stage === b.stage &&
    a.startedAt === b.startedAt &&
    a.version === b.version
  );
}
