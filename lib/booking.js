const GENERIC_CAL_HOST = "cal.com";
const PLACEHOLDER_PATH_SEGMENTS = new Set(["your-handle"]);

function isConfiguredBookingUrl(booking) {
  if (booking.protocol !== "https:") return false;

  const pathSegments = booking.pathname.split("/").filter(Boolean);
  const isGenericCalHome = booking.hostname.toLowerCase() === GENERIC_CAL_HOST && pathSegments.length === 0;
  const containsPlaceholder = pathSegments.some((segment) => PLACEHOLDER_PATH_SEGMENTS.has(segment.toLowerCase()));

  return !isGenericCalHome && !containsPlaceholder;
}

export function buildBookingHref({ bookingUrl, commitments = [], fire, time, leadId }) {
  if (typeof bookingUrl !== "string" || !bookingUrl.trim()) return null;

  let booking;
  try {
    booking = new URL(bookingUrl);
  } catch {
    return null;
  }

  if (!isConfiguredBookingUrl(booking)) return null;

  booking.searchParams.set("name", "Pragya");
  booking.searchParams.set("fire", fire || "Not provided");
  booking.searchParams.set("time", time || "Not provided");
  booking.searchParams.set("commitments", commitments.join(" | ") || "Not provided");
  if (leadId) {
    booking.searchParams.set("leadId", leadId);
  }

  return booking.toString();
}
