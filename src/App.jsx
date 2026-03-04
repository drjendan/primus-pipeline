import { useState, useEffect } from "react";

// ─── THEME & CONSTANTS ───────────────────────────────────────────────────────
const COLORS = {
  navy: "#FFFFFF",
  navyLight: "#F4F7FB",
  navyMid: "#DDE4EF",
  gold: "#0B3D91",
  goldLight: "#1A56C4",
  amber: "#1A56C4",
  emerald: "#1A7A44",
  emeraldDark: "#145C34",
  red: "#C0392B",
  redDark: "#922B21",
  yellow: "#B7770D",
  slate: "#4A6080",
  slateLight: "#2D3E55",
  white: "#0B1F3A",
  offWhite: "#0B1F3A",
};

const STAGES = [
  { id: 1, name: "Primo Intake", short: "Intake", icon: "📋" },
  { id: 2, name: "PI Triage", short: "Triage", icon: "🔍" },
  { id: 3, name: "PI Assessment", short: "PI Calc", icon: "📊" },
  { id: 4, name: "Automation Readiness", short: "Readiness", icon: "⚙️" },
  { id: 5, name: "PrimeOne POPPI™", short: "PrimeOne", icon: "🚀" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtNum = (n) => new Intl.NumberFormat("en-US").format(Math.round(n));

function ScoreBadge({ score, thresholds = [60, 80] }) {
  const [low, high] = thresholds;
  const color = score >= high ? COLORS.emerald : score >= low ? COLORS.yellow : COLORS.red;
  const label = score >= high ? "READY" : score >= low ? "PARTIAL" : "NOT READY";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px",
      borderRadius: 20, background: color + "22", border: `1.5px solid ${color}`,
      color, fontSize: 12, fontWeight: 700, letterSpacing: 1
    }}>{label}</span>
  );
}

function ProgressBar({ value, max = 100, color = COLORS.gold }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: "#DDE4EF", borderRadius: 6, height: 10, overflow: "hidden" }}>
      <div style={{
        width: `${pct}%`, height: "100%", borderRadius: 6,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        transition: "width 0.6s cubic-bezier(.4,0,.2,1)"
      }} />
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: COLORS.navyLight, border: `1px solid ${COLORS.navyMid}`,
      borderRadius: 12, padding: 24, ...style
    }}>{children}</div>
  );
}

function Label({ children, required }) {
  return (
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.slate, letterSpacing: 0.8, marginBottom: 6, textTransform: "uppercase" }}>
      {children}{required && <span style={{ color: COLORS.amber, marginLeft: 4 }}>*</span>}
    </label>
  );
}

function Input({ label, required, hint, ...props }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <Label required={required}>{label}</Label>}
      {hint && <p style={{ fontSize: 11, color: COLORS.slate, marginBottom: 6, fontStyle: "italic" }}>{hint}</p>}
      <input {...props} style={{
        width: "100%", background: COLORS.navy, border: `1px solid ${COLORS.navyMid}`,
        borderRadius: 8, padding: "10px 14px", color: COLORS.white, fontSize: 14,
        outline: "none", boxSizing: "border-box",
        ...props.style
      }} />
    </div>
  );
}

