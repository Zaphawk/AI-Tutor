import assert from "node:assert/strict";
import test from "node:test";

import { POST } from "../app/api/survey/route.js";

function surveyRequest(body) {
  return new Request("http://localhost/api/survey", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
}

test("POST /api/survey returns 400 for null JSON without touching persistence", async () => {
  const response = await POST(surveyRequest("null"));

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "Invalid survey data. Please select valid options before continuing.",
  });
});

test("POST /api/survey returns 400 for malformed JSON", async () => {
  const response = await POST(surveyRequest("{"));

  assert.equal(response.status, 400);
});
