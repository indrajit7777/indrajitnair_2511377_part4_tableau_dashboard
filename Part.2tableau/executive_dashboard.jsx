
import { useState, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, ReferenceLine, ComposedChart, Area
} from "recharts";

// ── DATA (derived from dashboard_sales_data_4.xlsx) ──────────────────────────

const MONTHLY = [
  { m: "Jan 24", sales: 9447, profit: 1463 },
  { m: "Feb 24", sales: 10485, profit: 1578 },
  { m: "Mar 24", sales: 9091, profit: 1336 },
  { m: "Apr 24", sales: 8012, profit: 1121 },
  { m: "May 24", sales: 7461, profit: 1132 },
  { m: "Jun 24", sales: 9585, profit: 1520 },
  { m: "Jul 24", sales: 7427, profit: 1130 },
  { m: "Aug 24", sales: 6304, profit: 886 },
  { m: "Sep 24", sales: 10486, profit: 1694 },
  { m: "Oct 24", sales: 9735, profit: 1602 },
  { m: "Nov 24", sales: 9254, profit: 1443 },
  { m: "Dec 24", sales: 8956, profit: 1568 },
  { m: "Jan 25", sales: 8455, profit: 1192 },
  { m: "Feb 25", sales: 9854, profit: 1487 },
  { m: "Mar 25", sales: 10216, profit: 1503 },
  { m: "Apr 25", sales: 7194, profit: 894 },
  { m: "May 25", sales: 8835, profit: 1311 },
  { m: "Jun 25", sales: 7258, profit: 1169 },
  { m: "Jul 25", sales: 10662, profit: 1831 },
  { m: "Aug 25", sales: 10861, profit: 1735 },
  { m: "Sep 25", sales: 8033, profit: 1184 },
  { m: "Oct 25", sales: 10109, profit: 1520 },
  { m: "Nov 25", sales: 10204, profit: 1609 },
  { m: "Dec 25", sales: 9095, profit: 1398 },
];

const REGIONS = [
  { region: "South", sales: 64694, profit: 9988, orders: 1210, margin: 15.4 },
  { region: "North", sales: 54556, profit: 8315, orders: 1056, margin: 15.2 },
  { region: "West",  sales: 48909, profit: 7404, orders: 1037, margin: 15.1 },
  { region: "East",  sales: 48859, profit: 7599, orders: 897,  margin: 15.6 },
];

const SUBCATS = [
  { name: "Phones",       category: "Technology",       sales: 38394, profit: 7097, margin: 18.5 },
  { name: "Accessories",  category: "Technology",       sales: 39198, profit: 7187, margin: 18.3 },
  { name: "Machines",     category: "Technology",       sales: 35691, profit: 6449, margin: 18.1 },
  { name: "Copiers",      category: "Technology",       sales: 40613, profit: 7310, margin: 18.0 },
  { name: "Art",          category: "Office Supplies",  sales: 2262,  profit: 350,  margin: 15.5 },
  { name: "Paper",        category: "Office Supplies",  sales: 2128,  profit: 319,  margin: 15.0 },
  { name: "Labels",       category: "Office Supplies",  sales: 2484,  profit: 368,  margin: 14.8 },
  { name: "Binders",      category: "Office Supplies",  sales: 2201,  profit: 326,  margin: 14.8 },
  { name: "Storage",      category: "Office Supplies",  sales: 2406,  profit: 342,  margin: 14.2 },
  { name: "Chairs",       category: "Furniture",        sales: 12839, profit: 1059, margin: 8.2 },
  { name: "Furnishings",  category: "Furniture",        sales: 13438, profit: 1056, margin: 7.9 },
  { name: "Bookcases",    category: "Furniture",        sales: 12469, profit: 712,  margin: 5.7 },
  { name: "Tables",       category: "Furniture",        sales: 12895, profit: 732,  margin: 5.7 },
];

