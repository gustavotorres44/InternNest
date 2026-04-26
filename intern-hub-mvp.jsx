"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ApartmentMap = dynamic(() => import("./components/ApartmentMap"), { ssr: false });

import {
  FALLBACK_CITIES as CITIES,
  FALLBACK_LISTINGS as LISTINGS,
  FALLBACK_TRANSPORT as TRANSPORT,
  FALLBACK_INTEREST_GROUPS as INTEREST_GROUPS
} from "./lib/fallback-data";
import { getCities, getListings, getTransport, getInterestGroups } from "./lib/data";

// Sub-components use CSS vars (var(--*)) for all neutral colors.
// Variables are injected by the main component's <style> block and cascade through the DOM.

const COMMUTE_ICONS = { "Walk": "🚶", "Bike": "🚲", "Public Transit": "🚇", "Car": "🚗" };

function getCommuteHighlight(amenities, transportMode) {
  if (!transportMode || transportMode === "All") return null;
  let found = null;
  if (transportMode === "Walk") {
    found = amenities.find(a => /\d+\s*min\s*walk/i.test(a));
  } else if (transportMode === "Bike") {
    found = amenities.find(a => /bikeable/i.test(a)) || amenities.find(a => /near coca-cola/i.test(a));
  } else if (transportMode === "Public Transit") {
    found = amenities.find(a => /marta/i.test(a)) || amenities.find(a => /\d+[-–]?\d*\s*min\s*to/i.test(a));
  } else if (transportMode === "Car") {
    found = amenities.find(a => /\d+\s*min\s*(to|drive)/i.test(a));
  }
  return found || null;
}

const QUOTES = [
  { text: "Good public transit dropped me off right at the door of Microsoft — it let me actually live in the city.", company: "Microsoft Intern", city: "Seattle", color: "#00a4ef" },
  { text: "The hardest part is finding a place. Once you find it, it's pretty much smooth sailing.", company: "Tesla Intern", city: "", color: "#cc0000" },
  { text: "Moving around in Austin was much more complicated due to having to Uber everywhere.", company: "Tesla Intern", city: "Austin", color: "#cc0000" },
  { text: "There's no clear manual for where to live in LA — people commute from many different areas depending on preferences and budget.", company: "Apple Intern", city: "Los Angeles", color: "#555" },
  { text: "In LA, I feel like I have a life outside of Apple, which has made the internship more balanced and fulfilling.", company: "Apple Intern", city: "Los Angeles", color: "#555" },
  { text: "Adjusting to a new city where I didn't have close friends initially required starting over socially.", company: "Apple Intern", city: "Los Angeles", color: "#555" },
  { text: "The most stressful part was finding affordable housing in a good location. It took a while.", company: "BMW Intern", city: "New York", color: "#0066b1" },
  { text: "I ended up in NYU summer housing — big room, pretty nice. Just be prepared: the whole process moves fast.", company: "BMW Intern", city: "New York", color: "#0066b1" },
  { text: "Stressful part was finding where to stay in 2 months and finding a car — I had no car at the time.", company: "BMW Intern", city: "New York", color: "#0066b1" },
];

