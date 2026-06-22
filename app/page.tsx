  "use client";
  import { useState } from "react";
  
  const items = [
  { id: 1, name: "Milk", emoji: "🥛", category: "Dairy" },
  { id: 2, name: "Butter", emoji: "🧈", category: "Dairy" },
  { id: 3, name: "Orange Juice", emoji: "🍊", category: "Dairy" },
  { id: 4, name: "Cheese", emoji: "🧀", category: "Dairy" },
  { id: 5, name: "Cream Cheese", emoji: "🫙", category: "Dairy" },
  { id: 6, name: "Multi Fold Towels",emoji: "🧻", category: "Supplies" },
  { id: 7, name: "Tissue", emoji: "🤧", category: "Supplies" },
  { id: 8, name: "Foil", emoji: "✨", category: "Supplies" },
  { id: 9, name: "Parchment Rolls", emoji: "📜", category: "Supplies" },
  { id: 10, name: "Parchment Flat", emoji: "📄", category: "Supplies" },
  ];
  
  const PHASES = { REVIEW: "review", QUANTITY: "quantity", SUMMARY: "summary" };
  
  export default function App() {
  const [phase, setPhase] = useState(PHASES.REVIEW);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [animDir, setAnimDir] = useState(null);
  const [qty, setQty] = useState(1);
  
  const currentItem = items[currentIndex];
  const progress = (currentIndex / items.length) * 100;
  
  const handleDecision = (order) => {
  if (!order) {
  setAnimDir("no");
  setTimeout(() => {
  advance(null);
  setAnimDir(null);
  }, 320);
  } else {
  setQty(1);
  setPhase(PHASES.QUANTITY);
  }
  };
  
  const handleConfirmQty = () => {
  setAnimDir("yes");
  setTimeout(() => {
  advance({ ...currentItem, qty });
  setAnimDir(null);
  }, 320);
  };
  
  const advance = (itemToAdd) => {
  if (itemToAdd) setOrderList((prev) => [...prev, itemToAdd]);
  if (currentIndex + 1 >= items.length) {
  setPhase(PHASES.SUMMARY);
  } else {
  setCurrentIndex((i) => i + 1);
  setPhase(PHASES.REVIEW);
  }
  };
  
  const handleRestart = () => {
  setPhase(PHASES.REVIEW);
  setCurrentIndex(0);
  setOrderList([]);
  setAnimDir(null);
  setQty(1);
  };
  
  return (
  <div style={styles.root}>
  <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Instrument+Serif:ital@0;1&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  @keyframes slideInUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
  }
  @keyframes flyYes {
  to { opacity: 0; transform: translateX(110px) rotate(12deg) scale(0.85); }
  }
  @keyframes flyNo {
  to { opacity: 0; transform: translateX(-110px) rotate(-12deg) scale(0.85); }
  }
  @keyframes popIn {
  0% { transform: scale(0.7); opacity: 0; }
  70% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
  }
  @keyframes barGrow { from { width: 0; } }
  
  .card-wrap { animation: slideInUp 0.38s cubic-bezier(.22,.68,0,1.2) both; }
  .card-wrap.fly-yes { animation: flyYes 0.32s ease-in forwards; }
  .card-wrap.fly-no { animation: flyNo 0.32s ease-in forwards; }
  
  .btn-yes, .btn-no, .btn-confirm {
  cursor: pointer; border: none;
  font-family: 'Syne', sans-serif;
  font-weight: 700; font-size: 1rem;
  letter-spacing: 0.08em; text-transform: uppercase;
  border-radius: 50px; padding: 14px 36px;
  transition: transform 0.12s, box-shadow 0.12s;
  }
  .btn-yes:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 8px 28px #00d17044; }
  .btn-no:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 8px 28px #ff4d6644; }
  .btn-confirm:hover{ transform: translateY(-3px) scale(1.04); box-shadow: 0 8px 28px #3a8fff44; }
  .btn-yes:active, .btn-no:active, .btn-confirm:active { transform: scale(0.97); }
  
  .qty-btn {
  cursor: pointer; border: 1.5px solid #ddd7cc;
  background: #f5f0e8; border-radius: 50%;
  width: 44px; height: 44px; font-size: 1.4rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.12s; color: #2a2018; line-height: 1;
  font-family: 'Syne', sans-serif;
  }
  .qty-btn:hover { background: #2a2018; color: #f5f0e8; border-color: #2a2018; transform: scale(1.08); }
  .qty-btn:active { transform: scale(0.95); }
  .qty-btn:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }
  
  .summary-item { animation: popIn 0.35s cubic-bezier(.34,1.56,.64,1) both; }
  
  .restart-btn {
  cursor: pointer; border: 2px solid #e8e2d6;
  background: transparent; font-family: 'Syne', sans-serif;
  font-weight: 700; font-size: 0.85rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: #8a8070;
  border-radius: 50px; padding: 11px 30px; transition: all 0.15s;
  }
  .restart-btn:hover { background: #e8e2d6; color: #2a2018; }
  
  .progress-bar {
  height: 4px; border-radius: 4px;
  background: #2a2018; animation: barGrow 0.4s ease;
  }
  `}</style>
  
  {/* Header */}
  <div style={styles.header}>
  <span style={styles.logo}>🛒</span>
  <span style={styles.logoText}>Order<em style={{fontFamily:"'Instrument Serif',serif",fontStyle:"italic"}}>Check</em></span>
  </div>
  
  {/* ── REVIEW PHASE ── */}
  {phase === PHASES.REVIEW && currentItem && (
  <div style={styles.reviewWrap}>
  <div style={styles.progressOuter}>
  <div style={styles.progressTrack}>
  <div className="progress-bar" style={{ width: `${progress}%` }} />
  </div>
  <span style={styles.progressLabel}>{currentIndex} / {items.length}</span>
  </div>
  
  <div className={`card-wrap${animDir === "yes" ? " fly-yes" : animDir === "no" ? " fly-no" : ""}`} style={styles.card}>
  <div style={styles.categoryTag}>{currentItem.category}</div>
  <div style={styles.itemEmoji}>{currentItem.emoji}</div>
  <h2 style={styles.itemName}>{currentItem.name}</h2>
  <p style={styles.itemQuestion}>Do you need to order this?</p>
  </div>
  
  <div style={styles.btnRow}>
  <button className="btn-no" style={styles.btnNo} onClick={() => handleDecision(false)}>✕ &nbsp;Skip</button>
  <button className="btn-yes" style={styles.btnYes} onClick={() => handleDecision(true)}>✓ &nbsp;Order</button>
  </div>
  <p style={styles.hint}>← Skip &nbsp;|&nbsp; Order →</p>
  </div>
  )}
  
  {/* ── QUANTITY PHASE ── */}
  {phase === PHASES.QUANTITY && currentItem && (
  <div style={styles.reviewWrap}>
  <div style={styles.progressOuter}>
  <div style={styles.progressTrack}>
  <div className="progress-bar" style={{ width: `${progress}%` }} />
  </div>
  <span style={styles.progressLabel}>{currentIndex} / {items.length}</span>
  </div>
  
  <div className="card-wrap" style={styles.card}>
  <div style={styles.categoryTag}>{currentItem.category}</div>
  <div style={styles.itemEmoji}>{currentItem.emoji}</div>
  <h2 style={styles.itemName}>{currentItem.name}</h2>
  <p style={styles.itemQuestion}>How many do you need?</p>
  
  {/* Quantity stepper */}
  <div style={styles.qtyRow}>
  <button className="qty-btn" disabled={qty <= 1} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
  <span style={styles.qtyDisplay}>{qty}</span>
  <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
  </div>
  </div>
  
  <div style={styles.btnRow}>
  <button
  className="btn-no"
  style={styles.btnNo}
  onClick={() => { setPhase(PHASES.REVIEW); }}
  >← Back</button>
  <button className="btn-confirm" style={styles.btnConfirm} onClick={handleConfirmQty}>
  Add {qty} →
  </button>
  </div>
  </div>
  )}
  
  {/* ── SUMMARY PHASE ── */}
  {phase === PHASES.SUMMARY && (
  <div style={styles.summaryWrap}>
  <div style={styles.summaryHeader}>
  <div style={styles.summaryIcon}>📋</div>
  <h2 style={styles.summaryTitle}>Your Order List</h2>
  <p style={styles.summarySubtitle}>
  {orderList.length === 0
  ? "Nothing to order — you're all stocked up!"
  : `${orderList.reduce((s, i) => s + i.qty, 0)} units across ${orderList.length} item${orderList.length > 1 ? "s" : ""}`}
  </p>
  </div>
  
  {orderList.length > 0 ? (
  <ul style={styles.summaryList}>
  {orderList.map((item, i) => (
  <li
  key={item.id}
  className="summary-item"
  style={{ ...styles.summaryItem, animationDelay: `${i * 0.07}s` }}
  >
  <span style={styles.summaryEmoji}>{item.emoji}</span>
  <div style={{flex:1}}>
  <div style={styles.summaryItemName}>{item.name}</div>
  <div style={styles.summaryItemCat}>{item.category}</div>
  </div>
  <div style={styles.qtyBadge}>× {item.qty}</div>
  </li>
  ))}
  </ul>
  ) : (
  <div style={styles.emptyState}>🎉 All good, nothing needed!</div>
  )}
  
  <button className="restart-btn" onClick={handleRestart}>↺ &nbsp;Start Over</button>
  </div>
  )}
  </div>
  );
  }
  
  const styles = {
  root: {
  minHeight: "100vh", background: "#f5f0e8",
  fontFamily: "'Syne', sans-serif",
  display: "flex", flexDirection: "column", alignItems: "center",
  padding: "0 16px 48px",
  },
  header: {
  display: "flex", alignItems: "center", gap: 10,
  padding: "28px 0 20px", width: "100%", maxWidth: 440,
  },
  logo: { fontSize: "1.5rem" },
  logoText: { fontSize: "1.3rem", fontWeight: 800, color: "#2a2018", letterSpacing: "-0.01em" },
  
  reviewWrap: {
  display: "flex", flexDirection: "column", alignItems: "center",
  width: "100%", maxWidth: 380, gap: 28,
  },
  progressOuter: { width: "100%", display: "flex", alignItems: "center", gap: 12 },
  progressTrack: { flex: 1, height: 4, borderRadius: 4, background: "#ddd7cc", overflow: "hidden" },
  progressLabel: { fontSize: "0.78rem", color: "#9a9080", fontWeight: 700, letterSpacing: "0.06em", minWidth: 36 },
  
  card: {
  background: "#fff", borderRadius: 24, padding: "40px 36px 36px",
  width: "100%", boxShadow: "0 4px 40px #2a201818, 0 1px 0 #e8e2d6",
  display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
  border: "1.5px solid #eae4da",
  },
  categoryTag: {
  background: "#f0ebe0", color: "#8a7a60", fontSize: "0.72rem", fontWeight: 700,
  letterSpacing: "0.13em", textTransform: "uppercase", borderRadius: 50, padding: "5px 14px",
  },
  itemEmoji: { fontSize: "4rem", lineHeight: 1, marginTop: 8 },
  itemName: { fontSize: "1.7rem", fontWeight: 800, color: "#2a2018", textAlign: "center", letterSpacing: "-0.02em" },
  itemQuestion: { fontSize: "0.92rem", color: "#9a9080", marginTop: 4, fontFamily: "'Instrument Serif',serif", fontStyle: "italic" },
  
  qtyRow: { display: "flex", alignItems: "center", gap: 20, marginTop: 8 },
  qtyDisplay: { fontSize: "2.4rem", fontWeight: 800, color: "#2a2018", minWidth: 52, textAlign: "center", letterSpacing: "-0.03em" },
  
  btnRow: { display: "flex", gap: 14, width: "100%", justifyContent: "center" },
  btnNo: { background: "#fff0f2", color: "#cc2233", flex: 1 },
  btnYes: { background: "#e6faf2", color: "#007a40", flex: 1 },
  btnConfirm: { background: "#e8f0ff", color: "#1a4fcc", flex: 1 },
  
  hint: { fontSize: "0.72rem", color: "#bbb3a8", letterSpacing: "0.06em", marginTop: -12 },
  
  summaryWrap: {
  display: "flex", flexDirection: "column", alignItems: "center",
  width: "100%", maxWidth: 400, gap: 20,
  },
  summaryHeader: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingBottom: 8 },
  summaryIcon: { fontSize: "2.8rem", lineHeight: 1 },
  summaryTitle: { fontSize: "2rem", fontWeight: 800, color: "#2a2018", letterSpacing: "-0.03em" },
  summarySubtitle: { fontSize: "0.95rem", color: "#9a9080", fontFamily: "'Instrument Serif',serif", fontStyle: "italic" },
  
  summaryList: { listStyle: "none", width: "100%", display: "flex", flexDirection: "column", gap: 10 },
  summaryItem: {
  background: "#fff", border: "1.5px solid #eae4da", borderRadius: 16,
  padding: "14px 18px", display: "flex", alignItems: "center", gap: 14,
  boxShadow: "0 2px 10px #2a200808",
  },
  summaryEmoji: { fontSize: "1.8rem", lineHeight: 1 },
  summaryItemName: { fontSize: "1rem", fontWeight: 700, color: "#2a2018" },
  summaryItemCat: { fontSize: "0.75rem", color: "#b0a898", letterSpacing: "0.05em", marginTop: 2 },
  qtyBadge: {
  background: "#f0ebe0", color: "#6a5a40", fontWeight: 800,
  fontSize: "0.95rem", borderRadius: 50, padding: "5px 14px",
  letterSpacing: "0.02em", whiteSpace: "nowrap",
  },
  emptyState: {
  background: "#fff", border: "1.5px solid #eae4da", borderRadius: 16,
  padding: "32px 24px", fontSize: "1.1rem", color: "#8a7a60",
  textAlign: "center", width: "100%",
  },
 };
  