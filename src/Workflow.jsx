import { useState } from "react";

const stages = [
  {
    id: 1,
    tool: "PRIMO",
    label: "Process Intake",
    icon: "📋",
    color: "#0B3D91",
    lightColor: "#E8F0FE",
    borderColor: "#0B3D91",
    description: "Client or internal team submits a process for evaluation through Primo — Primus's intelligent intake engine.",
    inputs: ["Process name & owner", "Monthly transaction volume", "FTE count & salary data", "Cycle time & error rates", "Number of handoffs"],
    outputs: ["Structured process profile", "Baseline cost calculation", "Process fingerprint"],
    decision: null,
  },
  {
    id: 2,
    tool: "PRIMO",
    label: "PI Triage Gate",
    icon: "🔍",
    color: "#7B3F00",
    lightColor: "#FFF3E0",
    borderColor: "#E65100",
    description: "Primo automatically evaluates 8 PI candidate signals against 5 exclusion factors to determine if process improvement is warranted.",
    inputs: ["Process profile from Stage 1", "8 PI candidate indicators", "5 exclusion factors"],
    outputs: ["PI recommendation score", "Routing decision", "Alternative pathway if excluded"],
    decision: {
      yes: "Proceed to PI Assessment",
      no: "Route to IT / Compliance / Monitor",
      partial: "Leadership review recommended",
    },
  },
  {
    id: 3,
    tool: "PRIMO",
    label: "PI Assessment & Leanbotics™",
    icon: "📊",
    color: "#1A7A44",
    lightColor: "#E8F5E9",
    borderColor: "#1A7A44",
    description: "Primo scores process maturity across 6 dimensions and calculates the Leanbotics™ ROI — the compound benefit of optimizing before automating.",
    inputs: ["6 maturity factor responses", "Expected automation rate", "Current process cost"],
    outputs: ["Maturity level (Low/Med/High)", "Expected PI improvement %", "Leanbotics™ ROI vs. traditional ROI", "DMAIC phase roadmap"],
    decision: null,
  },
  {
    id: 4,
    tool: "PRIMO",
    label: "Automation Readiness Score",
    icon: "⚙️",
    color: "#6A1B9A",
    lightColor: "#F3E5F5",
    borderColor: "#6A1B9A",
    description: "After PI is complete, Primo scores the optimized process across 5 automation readiness factors on a 0–100 scale.",
    inputs: ["Post-PI process steps", "Exception rate", "% digital inputs", "SOP documentation status", "Rule-based decision assessment"],
    outputs: ["Automation Readiness Score (0–100)", "Factor-by-factor breakdown", "Pass/Fail gate decision"],
    decision: {
      yes: "Score ≥80: Proceed to PrimeOne",
      no: "Score <60: Return to PI phase",
      partial: "Score 60–79: Targeted improvements needed",
    },
  },
  {
    id: 5,
    tool: "PRIMEONE",
    label: "POPPI™ Scoring & BCR Analysis",
    icon: "🚀",
    color: "#C9A84C",
    lightColor: "#FFFDE7",
    borderColor: "#C9A84C",
    description: "PrimeOne takes over with its proprietary POPPI™ scoring methodology, full BCR analysis, auditability assessment, and automation intelligence.",
    inputs: ["Process complexity & stability", "Audit & compliance requirements", "Primary systems involved", "Implementation cost estimate"],
    outputs: ["POPPI™ Score & Tier (Prime/High/Moderate/Low)", "Benefit-Cost Ratio", "Payback period in months", "Recommended automation approach", "Build timeline estimate", "Auditability flag"],
    decision: null,
  },
];

const alternativeRoutes = [
  { label: "IT Assessment", desc: "Pure technology limitation — not a process issue", color: "#546E7A" },
  { label: "Compliance Review", desc: "Regulatory mandate requiring specific steps", color: "#546E7A" },
  { label: "Monitor & Revisit", desc: "Volume too low (<50/mo) or one-time event", color: "#546E7A" },
  { label: "Skip to Readiness", desc: "Process recently optimized (<6 months)", color: "#1A7A44" },
];

