"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const ACC = "#C8956C";
const BG = "#0B0A0F";
const TXT = "#E8E4DD";
const DIM = "rgba(232,228,221,0.45)";
const FAINT = "rgba(232,228,221,0.06)";
const SF = "'Instrument Serif', Georgia, serif";
const SN = "'DM Sans', sans-serif";
const MN = "'JetBrains Mono', monospace";

const GRADES: Record<string, string> = { "A+": "#4ECDC4", A: "#4ECDC4", "A-": "#4ECDC4", "B+": "#7DD87D", B: "#7DD87D", "B-": "#C8956C", "C+": "#C8956C", C: "#FF9800", "C-": "#FF9800", D: "#E74C3C", F: "#E74C3C" };

function GradeRing({ grade, label, size = 64 }: { grade: string; label: string; size?: number }) {
  const color = GRADES[grade] || ACC;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", border: `3px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.35, fontFamily: SF, fontWeight: 400, color }}>{grade}</span>
      </div>
      <span style={{ fontSize: 9, fontFamily: SN, fontWeight: 600, color: DIM, letterSpacing: "0.04em", textTransform: "uppercase" as const, textAlign: "center" as const, maxWidth: 80 }}>{label}</span>
    </div>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= current ? ACC : FAINT, transition: "background 0.4s" }} />
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11, fontFamily: SN, fontWeight: 600, color: "rgba(232,228,221,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", background: "rgba(232,228,221,0.03)", border: `1px solid ${FAINT}`,
  borderRadius: 8, color: TXT, fontFamily: SN, fontSize: 14, outline: "none", transition: "border-color 0.3s",
};
const textareaStyle: React.CSSProperties = { ...inputStyle, minHeight: 120, resize: "vertical" };
const btnStyle: React.CSSProperties = {
  padding: "12px 28px", borderRadius: 7, background: ACC, color: BG, fontFamily: SN, fontSize: 13,
  fontWeight: 700, border: "none", cursor: "pointer", transition: "opacity 0.2s",
};
const btnOutline: React.CSSProperties = {
  ...btnStyle, background: "transparent", border: `1px solid ${FAINT}`, color: "rgba(232,228,221,0.5)",
};

interface HMComparison { sixSecondTest: string; whatStandsOut: string; whatsMissing: string; stackRank: string; atsScore: string; }
interface CategoryResult { grade: string; summary: string; recommendations: string[]; }
interface ReviewResult { overallGrade: string; categories: Record<string, CategoryResult>; topThreeActions: string[]; strengths: string[]; oneLineSummary: string; hiringManagerComparison: HMComparison; industryTips: string[]; }