function Select({ label, required, hint, options, ...props }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <Label required={required}>{label}</Label>}
      {hint && <p style={{ fontSize: 11, color: COLORS.slate, marginBottom: 6, fontStyle: "italic" }}>{hint}</p>}
      <select {...props} style={{
        width: "100%", background: COLORS.navy, border: `1px solid ${COLORS.navyMid}`,
        borderRadius: 8, padding: "10px 14px", color: COLORS.white, fontSize: 14, outline: "none"
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function YesNo({ label, hint, value, onChange }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <Label>{label}</Label>
      {hint && <p style={{ fontSize: 11, color: COLORS.slate, marginBottom: 8, fontStyle: "italic" }}>{hint}</p>}
      <div style={{ display: "flex", gap: 10 }}>
        {["Yes", "No", "Unknown"].map(opt => (
          <button key={opt} onClick={() => onChange(opt)} style={{
            padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            border: `1.5px solid ${value === opt ? COLORS.gold : COLORS.navyMid}`,
            background: value === opt ? COLORS.gold + "22" : COLORS.navy,
            color: value === opt ? COLORS.gold : COLORS.slate,
            transition: "all 0.15s"
          }}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ children, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.white, margin: 0, letterSpacing: -0.3 }}>{children}</h2>
      {subtitle && <p style={{ fontSize: 13, color: COLORS.slate, marginTop: 6, margin: "6px 0 0" }}>{subtitle}</p>}
    </div>
  );
}

function MetricBox({ label, value, sub, color = COLORS.gold }) {
  return (
    <div style={{
      background: "#EDF2FA", border: `1px solid #DDE4EF`,
      borderRadius: 10, padding: "16px 20px", textAlign: "center"
    }}>
      <div style={{ fontSize: 22, fontWeight: 800, color, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.slate, letterSpacing: 0.6, textTransform: "uppercase" }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: COLORS.slate, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", style = {} }) {
  const styles = {
    primary: { background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`, color: COLORS.navy, border: "none" },
    secondary: { background: "transparent", color: COLORS.slate, border: `1px solid ${COLORS.navyMid}` },
    danger: { background: COLORS.red + "22", color: COLORS.red, border: `1px solid ${COLORS.red}` },
    success: { background: COLORS.emerald + "22", color: COLORS.emerald, border: `1px solid ${COLORS.emerald}` },
  };
  return (
    <button onClick={onClick} style={{
      padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700,
      cursor: "pointer", letterSpacing: 0.3, transition: "all 0.15s",
      ...styles[variant], ...style
    }}>{children}</button>
  );
}

// ─── STAGE 1: PRIMO INTAKE ────────────────────────────────────────────────────
function Stage1({ data, setData, onNext }) {
  const update = (k, v) => setData(p => ({ ...p, [k]: v }));
  const canProceed = data.processName && data.department && data.processOwner && data.monthlyVolume && data.ftes && data.avgSalary && data.cycleTimeHours;

  return (
    <div>
      <SectionTitle subtitle="Tell us about the process you'd like to evaluate. The more detail you provide, the more accurate your results will be.">
        📋 Process Intake — Powered by Primo
      </SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.gold, marginBottom: 16, marginTop: 0, letterSpacing: 0.5, textTransform: "uppercase" }}>Process Identification</h3>
          <Input label="Process Name" required value={data.processName || ""} onChange={e => update("processName", e.target.value)} placeholder="e.g. Mortgage Application Review" />
          <Input label="Department / Business Unit" required value={data.department || ""} onChange={e => update("department", e.target.value)} placeholder="e.g. Mortgage Operations" />
          <Input label="Process Owner" required value={data.processOwner || ""} onChange={e => update("processOwner", e.target.value)} placeholder="e.g. Jane Smith, VP Operations" />
          <Select label="Process Type" required value={data.processType || ""} onChange={e => update("processType", e.target.value)}
            options={[
              { value: "", label: "— Select process type —" },
              { value: "mortgage", label: "Mortgage Processing" },
              { value: "ofac", label: "OFAC / Sanctions Screening" },
              { value: "account", label: "Account Opening" },
              { value: "wire", label: "Wire Transfers" },
              { value: "compliance", label: "Compliance / Regulatory" },
              { value: "lending", label: "Commercial Lending" },
              { value: "deposits", label: "Deposit Operations" },
              { value: "other", label: "Other" },
            ]} />
          <div style={{ marginBottom: 18 }}>
            <Label>Brief Process Description</Label>
            <textarea value={data.description || ""} onChange={e => update("description", e.target.value)}
              placeholder="Describe what this process does and why it matters..."
              style={{
                width: "100%", background: COLORS.navy, border: `1px solid ${COLORS.navyMid}`,
                borderRadius: 8, padding: "10px 14px", color: COLORS.white, fontSize: 14,
                outline: "none", minHeight: 80, boxSizing: "border-box", resize: "vertical", fontFamily: "inherit"
              }} />
          </div>
          <Input label="How long has this process been in place?" value={data.processAge || ""} onChange={e => update("processAge", e.target.value)}
            placeholder="e.g. 5 years" hint="Older processes often have more improvement potential" />
        </Card>

        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.gold, marginBottom: 16, marginTop: 0, letterSpacing: 0.5, textTransform: "uppercase" }}>Volume & Cost Inputs</h3>
          <Input label="Monthly Transaction Volume" required type="number" value={data.monthlyVolume || ""} onChange={e => update("monthlyVolume", e.target.value)}
            placeholder="e.g. 500" hint="Average number of cases/transactions processed per month" />
          <Input label="Number of FTEs on This Process" required type="number" step="0.5" value={data.ftes || ""} onChange={e => update("ftes", e.target.value)}
            placeholder="e.g. 4.5" hint="Include partial FTEs — e.g. 0.5 means half-time" />
          <Input label="Average Annual Salary (per FTE)" required type="number" value={data.avgSalary || ""} onChange={e => update("avgSalary", e.target.value)}
            placeholder="e.g. 65000" hint="Use fully-loaded cost (base + benefits + overhead)" />
          <Select label="Is salary fully loaded?" value={data.salaryLoaded || "yes"} onChange={e => update("salaryLoaded", e.target.value)}
            options={[
              { value: "yes", label: "Yes — includes benefits & overhead" },
              { value: "no", label: "No — base salary only (we'll apply 1.32× factor)" },
            ]} />
          <Input label="Average Cycle Time per Transaction (hours)" required type="number" step="0.25" value={data.cycleTimeHours || ""} onChange={e => update("cycleTimeHours", e.target.value)}
            placeholder="e.g. 2.5" hint="Total elapsed time from start to finish" />
          <Input label="Touch Time per Transaction (hours)" type="number" step="0.25" value={data.touchTimeHours || ""} onChange={e => update("touchTimeHours", e.target.value)}
            placeholder="e.g. 0.75" hint="Actual hands-on work time (excludes waiting)" />
          <Input label="Current Error / Rework Rate (%)" type="number" step="0.5" value={data.errorRate || ""} onChange={e => update("errorRate", e.target.value)}
            placeholder="e.g. 12" hint="% of transactions requiring rework or correction" />
          <Input label="Number of Process Handoffs" type="number" value={data.handoffs || ""} onChange={e => update("handoffs", e.target.value)}
            placeholder="e.g. 6" hint="How many times the work passes between people/systems" />
        </Card>
      </div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
        <Btn onClick={onNext} variant={canProceed ? "primary" : "secondary"}>
          Proceed to PI Triage →
        </Btn>
      </div>
    </div>
  );
}

// ─── STAGE 2: PI TRIAGE ───────────────────────────────────────────────────────
function Stage2({ data, setData, intake, onNext, onBack }) {
  const update = (k, v) => setData(p => ({ ...p, [k]: v }));

  const questions = [
    { key: "q_variance", label: "Is there high cycle time variance (>30%) between transactions?", hint: "Some take 30 min, others take 3 hours for the same work" },
    { key: "q_handoffs", label: "Are there more than 5 handoffs in this process?", hint: "Work passes frequently between people, teams, or systems" },
    { key: "q_rework", label: "Is rework or error correction common (>10% of transactions)?", hint: "Mistakes requiring do-overs are a regular occurrence" },
    { key: "q_age", label: "Has this process NOT been formally reviewed or improved in 3+ years?", hint: "No recent Lean, Six Sigma, or process improvement effort" },
    { key: "q_complaints", label: "Are there customer or internal complaints tied to this process?", hint: "Delays, errors, or friction points that people escalate" },
    { key: "q_regulatory", label: "Are there regulatory findings or audit issues related to this process?", hint: "Examiners or auditors have flagged control gaps" },
    { key: "q_workarounds", label: "Have workarounds or manual patches been added over time?", hint: "Band-aids applied instead of fixing the root cause" },
    { key: "q_inconsistent", label: "Do different teams or branches do this process differently?", hint: "No standard way — everyone has their own method" },
  ];

  const exclusions = [
    { key: "e_lean", label: "This process was already optimized within the last 6 months", hint: "Recent Lean/Six Sigma work with documented SOP" },
    { key: "e_tech", label: "The problem is a pure technology limitation (not a process issue)", hint: "System capacity, integration gap, or vendor constraint" },
    { key: "e_policy", label: "This process is driven by regulatory or policy mandate requiring specific steps", hint: "Steps cannot be eliminated regardless of efficiency" },
    { key: "e_volume", label: "Volume is too low to justify PI investment (<50 transactions/month)", hint: "Not enough scale to realize meaningful savings" },
    { key: "e_onetime", label: "This is a one-time or project-based event (not recurring)", hint: "Won't repeat after this instance" },
  ];

  const piScore = questions.filter(q => data[q.key] === "Yes").length;
  const exclusionScore = exclusions.filter(e => data[e.key] === "Yes").length;

  let recommendation, recColor, recIcon, recDesc, canProceed;
  if (exclusionScore >= 3) {
    recommendation = "NOT RECOMMENDED FOR PI";
    recColor = COLORS.red;
    recIcon = "🚫";
    recDesc = "This process has multiple characteristics that indicate PI is not the right investment. See routing recommendations below.";
    canProceed = false;
  } else if (piScore >= 3) {
    recommendation = "STRONG PI CANDIDATE";
    recColor = COLORS.emerald;
    recIcon = "✅";
    recDesc = "This process shows clear signs of improvement potential. Proceed to the PI Assessment & Calculator.";
    canProceed = true;
  } else if (piScore >= 1) {
    recommendation = "BORDERLINE — REVIEW RECOMMENDED";
    recColor = COLORS.yellow;
    recIcon = "⚠️";
    recDesc = "Some indicators of improvement potential exist. Leadership review recommended before committing to a full PI engagement.";
    canProceed = true;
  } else {
    recommendation = "COMPLETE ASSESSMENT TO DETERMINE";
    recColor = COLORS.slate;
    recIcon = "❓";
    recDesc = "Answer the questions above to get a recommendation.";
    canProceed = false;
  }

  const alternativeRoutes = exclusionScore >= 3 ? [
    exclusions.find(e => data[e.key] === "Yes" && e.key === "e_tech") ? "→ Route to IT for technology assessment" : null,
    exclusions.find(e => data[e.key] === "Yes" && e.key === "e_policy") ? "→ Route to Compliance for policy review" : null,
    exclusions.find(e => data[e.key] === "Yes" && e.key === "e_lean") ? "→ Process recently optimized — proceed directly to Automation Readiness" : null,
    exclusions.find(e => data[e.key] === "Yes" && e.key === "e_volume") ? "→ Monitor volume; revisit if transactions increase above 50/month" : null,
  ].filter(Boolean) : [];

  return (
    <div>
      <SectionTitle subtitle={`Evaluating: ${intake.processName || "—"} | ${intake.department || "—"}`}>
        🔍 PI Triage Gate — Is This Process a Candidate?
      </SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>
            PI Candidate Indicators ({piScore}/8)
          </h3>
          {questions.map(q => (
            <YesNo key={q.key} label={q.label} hint={q.hint} value={data[q.key] || ""} onChange={v => update(q.key, v)} />
          ))}
        </Card>

        <div>
          <Card style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.red, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>
              PI Exclusion Factors ({exclusionScore}/5)
            </h3>
            {exclusions.map(e => (
              <YesNo key={e.key} label={e.label} hint={e.hint} value={data[e.key] || ""} onChange={v => update(e.key, v)} />
            ))}
          </Card>

          <Card style={{ border: `2px solid ${recColor}33`, background: recColor + "0A" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{recIcon}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: recColor, marginBottom: 8 }}>{recommendation}</div>
              <p style={{ fontSize: 13, color: COLORS.slateLight, margin: "0 0 16px" }}>{recDesc}</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 8 }}>
                <MetricBox label="PI Signals" value={piScore} color={COLORS.emerald} />
                <MetricBox label="Exclusions" value={exclusionScore} color={COLORS.red} />
              </div>
            </div>
            {alternativeRoutes.length > 0 && (
              <div style={{ marginTop: 16, borderTop: `1px solid ${COLORS.navyMid}`, paddingTop: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.slate, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.6 }}>Recommended Routing:</p>
                {alternativeRoutes.map((r, i) => (
                  <p key={i} style={{ fontSize: 13, color: COLORS.slateLight, margin: "4px 0" }}>{r}</p>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between" }}>
        <Btn onClick={onBack} variant="secondary">← Back</Btn>
        {canProceed && <Btn onClick={onNext}>Proceed to PI Assessment →</Btn>}
        {!canProceed && piScore === 0 && exclusionScore === 0 && (
          <span style={{ fontSize: 13, color: COLORS.slate, alignSelf: "center" }}>Complete the assessment above to continue</span>
        )}
      </div>
    </div>
  );
}

// ─── STAGE 3: PI ASSESSMENT & CALCULATOR ─────────────────────────────────────
function Stage3({ data, setData, intake, onNext, onBack }) {
  const update = (k, v) => setData(p => ({ ...p, [k]: v }));

  const maturityQuestions = [
    { key: "m_mapped", label: "Has this process been formally mapped (value stream or process flow)?", piBoost: 10 },
    { key: "m_sop", label: "Are there documented, up-to-date SOPs/procedures?", piBoost: 8 },
    { key: "m_consistent", label: "Do all teams perform this process the same way?", piBoost: 12 },
    { key: "m_rework", label: "Is rework less than 10% of transactions?", piBoost: 10 },
    { key: "m_handoffs", label: "Are there 5 or fewer handoffs in this process?", piBoost: 8 },
    { key: "m_reviewed", label: "Has this process been reviewed/improved in the last 3 years?", piBoost: 7 },
  ];

  const maturityScore = maturityQuestions.filter(q => data[q.key] === "Yes").length;
  const maturityLevel = maturityScore >= 5 ? "High" : maturityScore >= 3 ? "Medium" : "Low";
  const improvementPct = maturityLevel === "High" ? 12 : maturityLevel === "Medium" ? 20 : 30;
  const variancePct = maturityQuestions.filter(q => data[q.key] !== "Yes").reduce((s, q) => s + q.piBoost, 0);

  const salary = parseFloat(intake.avgSalary) || 0;
  const ftes = parseFloat(intake.ftes) || 0;
  const salaryMultiplier = intake.salaryLoaded === "no" ? 1.32 : 1;
  const currentAnnualCost = salary * salaryMultiplier * ftes;
  const piSavings = currentAnnualCost * (improvementPct / 100);
  const improvedCost = currentAnnualCost - piSavings;

  const autoRate = parseFloat(data.automationPct) || 60;
  const traditionalAutoSavings = currentAnnualCost * (autoRate / 100);
  const leanboticsAutoSavings = improvedCost * (autoRate / 100);
  const totalLeanboticsROI = piSavings + leanboticsAutoSavings;
  const uplift = totalLeanboticsROI - traditionalAutoSavings;

  const processType = intake.processType;
  const benchmarks = {
    mortgage: { low: 35, high: 45 }, ofac: { low: 25, high: 30 },
    account: { low: 20, high: 25 }, wire: { low: 30, high: 40 },
    compliance: { low: 20, high: 35 }, other: { low: 20, high: 35 }
  };
  const bench = benchmarks[processType] || benchmarks.other;

  return (
    <div>
      <SectionTitle subtitle={`Process: ${intake.processName || "—"} | Current Annual Cost: ${fmt(currentAnnualCost)}`}>
        📊 PI Assessment & Leanbotics™ Calculator
      </SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 4, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>Process Maturity Assessment</h3>
          <p style={{ fontSize: 12, color: COLORS.slate, marginBottom: 16 }}>Answer YES if the condition currently exists. Higher maturity = less improvement room.</p>
          {maturityQuestions.map(q => (
            <YesNo key={q.key} label={q.label} value={data[q.key] || ""} onChange={v => update(q.key, v)} />
          ))}
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card style={{ border: `1.5px solid ${COLORS.gold}44` }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>Process Maturity Result</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: maturityLevel === "High" ? COLORS.emerald + "22" : maturityLevel === "Medium" ? COLORS.yellow + "22" : COLORS.red + "22",
                border: `3px solid ${maturityLevel === "High" ? COLORS.emerald : maturityLevel === "Medium" ? COLORS.yellow : COLORS.red}`,
                fontSize: 11, fontWeight: 800, color: maturityLevel === "High" ? COLORS.emerald : maturityLevel === "Medium" ? COLORS.yellow : COLORS.red, letterSpacing: 0.5
              }}>{maturityLevel.toUpperCase()}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.white }}>{maturityScore}/6 Maturity Factors</div>
                <div style={{ fontSize: 13, color: COLORS.slate, marginTop: 2 }}>Expected PI Improvement: <span style={{ color: COLORS.gold, fontWeight: 700 }}>{improvementPct}%</span></div>
              </div>
            </div>
            <ProgressBar value={maturityScore} max={6} color={maturityLevel === "High" ? COLORS.emerald : maturityLevel === "Medium" ? COLORS.yellow : COLORS.red} />
            <div style={{ marginTop: 12, padding: "10px 14px", background: COLORS.navy, borderRadius: 8 }}>
              <p style={{ fontSize: 12, color: COLORS.slate, margin: 0 }}>
                <strong style={{ color: COLORS.slateLight }}>Industry Benchmark ({processType || "General"}):</strong> {bench.low}–{bench.high}% improvement potential
              </p>
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>Leanbotics™ ROI Calculator</h3>
            <Input label="Expected Automation Rate (%)" type="number" min="0" max="100" value={data.automationPct || "60"}
              onChange={e => update("automationPct", e.target.value)} hint="Typical RPA automation: 40–80% of process steps" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <MetricBox label="Current Annual Cost" value={fmt(currentAnnualCost)} color={COLORS.slate} />
              <MetricBox label="PI Savings" value={fmt(piSavings)} color={COLORS.emerald} />
              <MetricBox label="Traditional Auto ROI" value={fmt(traditionalAutoSavings)} color={COLORS.yellow} />
              <MetricBox label="Leanbotics™ ROI" value={fmt(totalLeanboticsROI)} color={COLORS.gold} />
            </div>
            <div style={{ background: COLORS.emerald + "11", border: `1px solid ${COLORS.emerald}33`, borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.emerald }}>
                Leanbotics™ Advantage: +{fmt(uplift)} ({Math.round((uplift / Math.max(traditionalAutoSavings, 1)) * 100)}% more ROI vs. automating as-is)
              </div>
              <p style={{ fontSize: 12, color: COLORS.slate, margin: "6px 0 0" }}>
                By optimizing first, then automating, you compound the savings. Don't pave the cow path.
              </p>
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 12, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>PI Phase Roadmap</h3>
            {[
              { phase: "DEFINE", weeks: "1–2 wks", desc: "Scope, charter, team assembly, KPI baseline" },
              { phase: "MEASURE", weeks: "2–3 wks", desc: "Value stream map, data collection, waste quantification" },
              { phase: "ANALYZE", weeks: "1–2 wks", desc: "Root cause, TIMWOODS waste analysis, bottleneck ID" },
              { phase: "IMPROVE", weeks: "4–6 wks", desc: "Future state design, quick wins, pilot & validate" },
              { phase: "CONTROL", weeks: "2 wks", desc: "SOPs, dashboards, handoff to automation assessment" },
            ].map((p, i) => (
              <div key={p.phase} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: COLORS.gold + "22",
                  border: `1.5px solid ${COLORS.gold}`, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, color: COLORS.gold, flexShrink: 0
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>{p.phase}</span>
                    <span style={{ fontSize: 11, color: COLORS.slate }}>{p.weeks}</span>
                  </div>
                  <span style={{ fontSize: 12, color: COLORS.slate }}>{p.desc}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between" }}>
        <Btn onClick={onBack} variant="secondary">← Back</Btn>
        <Btn onClick={onNext}>Proceed to Automation Readiness →</Btn>
      </div>
    </div>
  );
}

// ─── STAGE 4: AUTOMATION READINESS ───────────────────────────────────────────
function Stage4({ data, setData, intake, triage, piData, onNext, onBack }) {
  const update = (k, v) => setData(p => ({ ...p, [k]: v }));

  const volume = parseFloat(intake.monthlyVolume) || 0;
  const errorRate = parseFloat(intake.errorRate) || parseFloat(data.errorRate) || 0;
  const handoffs = parseFloat(intake.handoffs) || parseFloat(data.handoffs) || 0;
  const steps = parseFloat(data.processSteps) || 10;
  const digitalPct = parseFloat(data.digitalInputs) || 0;
  const sopExists = data.sopDocumented === "Yes";
  const rulesBased = data.rulesBased === "Yes";
  const consistentProcess = data.processConsistent === "Yes";

  // Volume Score (0–20): ≥500/mo = 20, scales down
  const volScore = Math.min(20, Math.round((volume / 500) * 20));
  // Standardization Score (0–20): SOP + consistent + rules-based
  const stdScore = Math.round((sopExists ? 8 : 0) + (consistentProcess ? 7 : 0) + (rulesBased ? 5 : 0));
  // Complexity Score (0–20): fewer steps = higher score
  const compScore = steps <= 10 ? 20 : Math.max(0, Math.round(20 - (steps - 10) * 2));
  // Consistency Score (0–20): low exception rate
  const conScore = errorRate <= 10 ? 20 : Math.max(0, Math.round(20 - (errorRate - 10) * 2));
  // Digital Input Score (0–20): % of structured/digital inputs
  const digScore = Math.round((digitalPct / 100) * 20);

  const totalScore = volScore + stdScore + compScore + conScore + digScore;

  const scoreColor = totalScore >= 80 ? COLORS.emerald : totalScore >= 60 ? COLORS.yellow : COLORS.red;
  const scoreLabel = totalScore >= 80 ? "READY FOR AUTOMATION" : totalScore >= 60 ? "PARTIALLY READY" : "NOT YET READY";
  const scoreDesc = totalScore >= 80
    ? "This process meets automation readiness criteria. Proceed to PrimeOne for POPPI™ scoring and BCR analysis."
    : totalScore >= 60
    ? "Process shows promise but requires targeted improvements in 1–2 factors before automation assessment."
    : "Process has fundamental gaps in standardization, complexity, or consistency. Return to PI to address root issues first.";

  const factors = [
    { label: "Volume", score: volScore, max: 20, detail: `${fmtNum(volume)}/mo → ${volScore}/20` },
    { label: "Standardization", score: stdScore, max: 20, detail: `SOP + Consistent + Rules-Based → ${stdScore}/20` },
    { label: "Complexity", score: compScore, max: 20, detail: `${steps} steps → ${compScore}/20` },
    { label: "Consistency", score: conScore, max: 20, detail: `${errorRate}% exception rate → ${conScore}/20` },
    { label: "Digital Inputs", score: digScore, max: 20, detail: `${digitalPct}% structured → ${digScore}/20` },
  ];

  return (
    <div>
      <SectionTitle subtitle={`Process: ${intake.processName || "—"} | Post-PI Readiness Evaluation`}>
        ⚙️ Automation Readiness Assessment
      </SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>Readiness Inputs</h3>

          <Input label="Number of Process Steps (post-PI)" type="number" value={data.processSteps || ""} onChange={e => update("processSteps", e.target.value)}
            placeholder="e.g. 8" hint="Count all steps in the optimized process" />
          <Input label="Exception / Error Rate (%) post-PI" type="number" step="0.5" value={data.errorRate || intake.errorRate || ""} onChange={e => update("errorRate", e.target.value)}
            placeholder="e.g. 8" hint="After PI improvements, what is the expected exception rate?" />
          <Input label="% of Inputs That Are Structured / Digital" type="number" value={data.digitalInputs || ""} onChange={e => update("digitalInputs", e.target.value)}
            placeholder="e.g. 75" hint="PDFs, emails, web forms, system outputs — not hand-written or verbal" />
          <YesNo label="Is the process fully documented with an up-to-date SOP?" value={data.sopDocumented || ""} onChange={v => update("sopDocumented", v)} />
          <YesNo label="Is the process performed consistently (same way every time)?" value={data.processConsistent || ""} onChange={v => update("processConsistent", v)} />
          <YesNo label="Are decisions in this process primarily rule-based (not judgment/discretion)?" value={data.rulesBased || ""} onChange={v => update("rulesBased", v)} hint="e.g. 'If X then Y' — clear rules, not grey areas" />
          <YesNo label="Are there available APIs or structured data exports from source systems?" value={data.apiAvailable || ""} onChange={v => update("apiAvailable", v)} />
          <YesNo label="Has a process owner been designated and is committed to automation?" value={data.ownerCommitted || ""} onChange={v => update("ownerCommitted", v)} />
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card style={{ border: `2px solid ${scoreColor}44` }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: scoreColor, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>Automation Readiness Score</h3>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 56, fontWeight: 900, color: scoreColor, lineHeight: 1 }}>{totalScore}</div>
              <div style={{ fontSize: 11, color: COLORS.slate, marginTop: 4 }}>out of 100</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: scoreColor, marginTop: 8 }}>{scoreLabel}</div>
            </div>
            <ProgressBar value={totalScore} max={100} color={scoreColor} />
            <p style={{ fontSize: 13, color: COLORS.slateLight, marginTop: 12, textAlign: "center" }}>{scoreDesc}</p>
          </Card>

          <Card>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>Score Breakdown (5 Factors)</h3>
            {factors.map(f => (
              <div key={f.label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: COLORS.white, fontWeight: 600 }}>{f.label}</span>
                  <span style={{ fontSize: 12, color: COLORS.slate }}>{f.detail}</span>
                </div>
                <ProgressBar value={f.score} max={f.max} color={f.score >= f.max * 0.7 ? COLORS.emerald : f.score >= f.max * 0.4 ? COLORS.yellow : COLORS.red} />
              </div>
            ))}
          </Card>

          <Card style={{ background: "#0B1F3A" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, marginBottom: 12, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>Readiness Thresholds</h3>
            {[
              { range: "80–100", label: "Ready for Automation", desc: "Proceed to PrimeOne POPPI™ scoring", color: COLORS.emerald },
              { range: "60–79", label: "Partially Ready", desc: "Target 1–2 factor improvements first", color: COLORS.yellow },
              { range: "0–59", label: "Not Ready", desc: "Return to PI — address root issues", color: COLORS.red },
            ].map(t => (
              <div key={t.range} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                borderBottom: `1px solid ${COLORS.navyMid}`
              }}>
                <div style={{ width: 44, fontSize: 11, fontWeight: 800, color: t.color }}>{t.range}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.color }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: COLORS.slate }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between" }}>
        <Btn onClick={onBack} variant="secondary">← Back</Btn>
        {totalScore >= 60 ? (
          <Btn onClick={() => onNext(totalScore)} variant={totalScore >= 80 ? "primary" : "secondary"}>
            {totalScore >= 80 ? "Proceed to PrimeOne POPPI™ →" : "Proceed to PrimeOne (with Caution) →"}
          </Btn>
        ) : (
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ fontSize: 13, color: COLORS.red, alignSelf: "center" }}>Score below 60 — return to PI phase</span>
            <Btn onClick={onBack} variant="danger">↩ Return to PI Assessment</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STAGE 5: PRIMEONE POPPI™ ─────────────────────────────────────────────────
function Stage5({ intake, piData, readinessScore, data, setData, onBack }) {
  const update = (k, v) => setData(p => ({ ...p, [k]: v }));

  const salary = parseFloat(intake.avgSalary) || 0;
  const ftes = parseFloat(intake.ftes) || 0;
  const salaryMultiplier = intake.salaryLoaded === "no" ? 1.32 : 1;
  const currentAnnualCost = salary * salaryMultiplier * ftes;
  const improvementPct = piData.maturityLevel === "High" ? 12 : piData.maturityLevel === "Medium" ? 20 : 30;
  const improvedCost = currentAnnualCost * (1 - improvementPct / 100);
  const autoRate = parseFloat(piData.automationPct) || 60;
  const annualSavings = improvedCost * (autoRate / 100);

  const implCost = parseFloat(data.implCost) || 0;
  const annualMaint = parseFloat(data.annualMaint) || Math.round(implCost * 0.18);
  const years = parseFloat(data.investYears) || 3;

  const totalBenefit = annualSavings * years;
  const totalCost = implCost + (annualMaint * years);
  const bcr = totalCost > 0 ? (totalBenefit / totalCost).toFixed(2) : "—";
  const netBenefit = totalBenefit - totalCost;
  const paybackMonths = annualSavings > 0 ? Math.round((implCost / (annualSavings / 12))) : 0;

  // POPPI™ Score (Process Optimization & Predictive Performance Index)
  const vol = parseFloat(intake.monthlyVolume) || 0;
  const volPOPPI = Math.min(25, Math.round((vol / 500) * 25));
  const complexPOPPI = data.processComplexity === "Low" ? 25 : data.processComplexity === "Medium" ? 18 : 10;
  const stabilityPOPPI = data.processStability === "Stable" ? 25 : data.processStability === "Moderate" ? 18 : 8;
  const roiPOPPI = bcr !== "—" && parseFloat(bcr) >= 3 ? 25 : bcr !== "—" && parseFloat(bcr) >= 2 ? 18 : 10;
  const poppiScore = volPOPPI + complexPOPPI + stabilityPOPPI + roiPOPPI;
  const poppiLevel = poppiScore >= 80 ? "PRIME" : poppiScore >= 60 ? "HIGH" : poppiScore >= 40 ? "MODERATE" : "LOW";
  const poppiColor = poppiScore >= 80 ? COLORS.gold : poppiScore >= 60 ? COLORS.emerald : poppiScore >= 40 ? COLORS.yellow : COLORS.red;

  const autoApproach = data.processComplexity === "Low"
    ? "Attended / Unattended RPA"
    : data.processComplexity === "Medium"
    ? "Unattended RPA + IDP (ABBYY Vantage)"
    : "Intelligent Automation (RPA + AI + IDP)";

  const isAuditable = data.auditTrail === "Yes" && data.dataRetention === "Yes";

  return (
    <div>
      <SectionTitle subtitle={`Process: ${intake.processName || "—"} | Readiness Score: ${readinessScore}/100 | Automation Candidate Confirmed`}>
        🚀 PrimeOne POPPI™ — Automation Intelligence Dashboard
      </SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>POPPI™ Scoring Inputs</h3>
            <Select label="Process Complexity" value={data.processComplexity || ""} onChange={e => update("processComplexity", e.target.value)}
              options={[
                { value: "", label: "— Select —" },
                { value: "Low", label: "Low — linear, minimal decisions, structured inputs" },
                { value: "Medium", label: "Medium — moderate branching, some exceptions, mixed inputs" },
                { value: "High", label: "High — complex logic, many exceptions, unstructured data" },
              ]} />
            <Select label="Process Stability" value={data.processStability || ""} onChange={e => update("processStability", e.target.value)}
              options={[
                { value: "", label: "— Select —" },
                { value: "Stable", label: "Stable — rarely changes, locked-in rules" },
                { value: "Moderate", label: "Moderate — minor updates every 12–18 months" },
                { value: "Volatile", label: "Volatile — frequent regulatory or policy changes" },
              ]} />
            <YesNo label="Does this process require a complete audit trail?" value={data.auditTrail || ""} onChange={v => update("auditTrail", v)} hint="Every action, decision, and exception must be logged" />
            <YesNo label="Is data retention required for this process?" value={data.dataRetention || ""} onChange={v => update("dataRetention", v)} hint="Records must be maintained for regulatory/compliance purposes" />
            <Select label="Primary System(s) Involved" value={data.primarySystem || ""} onChange={e => update("primarySystem", e.target.value)}
              options={[
                { value: "", label: "— Select primary system —" },
                { value: "encompass", label: "Encompass (Mortgage LOS)" },
                { value: "ibs", label: "IBS / Core Banking" },
                { value: "jack_henry", label: "Jack Henry" },
                { value: "fiserv", label: "Fiserv" },
                { value: "salesforce", label: "Salesforce" },
                { value: "sharepoint", label: "SharePoint / Office 365" },
                { value: "email", label: "Email / Outlook" },
                { value: "other", label: "Other / Multiple" },
              ]} />
            <YesNo label="Are there available APIs or structured data exports?" value={data.apiReady || ""} onChange={v => update("apiReady", v)} />
          </Card>

          <Card>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>BCR Investment Inputs</h3>
            <Input label="Estimated Implementation Cost ($)" type="number" value={data.implCost || ""} onChange={e => update("implCost", e.target.value)}
              placeholder="e.g. 79000" hint="Development, testing, UAT, and deployment costs" />
            <Input label="Annual Maintenance Cost ($)" type="number" value={data.annualMaint || ""} onChange={e => update("annualMaint", e.target.value)}
              placeholder={`e.g. ${Math.round((parseFloat(data.implCost) || 0) * 0.18)}`} hint="Typically 18% of implementation cost annually" />
            <Input label="Investment Horizon (years)" type="number" min="1" max="5" value={data.investYears || "3"} onChange={e => update("investYears", e.target.value)} />
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card style={{ border: `2px solid ${poppiColor}66`, background: poppiColor + "08" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: poppiColor, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>POPPI™ Score — Automation Priority Index</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 52, fontWeight: 900, color: poppiColor, lineHeight: 1 }}>{poppiScore}</div>
                <div style={{ fontSize: 11, color: COLORS.slate }}>/ 100</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: poppiColor, marginBottom: 4 }}>POPPI™ TIER: {poppiLevel}</div>
                <div style={{ fontSize: 12, color: COLORS.slate }}>
                  {poppiLevel === "PRIME" ? "Highest priority — immediate automation candidate" :
                    poppiLevel === "HIGH" ? "Strong candidate — include in next sprint" :
                      poppiLevel === "MODERATE" ? "Candidate — plan for 6–12 month horizon" :
                        "Low priority — reassess after additional PI"}
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Volume", val: volPOPPI, max: 25 },
                { label: "Complexity", val: complexPOPPI, max: 25 },
                { label: "Stability", val: stabilityPOPPI, max: 25 },
                { label: "ROI Strength", val: roiPOPPI, max: 25 },
              ].map(f => (
                <div key={f.label} style={{ background: COLORS.navy, borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: COLORS.slate }}>{f.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.white }}>{f.val}/{f.max}</span>
                  </div>
                  <ProgressBar value={f.val} max={f.max} color={poppiColor} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 16, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>BCR Analysis — {years}-Year Horizon</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <MetricBox label="Annual Savings" value={fmt(annualSavings)} color={COLORS.emerald} />
              <MetricBox label={`${years}-Yr Total Benefit`} value={fmt(totalBenefit)} color={COLORS.emerald} />
              <MetricBox label="Total Investment" value={fmt(totalCost)} color={COLORS.red} />
              <MetricBox label="Net Benefit" value={fmt(netBenefit)} color={netBenefit > 0 ? COLORS.emerald : COLORS.red} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{
                flex: 1, background: parseFloat(bcr) >= 2 ? COLORS.emerald + "11" : COLORS.yellow + "11",
                border: `1.5px solid ${parseFloat(bcr) >= 2 ? COLORS.emerald : COLORS.yellow}33`,
                borderRadius: 10, padding: "14px 16px", textAlign: "center"
              }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: parseFloat(bcr) >= 2 ? COLORS.emerald : COLORS.yellow }}>{bcr}:1</div>
                <div style={{ fontSize: 11, color: COLORS.slate, textTransform: "uppercase", letterSpacing: 0.8, marginTop: 4 }}>Benefit-Cost Ratio</div>
                <div style={{ fontSize: 11, color: COLORS.slate, marginTop: 2 }}>Target: ≥2.0:1</div>
              </div>
              <div style={{
                flex: 1, background: COLORS.gold + "11", border: `1.5px solid ${COLORS.gold}33`,
                borderRadius: 10, padding: "14px 16px", textAlign: "center"
              }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.gold }}>{paybackMonths}</div>
                <div style={{ fontSize: 11, color: COLORS.slate, textTransform: "uppercase", letterSpacing: 0.8, marginTop: 4 }}>Months to Payback</div>
                <div style={{ fontSize: 11, color: COLORS.slate, marginTop: 2 }}>Target: ≤18 months</div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, marginBottom: 12, marginTop: 0, textTransform: "uppercase", letterSpacing: 0.6 }}>Automation Intelligence Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.navyMid}` }}>
                <span style={{ fontSize: 13, color: COLORS.slate }}>Recommended Approach</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>{autoApproach}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.navyMid}` }}>
                <span style={{ fontSize: 13, color: COLORS.slate }}>Auditability</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: isAuditable ? COLORS.emerald : COLORS.yellow }}>
                  {isAuditable ? "✅ Full Audit Trail Required" : "⚠️ Standard Logging"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.navyMid}` }}>
                <span style={{ fontSize: 13, color: COLORS.slate }}>Primary System</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>{data.primarySystem || "—"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.navyMid}` }}>
                <span style={{ fontSize: 13, color: COLORS.slate }}>API Available</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: data.apiReady === "Yes" ? COLORS.emerald : COLORS.yellow }}>{data.apiReady || "—"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                <span style={{ fontSize: 13, color: COLORS.slate }}>Est. Build Timeline</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>
                  {data.processComplexity === "Low" ? "6–10 weeks" : data.processComplexity === "Medium" ? "10–16 weeks" : "16–24 weeks"}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between" }}>
        <Btn onClick={onBack} variant="secondary">← Back</Btn>
        <Btn variant="success" onClick={() => alert("Export to PrimeOne pipeline — connect your PrimeOne tenant to activate this feature.")}>
          📤 Export to PrimeOne Pipeline
        </Btn>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [stage, setStage] = useState(1);
  const [intakeData, setIntakeData] = useState({});
  const [triageData, setTriageData] = useState({});
  const [piAssessData, setPiAssessData] = useState({});
  const [readinessData, setReadinessData] = useState({});
  const [primeOneData, setPrimeOneData] = useState({});
  const [readinessScore, setReadinessScore] = useState(0);

  const maturityScore = ["m_mapped", "m_sop", "m_consistent", "m_rework", "m_handoffs", "m_reviewed"].filter(k => piAssessData[k] === "Yes").length;
  const maturityLevel = maturityScore >= 5 ? "High" : maturityScore >= 3 ? "Medium" : "Low";
  const piDataForNext = { ...piAssessData, maturityLevel };

  return (
    <div style={{
      minHeight: "100vh",
      background: `#FFFFFF`,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: COLORS.white,
    }}>
      {/* Header */}
      <div style={{
        background: `#FFFFFF`,
        borderBottom: `2px solid #C9A84C`,
        padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, #0B1F3A, #1A3458)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
            }}>P</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#0B1F3A", letterSpacing: -0.3 }}>Primus Pipeline™</div>
              <div style={{ fontSize: 10, color: "#C9A84C", letterSpacing: 1.2, textTransform: "uppercase" }}>PI → Automation End-to-End</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: COLORS.slate }}>
            {intakeData.processName && <span style={{color:"#4A6080"}}>Process: <strong style={{ color: "#0B1F3A" }}>{intakeData.processName}</strong></span>}
          </div>
        </div>
      </div>

      {/* Stage Navigator */}
      <div style={{ background: "#FFFFFF", borderBottom: `2px solid #C9A84C`, padding: "0 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 0 }}>
          {STAGES.map((s, i) => {
            const isActive = stage === s.id;
            const isComplete = stage > s.id;
            return (
              <div key={s.id} style={{
                display: "flex", alignItems: "center", padding: "14px 20px",
                borderBottom: isActive ? `3px solid #C9A84C` : "3px solid transparent",
                cursor: isComplete ? "pointer" : "default",
                opacity: stage < s.id ? 0.4 : 1,
                transition: "all 0.2s"
              }} onClick={() => isComplete && setStage(s.id)}>
                <span style={{ fontSize: 14, marginRight: 8 }}>{s.icon}</span>
                <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? "#C9A84C" : "#4A6080" }}>
                  {s.short}
                </span>
                {isComplete && <span style={{ marginLeft: 6, color: COLORS.emerald, fontSize: 12 }}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px" }}>
        {stage === 1 && <Stage1 data={intakeData} setData={setIntakeData} onNext={() => setStage(2)} />}
        {stage === 2 && <Stage2 data={triageData} setData={setTriageData} intake={intakeData} onNext={() => setStage(3)} onBack={() => setStage(1)} />}
        {stage === 3 && <Stage3 data={piAssessData} setData={setPiAssessData} intake={intakeData} onNext={() => setStage(4)} onBack={() => setStage(2)} />}
        {stage === 4 && <Stage4 data={readinessData} setData={setReadinessData} intake={intakeData} triage={triageData} piData={piDataForNext} onNext={(score) => { setReadinessScore(score); setStage(5); }} onBack={() => setStage(3)} />}
        {stage === 5 && <Stage5 intake={intakeData} piData={piDataForNext} readinessScore={readinessScore} data={primeOneData} setData={setPrimeOneData} onBack={() => setStage(4)} />}
      </div>
    </div>
  );
}
