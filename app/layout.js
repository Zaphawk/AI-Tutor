import "./globals.css";

export const metadata = {
  title: "AI Tutor Booking Liaison",
  description: "Gamified lead funnel that saves responses and hands off to booking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