const SEGMENTS = [
  { seg: "Home Office", sales: 74501, profit: 11555, orders: 1446, aov: 51522, returnRate: 5.7 },
  { seg: "Consumer",    sales: 71886, profit: 11031, orders: 1355, aov: 53053, returnRate: 3.9 },
  { seg: "Corporate",   sales: 70631, profit: 10721, orders: 1399, aov: 50487, returnRate: 4.0 },
];

const DISCOUNT = [
  { band: "No Discount", margin: 20.6, orders: 1024, profit: 13520 },
  { band: "Low (≤15%)",  margin: 16.2, orders: 1490, profit: 12976 },
  { band: "Med (16–25%)",margin: 11.2, orders: 1094, profit: 5196  },
  { band: "High (>25%)", margin: 6.5,  orders: 592,  profit: 1615  },
];

const SHIPPING = [
  { mode: "Same Day",       avgDays: 0.4,  returnRate: 2,  orders: 241  },
  { mode: "First Class",    avgDays: 1.77, returnRate: 5,  orders: 630  },
  { mode: "Second Class",   avgDays: 2.68, returnRate: 5,  orders: 894  },
  { mode: "Standard Class", avgDays: 4.71, returnRate: 5,  orders: 2435 },
];

const SCATTER_DATA = [
  { discount: 0,    profit: 20.6, r: 1024 },
  { discount: 0.05, profit: 18.1, r: 520  },
  { discount: 0.1,  profit: 16.8, r: 490  },
  { discount: 0.15, profit: 15.2, r: 480  },
  { discount: 0.2,  profit: 12.4, r: 610  },
  { discount: 0.25, profit: 10.1, r: 484  },
  { discount: 0.3,  profit: 7.8,  r: 402  },
  { discount: 0.35, profit: 6.5,  r: 190  },
];

const STATES = [
  { state: "Rajasthan",      sales: 20837 },
  { state: "Telangana",      sales: 14923 },
  { state: "Tamil Nadu",     sales: 12867 },
  { state: "Karnataka",      sales: 12538 },
  { state: "Kerala",         sales: 12465 },
  { state: "Haryana",        sales: 12369 },
  { state: "Punjab",         sales: 12239 },
  { state: "Andhra Pradesh", sales: 11901 },
  { state: "West Bengal",    sales: 11666 },
  { state: "Gujarat",        sales: 10794 },
];

// ── PALETTE ───────────────────────────────────────────────────────────────────
const C = {
  navy:   "#0F2D4A",
  blue:   "#1C5FA8",
  teal:   "#0E8C8C",
  amber:  "#E07B1A",
  red:    "#C0392B",
  green:  "#1E8449",
  slate:  "#5D7080",
  light:  "#E8EFF7",
  pale:   "#F4F8FC",
  white:  "#FFFFFF",
  border: "#C8D9E8",
};

const CAT_COLORS = {
  Technology:       C.blue,
  "Office Supplies": C.teal,
  Furniture:        C.amber,
};

const SEG_COLORS = {
  "Home Office": "#6C4FC2",
  Consumer:      C.blue,
  Corporate:     C.teal,
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
const fmt = (n, d = 0) =>
  n >= 1000 ? `₹${(n / 1000).toFixed(d)}K` : `₹${n.toFixed(d)}`;

const pct = (n) => `${n.toFixed(1)}%`;

const marginColor = (m) =>
  m >= 18 ? C.green : m >= 12 ? C.teal : m >= 8 ? C.amber : C.red;

// ── KPI CARD ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, color = C.blue, icon }) {
  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderRadius: 8, padding: "14px 18px",
      borderTop: `4px solid ${color}`,
      display: "flex", flexDirection: "column", gap: 4, minWidth: 140,
    }}>
      <span style={{ fontSize: 11, color: C.slate, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>
        {icon} {label}
      </span>
      <span style={{ fontSize: 22, fontWeight: 800, color: C.navy }}>{value}</span>
      {sub && <span style={{ fontSize: 11, color: C.slate }}>{sub}</span>}
    </div>
  );
}

