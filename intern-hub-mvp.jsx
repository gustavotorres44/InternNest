"use client";
import { useState, useEffect, useRef } from "react";

import {
  FALLBACK_CITIES as CITIES,
  FALLBACK_LISTINGS as LISTINGS,
  FALLBACK_TRANSPORT as TRANSPORT,
  FALLBACK_INTEREST_GROUPS as INTEREST_GROUPS
} from "./lib/fallback-data";
import { getCities, getListings, getTransport, getInterestGroups } from "./lib/data";

// --- Components ---

const CityCard = ({ city, isSelected, onClick, index }) => (
  <div
    onClick={onClick}
    style={{
      padding: "16px 20px",
      borderRadius: 16,
      cursor: "pointer",
      background: isSelected ? city.color : "rgba(255,255,255,0.04)",
      border: isSelected ? "2px solid transparent" : "2px solid rgba(255,255,255,0.08)",
      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      transform: isSelected ? "scale(1.03)" : "scale(1)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: isSelected ? "#fff" : "rgba(255,255,255,0.7)",
      animation: `fadeSlideUp 0.5s ease ${index * 0.06}s both`,
      minWidth: "fit-content",
    }}
  >
    <span style={{ fontSize: 24 }}>{city.emoji}</span>
    <div>
      <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, fontWeight: 400, color: isSelected ? "#fff" : "rgba(255,255,255,0.9)" }}>
        {city.name}
      </div>
      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
        {city.listings} listings
      </div>
    </div>
  </div>
);

const ListingCard = ({ listing, cityColor, index }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.04)",
      borderRadius: 20,
      padding: 24,
      border: "1px solid rgba(255,255,255,0.08)",
      animation: `fadeSlideUp 0.5s ease ${index * 0.08}s both`,
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.border = `1px solid ${cityColor}40`;
      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
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
          <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 19, color: "#fff" }}>
            {listing.title}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", marginTop: 3 }}>
            {listing.type} · {listing.dates}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: cityColor }}>
          ${listing.price}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>/month</div>
      </div>
    </div>

    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {listing.amenities.map((a) => (
        <span key={a} style={{
          padding: "5px 12px", borderRadius: 100, background: "rgba(255,255,255,0.06)",
          fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif",
        }}>
          {a}
        </span>
      ))}
    </div>

    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14, marginTop: 2,
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
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif" }}>
            {listing.poster}
          </span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginLeft: 6 }}>
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
      <button
        style={{
          padding: "8px 20px", borderRadius: 100, border: `1.5px solid ${cityColor}`,
          background: "transparent", color: cityColor, fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => { e.target.style.background = cityColor; e.target.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = cityColor; }}
      >
        Contact
      </button>
    </div>
  </div>
);