const CityCard = ({ city, isSelected, onClick, index, sidebar }) => (
  <div
    onClick={onClick}
    style={{
      padding: "14px 18px",
      borderRadius: 14,
      cursor: "pointer",
      background: isSelected ? city.color : "var(--surface)",
      border: isSelected ? "2px solid transparent" : "2px solid var(--border)",
      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      transform: isSelected ? "scale(1.02)" : "scale(1)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: isSelected ? "#fff" : "var(--text-muted)",
      animation: `fadeSlideUp 0.5s ease ${index * 0.06}s both`,
      width: sidebar ? "100%" : undefined,
      minWidth: sidebar ? undefined : "fit-content",
    }}
  >
    <span style={{ fontSize: 24 }}>{city.emoji}</span>
    <div>
      <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, fontWeight: 400, color: isSelected ? "#fff" : "var(--text)" }}>
        {city.name}
      </div>
      <div style={{ fontSize: 12, opacity: 0.65, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
        {city.listings} listings
      </div>
    </div>
  </div>
);

const ListingCard = ({ listing, cityColor, index, transportFilter, isHighlighted }) => {
  const commuteInfo = getCommuteHighlight(listing.amenities, transportFilter);
  const commuteIcon = COMMUTE_ICONS[transportFilter] || "📍";
  return (
  <div
    style={{
      background: isHighlighted ? `${cityColor}08` : "var(--surface)",
      borderRadius: 20,
      padding: 24,
      border: isHighlighted ? `2px solid ${cityColor}` : "1px solid var(--border)",
      boxShadow: isHighlighted ? `0 4px 20px ${cityColor}20` : "none",
      animation: `fadeSlideUp 0.5s ease ${index * 0.08}s both`,
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}
    onMouseEnter={(e) => {
      if (isHighlighted) return;
      e.currentTarget.style.border = `1px solid ${cityColor}40`;
      e.currentTarget.style.background = "var(--surface-hover)";
    }}
    onMouseLeave={(e) => {
      if (isHighlighted) return;
      e.currentTarget.style.border = "1px solid var(--border)";
      e.currentTarget.style.background = "var(--surface)";
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: `${cityColor}20`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
        }}>
          {listing.img}
        </div>
        <div>
          <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 19, color: "var(--text)" }}>
            {listing.title}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif", marginTop: 3 }}>
            {listing.type} · {listing.dates}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: cityColor }}>
          ${listing.price}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>/month</div>
      </div>
    </div>

    {commuteInfo && (
      <div style={{ display: "flex" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 14px", borderRadius: 100,
          background: `${cityColor}18`, border: `1px solid ${cityColor}35`,
          fontSize: 13, fontWeight: 600, color: cityColor,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {commuteIcon} {commuteInfo}
        </span>
      </div>
    )}

    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {listing.amenities.map((a) => (
        <span key={a} style={{
          padding: "5px 12px", borderRadius: 100, background: "var(--surface-hover)",
          fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif",
        }}>
          {a}
        </span>
      ))}
    </div>

    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      borderTop: "1px solid var(--border-subtle)", paddingTop: 14, marginTop: 2,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%", background: `${cityColor}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, color: cityColor,
        }}>
          {listing.poster.charAt(0)}
        </div>
        <div>
          <span style={{ fontSize: 13, color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>
            {listing.poster}
          </span>
          <span style={{ fontSize: 12, color: "var(--text-subtle)", marginLeft: 6 }}>
            @ {listing.posterCompany}
          </span>
        </div>
        {listing.verified && (
          <span style={{
            padding: "2px 8px", borderRadius: 100, background: "#22c55e20",
            color: "#22c55e", fontSize: 11, fontWeight: 600,
          }}>
            ✓ Verified
          </span>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {listing.link && (
          <a
            href={listing.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 20px", borderRadius: 100, border: "none",
              background: `${cityColor}20`, color: cityColor, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease",
              textDecoration: "none", display: "inline-flex", alignItems: "center",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `${cityColor}40`; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `${cityColor}20`; }}
          >
            View ↗
          </a>
        )}
      </div>
    </div>
  </div>
  );
};

const TransportCard = ({ t, index, cityColor }) => (
  <div
    style={{
      background: "var(--surface)",
      borderRadius: 16,
      padding: 20,
      border: "1px solid var(--border)",
      animation: `fadeSlideUp 0.4s ease ${index * 0.07}s both`,
      display: "flex",
      gap: 16,
      alignItems: "flex-start",
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-hover)"}
    onMouseLeave={(e) => e.currentTarget.style.background = "var(--surface)"}
  >
    <div style={{
      width: 48, height: 48, borderRadius: 14, background: `${cityColor}18`,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0,
    }}>
      {t.icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: "var(--text)" }}>{t.mode}</span>
        <span style={{
          padding: "4px 12px", borderRadius: 100, background: `${cityColor}20`,
          color: cityColor, fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
        }}>
          {t.cost}
        </span>
      </div>
      <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5, marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>
        {t.desc}
      </div>
      <div style={{
        fontSize: 13, color: cityColor, marginTop: 8, fontFamily: "'DM Sans', sans-serif",
        fontStyle: "italic", opacity: 0.85,
      }}>
        💡 {t.tip}
      </div>
    </div>
  </div>
);

const GroupCard = ({ g, index, cityColor }) => (
  <div
    style={{
      background: "var(--surface)",
      borderRadius: 16,
      padding: 18,
      border: "1px solid var(--border)",
      animation: `fadeSlideUp 0.4s ease ${index * 0.07}s both`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.2s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-hover)"}
    onMouseLeave={(e) => e.currentTarget.style.background = "var(--surface)"}
  >
    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, background: `${cityColor}18`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
      }}>
        {g.emoji}
      </div>
      <div>
        <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 17, color: "var(--text)" }}>{g.name}</div>
        <div style={{ fontSize: 13, color: "var(--text-subtle)", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>
          {g.members} members · {g.category}
        </div>
      </div>
    </div>
    {g.link ? (
      <a
        href={g.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "7px 18px", borderRadius: 100, border: "none",
          background: `${cityColor}20`, color: cityColor, fontSize: 13,
          fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = cityColor; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = `${cityColor}20`; e.currentTarget.style.color = cityColor; }}
      >
        Join ↗
      </a>
    ) : (
      <button
        style={{
          padding: "7px 18px", borderRadius: 100, border: "none",
          background: `${cityColor}20`, color: cityColor, fontSize: 13,
          fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => { e.target.style.background = cityColor; e.target.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.target.style.background = `${cityColor}20`; e.target.style.color = cityColor; }}
      >
        Join
      </button>
    )}
  </div>
);

// --- Main App ---

export default function InternHub() {
  const [citiesData, setCitiesData] = useState(CITIES);
  const [listingsData, setListingsData] = useState(LISTINGS);
  const [transportData, setTransportData] = useState(TRANSPORT);
  const [interestGroupsData, setInterestGroupsData] = useState(INTEREST_GROUPS);

  const [selectedCity, setSelectedCity] = useState(citiesData[0]);

  useEffect(() => {
    async function loadCities() {
      const fetchedCities = await getCities();
      if (fetchedCities.length > 0) {
        setCitiesData(fetchedCities);
        setSelectedCity(prev => fetchedCities.find(c => c.id === prev.id) || fetchedCities[0]);
      }
    }
    loadCities();
  }, []);

  useEffect(() => {
    if (!selectedCity) return;
    async function loadCityData() {
      const cid = selectedCity.id;
      const lData = await getListings(cid);
      const tData = await getTransport(cid);
      const gData = await getInterestGroups(cid);

      setListingsData(prev => ({ ...prev, [cid]: lData.length > 0 ? lData : prev[cid] }));
      setTransportData(prev => ({ ...prev, [cid]: tData.length > 0 ? tData : prev[cid] }));
      setInterestGroupsData(prev => ({ ...prev, [cid]: gData.length > 0 ? gData : prev[cid] }));
    }
    loadCityData();
  }, [selectedCity.id]);

  const [activeTab, setActiveTab] = useState("housing");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [transportFilter, setTransportFilter] = useState("All");
  const [neighborhoodFilter, setNeighborhoodFilter] = useState("All");
  const [highlightedListingId, setHighlightedListingId] = useState(null);
  const [searchPin, setSearchPin] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 4) { setSearchPin(null); return; }
    const t = setTimeout(async () => {
      try {
        const q = encodeURIComponent(`${searchQuery.trim()}, ${selectedCity.name}`);
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=us`, { headers: { "Accept-Language": "en-US" } });
        const data = await res.json();
        if (data.length > 0) setSearchPin({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), label: searchQuery.trim() });
        else setSearchPin(null);
      } catch { setSearchPin(null); }
    }, 700);
    return () => clearTimeout(t);
  }, [searchQuery, selectedCity.id]);

  const tabs = [
    { id: "housing", label: "Housing", icon: "🏠" },
    { id: "transport", label: "Transit", icon: "🚇" },
    { id: "community", label: "Community", icon: "👥" },
  ];

  const listings = listingsData[selectedCity.id] || [];
  const neighborhoods = [...new Set(listings.map(l => l.neighborhood).filter(Boolean))];
  const searchMatchesAnyListing = !searchQuery || listings.some(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredListings = listings.filter((l) => {
    const matchesType = filter === "All" || l.type === filter;
    const matchesSearch = !searchQuery || !searchMatchesAnyListing || l.title.toLowerCase().includes(searchQuery.toLowerCase());
    const maxPrice = parseInt(priceFilter);
    const matchesPrice = !priceFilter || isNaN(maxPrice) || l.price <= maxPrice;
    const matchesTransport = transportFilter === "All" || l.transport === transportFilter;
    const matchesNeighborhood = neighborhoodFilter === "All" || l.neighborhood === neighborhoodFilter;
    return matchesType && matchesSearch && matchesPrice && matchesTransport && matchesNeighborhood;
  });
  const hasMapData = filteredListings.some(l => l.lat && l.lng) || !!searchPin;
  const displayListings = highlightedListingId && filteredListings.some(l => l.id === highlightedListingId)
    ? [filteredListings.find(l => l.id === highlightedListingId), ...filteredListings.filter(l => l.id !== highlightedListingId)]
    : filteredListings;

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

        :root {
          --bg: ${darkMode ? "#0A0A0F" : "#F2F2F8"};
          --text: ${darkMode ? "#ffffff" : "#111111"};
          --text-med: ${darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)"};
          --text-muted: ${darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
          --text-subtle: ${darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)"};
          --surface: ${darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"};
          --surface-hover: ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"};
          --border: ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"};
          --border-subtle: ${darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"};
          --input-bg: ${darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"};
          --input-border: ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.13)"};
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroText {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)"}; border-radius: 10px; }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: var(--text-muted); }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      {/* Ambient background */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0,
      }}>
        <div style={{
          position: "absolute", top: "-30%", right: "-10%", width: 600, height: 600,
          borderRadius: "50%", background: `radial-gradient(circle, ${selectedCity.color}12 0%, transparent 70%)`,
          transition: "background 0.8s ease", animation: "pulseGlow 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", left: "-10%", width: 500, height: 500,
          borderRadius: "50%", background: `radial-gradient(circle, ${selectedCity.color}08 0%, transparent 70%)`,
          transition: "background 0.8s ease",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1440, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <header style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px 0", animation: "slideDown 0.6s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `linear-gradient(135deg, ${selectedCity.color}, ${selectedCity.color}80)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, transition: "background 0.5s ease",
            }}>
              ⌂
            </div>
            <span style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 24, letterSpacing: "-0.02em", color: "var(--text)",
            }}>
              InternNest
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                width: 38, height: 38, borderRadius: 100,
                border: "1px solid var(--border)",
                background: "var(--surface)", fontSize: 17,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button style={{
              padding: "10px 22px", borderRadius: 100, border: "1px solid var(--border)",
              background: "transparent", color: "var(--text)", fontSize: 14, fontWeight: 500,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>
              Log in
            </button>
            <button style={{
              padding: "10px 22px", borderRadius: 100, border: "none",
              background: selectedCity.color, color: "#fff", fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              transition: "background 0.3s ease",
            }}>
              Sign up
            </button>
          </div>
        </header>

        {/* Hero */}
        <section style={{
          textAlign: "center", padding: "48px 0 40px",
          animation: "heroText 0.8s ease",
        }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: selectedCity.color,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
            transition: "color 0.5s ease",
          }}>
            Summer 2026 Internships
          </div>
          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 700,
            margin: "0 auto",
            color: "var(--text)",
          }}>
            Your city.{" "}
            <span style={{
              fontStyle: "italic",
              color: selectedCity.color,
              transition: "color 0.5s ease",
            }}>
              Your summer.
            </span>
            <br />Your people.
          </h1>
          <p style={{
            fontSize: 17, color: "var(--text-muted)", marginTop: 20,
            maxWidth: 500, margin: "20px auto 0", lineHeight: 1.6,
          }}>
            Find subleases, navigate transit, and connect with fellow interns — all in one place.
          </p>
        </section>

        {/* Testimonials Marquee */}
        <div style={{ marginBottom: 44, marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-subtle)", letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center", marginBottom: 18 }}>
            Born from the struggles of previous interns
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            {/* fade masks */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: `linear-gradient(to right, var(--bg), transparent)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: `linear-gradient(to left, var(--bg), transparent)`, pointerEvents: "none" }} />
            <div
              style={{ display: "flex", gap: 14, width: "max-content", animation: "marquee 55s linear infinite" }}
              onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused"; }}
              onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running"; }}
            >
              {[...QUOTES, ...QUOTES].map((q, i) => (
                <div key={i} style={{
                  flexShrink: 0, width: 290,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 18, padding: "18px 22px",
                  display: "flex", flexDirection: "column", gap: 14,
                }}>
                  <div style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 15, fontStyle: "italic",
                    color: "var(--text-med)", lineHeight: 1.6,
                    flex: 1,
                  }}>
                    "{q.text}"
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{
                      padding: "3px 10px", borderRadius: 100,
                      background: `${q.color}18`, color: q.color,
                      fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                      border: `1px solid ${q.color}30`,
                    }}>
                      {q.company}
                    </span>
                    {q.city && (
                      <span style={{ fontSize: 12, color: "var(--text-subtle)", fontFamily: "'DM Sans', sans-serif" }}>
                        📍 {q.city}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two-column layout: sidebar + content */}
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

          {/* Left: City Sidebar */}
          <div style={{ width: 210, flexShrink: 0 }}>
            <div style={{ position: "sticky", top: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12, paddingLeft: 2 }}>
                Select City
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {citiesData.map((city, i) => (
                  <CityCard
                    key={city.id}
                    city={city}
                    isSelected={selectedCity.id === city.id}
                    onClick={() => {
                      setSelectedCity(city);
                      setFilter("All");
                      setSearchQuery("");
                      setPriceFilter("");
                      setTransportFilter("All");
                      setNeighborhoodFilter("All");
                      setHighlightedListingId(null);
                      setSearchPin(null);
                    }}
                    index={i}
                    sidebar
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>

        {/* City Stats Bar */}
        <div style={{
          display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap",
          animation: "fadeSlideUp 0.5s ease 0.2s both",
        }}>
          {[
            { label: "Avg Rent", value: `$${selectedCity.avgRent}/mo`, icon: "💰" },
            { label: "Listings", value: filteredListings.length, icon: "🏠" },
            { label: "Groups", value: (interestGroupsData[selectedCity.id] || []).length, icon: "👥" },
          ].map((stat) => (
            <div key={stat.label} style={{
              flex: 1, minWidth: 140, background: "var(--surface)", borderRadius: 16,
              padding: "16px 20px", border: "1px solid var(--border-subtle)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 22 }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-subtle)", marginBottom: 2 }}>{stat.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: selectedCity.color, transition: "color 0.5s ease" }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 6, marginBottom: 28,
          background: "var(--surface)", borderRadius: 16, padding: 5,
          border: "1px solid var(--border-subtle)", width: "fit-content",
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 22px", borderRadius: 12, border: "none",
                background: activeTab === tab.id ? selectedCity.color : "transparent",
                color: activeTab === tab.id ? "#fff" : "var(--text-muted)",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.3s ease",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* === HOUSING TAB === */}
        {activeTab === "housing" && (
          <section key={selectedCity.id + "-housing"}>
            {/* Filter panel */}
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border-subtle)",
              borderRadius: 18, padding: "16px 20px", marginBottom: 20,
            }}>
              {/* Search */}
              <input
                type="text"
                placeholder={`Search listings or address in ${selectedCity.name}…`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%", padding: "10px 16px", borderRadius: 12,
                  border: "1px solid var(--input-border)", background: "var(--input-bg)",
                  color: "var(--text)", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                  outline: "none", marginBottom: 14, boxSizing: "border-box",
                }}
              />
              {searchPin && (
                <div style={{ marginBottom: 10, fontSize: 12, color: selectedCity.color, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                  📍 Showing "{searchPin.label}" on map
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Size */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", width: 56, flexShrink: 0 }}>Size</span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["All", "Studio", "1 Bedroom", "2 Bedroom", "Shared Room"].map((f) => (
                      <button key={f} onClick={() => setFilter(f)} style={{
                        padding: "6px 14px", borderRadius: 100, cursor: "pointer",
                        border: filter === f ? "none" : "1px solid var(--input-border)",
                        background: filter === f ? `${selectedCity.color}22` : "transparent",
                        color: filter === f ? selectedCity.color : "var(--text-muted)",
                        fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s ease",
                      }}>{f === "All" ? "Any" : f}</button>
                    ))}
                  </div>
                </div>

                {/* Area */}
                {neighborhoods.length > 1 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", width: 56, flexShrink: 0 }}>Area</span>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {["All", ...neighborhoods].map((n) => (
                        <button key={n} onClick={() => setNeighborhoodFilter(n)} style={{
                          padding: "6px 14px", borderRadius: 100, cursor: "pointer",
                          border: neighborhoodFilter === n ? "none" : "1px solid var(--input-border)",
                          background: neighborhoodFilter === n ? `${selectedCity.color}22` : "transparent",
                          color: neighborhoodFilter === n ? selectedCity.color : "var(--text-muted)",
                          fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s ease",
                        }}>{n === "All" ? "Any" : n}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transit */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", width: 56, flexShrink: 0 }}>Transit</span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {[{ id: "All", label: "Any" }, { id: "Walk", label: "🚶 Walk" }, { id: "Bike", label: "🚲 Bike" }, { id: "Public Transit", label: "🚇 Transit" }, { id: "Car", label: "🚗 Car" }].map((t) => (
                      <button key={t.id} onClick={() => setTransportFilter(t.id)} style={{
                        padding: "6px 14px", borderRadius: 100, cursor: "pointer",
                        border: transportFilter === t.id ? "none" : "1px solid var(--input-border)",
                        background: transportFilter === t.id ? `${selectedCity.color}22` : "transparent",
                        color: transportFilter === t.id ? selectedCity.color : "var(--text-muted)",
                        fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s ease",
                      }}>{t.label}</button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", width: 56, flexShrink: 0 }}>Budget</span>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <span style={{ position: "absolute", left: 12, fontSize: 12, fontWeight: 600, color: priceFilter ? selectedCity.color : "var(--text-muted)", pointerEvents: "none" }}>$</span>
                    <input type="number" min="0" step="50" placeholder="Max /mo" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} style={{
                      padding: "6px 32px 6px 22px", borderRadius: 100, width: 150, outline: "none",
                      border: priceFilter ? "none" : "1px solid var(--input-border)",
                      background: priceFilter ? `${selectedCity.color}22` : "transparent",
                      color: priceFilter ? selectedCity.color : "var(--text-muted)",
                      fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                    }} />
                    {priceFilter && (
                      <button onClick={() => setPriceFilter("")} style={{ position: "absolute", right: 10, background: "none", border: "none", color: selectedCity.color, fontSize: 14, cursor: "pointer", lineHeight: 1, padding: 0 }}>×</button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Listing count + clear highlight */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: "var(--text-subtle)", fontFamily: "'DM Sans', sans-serif" }}>
                {filteredListings.length} listing{filteredListings.length !== 1 ? "s" : ""}
              </span>
              {highlightedListingId && (
                <button
                  onClick={() => setHighlightedListingId(null)}
                  style={{
                    background: `${selectedCity.color}18`, border: `1px solid ${selectedCity.color}30`,
                    color: selectedCity.color, borderRadius: 100, padding: "3px 10px",
                    fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Clear selection ×
                </button>
              )}
            </div>

            {/* Listings + Map side by side */}
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

              {/* Listings column */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                {displayListings.length > 0 ? displayListings.map((l, i) => (
                  <ListingCard key={l.id} listing={l} cityColor={selectedCity.color} index={i} transportFilter={transportFilter} isHighlighted={l.id === highlightedListingId} />
                )) : (
                  <div style={{
                    textAlign: "center", padding: 60, color: "var(--text-muted)",
                    fontSize: 16, borderRadius: 20, border: "1px dashed var(--border)",
                  }}>
                    No listings match your search. Try adjusting filters.
                  </div>
                )}

                {/* Post CTA */}
                <div style={{
                  marginTop: 8, padding: 28, borderRadius: 20,
                  background: `linear-gradient(135deg, ${selectedCity.color}15, ${selectedCity.color}05)`,
                  border: `1px solid ${selectedCity.color}25`,
                  textAlign: "center",
                }}>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, marginBottom: 8, color: "var(--text)" }}>
                    Subleasing your place this summer?
                  </div>
                  <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 18 }}>
                    Help fellow interns find housing in {selectedCity.name}
                  </div>
                  <button style={{
                    padding: "12px 32px", borderRadius: 100, border: "none",
                    background: selectedCity.color, color: "#fff", fontSize: 15,
                    fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  }}>
                    + Post a Listing
                  </button>
                </div>
              </div>

              {/* Map column — sticky, only for cities with coordinates */}
              {hasMapData && (
                <div style={{ width: 400, flexShrink: 0 }}>
                  <div style={{ position: "sticky", top: 24 }}>
                    <ApartmentMap
                      listings={filteredListings}
                      cityColor={selectedCity.color}
                      darkMode={darkMode}
                      cityId={selectedCity.id}
                      onSelectListing={setHighlightedListingId}
                      highlightedListingId={highlightedListingId}
                      searchPin={searchPin}
                    />
                  </div>
                </div>
              )}

            </div>
          </section>
        )}

        {/* === TRANSPORT TAB === */}
        {activeTab === "transport" && (
          <section key={selectedCity.id + "-transport"}>
            <div style={{
              marginBottom: 24, padding: 20, borderRadius: 16,
              background: `${selectedCity.color}10`, border: `1px solid ${selectedCity.color}20`,
            }}>
              <span style={{ fontSize: 15, color: "var(--text-med)" }}>
                🗺️ Getting around <strong style={{ color: selectedCity.color }}>{selectedCity.name}</strong> — curated transit tips from past interns
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {(transportData[selectedCity.id] || []).map((t, i) => (
                <TransportCard key={t.mode} t={t} index={i} cityColor={selectedCity.color} />
              ))}
            </div>
          </section>
        )}

        {/* === COMMUNITY TAB === */}
        {activeTab === "community" && (
          <section key={selectedCity.id + "-community"}>
            <div style={{
              marginBottom: 24, padding: 20, borderRadius: 16,
              background: `${selectedCity.color}10`, border: `1px solid ${selectedCity.color}20`,
            }}>
              <span style={{ fontSize: 15, color: "var(--text-med)" }}>
                🎉 Connect with other interns in <strong style={{ color: selectedCity.color }}>{selectedCity.name}</strong> this summer
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(interestGroupsData[selectedCity.id] || []).map((g, i) => (
                <GroupCard key={g.name} g={g} index={i} cityColor={selectedCity.color} />
              ))}
            </div>

            <div style={{
              marginTop: 32, padding: 28, borderRadius: 20,
              background: `linear-gradient(135deg, ${selectedCity.color}15, ${selectedCity.color}05)`,
              border: `1px solid ${selectedCity.color}25`,
              textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, marginBottom: 8, color: "var(--text)" }}>
                Don't see your vibe?
              </div>
              <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 18 }}>
                Start a new group and find your people
              </div>
              <button style={{
                padding: "12px 32px", borderRadius: 100, border: "none",
                background: selectedCity.color, color: "#fff", fontSize: 15,
                fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}>
                + Create a Group
              </button>
            </div>
          </section>
        )}

          </div>{/* end right content */}
        </div>{/* end two-column layout */}

        {/* Footer */}
        <footer style={{
          marginTop: 64, paddingTop: 32, paddingBottom: 40,
          borderTop: "1px solid var(--border-subtle)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: `linear-gradient(135deg, ${selectedCity.color}, ${selectedCity.color}80)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>
              ⌂
            </div>
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: "var(--text)" }}>InternNest</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-subtle)" }}>
            © 2026 InternNest · Built for interns, by interns
          </div>
        </footer>
      </div>
    </div>
  );
}