// ── SECTION HEADER ────────────────────────────────────────────────────────────
function SectionHead({ title, accent = C.blue }) {
  return (
    <div style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 10, marginBottom: 10 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: C.navy, letterSpacing: 0.3 }}>
        {title}
      </span>
    </div>
  );
}

// ── TOOLTIP ───────────────────────────────────────────────────────────────────
const TT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: C.navy, borderRadius: 6, padding: "8px 12px",
      fontSize: 12, color: C.white, boxShadow: "0 4px 12px rgba(0,0,0,.3)"
    }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || C.white }}>
          {p.name}: <b>{typeof p.value === "number" && p.value > 100
            ? fmt(p.value) : p.value}{p.name?.includes("Margin") || p.name?.includes("margin") || p.name?.includes("%") ? "%" : ""}</b>
        </div>
      ))}
    </div>
  );
};

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeCat, setActiveCat] = useState("All");
  const [activeSeg, setActiveSeg] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = ["overview", "sales", "categories", "segments", "logistics"];

  const filteredMonthly = useMemo(() => MONTHLY, []);

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      background: C.pale, minHeight: "100vh",
      color: C.navy,
    }}>

      {/* ── TOPBAR ── */}
      <div style={{
        background: C.navy, padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 52,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6,
            background: "linear-gradient(135deg,#1C5FA8,#0E8C8C)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>📊</div>
          <div>
            <div style={{ color: C.white, fontWeight: 800, fontSize: 14, letterSpacing: 0.3 }}>
              Retail Executive Dashboard
            </div>
            <div style={{ color: "#7EAACC", fontSize: 10, letterSpacing: 0.5 }}>
              FY 2024–2025 · 4,200 Transactions · India
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding: "5px 14px", borderRadius: 4, border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 11, textTransform: "capitalize", letterSpacing: 0.3,
              background: activeTab === t ? C.blue : "transparent",
              color: activeTab === t ? C.white : "#7EAACC",
              transition: "all .15s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* ── KPI STRIP ── */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <KpiCard label="Total Revenue" value="₹217.0B" sub="FY 2024–2025" color={C.blue} icon="💰" />
          <KpiCard label="Total Profit" value="₹33.3B" sub="All Regions" color={C.green} icon="📈" />
          <KpiCard label="Overall Margin" value="15.3%" sub="Avg across categories" color={C.teal} icon="🎯" />
          <KpiCard label="Total Orders" value="4,200" sub="2 fiscal years" color="#6C4FC2" icon="📦" />
          <KpiCard label="Avg Order Value" value="₹51,671" sub="Per unique order" color={C.amber} icon="🛒" />
          <KpiCard label="Return Rate" value="4.5%" sub="0 = no return, 1 = returned" color={C.red} icon="↩️" />
        </div>

        {/* ── FILTERS ROW ── */}
        <div style={{
          background: C.white, border: `1px solid ${C.border}`, borderRadius: 8,
          padding: "10px 16px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap",
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.slate, textTransform: "uppercase", letterSpacing: 0.5 }}>
            🔽 Filters:
          </span>
          {/* Region filter */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: C.slate }}>Region:</span>
            {["All", "North", "South", "East", "West"].map(r => (
              <button key={r} onClick={() => setActiveRegion(r)} style={{
                padding: "3px 10px", borderRadius: 12, border: `1px solid ${activeRegion === r ? C.blue : C.border}`,
                background: activeRegion === r ? C.blue : C.white,
                color: activeRegion === r ? C.white : C.slate,
                fontSize: 11, cursor: "pointer", fontWeight: activeRegion === r ? 700 : 400,
              }}>{r}</button>
            ))}
          </div>
          {/* Category filter */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: C.slate }}>Category:</span>
            {["All", "Technology", "Furniture", "Office Supplies"].map(c => (
              <button key={c} onClick={() => setActiveCat(c)} style={{
                padding: "3px 10px", borderRadius: 12,
                border: `1px solid ${activeCat === c ? CAT_COLORS[c] || C.blue : C.border}`,
                background: activeCat === c ? (CAT_COLORS[c] || C.blue) : C.white,
                color: activeCat === c ? C.white : C.slate,
                fontSize: 11, cursor: "pointer", fontWeight: activeCat === c ? 700 : 400,
              }}>{c}</button>
            ))}
          </div>
          {/* Segment filter */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: C.slate }}>Segment:</span>
            {["All", "Consumer", "Corporate", "Home Office"].map(s => (
              <button key={s} onClick={() => setActiveSeg(s)} style={{
                padding: "3px 10px", borderRadius: 12,
                border: `1px solid ${activeSeg === s ? SEG_COLORS[s] || C.blue : C.border}`,
                background: activeSeg === s ? (SEG_COLORS[s] || C.blue) : C.white,
                color: activeSeg === s ? C.white : C.slate,
                fontSize: 11, cursor: "pointer", fontWeight: activeSeg === s ? 700 : 400,
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* ── ROW 1: SALES TREND + REGIONAL ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12 }}>

          {/* Sales Trend */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "14px 16px",
          }}>
            <SectionHead title="📈 Sales & Profit Trend — Monthly (FY 2024–2025)" accent={C.blue} />
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={filteredMonthly} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 9, fill: C.slate }} interval={1} />
                <YAxis yAxisId="s" tick={{ fontSize: 9, fill: C.slate }} tickFormatter={v => `₹${v/1000}K`} />
                <YAxis yAxisId="p" orientation="right" tick={{ fontSize: 9, fill: C.slate }} tickFormatter={v => `₹${v/1000}K`} />
                <Tooltip content={<TT />} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Area yAxisId="s" type="monotone" dataKey="sales" fill={C.light} stroke={C.blue} strokeWidth={2} name="Sales (₹K)" dot={false} />
                <Line yAxisId="p" type="monotone" dataKey="profit" stroke={C.amber} strokeWidth={2} dot={false} name="Profit (₹K)" />
                <ReferenceLine yAxisId="s" y={9042} stroke={C.slate} strokeDasharray="4 2" label={{ value: "Avg", position: "left", fontSize: 9 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Regional */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "14px 16px",
          }}>
            <SectionHead title="🗺 Regional Performance" accent={C.teal} />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={REGIONS} layout="vertical" margin={{ top: 0, right: 48, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 9, fill: C.slate }} tickFormatter={v => `₹${v/1000}K`} />
                <YAxis type="category" dataKey="region" tick={{ fontSize: 10, fill: C.navy, fontWeight: 600 }} width={44} />
                <Tooltip content={<TT />} />
                <Bar dataKey="sales" name="Sales (₹K)" radius={[0, 3, 3, 0]}>
                  {REGIONS.map((r, i) => (
                    <Cell key={i}
                      fill={activeRegion === r.region ? C.blue : C.light}
                      stroke={activeRegion === r.region ? C.navy : C.border}
                      onClick={() => setActiveRegion(activeRegion === r.region ? "All" : r.region)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {/* Region margin pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {REGIONS.map(r => (
                <div key={r.region} style={{
                  display: "flex", gap: 4, alignItems: "center",
                  padding: "2px 8px", borderRadius: 10,
                  background: C.pale, border: `1px solid ${C.border}`, fontSize: 10,
                }}>
                  <span style={{ fontWeight: 700 }}>{r.region}</span>
                  <span style={{ color: marginColor(r.margin), fontWeight: 700 }}>{r.margin}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 2: CATEGORY PROFITABILITY + DISCOUNT vs PROFIT ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 12 }}>

          {/* Sub-category profitability */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "14px 16px",
          }}>
            <SectionHead title="📦 Category & Sub-Category Profitability" accent={C.amber} />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={SUBCATS.filter(s => activeCat === "All" || s.category === activeCat)}
                layout="vertical"
                margin={{ top: 0, right: 50, left: 60, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                <XAxis type="number" domain={[0, 22]} tick={{ fontSize: 9, fill: C.slate }}
                  tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: C.navy }} width={70} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const item = SUBCATS.find(s => s.name === label);
                  return (
                    <div style={{ background: C.navy, borderRadius: 6, padding: "8px 12px", fontSize: 11, color: C.white }}>
                      <div style={{ fontWeight: 700 }}>{label} ({item?.category})</div>
                      <div>Profit Margin: <b>{payload[0]?.value}%</b></div>
                      <div>Sales: <b>₹{item?.sales?.toLocaleString()}K</b></div>
                    </div>
                  );
                }} />
                <ReferenceLine x={10} stroke={C.slate} strokeDasharray="4 2"
                  label={{ value: "Target 10%", position: "top", fontSize: 8 }} />
                <Bar dataKey="margin" name="Profit Margin %" radius={[0, 3, 3, 0]}>
                  {SUBCATS.filter(s => activeCat === "All" || s.category === activeCat).map((s, i) => (
                    <Cell key={i} fill={marginColor(s.margin)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
              {Object.entries(CAT_COLORS).map(([cat, col]) => (
                <div key={cat} style={{ fontSize: 10, color: C.slate, display: "flex", gap: 4, alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: col }} />
                  {cat}
                </div>
              ))}
              <div style={{ fontSize: 10, color: C.slate, marginLeft: "auto" }}>
                🟢 &gt;16% · 🔵 12–16% · 🟡 8–12% · 🔴 &lt;8%
              </div>
            </div>
          </div>

          {/* Discount vs Profit */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "14px 16px",
          }}>
            <SectionHead title="💸 Discount vs. Profit Margin" accent={C.red} />
            <ResponsiveContainer width="100%" height={180}>
              <ScatterChart margin={{ top: 4, right: 8, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="discount" type="number" name="Discount"
                  tickFormatter={v => `${(v * 100).toFixed(0)}%`}
                  tick={{ fontSize: 9, fill: C.slate }}
                  label={{ value: "Discount Rate", position: "insideBottom", offset: -12, fontSize: 10 }} />
                <YAxis dataKey="profit" type="number" name="Margin %"
                  tickFormatter={v => `${v}%`}
                  tick={{ fontSize: 9, fill: C.slate }} />
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div style={{ background: C.navy, borderRadius: 6, padding: "8px 12px", fontSize: 11, color: C.white }}>
                      <div>Discount: <b>{(payload[0]?.value * 100).toFixed(0)}%</b></div>
                      <div>Margin: <b>{payload[1]?.value}%</b></div>
                    </div>
                  );
                }} />
                <ReferenceLine y={0} stroke={C.red} strokeWidth={2} />
                <Scatter data={SCATTER_DATA} fill={C.blue}>
                  {SCATTER_DATA.map((d, i) => (
                    <Cell key={i} fill={d.profit < 10 ? C.red : d.profit < 15 ? C.amber : C.green} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            {/* Discount band table */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4, marginTop: 8 }}>
              {DISCOUNT.map(d => (
                <div key={d.band} style={{
                  background: C.pale, borderRadius: 6, padding: "6px 8px",
                  border: `1px solid ${C.border}`, textAlign: "center",
                }}>
                  <div style={{ fontSize: 9, color: C.slate }}>{d.band}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: marginColor(d.margin) }}>{d.margin}%</div>
                  <div style={{ fontSize: 9, color: C.slate }}>{d.orders} orders</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 3: SEGMENTS + SHIPPING + RETURNS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>

          {/* Customer Segments */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "14px 16px",
          }}>
            <SectionHead title="👥 Customer Segment Comparison" accent="#6C4FC2" />
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={SEGMENTS} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                <XAxis dataKey="seg" tick={{ fontSize: 9, fill: C.navy, fontWeight: 600 }} />
                <YAxis tick={{ fontSize: 9, fill: C.slate }} tickFormatter={v => `₹${v/1000}K`} />
                <Tooltip content={<TT />} />
                <Bar dataKey="sales" name="Sales (₹K)" radius={[3, 3, 0, 0]}>
                  {SEGMENTS.map((s, i) => (
                    <Cell key={i}
                      fill={activeSeg === s.seg ? SEG_COLORS[s.seg] : C.light}
                      stroke={C.border}
                      onClick={() => setActiveSeg(activeSeg === s.seg ? "All" : s.seg)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {/* Segment stat pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
              {SEGMENTS.map(s => (
                <div key={s.seg} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "4px 8px", borderRadius: 4, fontSize: 10,
                  background: activeSeg === s.seg ? "#EDE9F9" : C.pale,
                  border: `1px solid ${activeSeg === s.seg ? "#6C4FC2" : C.border}`,
                }}>
                  <span style={{ fontWeight: 600, color: SEG_COLORS[s.seg] }}>{s.seg}</span>
                  <span>AOV: <b>₹{(s.aov / 1000).toFixed(0)}K</b></span>
                  <span style={{ color: s.returnRate > 5 ? C.red : C.green }}>
                    ↩ {s.returnRate}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Performance */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "14px 16px",
          }}>
            <SectionHead title="🚚 Shipping Mode Performance" accent={C.teal} />
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={SHIPPING} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                <XAxis dataKey="mode" tick={{ fontSize: 8, fill: C.navy }}
                  tickFormatter={v => v.replace(" Class", "").replace("Standard", "Std")} />
                <YAxis tick={{ fontSize: 9, fill: C.slate }}
                  label={{ value: "Avg Days", angle: -90, position: "insideLeft", fontSize: 9 }} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const item = SHIPPING.find(s => s.mode === label);
                  return (
                    <div style={{ background: C.navy, borderRadius: 6, padding: "8px 12px", fontSize: 11, color: C.white }}>
                      <div style={{ fontWeight: 700 }}>{label}</div>
                      <div>Avg Delivery: <b>{item?.avgDays} days</b></div>
                      <div>Orders: <b>{item?.orders?.toLocaleString()}</b></div>
                      <div>Return Rate: <b>{item?.returnRate}%</b></div>
                    </div>
                  );
                }} />
                <Bar dataKey="avgDays" name="Avg Days" radius={[3, 3, 0, 0]}>
                  {SHIPPING.map((s, i) => (
                    <Cell key={i}
                      fill={s.avgDays > 4 ? C.amber : s.avgDays > 2 ? C.teal : C.green}
                    />
                  ))}
                </Bar>
                <ReferenceLine y={3} stroke={C.red} strokeDasharray="4 2"
                  label={{ value: "Target", position: "right", fontSize: 9 }} />
              </BarChart>
            </ResponsiveContainer>
            {/* Order count row */}
            <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
              {SHIPPING.map(s => (
                <div key={s.mode} style={{
                  flex: 1, textAlign: "center", padding: "4px 2px",
                  background: C.pale, borderRadius: 4, border: `1px solid ${C.border}`,
                }}>
                  <div style={{ fontSize: 8, color: C.slate }}>
                    {s.mode.replace(" Class", "").replace("Standard", "Std")}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.navy }}>{s.orders}</div>
                  <div style={{ fontSize: 8, color: C.slate }}>orders</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top States */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "14px 16px",
          }}>
            <SectionHead title="📍 Top 10 States by Revenue" accent={C.navy} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
              {STATES.map((s, i) => {
                const pct_val = (s.sales / STATES[0].sales * 100).toFixed(0);
                return (
                  <div key={s.state} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: C.white,
                      background: i < 3 ? C.blue : C.slate,
                      borderRadius: 3, padding: "1px 5px", minWidth: 16, textAlign: "center",
                    }}>{i + 1}</span>
                    <span style={{ fontSize: 10, color: C.navy, fontWeight: 600, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {s.state}
                    </span>
                    <div style={{
                      flex: 2, height: 8, background: C.border, borderRadius: 4, overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%", borderRadius: 4,
                        width: `${pct_val}%`,
                        background: i < 3 ? C.blue : i < 6 ? C.teal : C.slate,
                      }} />
                    </div>
                    <span style={{ fontSize: 9, color: C.slate, minWidth: 44, textAlign: "right" }}>
                      ₹{(s.sales / 1000).toFixed(0)}K
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── ROW 4: RETURN HEATMAP ── */}
        <div style={{
          background: C.white, border: `1px solid ${C.border}`,
          borderRadius: 8, padding: "14px 16px",
        }}>
          <SectionHead title="↩️ Return Rate Heatmap — Category × Segment" accent={C.red} />
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* Heatmap table */}
            <div>
              <table style={{ borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr>
                    <th style={{ padding: "6px 12px", textAlign: "left", color: C.slate, fontSize: 10 }}>Category</th>
                    {["Consumer", "Corporate", "Home Office"].map(s => (
                      <th key={s} style={{
                        padding: "6px 16px", textAlign: "center", fontSize: 10,
                        color: SEG_COLORS[s], fontWeight: 700,
                      }}>{s}</th>
                    ))}
                    <th style={{ padding: "6px 12px", textAlign: "center", color: C.slate, fontSize: 10 }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cat: "Technology",       consumer: 3.0, corporate: 2.8, home: 3.3, total: 3.0 },
                    { cat: "Office Supplies",  consumer: 3.5, corporate: 3.6, home: 4.2, total: 3.7 },
                    { cat: "Furniture",        consumer: 7.2, corporate: 7.4, home: 8.6, total: 7.7 },
                  ].map(row => (
                    <tr key={row.cat}>
                      <td style={{
                        padding: "8px 12px", fontWeight: 700, color: CAT_COLORS[row.cat],
                        borderTop: `1px solid ${C.border}`,
                      }}>{row.cat}</td>
                      {[row.consumer, row.corporate, row.home].map((v, i) => {
                        const intensity = Math.min(v / 10, 1);
                        const bg = `rgba(192,57,43,${intensity * 0.7})`;
                        return (
                          <td key={i} style={{
                            padding: "8px 16px", textAlign: "center", fontWeight: 700,
                            background: bg, color: intensity > 0.4 ? C.white : C.navy,
                            borderTop: `1px solid ${C.border}`, fontSize: 13,
                          }}>{v}%</td>
                        );
                      })}
                      <td style={{
                        padding: "8px 12px", textAlign: "center", fontWeight: 700,
                        color: row.total > 6 ? C.red : C.slate,
                        borderTop: `1px solid ${C.border}`,
                      }}>{row.total}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ fontSize: 10, color: C.slate, marginTop: 8 }}>
                🔴 Darker = higher return risk · Key finding: Furniture + Home Office is highest risk (8.6%)
              </div>
            </div>

            {/* Insight cards */}
            <div style={{ display: "flex", gap: 10, flex: 1, flexWrap: "wrap" }}>
              {[
                { icon: "⚠️", label: "Furniture Return Rate", val: "7.7%", color: C.red, note: "2× company average" },
                { icon: "✅", label: "Technology Return Rate", val: "3.0%", color: C.green, note: "Best performing" },
                { icon: "🏠", label: "Home Office Risk", val: "8.6%", color: C.red, note: "Furniture + Home Office" },
                { icon: "📊", label: "Company Average", val: "4.5%", color: C.teal, note: "Baseline benchmark" },
              ].map(k => (
                <div key={k.label} style={{
                  background: C.pale, border: `1px solid ${C.border}`, borderRadius: 6,
                  padding: "10px 14px", minWidth: 120,
                }}>
                  <div style={{ fontSize: 16 }}>{k.icon}</div>
                  <div style={{ fontSize: 10, color: C.slate }}>{k.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: k.color }}>{k.val}</div>
                  <div style={{ fontSize: 10, color: C.slate }}>{k.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          textAlign: "center", color: C.slate, fontSize: 10, paddingTop: 4, paddingBottom: 8,
        }}>
          📊 Executive Dashboard · FY 2024–2025 · Data: dashboard_sales_data_4.xlsx · 4,200 rows ·
          Calculated Fields: Profit Margin, Cost, AOV, Return Rate, Shipping Delay Bucket
        </div>
      </div>
    </div>
  );
}
