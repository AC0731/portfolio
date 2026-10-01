"use client";

import { useMemo, useState } from "react";
import { curvePoints, LaunchStyle, styles } from "@/lib/simulation";

const initial = { name: "OpenCurrent", symbol: "OCUR", supply: 1000000000, startMarketCap: 20, target: 600, fee: 1.0, creatorShare: 35, quoteMint: "SOL", partnerLp: 50, creatorLp: 40, partnerLocked: 5, creatorLocked: 5 };

function CurveChart({ style }: { style: LaunchStyle }) {
  const points = useMemo(() => curvePoints(style), [style]);
  const d = points.map(({ x, y }, i) => `${i === 0 ? "M" : "L"} ${42 + x * 520} ${218 - y * 174}`).join(" ");
  return <svg className="curve-svg" viewBox="0 0 600 260" role="img" aria-label={`${styles[style].label} illustrative curve chart`}>
    <defs><linearGradient id="curveFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={styles[style].color} stopOpacity=".25"/><stop offset="100%" stopColor={styles[style].color} stopOpacity="0"/></linearGradient></defs>
    {[0,1,2,3].map((i) => <line key={i} x1="42" x2="562" y1={44+i*58} y2={44+i*58} stroke="#28312f" strokeDasharray="4 7"/>)}
    <path d={`${d} L 562 218 L 42 218 Z`} fill="url(#curveFill)" />
    <path d={d} fill="none" stroke={styles[style].color} strokeWidth="3" strokeLinecap="round" />
    <line x1="562" x2="562" y1="34" y2="218" stroke="#6b716d" strokeDasharray="3 5" />
    <circle cx="562" cy={218-Math.pow(1,styles[style].exponent)*174} r="5" fill={styles[style].color}/>
    <text x="42" y="244" fill="#78817b" fontSize="11">EARLY TRADES</text><text x="562" y="244" textAnchor="end" fill="#78817b" fontSize="11">GRADUATION</text>
  </svg>;
}

function Icon({ children }: { children: React.ReactNode }) { return <span className="icon" aria-hidden="true">{children}</span>; }

