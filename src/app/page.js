"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// Prioritize the best images by grouping the named creations and sorting archives by recency (highest timestamp first)
const pastryImages = [
  // --- High Priority / Alphanumerical Files ---
  ...[
    
    
    { src: "/cake_pics/desert_cake.jpg", label: "Desert Cake", tag: "Artisan Cake" },
    { src: "/cake_pics/ferrero.jpg", label: "Ferrero Rocher Special", tag: "Fine Dessert" },
    { src: "/cake_pics/cod.jpg", label: "Call of Duty Cake", tag: "Custom Theme" },
    { src: "/cake_pics/g.jpg", label: "Gallery Piece", tag: "Showpiece" },
    { src: "/cake_pics/christmas.jpg", label: "Christmas Creation", tag: "Seasonal" },
    
    { src: "/cake_pics/g2.jpg", label: "Signature Dessert 2", tag: "Portfolio" },
    { src: "/cake_pics/g3.jpg", label: "Signature Dessert 3", tag: "Portfolio" },
    { src: "/cake_pics/g4.jpg", label: "Signature Dessert 4", tag: "Portfolio" },
    { src: "/cake_pics/g7.jpg", label: "Signature Dessert 7", tag: "Portfolio" },
    { src: "/cake_pics/g8.jpg", label: "Signature Dessert 8", tag: "Portfolio" },
    { src: "/cake_pics/g10.jpg", label: "Signature Dessert 10", tag: "Portfolio" },
    { src: "/cake_pics/g11.jpg", label: "Signature Dessert 11", tag: "Portfolio" },
    { src: "/cake_pics/g12.jpg", label: "Signature Dessert 12", tag: "Portfolio" },
    { src: "/cake_pics/g13.jpg", label: "Signature Dessert 13", tag: "Portfolio" },
    { src: "/cake_pics/g14.jpg", label: "Signature Dessert 14", tag: "Portfolio" },
    { src: "/cake_pics/g16.jpg", label: "Signature Dessert 16", tag: "Portfolio" },
    { src: "/cake_pics/g17.jpg", label: "Signature Dessert 17", tag: "Portfolio" },
    { src: "/cake_pics/g18.jpg", label: "Signature Dessert 18", tag: "Portfolio" },
    { src: "/cake_pics/g19.jpg", label: "Signature Dessert 19", tag: "Portfolio" },
    { src: "/cake_pics/spiderman_cake.jpg", label: "Spider-Man Cake", tag: "Custom Theme" },
  ],
  // --- Numerical (Timestamp) Files (Sorted Newest First) ---
  ...[
    { src: "/cake_pics/1606411176953.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1608152475046.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1608152497743.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1608152527629.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1608152549871.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1608152618270.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1608152741252.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1611240278684.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1613282438749.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1613282531957.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1643086583103.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1643086798081.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1644984303072.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1644984372287.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1644988820364.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1647290048307.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1647765551068.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1650792546428.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1651613817034.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1654083970683.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1659441472386.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1659442745088.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1660043119446.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1666356356439.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1669917166382.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1672477560994.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1673259155310.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1673259221189.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1674047195049.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1685862819817.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1685862919315.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1703429153547.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1703429216330.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1703651472625.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1728987358067.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1730022204261.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1730386615520.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1735837863378.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1737617505905.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1738638277231.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1743838551254.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1744726250511.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1745511454918.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1745512768843.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1756450799182.jpg", label: "Pastry Creation", tag: "Archive" },
    { src: "/cake_pics/1760682954010.jpg", label: "Pastry Creation", tag: "Archive" }
  ].sort((a, b) => {
    // Sort timestamps descending (newest first)
    const tA = parseInt(a.src.match(/\d+/)?.[0] || "0");
    const tB = parseInt(b.src.match(/\d+/)?.[0] || "0");
    return tB - tA;
  })
];

