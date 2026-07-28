import assert from "node:assert/strict";
import test from "node:test";

import {
  COMMITMENTS,
  FIRES,
  TIMES,
  isValidSurveyPayload,
  normalizeCommitments,
} from "../lib/survey.js";

test("survey validation rejects null and other non-object payloads", () => {
  for (const payload of [null, undefined, "survey", 42, true, []]) {
    assert.deepEqual(isValidSurveyPayload(payload), {
      commitments: [],
      fire: "",
      time: "",
      valid: false,
    });
  }
});

test("survey validation accepts only allow-listed normalized answers", () => {
  const payload = isValidSurveyPayload({
    commitments: [` ${COMMITMENTS[0]} `, COMMITMENTS[0], COMMITMENTS[1]],
    fire: ` ${FIRES[0]} `,
    time: ` ${TIMES[0]} `,
  });

  assert.deepEqual(payload, {
    commitments: [COMMITMENTS[0], COMMITMENTS[1]],
    fire: FIRES[0],
    time: TIMES[0],
    valid: true,
  });
});

test("commitment normalization removes invalid values and caps selections at four", () => {
  assert.deepEqual(
    normalizeCommitments([COMMITMENTS[0], {}, null, ...COMMITMENTS.slice(1, 6)]),
    COMMITMENTS.slice(0, 4),
  );
});
