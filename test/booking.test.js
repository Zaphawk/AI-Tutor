import assert from "node:assert/strict";
import test from "node:test";

import { buildBookingHref } from "../lib/booking.js";

const answers = {
  commitments: ["Client strategy & campaigns", "Reporting & analytics"],
  fire: "Reporting across teams",
  time: "Morning (9–12)",
  leadId: "lead_123",
};

test("booking handoff fails closed without a configured URL", () => {
  assert.equal(buildBookingHref({ ...answers }), null);
  assert.equal(buildBookingHref({ ...answers, bookingUrl: "" }), null);
  assert.equal(buildBookingHref({ ...answers, bookingUrl: "not a URL" }), null);
  assert.equal(buildBookingHref({ ...answers, bookingUrl: "http://cal.com/sid/intro" }), null);
  assert.equal(buildBookingHref({ ...answers, bookingUrl: "https://cal.com" }), null);
  assert.equal(buildBookingHref({ ...answers, bookingUrl: "https://cal.com/your-handle/intro-call" }), null);
});

test("booking handoff preserves a real configured target and appends survey context", () => {
  const href = buildBookingHref({
    ...answers,
    bookingUrl: "https://cal.com/example-team/intro-call?source=ai-tutor",
  });
  const booking = new URL(href);

  assert.equal(booking.origin + booking.pathname, "https://cal.com/example-team/intro-call");
  assert.equal(booking.searchParams.get("source"), "ai-tutor");
  assert.equal(booking.searchParams.get("name"), "Pragya");
  assert.equal(booking.searchParams.get("fire"), answers.fire);
  assert.equal(booking.searchParams.get("time"), answers.time);
  assert.equal(booking.searchParams.get("commitments"), answers.commitments.join(" | "));
  assert.equal(booking.searchParams.get("leadId"), answers.leadId);
});
