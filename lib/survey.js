export const COMMITMENTS = [
  "Client strategy & campaigns",
  "Team management & hiring",
  "New business / pitches",
  "Content & social media",
  "Operations & invoicing",
  "Reporting & analytics",
  "Networking & partnerships",
  "Personal brand building",
];

export const TIMES = [
  "Morning (9–12)",
  "Afternoon (12–4)",
  "Evening (4–7)",
  "Late night (9 PM onwards) 🌙",
  "Weekend works best",
];

export const FIRES = [
  "Following up with people",
  "Reporting across teams",
  "Task management chaos",
  "Content creation backlog",
  "Client onboarding",
  "Something else entirely",
];

export function normalizeCommitments(input) {
  if (!Array.isArray(input)) return [];
  const deduped = [...new Set(input.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean))];
  return deduped.slice(0, 4);
}

export function isValidSurveyPayload({ commitments, fire, time }) {
  const normalizedCommitments = normalizeCommitments(commitments);
  const normalizedFire = typeof fire === "string" ? fire.trim() : "";
  const normalizedTime = typeof time === "string" ? time.trim() : "";

  const commitmentsValid =
    normalizedCommitments.length > 0 && normalizedCommitments.every((item) => COMMITMENTS.includes(item));
  const fireValid = FIRES.includes(normalizedFire);
  const timeValid = TIMES.includes(normalizedTime);

  return {
    commitments: normalizedCommitments,
    fire: normalizedFire,
    time: normalizedTime,
    valid: commitmentsValid && fireValid && timeValid,
  };
}