export default function Home() {
  const [style, setStyle] = useState<LaunchStyle>("community");
  const [name, setName] = useState(initial.name);
  const [symbol, setSymbol] = useState(initial.symbol);
  const [supply, setSupply] = useState(initial.supply);
  const [startMarketCap, setStartMarketCap] = useState(initial.startMarketCap);
  const [target, setTarget] = useState(initial.target);
  const [fee, setFee] = useState(initial.fee);
  const [creatorShare, setCreatorShare] = useState(initial.creatorShare);
  const [quoteMint, setQuoteMint] = useState(initial.quoteMint);
  const [partnerLp, setPartnerLp] = useState(initial.partnerLp);
  const [creatorLp, setCreatorLp] = useState(initial.creatorLp);
  const [partnerLocked, setPartnerLocked] = useState(initial.partnerLocked);
  const [creatorLocked, setCreatorLocked] = useState(initial.creatorLocked);
  const [showDisclosureEditor, setShowDisclosureEditor] = useState(false);
  const [allocationDisclosure, setAllocationDisclosure] = useState("");
  const [unlockDisclosure, setUnlockDisclosure] = useState("");
  const [notice, setNotice] = useState("");

  const lpTotal = partnerLp + creatorLp + partnerLocked + creatorLocked;
  const lockedTotal = partnerLocked + creatorLocked;
  const checks = [
    { label: "Curve selected", detail: styles[style].label, done: true },
    { label: "Market-cap range", detail: `${startMarketCap} → ${target} ${quoteMint}`, done: target > startMarketCap },
    { label: "Fee split", detail: `${creatorShare}% creator · ${100-creatorShare}% partner`, done: creatorShare >= 0 && creatorShare <= 100 },
    { label: "Graduated LP split", detail: `${lpTotal}% assigned · ${lockedTotal}% permanently locked`, done: lpTotal === 100 && lockedTotal >= 10 },
    { label: "Token allocation & unlocks", detail: "Plain-language details supplied", done: allocationDisclosure.trim().length > 0 && unlockDisclosure.trim().length > 0 },
  ];
  const readiness = Math.round((checks.filter((x) => x.done).length / checks.length) * 100);

  function downloadBrief() {
    const brief = {
      product: "CurveClarity Launch Brief",
      version: "0.1 prototype",
      status: "draft-not-signed",
      generatedAt: new Date().toISOString(),
      network: "No network transaction created",
      launch: { name, symbol, totalSupply: supply, quoteMint, illustrativeStyle: style, initialMarketCapInQuoteMintUnits: startMarketCap, migrationMarketCapInQuoteMintUnits: target, baseFeeScenarioBps: Math.round(fee * 100), creatorTradingFeeSharePercent: creatorShare, partnerTradingFeeSharePercent: 100-creatorShare },
      migratedLiquiditySplitPercent: { partnerClaimable: partnerLp, creatorClaimable: creatorLp, partnerPermanentLocked: partnerLocked, creatorPermanentLocked: creatorLocked, accountedTotal: lpTotal, permanentlyLockedTotal: lockedTotal },
      disclosure: { tokenAllocation: allocationDisclosure || "Not supplied", unlockSchedule: unlockDisclosure || "Not supplied", feeRecipients: { creatorPercent: creatorShare, partnerPercent: 100-creatorShare } },
      note: "Chart is an illustrative design preview, not a Meteora SDK quote. The market-cap input is denominated in the selected quote mint. This brief is not SDK validated and creates no token or transaction. Verify all parameters against the DBC SDK before deployment. This is not investment guidance."
    };
    const blob = new Blob([JSON.stringify(brief, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "curveclarity-launch-brief.json"; a.click(); URL.revokeObjectURL(url);
    setNotice("Launch brief downloaded. Add allocation and unlock details before sharing it.");
  }

  return <main className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#top"><span className="brand-mark"><i/><i/><i/></span><span>curve<span className="brand-light">clarity</span></span></a>
      <div className="workspace-label">WORKSPACE <button className="tiny-plus" aria-label="Add workspace">+</button></div>
      <nav className="nav-list" aria-label="Main navigation">
        <a className="nav-item active" href="#studio"><Icon>◈</Icon> Launch studio <span className="nav-dot"/></a>
        <a className="nav-item" href="#preview"><Icon>⌁</Icon> Curve preview</a>
        <a className="nav-item" href="#checks"><Icon>✓</Icon> Clarity checks</a>
      </nav>
      <div className="sidebar-bottom">
        <div className="network-card"><span className="live-dot"/> <span><b>Preview mode</b><small>Devnet integration next</small></span><span className="network-tag">LOCAL</span></div>
        <div className="profile"><span className="avatar">AC</span><span><b>Builder workspace</b><small>Personal</small></span><button className="more" aria-label="More options">···</button></div>
      </div>
    </aside>

    <section className="main-column" id="top">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> Launch studio</div><div className="top-actions"><span className="status-chip"><span className="live-dot"/>Interactive preview</span><button className="help-button" aria-label="Help">?</button></div></header>
      <div className="content-wrap" id="studio">
        <div className="eyebrow"><span className="eyebrow-line"/> METEORA DBC · DESIGN PREVIEW</div>
        <div className="page-heading"><div><h1>Make the launch<br/><em>rules legible.</em></h1><p className="intro">Shape a token launch, see how its mechanics behave, and share the plan before anyone buys.</p></div><button className="primary-button" onClick={downloadBrief}><span>↓</span> Export launch brief</button></div>

        <div className="banner"><span className="banner-icon">✳</span><p><b>Clarity is a launch feature.</b> Curve previews are illustrative; on-chain parameters need verification against Meteora DBC before deployment.</p><a href="https://docs.meteora.ag/developer-guides/dbc" target="_blank" rel="noreferrer">DBC docs ↗</a></div>

        <div className="dashboard-grid">
          <div className="left-stack">
            <section className="panel design-panel">
              <div className="panel-heading"><div><span className="section-index">01</span><h2>Choose a launch shape</h2></div><span className="subtle-label">CURVE PROFILE</span></div>
              <div className="style-tabs" role="group" aria-label="Curve profile">
                {(Object.keys(styles) as LaunchStyle[]).map((key) => <button key={key} className={`style-tab ${style===key?"selected":""}`} onClick={() => setStyle(key)} aria-pressed={style===key}><span className={`style-dot ${key}`}/><span><b>{styles[key].label}</b><small>{key === "steady" ? "More gradual" : key === "community" ? "More patient early" : "More momentum"}</small></span>{style===key&&<span className="selected-check">✓</span>}</button>)}
              </div>
              <div className="chart-heading" id="preview"><div><h3>Price discovery preview</h3><p>How the selected shape changes as trading progresses</p></div><span className="illustrative-pill">ILLUSTRATIVE</span></div>
              <div className="chart-wrap"><div className="y-labels"><span>Higher</span><span>Price</span><span>Lower</span></div><CurveChart style={style}/></div>
              <div className="chart-foot"><span>Curve shape: <b>{styles[style].label}</b></span><span>Graduation destination: <b>Meteora DAMM v2</b></span></div>
            </section>

            <section className="panel economics-panel">
              <div className="panel-heading"><div><span className="section-index">02</span><h2>Set the launch terms</h2></div><span className="subtle-label">EDITABLE ASSUMPTIONS</span></div>
              <div className="form-grid">
                <div className="form-field"><label htmlFor="token-name">Token name</label><div className="input-with-suffix"><input id="token-name" maxLength={32} value={name} onChange={(e)=>setName(e.target.value)}/></div></div>
                <div className="form-field"><label htmlFor="token-symbol">Ticker</label><div className="input-with-suffix"><input id="token-symbol" maxLength={10} value={symbol} onChange={(e)=>setSymbol(e.target.value.toUpperCase())}/></div></div>
                <div className="form-field"><label htmlFor="supply">Total supply</label><div className="input-with-suffix"><input id="supply" type="number" min="1000000" step="1000000" value={supply} onChange={(e)=>setSupply(Math.max(1000000,Number(e.target.value)||1000000))}/><span>TOKENS</span></div></div>
                <div className="form-field"><label htmlFor="start-market-cap">Initial market cap</label><div className="input-with-suffix"><input id="start-market-cap" type="number" min="1" step="1" value={startMarketCap} onChange={(e)=>setStartMarketCap(Math.max(1,Number(e.target.value)||1))}/><span>{quoteMint}</span></div></div>
                <div className="form-field"><label htmlFor="target">Migration market cap</label><div className="input-with-suffix"><input id="target" type="number" min="1" step="10" value={target} onChange={(e)=>setTarget(Math.max(1,Number(e.target.value)||1))}/><span>{quoteMint}</span></div></div>
                <div className="form-field"><label htmlFor="quote-mint">Quote mint</label><div className="input-with-suffix"><select id="quote-mint" value={quoteMint} onChange={(e)=>setQuoteMint(e.target.value)}><option value="SOL">SOL</option><option value="USDC">USDC</option></select><span>QUOTE</span></div></div>
                <div className="form-field"><label htmlFor="fee">Base fee <span>· scenario</span></label><div className="range-row"><input id="fee" type="range" min="0.25" max="3" step="0.05" value={fee} onChange={(e)=>setFee(Number(e.target.value))}/><output>{fee.toFixed(2)}%</output></div></div>
                <div className="form-field"><label htmlFor="creator">Creator trading-fee share <span>· scenario</span></label><div className="range-row"><input id="creator" type="range" min="0" max="100" step="5" value={creatorShare} onChange={(e)=>setCreatorShare(Number(e.target.value))}/><output>{creatorShare}%</output></div></div>
                <div className="form-field full"><label>Graduated LP split <span>· claimable and permanently locked</span></label><div className="lp-grid">
                  <label htmlFor="partner-lp">Partner claimable<input id="partner-lp" type="number" min="0" max="100" value={partnerLp} onChange={(e)=>setPartnerLp(Math.min(100,Math.max(0,Number(e.target.value)||0)))}/></label>
                  <label htmlFor="creator-lp">Creator claimable<input id="creator-lp" type="number" min="0" max="100" value={creatorLp} onChange={(e)=>setCreatorLp(Math.min(100,Math.max(0,Number(e.target.value)||0)))}/></label>
                  <label htmlFor="partner-locked">Partner locked<input id="partner-locked" type="number" min="0" max="100" value={partnerLocked} onChange={(e)=>setPartnerLocked(Math.min(100,Math.max(0,Number(e.target.value)||0)))}/></label>
                  <label htmlFor="creator-locked">Creator locked<input id="creator-locked" type="number" min="0" max="100" value={creatorLocked} onChange={(e)=>setCreatorLocked(Math.min(100,Math.max(0,Number(e.target.value)||0)))}/></label>
                </div><small className={`lp-total ${lpTotal===100&&lockedTotal>=10?"valid":"invalid"}`}>{lpTotal}% assigned · {lockedTotal}% permanently locked {lpTotal===100&&lockedTotal>=10?"· protocol minimum met":"· total must be 100% and lock must be at least 10%"}</small></div>
              </div>
              <div className="scenario-note"><span>ⓘ</span><p>DBC's creator trading-fee percentage splits bonding-curve fees between the creator and partner. It does not distribute funds to a separate community treasury. Confirm quote-mint units and graduation settings in the SDK.</p></div>
            </section>
          </div>

          <div className="right-stack">
            <section className="panel clarity-panel" id="checks">
              <div className="panel-heading"><div><span className="section-index">03</span><h2>Clarity checks</h2></div><button className="info-button" aria-label="About clarity checks">i</button></div>
              <p className="panel-copy">Give buyers a plain-language view of the launch mechanics.</p>
              <div className="readiness"><div className="readiness-top"><span>Disclosure readiness</span><b>{readiness}%</b></div><div className="progress-track"><div style={{width:`${readiness}%`}}/></div><small>{checks.filter((x)=>x.done).length} of {checks.length} checks included in this preview</small></div>
              <div className="check-list">{checks.map((check)=> <div className="check-row" key={check.label}><span className={`check-icon ${check.done?"done":"pending"}`}>{check.done?"✓":"·"}</span><span className="check-text"><b>{check.label}</b><small>{check.detail}</small></span><span className={`check-state ${check.done?"":"muted"}`}>{check.done?"READY":"ADD"}</span></div>)}</div>
              <button className="secondary-button" onClick={()=>setShowDisclosureEditor((value)=>!value)}>{showDisclosureEditor?"Close disclosure editor":(allocationDisclosure&&unlockDisclosure?"Edit allocation disclosure":"Add allocation disclosure")} <span>{showDisclosureEditor?"−":"↗"}</span></button>
              {showDisclosureEditor&&<div className="disclosure-editor"><label htmlFor="allocation-disclosure">Supply allocation</label><textarea id="allocation-disclosure" value={allocationDisclosure} onChange={(e)=>setAllocationDisclosure(e.target.value)} placeholder="Describe allocations and who receives them."/><label htmlFor="unlock-disclosure">Unlock schedule</label><textarea id="unlock-disclosure" value={unlockDisclosure} onChange={(e)=>setUnlockDisclosure(e.target.value)} placeholder="Describe vesting dates, unlocks, or state that none apply."/></div>}
            </section>

            <section className="panel destination-panel">
              <div className="destination-top"><div><span className="section-index">04</span><h2>After the curve</h2></div><span className="destination-badge">AUTO-GRADUATION</span></div>
              <div className="route"><div className="route-node"><span className="route-icon">∿</span><div><b>Dynamic Bonding Curve</b><small>Price discovery phase</small></div></div><div className="route-line"><span/></div><div className="route-node"><span className="route-icon final">◈</span><div><b>DAMM v2</b><small>Graduated pool destination</small></div></div></div>
              <div className="target-box"><span>Migration market cap scenario</span><b>{target} <small>{quoteMint}</small></b></div>
              <p className="fine-print">The DBC market-cap builder uses units of the selected quote mint. The actual migration threshold depends on the curve configuration and must be read back from DBC; this preview does not calculate it.</p>
            </section>

            <section className="tip-card"><span className="tip-star">✳</span><div><b>Built for trust, not hype.</b><p>CurveClarity shows the rules and the assumptions. It does not rate a token or suggest that a launch is safe.</p></div></section>
          </div>
        </div>
        <footer className="footer"><span>CURVECLARITY PROTOTYPE · 2026</span><span>Built for the Meteora DBC side track <a href="https://superteam.fun/earn/listing/meteora-dbc" target="_blank" rel="noreferrer">↗</a></span></footer>
      </div>
      {notice && <div className="toast" role="status"><span>✓</span>{notice}<button aria-label="Dismiss message" onClick={()=>setNotice("")}>×</button></div>}
    </section>
  </main>;
}