export default function ResumeCoach() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ resume: "", jobDescription: "", company: "", targetRole: "", experience: "", biggestWin: "", struggle: "", email: "" });
  const [fileName, setFileName] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileLoading(true);
    setFileName(file.name);
    setError("");

    try {
      if (file.name.endsWith(".txt") || file.type === "text/plain") {
        const text = await file.text();
        set("resume", text);
      } else if (file.name.endsWith(".docx") || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const mammoth = await import("mammoth");
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        set("resume", result.value);
      } else if (file.name.endsWith(".pdf") || file.type === "application/pdf") {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: { str?: string }) => item.str || "").join(" ");
          fullText += strings + "\n";
        }
        set("resume", fullText);
      } else {
        setError("Please upload a PDF, DOCX, or TXT file.");
        setFileName("");
      }
    } catch (err) {
      console.error("File parsing error:", err);
      setError("Could not read that file. Try a different format.");
      setFileName("");
    } finally {
      setFileLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 0) return form.resume.trim().length > 50;
    if (step === 1) return true;
    if (step === 2) return form.experience.trim() && form.biggestWin.trim();
    if (step === 3) return form.email.trim().includes("@");
    return false;
  };

  const analyze = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/resume-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Analysis failed");
      }
      const data = await res.json();
      setResult(data);
      setStep(4);
    } catch (err) {
      console.error(err);
      setError("Something went wrong analyzing your resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = () => {
    const subject = encodeURIComponent(`Resume Coaching Request from ${contactForm.name}`);
    const body = encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}\n\n---\nSent from AI Resume Coach on holdenottolini.com`);
    window.open(`mailto:holdenstirling@gmail.com?subject=${subject}&body=${body}`, "_self");
    setContactSent(true);
  };

  const catLabels: Record<string, string> = { jobFit: "Job Fit", impactLanguage: "Impact Language", technicalDepth: "Technical Depth", formatting: "Formatting", missingElements: "Missing Elements" };

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TXT, fontFamily: SF }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@media(max-width:600px){.res-grid{grid-template-columns:repeat(3,1fr)!important}.contact-grid{grid-template-columns:1fr!important}.hm-grid{grid-template-columns:1fr!important}}`}</style>

      <nav style={{ borderBottom: `1px solid ${FAINT}`, padding: "14px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: 15, fontFamily: SN, fontWeight: 700, color: TXT, textDecoration: "none" }}>
            H<span style={{ color: ACC }}>.</span> Ottolini
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/#work" style={{ fontSize: 10.5, fontFamily: SN, fontWeight: 500, color: "rgba(232,228,221,0.4)", textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>Work</Link>
            <Link href="/#contact" style={{ fontSize: 10.5, fontFamily: SN, fontWeight: 500, color: "rgba(232,228,221,0.4)", textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>Contact</Link>
            <span style={{ fontSize: 10, fontFamily: SN, fontWeight: 700, color: ACC, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", border: `1px solid ${ACC}30`, borderRadius: 4 }}>Resume Coach</span>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

        {step < 4 && (
          <div style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 10, fontFamily: SN, fontWeight: 700, color: ACC, letterSpacing: "0.1em", textTransform: "uppercase" as const, display: "block", marginBottom: 10 }}>Free Tool</span>
            <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 10 }}>
              AI Resume <span style={{ fontStyle: "italic", color: ACC }}>Coach</span>
            </h1>
            <p style={{ fontSize: 15, fontFamily: SN, color: DIM, lineHeight: 1.6, maxWidth: 520 }}>
              {"I've reviewed hundreds of resumes as a hiring manager building a team from scratch. I know what makes me stop scrolling and what gets skipped. This tool gives you that same honest feedback \u2014 powered by Claude AI."}
            </p>
          </div>
        )}

        {step < 4 && <StepIndicator current={step} total={4} />}

        {step === 0 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 400, marginBottom: 6 }}>Upload your <span style={{ fontStyle: "italic", color: ACC }}>resume</span></h2>
            <p style={{ fontSize: 13, fontFamily: SN, color: DIM, marginBottom: 20 }}>Upload a PDF, Word document, or text file. We extract the text and never store your file.</p>
            <div onClick={() => fileRef.current?.click()} style={{ border: `2px dashed ${fileName ? ACC : "rgba(232,228,221,0.1)"}`, borderRadius: 14, padding: "40px 24px", textAlign: "center", cursor: "pointer", background: fileName ? "rgba(200,149,108,0.03)" : "rgba(232,228,221,0.01)", transition: "all 0.3s", marginBottom: 20 }}>
              {fileLoading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 24, border: `2px solid ${FAINT}`, borderTopColor: ACC, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <span style={{ fontSize: 13, fontFamily: SN, color: DIM }}>Reading file...</span>
                </div>
              ) : fileName ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: 28 }}>{"\u2713"}</div>
                  <span style={{ fontSize: 14, fontFamily: SN, fontWeight: 600, color: ACC }}>{fileName}</span>
                  <span style={{ fontSize: 11, fontFamily: SN, color: DIM }}>{form.resume.length.toLocaleString()} characters extracted. Click to replace.</span>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: 32, color: "rgba(232,228,221,0.15)" }}>{"\u2191"}</div>
                  <span style={{ fontSize: 14, fontFamily: SN, fontWeight: 500, color: "rgba(232,228,221,0.4)" }}>Click to upload your resume</span>
                  <span style={{ fontSize: 11, fontFamily: SN, color: "rgba(232,228,221,0.2)" }}>Supports PDF, DOCX, and TXT</span>
                </div>
              )}
              <input ref={fileRef} type="file" accept=".pdf,.docx,.doc,.txt,.text,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style={{ display: "none" }} onChange={handleFileUpload} />
            </div>
            {error && <p style={{ fontSize: 12, fontFamily: SN, color: "#E74C3C", marginBottom: 12 }}>{error}</p>}
            <button disabled={!canProceed()} onClick={() => { setError(""); setStep(1); }} style={{ ...btnStyle, opacity: canProceed() ? 1 : 0.4 }}>Next: Target Job {"\u2192"}</button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 400, marginBottom: 6 }}>Target <span style={{ fontStyle: "italic", color: ACC }}>job</span></h2>
            <p style={{ fontSize: 13, fontFamily: SN, color: DIM, marginBottom: 20 }}>Adding a job description lets us score how well your resume matches. This is where the real value is.</p>
            <Field label="Job description (optional but recommended)">
              <textarea style={textareaStyle} value={form.jobDescription} onChange={e => set("jobDescription", e.target.value)} placeholder="Paste the full job description here..." />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Company name (optional)">
                <input style={inputStyle} value={form.company} onChange={e => set("company", e.target.value)} placeholder="e.g. Anthropic" />
              </Field>
              <Field label="Target role (optional)">
                <input style={inputStyle} value={form.targetRole} onChange={e => set("targetRole", e.target.value)} placeholder="e.g. Solutions Architect" />
              </Field>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button onClick={() => setStep(0)} style={btnOutline}>{"\u2190"} Back</button>
              <button onClick={() => setStep(2)} style={btnStyle}>Next: About You {"\u2192"}</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 400, marginBottom: 6 }}>Tell us about <span style={{ fontStyle: "italic", color: ACC }}>you</span></h2>
            <p style={{ fontSize: 13, fontFamily: SN, color: DIM, marginBottom: 20 }}>This helps us give specific, relevant advice instead of generic recommendations.</p>
            <Field label="Years of experience *">
              <input style={inputStyle} value={form.experience} onChange={e => set("experience", e.target.value)} placeholder="e.g. 8 years" />
            </Field>
            <Field label="Your biggest professional accomplishment *">
              <textarea style={{ ...textareaStyle, minHeight: 80 }} value={form.biggestWin} onChange={e => set("biggestWin", e.target.value)} placeholder="e.g. Led an enterprise implementation that became the company's largest deployment..." />
            </Field>
            <Field label="What do you struggle with most in job searching? (optional)">
              <input style={inputStyle} value={form.struggle} onChange={e => set("struggle", e.target.value)} placeholder="e.g. Getting past the ATS, standing out..." />
            </Field>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button onClick={() => setStep(1)} style={btnOutline}>{"\u2190"} Back</button>
              <button disabled={!canProceed()} onClick={() => setStep(3)} style={{ ...btnStyle, opacity: canProceed() ? 1 : 0.4 }}>Next: Get Your Review {"\u2192"}</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 400, marginBottom: 6 }}>Almost <span style={{ fontStyle: "italic", color: ACC }}>there</span></h2>
            <p style={{ fontSize: 13, fontFamily: SN, color: DIM, marginBottom: 20 }}>Enter your email to get your personalized resume review.</p>
            <Field label="Email address *">
              <input type="email" style={inputStyle} value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@email.com" />
            </Field>
            <p style={{ fontSize: 10, fontFamily: SN, color: "rgba(232,228,221,0.2)", marginBottom: 20 }}>Your resume is analyzed by Claude AI in real time and is not stored on our servers.</p>
            {error && <p style={{ fontSize: 12, fontFamily: SN, color: "#E74C3C", marginBottom: 12 }}>{error}</p>}
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(2)} style={btnOutline}>{"\u2190"} Back</button>
              <button disabled={!canProceed() || loading} onClick={analyze} style={{ ...btnStyle, opacity: canProceed() && !loading ? 1 : 0.4, display: "flex", alignItems: "center", gap: 8 }}>
                {loading && <div style={{ width: 14, height: 14, border: "2px solid rgba(11,10,15,0.3)", borderTopColor: BG, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />}
                {loading ? "Analyzing your resume..." : "Get My Review"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{ fontSize: 10, fontFamily: SN, fontWeight: 700, color: ACC, letterSpacing: "0.1em", textTransform: "uppercase" as const, display: "block", marginBottom: 12 }}>Your Resume Score</span>
              <div style={{ width: 110, height: 110, borderRadius: "50%", border: `4px solid ${GRADES[result.overallGrade] || ACC}`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 40, fontFamily: SF, color: GRADES[result.overallGrade] || ACC }}>{result.overallGrade}</span>
              </div>
              <p style={{ fontSize: 15, fontFamily: SN, color: DIM, maxWidth: 480, margin: "0 auto" }}>{result.oneLineSummary}</p>
            </div>

            <div className="res-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 40, justifyItems: "center" }}>
              {Object.entries(result.categories).map(([key, val]) => (
                <GradeRing key={key} grade={val.grade} label={catLabels[key] || key} />
              ))}
            </div>

            {result.hiringManagerComparison && (
              <div style={{ background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 14, padding: "22px 24px", marginBottom: 28 }}>
                <h3 style={{ fontSize: 13, fontFamily: SN, fontWeight: 700, color: "#6366F1", marginBottom: 16 }}>How a Hiring Manager Sees Your Resume</h3>
                <div className="hm-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { label: "6-Second Test", value: result.hiringManagerComparison.sixSecondTest, icon: "\u23F1" },
                    { label: "What Stands Out", value: result.hiringManagerComparison.whatStandsOut, icon: "\u2B50" },
                    { label: "What's Missing", value: result.hiringManagerComparison.whatsMissing, icon: "\u26A0" },
                    { label: "Stack Rank", value: result.hiringManagerComparison.stackRank, icon: "\u2195" },
                  ].map((item, i) => (
                    <div key={i} style={{ background: "rgba(11,10,15,0.4)", borderRadius: 10, padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <span style={{ fontSize: 14 }}>{item.icon}</span>
                        <span style={{ fontSize: 10, fontFamily: SN, fontWeight: 700, color: "#6366F1", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{item.label}</span>
                      </div>
                      <p style={{ fontSize: 12, fontFamily: SN, color: "rgba(232,228,221,0.6)", lineHeight: 1.6 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(11,10,15,0.4)", borderRadius: 10, padding: "14px 16px", marginTop: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 14 }}>{"\uD83E\uDD16"}</span>
                    <span style={{ fontSize: 10, fontFamily: SN, fontWeight: 700, color: "#6366F1", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>ATS Compatibility</span>
                  </div>
                  <p style={{ fontSize: 12, fontFamily: SN, color: "rgba(232,228,221,0.6)", lineHeight: 1.6 }}>{result.hiringManagerComparison.atsScore}</p>
                </div>
              </div>
            )}

            <div style={{ background: "rgba(200,149,108,0.04)", border: "1px solid rgba(200,149,108,0.12)", borderRadius: 14, padding: "22px 24px", marginBottom: 28 }}>
              <h3 style={{ fontSize: 13, fontFamily: SN, fontWeight: 700, color: ACC, marginBottom: 14 }}>Top 3 Actions to Take Right Now</h3>
              {result.topThreeActions?.map((action, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, fontFamily: MN, color: ACC, fontWeight: 600, flexShrink: 0, marginTop: 2 }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, fontFamily: SN, color: "rgba(232,228,221,0.7)", lineHeight: 1.6 }}>{action}</span>
                </div>
              ))}
            </div>

            {result.industryTips && result.industryTips.length > 0 && (
              <div style={{ background: "rgba(255,152,0,0.04)", border: "1px solid rgba(255,152,0,0.12)", borderRadius: 14, padding: "22px 24px", marginBottom: 28 }}>
                <h3 style={{ fontSize: 13, fontFamily: SN, fontWeight: 700, color: "#FF9800", marginBottom: 14 }}>
                  {form.targetRole || form.company ? `Tips for ${form.targetRole || ""} ${form.company ? `at ${form.company}` : ""}`.trim() : "Industry-Specific Tips"}
                </h3>
                {result.industryTips.map((tip, i) => (
                  <div key={i} style={{ fontSize: 13, fontFamily: SN, color: "rgba(232,228,221,0.6)", lineHeight: 1.6, marginBottom: 8, paddingLeft: 14, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#FF9800" }}>{"\u25B8"}</span>{tip}
                  </div>
                ))}
              </div>
            )}

            <div style={{ background: "rgba(78,205,196,0.04)", border: "1px solid rgba(78,205,196,0.1)", borderRadius: 14, padding: "22px 24px", marginBottom: 28 }}>
              <h3 style={{ fontSize: 13, fontFamily: SN, fontWeight: 700, color: "#4ECDC4", marginBottom: 14 }}>{"What You're Doing Well"}</h3>
              {result.strengths?.map((s, i) => (
                <div key={i} style={{ fontSize: 13, fontFamily: SN, color: "rgba(232,228,221,0.6)", lineHeight: 1.6, marginBottom: 6, paddingLeft: 14, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#4ECDC4" }}>+</span>{s}
                </div>
              ))}
            </div>

            {Object.entries(result.categories).map(([key, val]) => (
              <div key={key} style={{ borderTop: `1px solid ${FAINT}`, paddingTop: 20, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 400, fontFamily: SF, color: TXT }}>{catLabels[key]}</h3>
                  <span style={{ fontSize: 16, fontFamily: SF, color: GRADES[val.grade] || ACC }}>{val.grade}</span>
                </div>
                <p style={{ fontSize: 13, fontFamily: SN, color: DIM, marginBottom: 10 }}>{val.summary}</p>
                {val.recommendations?.map((rec, i) => (
                  <div key={i} style={{ fontSize: 12, fontFamily: SN, color: "rgba(232,228,221,0.55)", lineHeight: 1.6, marginBottom: 4, paddingLeft: 14, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: ACC }}>{"\u00b7"}</span>{rec}
                  </div>
                ))}
              </div>
            ))}

            <div style={{ background: "linear-gradient(135deg, rgba(200,149,108,0.06), rgba(99,102,241,0.04))", border: "1px solid rgba(200,149,108,0.15)", borderRadius: 18, padding: "28px 28px", marginTop: 36, marginBottom: 28 }}>
              {!showContact && !contactSent && (
                <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28, alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: 9, fontFamily: SN, fontWeight: 700, color: ACC, letterSpacing: "0.08em", textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>Need More Help?</span>
                    <h3 style={{ fontSize: 22, fontWeight: 400, fontFamily: SF, color: TXT, marginBottom: 8 }}>Get personalized <span style={{ fontStyle: "italic", color: ACC }}>coaching</span></h3>
                    <p style={{ fontSize: 13, fontFamily: SN, color: DIM, lineHeight: 1.6, marginBottom: 16 }}>
                      {"I've co-founded a company, been promoted 5 times, hired and managed growing teams, and led 50+ enterprise implementations. I can help you position yourself for the roles you actually want."}
                    </p>
                    <button onClick={() => setShowContact(true)} style={btnStyle}>Request a Consultation {"\u2192"}</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {["Resume rewrite with targeted positioning", "Cover letter tailored to specific roles", "Interview prep and mock interviews", "Job search strategy and targeting", "LinkedIn profile optimization", "Salary negotiation guidance"].map((item, i) => (
                      <div key={i} style={{ fontSize: 11, fontFamily: SN, color: "rgba(232,228,221,0.5)", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                        <span style={{ position: "absolute", left: 0, color: ACC }}>{"\u2713"}</span>{item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showContact && !contactSent && (
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 400, fontFamily: SF, color: TXT, marginBottom: 4 }}>{"Let's "}<span style={{ fontStyle: "italic", color: ACC }}>connect</span></h3>
                  <p style={{ fontSize: 12, fontFamily: SN, color: DIM, marginBottom: 18 }}>{"Tell me what you need help with and I'll get back to you within 24 hours."}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <Field label="Your name">
                      <input style={inputStyle} value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
                    </Field>
                    <Field label="Email">
                      <input type="email" style={inputStyle} value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" />
                    </Field>
                  </div>
                  <Field label="How can I help?">
                    <textarea style={{ ...textareaStyle, minHeight: 80 }} value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="e.g. I'm targeting SA roles at tech companies and need help positioning my resume..." />
                  </Field>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setShowContact(false)} style={btnOutline}>{"\u2190"} Back</button>
                    <button onClick={handleContactSubmit} disabled={!contactForm.name || !contactForm.email || !contactForm.message} style={{ ...btnStyle, opacity: contactForm.name && contactForm.email && contactForm.message ? 1 : 0.4 }}>Send Message</button>
                  </div>
                </div>
              )}

              {contactSent && (
                <div style={{ textAlign: "center", padding: "12px 0" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{"\u2713"}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 400, fontFamily: SF, color: TXT, marginBottom: 6 }}>Message <span style={{ fontStyle: "italic", color: ACC }}>sent</span></h3>
                  <p style={{ fontSize: 13, fontFamily: SN, color: DIM }}>{"Your email client should have opened with the message. I'll get back to you within 24 hours."}</p>
                </div>
              )}
            </div>

            <div style={{ textAlign: "center", borderTop: `1px solid ${FAINT}`, paddingTop: 28, marginTop: 8 }}>
              <p style={{ fontSize: 12, fontFamily: SN, color: "rgba(232,228,221,0.3)", marginBottom: 12 }}>{"Built by Holden Ottolini \u2014 co-founder, solutions architect, 5x Ironman finisher"}</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => { setStep(0); setResult(null); setShowContact(false); setContactSent(false); setFileName(""); setForm({ resume: "", jobDescription: "", company: "", targetRole: "", experience: "", biggestWin: "", struggle: "", email: "" }); }} style={btnOutline}>Review Another Resume</button>
                <Link href="/" style={{ ...btnStyle, textDecoration: "none", display: "inline-block" }}>holdenottolini.com</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer style={{ padding: "20px 24px", borderTop: `1px solid ${FAINT}`, textAlign: "center" }}>
        <p style={{ fontSize: 10, fontFamily: SN, color: "rgba(232,228,221,0.1)" }}>{"\u00A9"} 2026 Holden Stirling Ottolini. Powered by Claude AI.</p>
      </footer>
    </div>
  );
}