const experiences = [
  { 
    title: "Pastry Chef", 
    company: "Grand Millennium Business Bay", 
    location: "Dubai, UAE", 
    date: "Aug 2019 – Present", 
    years: "6 yrs", 
    description: "Managing full pastry operations for a 252-room luxury property — from fine dining plated desserts and VIP amenities to high-volume breakfast buffets and bespoke wedding cakes.", 
    highlights: ["252-room property", "Fine dining & banqueting", "VIP custom orders"] 
  },
  { 
    title: "Pastry Chef", 
    company: "Rixos Bab Al Bahr", 
    location: "Ras Al Khaimah, UAE", 
    date: "Apr 2017 – Jul 2019", 
    years: "2 yrs", 
    description: "Led high-volume pastry production at scale — catering to 3,000 daily guests across 12 distinct F&B outlets and extensive banquet facilities in a 5-star all-inclusive resort.", 
    highlights: ["3,000+ daily guests", "12 F&B outlets", "All-inclusive resort"] 
  },
  { 
    title: "Pastry Chef", 
    company: "Pullman Hotel & Residence", 
    location: "Dubai Creek, UAE", 
    date: "Mar 2014 – Apr 2017", 
    years: "3 yrs", 
    description: "Directed all baking and pastry arts for the luxury Accor property, maintaining global brand standards while delivering innovative seasonal menus and personalized guest experiences.", 
    highlights: ["Accor brand standards", "Seasonal menu design", "Luxury residence service"] 
  },
  { 
    title: "Pastry Chef — Pre-Opening", 
    company: "Novotel & Ibis Gates Hotel", 
    location: "Abu Dhabi, UAE", 
    date: "Oct 2010 – Feb 2014", 
    years: "4 yrs", 
    description: "Spearheaded the pre-opening pastry program across 7 outlets from the ground up — developing inaugural menus, implementing rigorous HACCP systems, and managing high-profile wedding commissions.", 
    highlights: ["Pre-opening team lead", "7 outlet menus", "HACCP implementation"] 
  },
  { 
    title: "Sous Chef", 
    company: "Royal Catering", 
    location: "Mussafa, Abu Dhabi, UAE", 
    date: "2007 – Oct 2010", 
    years: "3 yrs", 
    description: "Assisted the Executive Chef in a state-of-the-art HACCP certified 3,000 square metre central kitchen facility with the capacity to produce 60,000 meals a day.", 
    highlights: ["Central kitchen operations", "60,000 daily meals", "HACCP certified facility"] 
  },
  { 
    title: "Assistant Pastry Chef", 
    company: "Mercure Hotel", 
    location: "Abu Dhabi, UAE", 
    date: "Oct 2002 – Sep 2007", 
    years: "5 yrs", 
    description: "Assisted the Pastry Chef in managing operations for a 216-room property. Responsible for producing all in-house breads, breakfast pastries, and catering to specialty restaurants.", 
    highlights: ["216-room property", "In-house bakery", "French & Chinese specialty menus"] 
  },
  { 
    title: "Commis Chef to Chef De Partie", 
    company: "Novotel Centre Hotel", 
    location: "Abu Dhabi, UAE", 
    date: "Jun 1994 – Sep 2002", 
    years: "8 yrs", 
    description: "Progressed through the kitchen ranks, creating innovative desserts, wedding cakes, and bread showpieces while maintaining strict HACCP standards and daily menu changes.", 
    highlights: ["Daily menu changes", "Bread showpieces", "Staff training & hygiene"] 
  },
  { 
    title: "Commis Chef Pastry", 
    company: "Motimahal International Hotel", 
    location: "Mangalore, India", 
    date: "1993 – 1994", 
    years: "1 yr", 
    description: "Supported the daily pastry kitchen operations, focusing on strict menu specifications, waste control, and hygiene standards.", 
    highlights: ["Daily operations support", "Waste control", "Hygiene maintenance"] 
  }
];

const skills = ["Fine Dining Plating", "High-Volume Banqueting", "Fondant & Sugar Art", "Artisanal Viennoiserie", "HACCP Compliance", "Cost & Waste Control", "Kitchen Brigade Leadership", "Menu Engineering", "Wedding Cake Design", "Chocolate Tempering"];