export default function App() {
  const [active, setActive] = useState(1);
  const selected = stages.find(s => s.id === active);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F4F7FB",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#0B1F3A",
    }}>
      {/* Header */}
      <div style={{
        background: "#FFFFFF",
        borderBottom: "3px solid #C9A84C",
        padding: "24px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: "linear-gradient(135deg, #0B1F3A, #1A3458)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, color: "#C9A84C", fontWeight: 900
            }}>P</div>
            <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: -0.5, color: "#0B1F3A" }}>
              Primus Pipeline™
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#4A6080", letterSpacing: 1.2, textTransform: "uppercase" }}>
            End-to-End Process Improvement → Automation Workflow
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#4A6080", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Powered By</div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: "#E8F0FE", color: "#0B3D91", border: "1.5px solid #0B3D91"
            }}>PRIMO</span>
            <span style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: "#FFFDE7", color: "#B7770D", border: "1.5px solid #C9A84C"
            }}>PRIMEONE</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "40px 48px", maxWidth: 1300, margin: "0 auto" }}>

        {/* Executive Summary */}
        <div style={{
          background: "#0B1F3A", borderRadius: 12, padding: "28px 36px",
          marginBottom: 40, border: "1px solid #1A3458"
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#C9A84C", marginBottom: 12, marginTop: 0, letterSpacing: 1, textTransform: "uppercase" }}>
            Executive Overview
          </h2>
          <p style={{ fontSize: 15, color: "#C5D4E8", margin: "0 0 16px", lineHeight: 1.7 }}>
            The Primus Pipeline™ is an integrated, end-to-end methodology that moves organizations from <strong style={{ color: "#FFFFFF" }}>process submission to automation deployment</strong> through five structured gates — ensuring no process is automated before it is optimized, and no investment is made without a validated business case.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { label: "Intake Tool", value: "Primo", sub: "Stages 1–4" },
              { label: "Discovery Engine", value: "PrimeOne", sub: "Stage 5" },
              { label: "Scoring Method", value: "POPPI™", sub: "Automation Priority" },
              { label: "ROI Model", value: "Leanbotics™", sub: "PI + Automation Compound" },
            ].map(m => (
              <div key={m.label} style={{
                background: "#122848", borderRadius: 8, padding: "14px 16px",
                border: "1px solid #1A3458", textAlign: "center"
              }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#C9A84C" }}>{m.value}</div>
                <div style={{ fontSize: 10, color: "#8FA3BF", textTransform: "uppercase", letterSpacing: 0.8, marginTop: 2 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: "#4A6080", marginTop: 4 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Flow */}
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "#4A6080", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 20 }}>
          Pipeline Flow — Click Any Stage to Explore
        </h2>

        {/* Stage Selector */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32, gap: 0 }}>
          {stages.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div
                onClick={() => setActive(s.id)}
                style={{
                  flex: 1, cursor: "pointer",
                  background: active === s.id ? s.color : "#FFFFFF",
                  border: `2px solid ${s.borderColor}`,
                  borderRadius: 10, padding: "16px 12px", textAlign: "center",
                  transition: "all 0.2s",
                  boxShadow: active === s.id ? `0 4px 20px ${s.color}44` : "0 2px 8px #0001",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
                  color: active === s.id ? "#FFFFFF99" : s.color, marginBottom: 4
                }}>{s.tool}</div>
                <div style={{
                  fontSize: 12, fontWeight: 700,
                  color: active === s.id ? "#FFFFFF" : "#0B1F3A"
                }}>Stage {s.id}</div>
                <div style={{
                  fontSize: 11, color: active === s.id ? "#FFFFFF99" : "#4A6080",
                  marginTop: 2
                }}>{s.label}</div>
              </div>
              {i < stages.length - 1 && (
                <div style={{
                  width: 32, textAlign: "center", fontSize: 18,
                  color: "#C9A84C", fontWeight: 900, flexShrink: 0
                }}>→</div>
              )}
            </div>
          ))}
        </div>

        {/* Stage Detail */}
        {selected && (
          <div style={{
            background: "#FFFFFF", borderRadius: 12, border: `2px solid ${selected.borderColor}`,
            overflow: "hidden", boxShadow: `0 4px 24px ${selected.color}22`, marginBottom: 32
          }}>
            {/* Stage Header */}
            <div style={{
              background: selected.color, padding: "24px 32px",
              display: "flex", alignItems: "center", gap: 16
            }}>
              <div style={{ fontSize: 40 }}>{selected.icon}</div>
              <div>
                <div style={{ fontSize: 11, color: "#FFFFFF99", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>
                  Stage {selected.id} — {selected.tool}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", margin: 0 }}>{selected.label}</h3>
              </div>
            </div>

            <div style={{ padding: "28px 32px" }}>
              <p style={{ fontSize: 15, color: "#2D3E55", lineHeight: 1.7, marginBottom: 28, marginTop: 0 }}>
                {selected.description}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* Inputs */}
                <div style={{
                  background: "#F4F7FB", borderRadius: 10, padding: "20px 24px",
                  border: "1px solid #DDE4EF"
                }}>
                  <h4 style={{
                    fontSize: 11, fontWeight: 700, color: "#4A6080", textTransform: "uppercase",
                    letterSpacing: 1, marginBottom: 14, marginTop: 0
                  }}>📥 Inputs</h4>
                  {selected.inputs.map((inp, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10
                    }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: "50%", background: selected.color,
                        marginTop: 6, flexShrink: 0
                      }} />
                      <span style={{ fontSize: 13, color: "#2D3E55", lineHeight: 1.5 }}>{inp}</span>
                    </div>
                  ))}
                </div>

                {/* Outputs */}
                <div style={{
                  background: selected.lightColor, borderRadius: 10, padding: "20px 24px",
                  border: `1px solid ${selected.borderColor}44`
                }}>
                  <h4 style={{
                    fontSize: 11, fontWeight: 700, color: selected.color, textTransform: "uppercase",
                    letterSpacing: 1, marginBottom: 14, marginTop: 0
                  }}>📤 Outputs</h4>
                  {selected.outputs.map((out, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10
                    }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: "50%", background: selected.color,
                        marginTop: 6, flexShrink: 0
                      }} />
                      <span style={{ fontSize: 13, color: "#2D3E55", lineHeight: 1.5, fontWeight: 600 }}>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Gate */}
              {selected.decision && (
                <div style={{ marginTop: 24 }}>
                  <h4 style={{
                    fontSize: 11, fontWeight: 700, color: "#4A6080", textTransform: "uppercase",
                    letterSpacing: 1, marginBottom: 14
                  }}>🚦 Decision Gate</h4>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{
                      flex: 1, background: "#E8F5E9", border: "1.5px solid #1A7A44",
                      borderRadius: 8, padding: "12px 16px"
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#1A7A44", marginBottom: 4 }}>✅ YES — PROCEED</div>
                      <div style={{ fontSize: 13, color: "#2D3E55" }}>{selected.decision.yes}</div>
                    </div>
                    <div style={{
                      flex: 1, background: "#FFF8E1", border: "1.5px solid #B7770D",
                      borderRadius: 8, padding: "12px 16px"
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#B7770D", marginBottom: 4 }}>⚠️ PARTIAL</div>
                      <div style={{ fontSize: 13, color: "#2D3E55" }}>{selected.decision.partial}</div>
                    </div>
                    <div style={{
                      flex: 1, background: "#FFEBEE", border: "1.5px solid #C0392B",
                      borderRadius: 8, padding: "12px 16px"
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#C0392B", marginBottom: 4 }}>🚫 NO — ROUTE OUT</div>
                      <div style={{ fontSize: 13, color: "#2D3E55" }}>{selected.decision.no}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Alternative Routes */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#4A6080", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16 }}>
            Alternative Routing Pathways
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {alternativeRoutes.map((r, i) => (
              <div key={i} style={{
                background: "#FFFFFF", borderRadius: 10, padding: "16px 20px",
                border: `1.5px solid ${r.color}44`,
                borderLeft: `4px solid ${r.color}`
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.color, marginBottom: 6 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: "#4A6080", lineHeight: 1.5 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition */}
        <div style={{
          background: "#FFFFFF", borderRadius: 12, padding: "32px 36px",
          border: "1px solid #DDE4EF", marginBottom: 32
        }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#4A6080", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 24, marginTop: 0 }}>
            Why This Model Wins Against the Competition
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              {
                icon: "🔗",
                title: "Integrated Pipeline",
                desc: "Deloitte, McKinsey, and Accenture sell PI and automation as separate engagements. Primus connects them into one continuous, scored pipeline — no handoff gaps.",
                color: "#0B3D91"
              },
              {
                icon: "🏦",
                title: "Banking-Specific",
                desc: "Generic process mining tools don't understand Encompass, IBS, or Jack Henry. PrimeOne is built for banking workflows — mortgage, OFAC, deposits, compliance.",
                color: "#1A7A44"
              },
              {
                icon: "📐",
                title: "Leanbotics™ Advantage",
                desc: "Competitors automate broken processes and lock in inefficiency. Leanbotics™ optimizes first, then automates — delivering 20–30% higher ROI on every engagement.",
                color: "#C9A84C"
              },
              {
                icon: "🎯",
                title: "POPPI™ Scoring",
                desc: "No more gut-feel prioritization. POPPI™ scores every process across 4 dimensions and produces a ranked, defensible automation pipeline for leadership.",
                color: "#6A1B9A"
              },
              {
                icon: "💼",
                title: "BCR Over ROI",
                desc: "Traditional ROI calculations don't capture capacity unlocking or strategic value. Our BCR methodology tells the full story — what you spend vs. what you gain.",
                color: "#E65100"
              },
              {
                icon: "⚡",
                title: "Speed to Insight",
                desc: "Signavio requires 3–6 months of process mining. Primo + PrimeOne delivers a board-ready business case in 2–3 weeks with validation accuracy within 15%.",
                color: "#00838F"
              },
            ].map((v, i) => (
              <div key={i} style={{
                background: "#F4F7FB", borderRadius: 10, padding: "20px 22px",
                borderTop: `3px solid ${v.color}`
              }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{v.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0B1F3A", marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 13, color: "#4A6080", lineHeight: 1.6 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", padding: "20px 0",
          borderTop: "1px solid #DDE4EF"
        }}>
          <div style={{ fontSize: 13, color: "#4A6080" }}>
            <strong style={{ color: "#0B1F3A" }}>Primus Software Corporation</strong> — Intelligent Automation Practice
          </div>
          <div style={{ fontSize: 11, color: "#8FA3BF", marginTop: 4 }}>
            Primo™ · PrimeOne™ · POPPI™ · Leanbotics™ — Proprietary Methodologies
          </div>
        </div>
      </div>
    </div>
  );
}