const TransportCard = ({ t, index, cityColor }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.04)",
      borderRadius: 16,
      padding: 20,
      border: "1px solid rgba(255,255,255,0.08)",
      animation: `fadeSlideUp 0.4s ease ${index * 0.07}s both`,
      display: "flex",
      gap: 16,
      alignItems: "flex-start",
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
  >
    <div style={{
      width: 48, height: 48, borderRadius: 14, background: `${cityColor}18`,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0,
    }}>
      {t.icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: "#fff" }}>{t.mode}</span>
        <span style={{
          padding: "4px 12px", borderRadius: 100, background: `${cityColor}20`,
          color: cityColor, fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
        }}>
          {t.cost}
        </span>
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>
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
      background: "rgba(255,255,255,0.04)",
      borderRadius: 16,
      padding: 18,
      border: "1px solid rgba(255,255,255,0.08)",
      animation: `fadeSlideUp 0.4s ease ${index * 0.07}s both`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.2s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
  >
    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, background: `${cityColor}18`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
      }}>
        {g.emoji}
      </div>
      <div>
        <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 17, color: "#fff" }}>{g.name}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>
          {g.members} members · {g.category}
        </div>
      </div>
    </div>
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
  const [showOnboarding, setShowOnboarding] = useState(true);

  const tabs = [
    { id: "housing", label: "Housing", icon: "🏠" },
    { id: "transport", label: "Transit", icon: "🚇" },
    { id: "community", label: "Community", icon: "👥" },
  ];

  const listings = listingsData[selectedCity.id] || [];
  const filteredListings = listings.filter((l) => {
    const matchesFilter = filter === "All" || l.type === filter;
    const matchesSearch = !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      color: "#fff",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

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

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }

        * { box-sizing: border-box; margin: 0; padding: 0; }
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

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

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
              fontSize: 24, letterSpacing: "-0.02em",
            }}>
              InternNest
            </span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button style={{
              padding: "10px 22px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent", color: "#fff", fontSize: 14, fontWeight: 500,
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
            fontSize: 17, color: "rgba(255,255,255,0.5)", marginTop: 20,
            maxWidth: 500, margin: "20px auto 0", lineHeight: 1.6,
          }}>
            Find subleases, navigate transit, and connect with fellow interns — all in one place.
          </p>
        </section>

        {/* City Selector */}
        <section style={{ marginBottom: 36 }}>
          <div style={{
            display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8,
            WebkitOverflowScrolling: "touch",
          }}>
            {citiesData.map((city, i) => (
              <CityCard
                key={city.id}
                city={city}
                isSelected={selectedCity.id === city.id}
                onClick={() => { setSelectedCity(city); setFilter("All"); setSearchQuery(""); }}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* City Stats Bar */}
        <div style={{
          display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap",
          animation: "fadeSlideUp 0.5s ease 0.2s both",
        }}>
          {[
            { label: "Avg Rent", value: `$${selectedCity.avgRent}/mo`, icon: "💰" },
            { label: "Listings", value: selectedCity.listings, icon: "🏠" },
            { label: "Groups", value: selectedCity.groups, icon: "👥" },
          ].map((stat) => (
            <div key={stat.label} style={{
              flex: 1, minWidth: 140, background: "rgba(255,255,255,0.04)", borderRadius: 16,
              padding: "16px 20px", border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 22 }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{stat.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: selectedCity.color, transition: "color 0.5s ease" }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 6, marginBottom: 28,
          background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 5,
          border: "1px solid rgba(255,255,255,0.06)", width: "fit-content",
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 22px", borderRadius: 12, border: "none",
                background: activeTab === tab.id ? selectedCity.color : "transparent",
                color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.5)",
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
            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
              <input
                type="text"
                placeholder={`Search in ${selectedCity.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "11px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif", outline: "none", flex: 1, minWidth: 200,
                }}
              />
              {["All", "Studio", "1 Bedroom", "Shared Room"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "9px 18px", borderRadius: 100,
                    border: filter === f ? "none" : "1px solid rgba(255,255,255,0.1)",
                    background: filter === f ? `${selectedCity.color}25` : "transparent",
                    color: filter === f ? selectedCity.color : "rgba(255,255,255,0.5)",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {filteredListings.length > 0 ? filteredListings.map((l, i) => (
                <ListingCard key={l.id} listing={l} cityColor={selectedCity.color} index={i} />
              )) : (
                <div style={{
                  textAlign: "center", padding: 60, color: "rgba(255,255,255,0.3)",
                  fontSize: 16, borderRadius: 20, border: "1px dashed rgba(255,255,255,0.1)",
                }}>
                  No listings match your search. Try adjusting filters.
                </div>
              )}
            </div>

            {/* Post CTA */}
            <div style={{
              marginTop: 32, padding: 28, borderRadius: 20,
              background: `linear-gradient(135deg, ${selectedCity.color}15, ${selectedCity.color}05)`,
              border: `1px solid ${selectedCity.color}25`,
              textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, marginBottom: 8 }}>
                Subleasing your place this summer?
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>
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
          </section>
        )}

        {/* === TRANSPORT TAB === */}
        {activeTab === "transport" && (
          <section key={selectedCity.id + "-transport"}>
            <div style={{
              marginBottom: 24, padding: 20, borderRadius: 16,
              background: `${selectedCity.color}10`, border: `1px solid ${selectedCity.color}20`,
            }}>
              <span style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>
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
              <span style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>
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
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, marginBottom: 8 }}>
                Don't see your vibe?
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>
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

        {/* Footer */}
        <footer style={{
          marginTop: 64, paddingTop: 32, paddingBottom: 40,
          borderTop: "1px solid rgba(255,255,255,0.06)",
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
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18 }}>InternNest</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            © 2026 InternNest · Built for interns, by interns
          </div>
        </footer>
      </div>
    </div>
  );
}