const stats = [
  { value: 30, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "★", label: "Hotel Properties" },
  { value: 4, suffix: "", label: "UAE Cities" },
  { value: 12, suffix: "", label: "F&B Outlets Led" },
];

// Hook: fires callback when element enters viewport
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// Animated counter
function Counter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{count}{suffix}</span>;
}

export default function Portfolio() {
  const [activeImage, setActiveImage] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [statsRef, statsInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [galleryRef, galleryInView] = useInView();
  const [expRef, expInView] = useInView();
  const [contactRef, contactInView] = useInView();

  useEffect(() => {
    const onScroll = () => { setScrollY(window.scrollY); setNavScrolled(window.scrollY > 60); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#FAFAF8", color: "#1A1612", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+SC:wght@400;500&family=Jost:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .sans { font-family: 'Jost', sans-serif; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .serif-sc { font-family: 'Cormorant SC', Georgia, serif; }

        /* NAV */
        .nav-link { font-family:'Jost',sans-serif; font-weight:400; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#5C4F3D; text-decoration:none; transition:color 0.3s; position:relative; padding-bottom:2px; }
        .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:#7A4E1A; transition:width 0.3s ease; }
        .nav-link:hover { color:#7A4E1A; }
        .nav-link:hover::after { width:100%; }

        /* BUTTONS */
        .btn-primary { display:inline-block; font-family:'Jost',sans-serif; font-weight:500; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#FFFFFF; background:#7A4E1A; padding:14px 36px; text-decoration:none; border:none; cursor:pointer; position:relative; overflow:hidden; transition:transform 0.2s; }
        .btn-primary::before { content:''; position:absolute; inset:0; background:#5C3A12; transform:translateX(-100%); transition:transform 0.35s ease; }
        .btn-primary:hover::before { transform:translateX(0); }
        .btn-primary span { position:relative; z-index:1; }
        .btn-primary:hover { transform:translateY(-2px); }

        .btn-ghost { display:inline-block; font-family:'Jost',sans-serif; font-weight:400; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#3D2E1E; background:transparent; padding:13px 35px; text-decoration:none; border:1.5px solid #B89A72; cursor:pointer; transition:border-color 0.3s, color 0.3s, background 0.3s, transform 0.2s; }
        .btn-ghost:hover { border-color:#7A4E1A; color:#7A4E1A; background:rgba(122,78,26,0.04); transform:translateY(-2px); }

        .section-label { font-family:'Jost',sans-serif; font-weight:400; font-size:10px; letter-spacing:0.38em; text-transform:uppercase; color:#7A4E1A; }

        /* GALLERY MASONRY */
        .gallery-masonry { column-count: 3; column-gap: 8px; width: 100%; }
        .gallery-item { position:relative; overflow:hidden; cursor:pointer; break-inside: avoid; page-break-inside: avoid; margin-bottom: 8px; border-radius: 4px; }
        .gallery-img { transition:transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94); }
        .gallery-item:hover .gallery-img { transform:scale(1.08); }
        .gallery-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(20,14,8,0.92) 0%, rgba(20,14,8,0.1) 55%, transparent 100%); opacity:0; transition:opacity 0.5s; display:flex; flex-direction:column; justify-content:flex-end; padding:28px; }
        .gallery-item:hover .gallery-overlay { opacity:1; }
        .gallery-tag { font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.28em; text-transform:uppercase; color:#D4A85A; font-weight:500; margin-bottom:6px; transform:translateY(8px); transition:transform 0.4s ease; }
        .gallery-label { font-family:'Cormorant Garamond',Georgia,serif; font-size:22px; font-weight:400; color:#FAFAF8; line-height:1.2; transform:translateY(10px); transition:transform 0.4s 0.05s ease; }
        .gallery-item:hover .gallery-tag, .gallery-item:hover .gallery-label { transform:translateY(0); }

        /* SKILLS */
        .skill-tag { display:inline-flex; align-items:center; gap:8px; font-family:'Jost',sans-serif; font-weight:400; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:#3D2E1E; border:1.5px solid #C8B89A; padding:10px 20px; background:#FFFFFF; cursor:default; transition:border-color 0.3s, color 0.3s, background 0.3s, transform 0.25s; }
        .skill-tag:hover { border-color:#7A4E1A; color:#7A4E1A; background:#FDF8F2; transform:translateY(-3px); }

        /* TIMELINE */
        .exp-item { border-left:2px solid #DDD0BC; padding-left:32px; padding-bottom:52px; position:relative; transition:border-color 0.4s; }
        .exp-item:hover { border-left-color:#7A4E1A; }
        .exp-item:last-child { padding-bottom:0; }
        .exp-dot { position:absolute; left:-6px; top:5px; width:10px; height:10px; background:#7A4E1A; border-radius:50%; border:2px solid #FAFAF8; box-shadow:0 0 0 2px #7A4E1A; transition:transform 0.3s; }
        .exp-item:hover .exp-dot { transform:scale(1.4); }

        /* CONTACT */
        .contact-link { display:flex; align-items:center; gap:18px; text-decoration:none; color:#1A1612; font-weight:400; font-size:16px; transition:color 0.3s, transform 0.3s; padding:22px 0; border-bottom:1px solid #DDD0BC; }
        .contact-link:hover { color:#7A4E1A; transform:translateX(8px); }
        .contact-icon { width:46px; height:46px; border:1.5px solid #C8B89A; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:border-color 0.3s, background 0.3s; background:#FFFFFF; border-radius:50%; }
        .contact-link:hover .contact-icon { border-color:#7A4E1A; background:#FDF8F2; }

        /* PROFILE RINGS */
        @keyframes spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes spin-reverse { from { transform:rotate(0deg); } to { transform:rotate(-360deg); } }
        @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
        @keyframes pulse-ring { 0%,100% { opacity:0.6; transform:scale(1); } 50% { opacity:1; transform:scale(1.02); } }
        .ring-spin { animation:spin-slow 18s linear infinite; }
        .ring-reverse { animation:spin-reverse 24s linear infinite; }
        .profile-float { animation:float 6s ease-in-out infinite; }
        .ring-pulse { animation:pulse-ring 3s ease-in-out infinite; }

        /* SCROLL REVEAL */
        .reveal { opacity:0; transform:translateY(32px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .reveal-left { opacity:0; transform:translateX(-40px); transition:opacity 0.8s ease, transform 0.8s ease; }
        .reveal-left.visible { opacity:1; transform:translateX(0); }
        .reveal-right { opacity:0; transform:translateX(40px); transition:opacity 0.8s ease, transform 0.8s ease; }
        .reveal-right.visible { opacity:1; transform:translateX(0); }
        .reveal-scale { opacity:0; transform:scale(0.92); transition:opacity 0.7s ease, transform 0.7s ease; }
        .reveal-scale.visible { opacity:1; transform:scale(1); }

        /* HERO ENTRANCE */
        @keyframes slideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideRight { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }
        @keyframes lineGrow { from { width:0; } to { width:40px; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .h-label { animation:slideRight 0.7s 0.1s ease both; }
        .h-ornament { animation:fadeIn 0.6s 0.3s ease both; }
        .h-name1 { animation:slideUp 0.8s 0.4s ease both; }
        .h-name2 { animation:slideUp 0.8s 0.55s ease both; }
        .h-para { animation:slideUp 0.8s 0.7s ease both; }
        .h-btns { animation:slideUp 0.8s 0.85s ease both; }
        .h-stats { animation:slideUp 0.7s 1.0s ease both; }
        .h-photo { animation:scaleIn 1s 0.5s ease both; }

        /* LIGHTBOX */
        @keyframes lbIn { from { opacity:0; transform:scale(0.94) translateY(16px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .lb-card { animation:lbIn 0.35s ease both; }

        /* STAT */
        .stat-item { padding:0 36px; border-right:1px solid #DDD0BC; transition:transform 0.3s; }
        .stat-item:first-child { padding-left:0; }
        .stat-item:last-child { border-right:none; }
        .stat-item:hover { transform:translateY(-4px); }

        @media (max-width:900px) {
          .exp-grid { grid-template-columns:1fr !important; }
          .hero-layout { flex-direction:column !important; gap:48px !important; }
          .hero-name { font-size:52px !important; }
          .gallery-masonry { column-count: 2 !important; }
          .stats-row { flex-wrap:wrap !important; }
          .stat-item { border-right:none !important; border-bottom:1px solid #DDD0BC; padding:16px 0 !important; width:50%; }
        }
        
        @media (max-width:600px) {
          .gallery-masonry { column-count: 1 !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"18px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", background:navScrolled?"rgba(250,250,248,0.97)":"transparent", backdropFilter:navScrolled?"blur(10px)":"none", borderBottom:navScrolled?"1px solid #E0D5C5":"none", transition:"all 0.4s ease" }}>
        <span className="serif-sc" style={{ fontSize:"16px", letterSpacing:"0.1em", color:"#7A4E1A", fontWeight:500 }}>MA</span>
        <div style={{ display:"flex", gap:"36px" }}>
          {["experience","portfolio","contact"].map(s => (
            <a key={s} href={`#${s}`} className="nav-link">{s}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <header style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"100px 48px 80px", background:"#FAFAF8", overflow:"hidden" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", width:"100%" }}>
          <div className="hero-layout" style={{ display:"flex", alignItems:"center", gap:"80px" }}>

            {/* Text col */}
            <div style={{ flex:1 }}>
              <div className="h-label" style={{ marginBottom:"18px" }}>
                <span className="section-label">Executive Pastry Chef · UAE</span>
              </div>
              <div className="h-ornament" style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
                <div style={{ width:"40px", height:"1px", background:"#7A4E1A" }} />
                <span style={{ color:"#7A4E1A", fontSize:"14px" }}>✦</span>
                <div style={{ width:"40px", height:"1px", background:"#7A4E1A" }} />
              </div>
              <h1 className="h-name1 serif hero-name" style={{ fontSize:"80px", fontWeight:400, lineHeight:1.0, color:"#1A1612", marginBottom:"4px" }}>Mohammed</h1>
              <h1 className="h-name2 serif hero-name" style={{ fontSize:"80px", fontWeight:600, lineHeight:1.0, color:"#7A4E1A", fontStyle:"italic", marginBottom:"36px" }}>Abdullah</h1>
              <p className="h-para sans" style={{ fontSize:"15px", fontWeight:400, lineHeight:1.8, color:"#4A3B2A", maxWidth:"440px", marginBottom:"44px" }}>
                Over three decades crafting exquisite pastry experiences across the UAE's most prestigious luxury hotels. Where classical technique meets contemporary vision.
              </p>
              <div className="h-btns" style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
                <a href="#portfolio" className="btn-primary"><span>View Creations</span></a>
                <a href="#contact" className="btn-ghost">Get in Touch</a>
              </div>
            </div>

            {/* Photo col */}
            <div className="h-photo" style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div className="profile-float" style={{ position:"relative", width:"340px", height:"340px" }}>
                {/* Outer spinning dashed ring */}
                <div className="ring-spin" style={{ position:"absolute", inset:"-28px", borderRadius:"50%", border:"1px dashed rgba(184,154,114,0.5)", pointerEvents:"none" }} />
                {/* Inner spinning solid ring */}
                <div className="ring-reverse ring-pulse" style={{ position:"absolute", inset:"-10px", borderRadius:"50%", border:"1.5px solid #C8A96E", pointerEvents:"none" }} />
                {/* Photo */}
                <div style={{ position:"relative", width:"340px", height:"340px", borderRadius:"50%", overflow:"hidden", border:"4px solid #FFFFFF", boxShadow:"0 24px 64px rgba(122,78,26,0.18)" }}>
                  <Image src="/ali_profile.jpg" alt="Chef Mohammed Abdullah" fill priority style={{ objectFit:"cover", objectPosition:"center top" }} sizes="340px" />
                </div>
                {/* Badge */}
                <div style={{ position:"absolute", bottom:"12px", right:"-8px", background:"#7A4E1A", color:"#FFFFFF", borderRadius:"50%", width:"80px", height:"80px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 20px rgba(122,78,26,0.4)", border:"3px solid #FFFFFF" }}>
                  <span className="serif" style={{ fontSize:"22px", fontWeight:600, lineHeight:1 }}>30</span>
                  <span className="sans" style={{ fontSize:"8px", letterSpacing:"0.1em", fontWeight:400, opacity:0.9 }}>YRS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="h-stats stats-row" style={{ display:"flex", marginTop:"72px", paddingTop:"44px", borderTop:"1px solid #E0D5C5" }}>
            {stats.map((s, i) => (
              <div key={i} className="stat-item" style={{ transitionDelay:`${i * 0.1}s` }}>
                <div className="serif" style={{ fontSize:"40px", fontWeight:500, color:"#7A4E1A", lineHeight:1 }}>
                  <Counter target={s.value} suffix={s.suffix} inView={statsInView} />
                </div>
                <div className="sans" style={{ fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#8A7055", marginTop:"7px", fontWeight:400 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── SKILLS ── */}
      <section style={{ padding:"96px 48px", background:"#FFFFFF", borderTop:"1px solid #E0D5C5", borderBottom:"1px solid #E0D5C5" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div ref={skillsRef} style={{ textAlign:"center", marginBottom:"52px" }} className={`reveal ${skillsInView?"visible":""}`}>
            <div className="section-label" style={{ marginBottom:"14px" }}>Mastery & Craft</div>
            <h2 className="serif" style={{ fontSize:"44px", fontWeight:500, color:"#1A1612" }}>
              Culinary <span style={{ fontStyle:"italic", color:"#7A4E1A", fontWeight:400 }}>Expertise</span>
            </h2>
            <div style={{ width:"40px", height:"2px", background:"#7A4E1A", margin:"20px auto 0" }} />
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"10px" }}>
            {skills.map((skill, i) => (
              <span
                key={i}
                className={`skill-tag ${skillsInView?"visible":""}`}
                style={{
                  opacity: skillsInView ? 1 : 0,
                  transform: skillsInView ? "translateY(0)" : "translateY(18px)",
                  transition: `opacity 0.5s ease ${0.05 * i}s, transform 0.5s ease ${0.05 * i}s, border-color 0.3s, color 0.3s, background 0.3s`,
                }}
              >
                <span style={{ color:"#7A4E1A", fontSize:"8px" }}>✦</span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding:"112px 48px", background:"#FAFAF8" }}>
        <div ref={expRef} className="exp-grid" style={{ maxWidth:"1200px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 2fr", gap:"88px", alignItems:"start" }}>

          <div className={`reveal-left ${expInView?"visible":""}`} style={{ position:"sticky", top:"110px" }}>
            <div className="section-label" style={{ marginBottom:"14px" }}>Career Trajectory</div>
            <h2 className="serif" style={{ fontSize:"50px", fontWeight:500, color:"#1A1612", lineHeight:1.05, marginBottom:"20px" }}>
              Professional<br /><span style={{ fontStyle:"italic", color:"#7A4E1A", fontWeight:400 }}>Journey</span>
            </h2>
            <div style={{ width:"40px", height:"2px", background:"#7A4E1A", marginBottom:"24px" }} />
            <p className="sans" style={{ fontSize:"14px", fontWeight:400, color:"#4A3B2A", lineHeight:1.8, marginBottom:"36px" }}>
              Three decades of pastry excellence across the UAE's most celebrated five-star properties — from Abu Dhabi pre-openings to Dubai's landmark hotels.
            </p>
            <a href="#contact" className="btn-ghost">Open to Opportunities</a>
          </div>

          <div>
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`exp-item ${expInView?"visible":""}`}
                style={{
                  opacity: expInView ? 1 : 0,
                  transform: expInView ? "translateX(0)" : "translateX(32px)",
                  transition: `opacity 0.7s ease ${0.15 + i * 0.15}s, transform 0.7s ease ${0.15 + i * 0.15}s, border-color 0.4s`,
                }}
              >
                <div className="exp-dot" />
                <div className="sans" style={{ fontSize:"11px", letterSpacing:"0.22em", textTransform:"uppercase", color:"#7A4E1A", fontWeight:500, marginBottom:"10px" }}>{exp.date} · {exp.years}</div>
                <h3 className="serif" style={{ fontSize:"28px", fontWeight:500, color:"#1A1612", marginBottom:"4px" }}>{exp.title}</h3>
                <div className="serif" style={{ fontSize:"19px", fontWeight:400, fontStyle:"italic", color:"#5C4530", marginBottom:"4px" }}>{exp.company}</div>
                <div className="sans" style={{ fontSize:"11px", letterSpacing:"0.12em", color:"#8A7055", marginBottom:"14px", textTransform:"uppercase", fontWeight:400 }}>{exp.location}</div>
                <p className="sans" style={{ fontSize:"14px", fontWeight:400, color:"#3D2E1E", lineHeight:1.8, marginBottom:"18px" }}>{exp.description}</p>
                <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                  {exp.highlights.map((h, j) => (
                    <span key={j} className="sans" style={{ fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:500, color:"#7A4E1A", background:"rgba(122,78,26,0.08)", padding:"5px 12px", border:"1px solid rgba(122,78,26,0.25)" }}>{h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ padding:"112px 48px", background:"#F2EDE4" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div ref={galleryRef} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"60px", flexWrap:"wrap", gap:"24px" }}>
            <div className={`reveal-left ${galleryInView?"visible":""}`}>
              <div className="section-label" style={{ marginBottom:"14px" }}>Signature Works</div>
              <h2 className="serif" style={{ fontSize:"50px", fontWeight:500, color:"#1A1612", lineHeight:1.05 }}>
                Featured<br /><span style={{ fontStyle:"italic", color:"#7A4E1A", fontWeight:400 }}>Creations</span>
              </h2>
            </div>
            <p className={`sans reveal-right ${galleryInView?"visible":""}`} style={{ fontSize:"14px", fontWeight:400, color:"#4A3B2A", maxWidth:"280px", lineHeight:1.75, transitionDelay:"0.15s" }}>
              A curated selection spanning fine dining desserts, celebration cakes, and artisan production.
            </p>
          </div>

          <div className="gallery-masonry">
            {pastryImages.map((img, i) => (
              <div
                key={i}
                className={`gallery-item reveal-scale ${galleryInView?"visible":""}`}
                style={{
                  height: `${[420, 320, 540, 280, 460, 380][i % 6]}px`,
                  transitionDelay:`${0.05 * (i % 6)}s`,
                }}
                onClick={() => setActiveImage(img)}
              >
                <Image 
                  src={img.src} 
                  alt={img.label} 
                  fill 
                  priority={i < 6}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: "cover" }} 
                  className="gallery-img"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xg8AAmkBa0sPnjcAAAAASUVORK5CYII="
                />
                <div className="gallery-overlay">
                  <div className="gallery-tag">{img.tag}</div>
                  <div className="gallery-label">{img.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <footer id="contact" style={{ padding:"96px 48px", background:"#F2EDE4", borderTop:"1px solid #E0D5C5" }}>
        <div ref={contactRef} style={{ maxWidth:"860px", margin:"0 auto" }}>

          <div className={`reveal ${contactInView?"visible":""}`} style={{ textAlign:"center", marginBottom:"64px" }}>
            <div className="section-label" style={{ marginBottom:"14px" }}>Let's Connect</div>
            <h2 className="serif" style={{ fontSize:"50px", fontWeight:500, color:"#1A1612", lineHeight:1.1, marginBottom:"18px" }}>
              Ready to elevate<br /><span style={{ fontStyle:"italic", color:"#7A4E1A", fontWeight:400 }}>your culinary team?</span>
            </h2>
            <div style={{ width:"40px", height:"2px", background:"#7A4E1A", margin:"0 auto 20px" }} />
            <p className="sans" style={{ fontSize:"15px", fontWeight:400, color:"#4A3B2A", maxWidth:"480px", margin:"0 auto", lineHeight:1.8 }}>
              Currently open to senior pastry leadership roles in luxury hospitality across the UAE and Singapore. Available for consulting and pre-opening projects.
            </p>
          </div>

          <div style={{ maxWidth:"500px", margin:"0 auto" }}>
            {[
              { href:"mailto:abudllamohmmed786@gmail.com", label:"Email", value:"abudllamohmmed786@gmail.com", delay:"0.15s", icon:<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" /> },
              { href:"tel:+971507912753", label:"Phone / WhatsApp", value:"+971 50 791 2753", delay:"0.28s", icon:<path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" /> },
            ].map((c, i) => (
              <a key={i} href={c.href} className={`contact-link serif ${contactInView?"visible":""}`}
                style={{ opacity:contactInView?1:0, transform:contactInView?"translateX(0)":"translateX(-24px)", transition:`opacity 0.6s ease ${c.delay}, transform 0.6s ease ${c.delay}, color 0.3s, transform 0.3s` }}>
                <div className="contact-icon">
                  <svg width="18" height="18" fill="none" stroke="#7A4E1A" strokeWidth="1.5" viewBox="0 0 24 24">{c.icon}</svg>
                </div>
                <div>
                  <div className="sans" style={{ fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#8A7055", marginBottom:"3px", fontWeight:400 }}>{c.label}</div>
                  <div className="sans" style={{ fontSize:"15px", fontWeight:400, color:"#1A1612" }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div className={`reveal ${contactInView?"visible":""}`} style={{ marginTop:"72px", paddingTop:"36px", borderTop:"1px solid #DDD0BC", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px", transitionDelay:"0.4s" }}>
            <span className="serif-sc" style={{ fontSize:"16px", letterSpacing:"0.1em", color:"#8A7055", fontWeight:500 }}>Mohammed Abdullah</span>
            <span className="sans" style={{ fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#8A7055", fontWeight:400 }}>Executive Pastry Chef · Dubai, UAE</span>
          </div>
        </div>
      </footer>

      {/* ── LIGHTBOX ── */}
      {activeImage && (
        <div onClick={() => setActiveImage(null)} style={{ position:"fixed", inset:0, background:"rgba(20,14,8,0.93)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px", cursor:"pointer", transition: "opacity 0.3s ease" }}>
          <div className="lb-card" onClick={e => e.stopPropagation()} style={{ maxWidth:"580px", width:"100%" }}>
            <div style={{ position: "relative", width: "100%", height: "68vh" }}>
              <Image 
                src={activeImage.src} 
                alt={activeImage.label} 
                fill 
                style={{ objectFit: "contain" }} 
                sizes="100vw"
              />
            </div>
            <div style={{ padding:"18px 0", borderBottom:"1px solid rgba(220,208,190,0.2)" }}>
              <span className="sans" style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:"#D4A85A", fontWeight:500 }}>{activeImage.tag}</span>
              <p className="serif" style={{ fontSize:"24px", fontWeight:400, color:"#FAFAF8", marginTop:"5px" }}>{activeImage.label}</p>
            </div>
            <button onClick={() => setActiveImage(null)} className="sans" style={{ marginTop:"18px", background:"none", border:"none", color:"#8A7055", fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer", fontWeight:400, transition:"color 0.3s" }}
              onMouseEnter={e => e.target.style.color="#D4A85A"} onMouseLeave={e => e.target.style.color="#8A7055"}>
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}