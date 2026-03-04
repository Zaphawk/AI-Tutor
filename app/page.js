"use client";

import { useCallback, useMemo, useRef, useState } from "react";

const STAGES = [
  { text: "No thanks", emoji: "😊" },
  { text: "Still no", emoji: "😅" },
  { text: "Nope!", emoji: "🏃‍♀️" },
  { text: "Catch me!", emoji: "💨" },
  { text: "...", emoji: "🥺" },
  { text: "ok fine", emoji: "😭", tiny: true },
];

const COMMITMENTS = [
  "Client strategy & campaigns",
  "Team management & hiring",
  "New business / pitches",
  "Content & social media",
  "Operations & invoicing",
  "Reporting & analytics",
  "Networking & partnerships",
  "Personal brand building",
];

const TIMES = [
  "Morning (9–12)",
  "Afternoon (12–4)",
  "Evening (4–7)",
  "Late night (9 PM onwards) 🌙",
  "Weekend works best",
];

const FIRES = [
  "Following up with people",
  "Reporting across teams",
  "Task management chaos",
  "Content creation backlog",
  "Client onboarding",
  "Something else entirely",
];

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com";
const BOOKING_EMBED_URL = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL;

function ConfettiParticle({ delay }) {
  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA", "#FB923C", "#34D399"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const size = 6 + Math.random() * 8;
  const dur = 1.5 + Math.random() * 1.5;
  const rot = Math.random() * 720;

  return (
    <div
      style={{
        position: "fixed",
        top: -20,
        left: `${left}%`,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        animation: `confettiFall ${dur}s ease-in ${delay}s forwards`,
        transform: `rotate(${rot}deg)`,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    />
  );
}

function FloatingEmoji({ emoji, style }) {
  return (
    <div
      style={{
        position: "absolute",
        fontSize: "1.5rem",
        opacity: 0.15,
        animation: "floatAround 12s ease-in-out infinite",
        pointerEvents: "none",
        ...style,
      }}
    >
      {emoji}
    </div>
  );
}

export default function PragyaConnect() {
  const [screen, setScreen] = useState("intro");
  const [noStage, setNoStage] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const [commitments, setCommitments] = useState([]);
  const [time, setTime] = useState("");
  const [fire, setFire] = useState("");

  const [surveyStep, setSurveyStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef(null);

  const bookingHref = useMemo(() => {
    const booking = new URL(BOOKING_URL);
    booking.searchParams.set("name", "Pragya");
    booking.searchParams.set("fire", fire || "Not provided");
    booking.searchParams.set("time", time || "Not provided");
    booking.searchParams.set("commitments", commitments.join(" | ") || "Not provided");
    return booking.toString();
  }, [commitments, fire, time]);

  const transition = useCallback((next) => {
    setFadeIn(false);
    setTimeout(() => {
      if (typeof next === "function") next();
      else setScreen(next);
      setFadeIn(true);
    }, 300);
  }, []);

  const dodgeNo = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const padding = 60;
    const maxX = rect.width - padding * 2;
    const maxY = 120;
    const newX = (Math.random() - 0.5) * maxX;
    const newY = -(Math.random() * maxY + 20);
    setNoPos({ x: newX, y: newY });
    setNoStage((s) => Math.min(s + 1, STAGES.length - 1));
  }, []);

  const handleYes = () => {
    setShowConfetti(true);
    transition("survey");
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const toggleCommitment = (c) => {
    setCommitments((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : prev.length < 4 ? [...prev, c] : prev,
    );
  };

  const handleSubmitData = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commitments, fire, time }),
      });

      if (!response.ok) throw new Error("Failed to submit");
      transition("done");
    } catch (error) {
      console.error("Submission error:", error);
      transition("done");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stage = STAGES[noStage];

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        color: "#e2e8f0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes floatAround {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-3deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .glow-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }
        .chip {
          padding: 10px 18px;
          border-radius: 100px;
          border: 1.5px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: #cbd5e1;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          user-select: none;
        }
        .chip:hover { background: rgba(255,255,255,0.08); }
        .chip.active {
          background: linear-gradient(135deg, #4ECDC4, #44b3ab);
          border-color: #4ECDC4;
          color: #0f0f1a;
          font-weight: 600;
          box-shadow: 0 0 20px rgba(78,205,196,0.25);
        }
        .yes-btn {
          padding: 16px 48px;
          border-radius: 100px;
          border: none;
          background: linear-gradient(135deg, #4ECDC4, #2cb5ac);
          color: #0f0f1a;
          font-size: 1.15rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 25px rgba(78,205,196,0.35);
        }
        .yes-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 6px 35px rgba(78,205,196,0.5);
        }
        .no-btn {
          padding: 14px 36px;
          border-radius: 100px;
          border: 1.5px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: #94a3b8;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          user-select: none;
        }
        .next-btn {
          padding: 14px 40px;
          border-radius: 100px;
          border: none;
          background: linear-gradient(135deg, #4ECDC4, #2cb5ac);
          color: #0f0f1a;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px rgba(78,205,196,0.3);
        }
        .next-btn:disabled { opacity: 0.35; cursor: default; box-shadow: none; }
        .btn-loading { opacity: 0.7; cursor: not-allowed; }
        .progress-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: rgba(255,255,255,0.12);
          transition: all 0.3s ease;
        }
        .progress-dot.active {
          background: #4ECDC4;
          box-shadow: 0 0 10px rgba(78,205,196,0.5);
          width: 28px; border-radius: 5px;
        }
        .progress-dot.done { background: rgba(78,205,196,0.4); }
        .booking-btn {
          display: inline-block;
          padding: 14px 28px;
          border-radius: 999px;
          background: linear-gradient(135deg, #FFE66D, #fbbf24);
          color: #0f172a;
          text-decoration: none;
          font-weight: 800;
          box-shadow: 0 10px 25px rgba(251, 191, 36, 0.35);
          transition: transform 0.2s ease;
        }
        .booking-btn:hover {
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>

      <FloatingEmoji emoji="✨" style={{ top: "8%", left: "10%" }} />
      <FloatingEmoji emoji="🚀" style={{ top: "15%", right: "12%", animationDelay: "-4s" }} />
      <FloatingEmoji emoji="💡" style={{ bottom: "20%", left: "8%", animationDelay: "-7s" }} />
      <FloatingEmoji emoji="⚡" style={{ bottom: "12%", right: "15%", animationDelay: "-2s" }} />

      {showConfetti && Array.from({ length: 40 }).map((_, i) => <ConfettiParticle key={i} delay={i * 0.05} />)}

      <div
        style={{
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.3s ease",
          width: "100%",
          maxWidth: 520,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {screen === "intro" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "3.5rem",
                marginBottom: "1.5rem",
                animation: "pulse 3s ease-in-out infinite",
              }}
            >
              👋
            </div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                margin: "0 0 0.5rem",
                background: "linear-gradient(135deg, #e2e8f0, #4ECDC4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
              }}
            >
              Hey Pragya!
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#94a3b8", margin: "0.75rem 0 2.5rem", lineHeight: 1.6 }}>
              Sid & his AI co-tutor here.
              <br />
              Ready to set up your first connect?
            </p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <button className="yes-btn" onClick={handleYes}>
                Yes, let&apos;s go! 🎉
              </button>
              <div style={{ position: "relative", height: 60, width: "100%", display: "flex", justifyContent: "center" }}>
                <button
                  className="no-btn"
                  onMouseEnter={dodgeNo}
                  style={{
                    transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${stage.tiny ? 0.7 : 1})`,
                    opacity: stage.tiny ? 0.6 : 0.85,
                  }}
                >
                  {stage.emoji} {stage.text}
                </button>
              </div>
            </div>
          </div>
        )}

        {screen === "survey" && (
          <div className="glow-card" style={{ padding: "2rem 1.5rem", width: "100%" }}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: "2rem" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={`progress-dot ${i === surveyStep ? "active" : i < surveyStep ? "done" : ""}`} />
              ))}
            </div>

            {surveyStep === 0 && (
              <div style={{ animation: "slideUp 0.4s ease" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.35rem", color: "#f1f5f9" }}>What&apos;s on your plate? 🍽️</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
                  {COMMITMENTS.map((c) => (
                    <button key={c} className={`chip ${commitments.includes(c) ? "active" : ""}`} onClick={() => toggleCommitment(c)}>
                      {c}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  <button className="next-btn" disabled={commitments.length === 0} onClick={() => transition(() => setSurveyStep(1))}>
                    Next →
                  </button>
                </div>
              </div>
            )}

            {surveyStep === 1 && (
              <div style={{ animation: "slideUp 0.4s ease" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.35rem", color: "#f1f5f9" }}>Biggest fire right now? 🔥</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                  {FIRES.map((f) => (
                    <button key={f} className={`chip ${fire === f ? "active" : ""}`} onClick={() => setFire(f)} style={{ textAlign: "left" }}>
                      {f}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                  <button className="chip" onClick={() => transition(() => setSurveyStep(0))}>
                    ← Back
                  </button>
                  <button className="next-btn" disabled={!fire} onClick={() => transition(() => setSurveyStep(2))}>
                    Next →
                  </button>
                </div>
              </div>
            )}

            {surveyStep === 2 && (
              <div style={{ animation: "slideUp 0.4s ease" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.35rem", color: "#f1f5f9" }}>Best time for our connect? ⏰</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      className={`chip ${time === t ? "active" : ""}`}
                      onClick={() => setTime(t)}
                      style={{ textAlign: "left" }}
                      disabled={isSubmitting}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                  <button className="chip" onClick={() => transition(() => setSurveyStep(1))} disabled={isSubmitting}>
                    ← Back
                  </button>
                  <button className={`next-btn ${isSubmitting ? "btn-loading" : ""}`} disabled={!time || isSubmitting} onClick={handleSubmitData}>
                    {isSubmitting ? "Locking it in..." : "Done! ✨"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {screen === "done" && (
          <div style={{ textAlign: "center", animation: "slideUp 0.5s ease", width: "100%" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎯</div>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                margin: "0 0 0.5rem",
                background: "linear-gradient(135deg, #4ECDC4, #FFE66D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              You&apos;re in!
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: "0.5rem 0 1.5rem", fontSize: "1.05rem" }}>
              Let&apos;s lock it in. Grab a slot below.
            </p>

            {BOOKING_EMBED_URL ? (
              <iframe
                src={BOOKING_EMBED_URL}
                title="Booking Calendar"
                style={{ width: "100%", minHeight: 620, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}
              />
            ) : null}

            <a className="booking-btn" href={bookingHref} target="_blank" rel="noreferrer">
              Book your slot now →
            </a>

            <p style={{ color: "#64748b", marginTop: "0.75rem", fontSize: "0.85rem" }}>
              Your responses are prefilled in the booking link to keep things frictionless.
            </p>

            <p style={{ color: "#475569", fontSize: "0.8rem", fontStyle: "italic", marginTop: "2rem" }}>
              PS — this entire thing was built by AI in minutes. 🤫
              <br />
              Imagine what it can do for your agency.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
