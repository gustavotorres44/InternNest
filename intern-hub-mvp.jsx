"use client";
import { useState, useEffect, useRef } from "react";

const CITIES = [
  { id: "sf", name: "San Francisco", state: "CA", emoji: "🌉", lat: 37.77, lng: -122.42, avgRent: 2200, listings: 47, groups: 12, color: "#FF6B35" },
  { id: "ny", name: "New York", state: "NY", emoji: "🗽", lat: 40.71, lng: -74.01, avgRent: 2800, listings: 89, groups: 24, color: "#4ECDC4" },
  { id: "bos", name: "Boston", state: "MA", emoji: "🏛️", lat: 42.36, lng: -71.06, avgRent: 1900, listings: 32, groups: 9, color: "#C1666B" },
  { id: "chi", name: "Chicago", state: "IL", emoji: "🏙️", lat: 41.88, lng: -87.63, avgRent: 1500, listings: 41, groups: 11, color: "#48639C" },
  { id: "atl", name: "Atlanta", state: "GA", emoji: "🍑", lat: 33.75, lng: -84.39, avgRent: 1300, listings: 28, groups: 8, color: "#E8871E" },
  { id: "sea", name: "Seattle", state: "WA", emoji: "☕", lat: 47.61, lng: -122.33, avgRent: 1950, listings: 35, groups: 10, color: "#2E8B57" },
  { id: "la", name: "Los Angeles", state: "CA", emoji: "🌴", lat: 34.05, lng: -118.24, avgRent: 2100, listings: 52, groups: 15, color: "#D4A373" },
  { id: "dc", name: "Washington", state: "DC", emoji: "🏛️", lat: 38.91, lng: -77.04, avgRent: 1800, listings: 38, groups: 13, color: "#7B68EE" },
];

const LISTINGS = {
  sf: [
    { id: 1, title: "Sunny Mission Studio", price: 1800, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Laundry", "Furnished"], poster: "Sarah K.", posterCompany: "Google", verified: true, img: "🌻" },
    { id: 2, title: "SOMA 1BR w/ View", price: 2400, type: "1 Bedroom", dates: "May 15 – Aug 15", amenities: ["WiFi", "Gym", "Parking"], poster: "James L.", posterCompany: "Stripe", verified: true, img: "🏙️" },
    { id: 3, title: "Shared Apt in Hayes Valley", price: 1400, type: "Shared Room", dates: "Jun 1 – Sep 1", amenities: ["WiFi", "Furnished", "Kitchen"], poster: "Priya M.", posterCompany: "Salesforce", verified: false, img: "🏠" },
    { id: 4, title: "Modern Flat near Caltrain", price: 2100, type: "1 Bedroom", dates: "Jun 15 – Aug 30", amenities: ["WiFi", "Transit", "Furnished"], poster: "Alex T.", posterCompany: "Meta", verified: true, img: "🚂" },
  ],
  ny: [
    { id: 5, title: "East Village Cozy Studio", price: 2500, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Laundry", "AC"], poster: "David R.", posterCompany: "JP Morgan", verified: true, img: "🎭" },
    { id: 6, title: "Brooklyn Heights 1BR", price: 2800, type: "1 Bedroom", dates: "May 20 – Aug 20", amenities: ["WiFi", "Rooftop", "Doorman"], poster: "Maya J.", posterCompany: "Goldman Sachs", verified: true, img: "🌃" },
    { id: 7, title: "Midtown Shared Room", price: 1600, type: "Shared Room", dates: "Jun 1 – Aug 15", amenities: ["WiFi", "Gym", "Furnished"], poster: "Chris W.", posterCompany: "McKinsey", verified: false, img: "🗽" },
  ],
  bos: [
    { id: 8, title: "Back Bay Studio", price: 1800, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Furnished"], poster: "Emma S.", posterCompany: "HubSpot", verified: true, img: "📚" },
    { id: 9, title: "Cambridge Apt near MIT", price: 2100, type: "1 Bedroom", dates: "May 28 – Aug 28", amenities: ["WiFi", "Laundry", "Bike Storage"], poster: "Raj P.", posterCompany: "Wayfair", verified: true, img: "🎓" },
  ],
  chi: [
    { id: 10, title: "Loop Studio w/ Lake View", price: 1400, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Gym", "Pool"], poster: "Tyler B.", posterCompany: "Citadel", verified: true, img: "🌊" },
    { id: 11, title: "Wicker Park 1BR", price: 1600, type: "1 Bedroom", dates: "Jun 10 – Sep 1", amenities: ["WiFi", "Furnished", "Patio"], poster: "Nina F.", posterCompany: "Grubhub", verified: false, img: "🎵" },
  ],
  atl: [
    { id: 12, title: "Midtown ATL Studio", price: 1200, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Pool", "Parking"], poster: "Jordan H.", posterCompany: "Coca-Cola", verified: true, img: "🍑" },
    { id: 13, title: "Buckhead Furnished 1BR", price: 1500, type: "1 Bedroom", dates: "May 25 – Aug 25", amenities: ["WiFi", "Gym", "Furnished"], poster: "Ashley D.", posterCompany: "NCR", verified: true, img: "🏡" },
  ],
  sea: [
    { id: 14, title: "Capitol Hill Studio", price: 1700, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Furnished", "Coffee nearby"], poster: "Mika T.", posterCompany: "Amazon", verified: true, img: "☕" },
    { id: 15, title: "South Lake Union 1BR", price: 2200, type: "1 Bedroom", dates: "Jun 5 – Sep 5", amenities: ["WiFi", "Gym", "Dog-friendly"], poster: "Sam K.", posterCompany: "Microsoft", verified: true, img: "🐕" },
  ],
  la: [
    { id: 16, title: "Venice Beach Studio", price: 1900, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Beach Access", "Furnished"], poster: "Luna V.", posterCompany: "Snapchat", verified: true, img: "🏄" },
    { id: 17, title: "Culver City 1BR", price: 2000, type: "1 Bedroom", dates: "Jun 1 – Aug 30", amenities: ["WiFi", "Parking", "AC"], poster: "Oscar M.", posterCompany: "Apple", verified: false, img: "🎬" },
  ],
  dc: [
    { id: 18, title: "Dupont Circle Studio", price: 1700, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Metro Access", "Furnished"], poster: "Kate N.", posterCompany: "Deloitte", verified: true, img: "🏛️" },
    { id: 19, title: "Georgetown Shared", price: 1300, type: "Shared Room", dates: "May 20 – Aug 20", amenities: ["WiFi", "Laundry", "Garden"], poster: "Ben A.", posterCompany: "World Bank", verified: true, img: "🌳" },
  ],
};

const TRANSPORT = {
  sf: [
    { mode: "BART", icon: "🚇", desc: "Bay Area Rapid Transit – connects SF to Oakland, Berkeley, SFO airport", cost: "$2.50–$7.00", tip: "Get a Clipper Card day 1" },
    { mode: "Muni", icon: "🚋", desc: "SF's bus and light rail system – goes everywhere in the city", cost: "$2.50/ride", tip: "Monthly pass is $81 – worth it for interns" },
    { mode: "Caltrain", icon: "🚂", desc: "Commuter rail to Peninsula/South Bay (Palo Alto, Mountain View)", cost: "$3.75–$13.75", tip: "Essential if interning at a South Bay company" },
    { mode: "Bike Share", icon: "🚲", desc: "Bay Wheels – docked e-bikes throughout the city", cost: "$3/ride or $25/mo", tip: "Best way to get around on nice days" },
  ],
  ny: [
    { mode: "Subway", icon: "🚇", desc: "MTA Subway – 472 stations, runs 24/7", cost: "$2.90/ride", tip: "Get an unlimited MetroCard – $33/week" },
    { mode: "Bus", icon: "🚌", desc: "Extensive bus network across all 5 boroughs", cost: "$2.90/ride", tip: "Free transfer to/from subway within 2 hours" },
    { mode: "Citi Bike", icon: "🚲", desc: "Largest bike share in the US", cost: "$4.49/ride or $20.49/mo", tip: "Great for crosstown trips in Manhattan" },
    { mode: "Ferry", icon: "⛴️", desc: "NYC Ferry – scenic routes across the harbor", cost: "$4.00/ride", tip: "Best commute from Brooklyn to Manhattan" },
  ],
  bos: [
    { mode: "The T", icon: "🚇", desc: "MBTA subway – 4 color-coded lines", cost: "$2.40/ride", tip: "Green Line for Back Bay, Red Line for Cambridge" },
    { mode: "Commuter Rail", icon: "🚂", desc: "Connects suburbs to downtown", cost: "$2.40–$13.25", tip: "Useful for weekend trips to Salem or Providence" },
    { mode: "Bluebikes", icon: "🚲", desc: "Bike share across Boston & Cambridge", cost: "$2.95/ride or $109/yr", tip: "Perfect for MIT ↔ Harvard ↔ Downtown" },
  ],
  chi: [
    { mode: "L Train", icon: "🚇", desc: "Chicago's elevated/subway system – 8 lines", cost: "$2.50/ride", tip: "Blue Line to O'Hare, Orange to Midway" },
    { mode: "Metra", icon: "🚂", desc: "Commuter rail to suburbs", cost: "$3.75–$8.75", tip: "Useful for north shore trips" },
    { mode: "Divvy", icon: "🚲", desc: "Bike share system with 6,800+ bikes", cost: "$1/ride or $16.50/mo", tip: "Lakefront trail is incredible for biking" },
  ],
  atl: [
    { mode: "MARTA", icon: "🚇", desc: "Atlanta's rail + bus system", cost: "$2.50/ride", tip: "Connects airport to Midtown/Buckhead" },
    { mode: "Streetcar", icon: "🚋", desc: "Free downtown circulator loop", cost: "Free!", tip: "Great for getting around downtown" },
    { mode: "Relay Bikes", icon: "🚲", desc: "Bike share along the Beltline", cost: "$1.50/ride", tip: "Ride the Beltline – ATL's best feature" },
  ],
  sea: [
    { mode: "Link Light Rail", icon: "🚇", desc: "Connects UW, downtown, airport", cost: "$2.25–$3.50", tip: "Best way to/from SeaTac airport" },
    { mode: "King County Metro", icon: "🚌", desc: "Extensive bus network", cost: "$2.75/ride", tip: "Ride Free Area downtown (select routes)" },
    { mode: "Water Taxi", icon: "⛴️", desc: "West Seattle & Vashon Island ferries", cost: "$5.75/ride", tip: "Scenic commute from West Seattle" },
  ],
  la: [
    { mode: "Metro Rail", icon: "🚇", desc: "6 lines connecting key areas", cost: "$1.75/ride", tip: "Expo Line: downtown to Santa Monica" },
    { mode: "Metro Bus", icon: "🚌", desc: "Extensive bus network across LA County", cost: "$1.75/ride", tip: "Day pass is $3.50 – always get it" },
    { mode: "Bird/Lime", icon: "🛴", desc: "E-scooters everywhere", cost: "$1 + $0.39/min", tip: "Last-mile solution – LA is spread out" },
  ],
  dc: [
    { mode: "Metro", icon: "🚇", desc: "WMATA – 6 lines, very clean system", cost: "$2.25–$6.00", tip: "SmarTrip card is essential" },
    { mode: "Circulator", icon: "🚌", desc: "DC Circulator buses – key routes", cost: "$1.00/ride", tip: "Georgetown ↔ Union Station route is gold" },
    { mode: "Capital Bikeshare", icon: "🚲", desc: "4,500+ bikes across DC, Arlington, Alexandria", cost: "$2/ride or $7/mo (students)", tip: "Student discount is amazing" },
  ],
};

const INTEREST_GROUPS = {
  sf: [
    { name: "SF Intern Hikers", members: 234, emoji: "🥾", category: "Outdoors" },
    { name: "Bay Area Tech Talks", members: 189, emoji: "💻", category: "Professional" },
    { name: "Mission District Foodies", members: 312, emoji: "🌮", category: "Food" },
    { name: "Golden Gate Runners", members: 156, emoji: "🏃", category: "Fitness" },
  ],
  ny: [
    { name: "NYC Intern Networking", members: 567, emoji: "🤝", category: "Professional" },
    { name: "Central Park Joggers", members: 289, emoji: "🏃", category: "Fitness" },
    { name: "Brooklyn Art Crawls", members: 198, emoji: "🎨", category: "Culture" },
    { name: "Manhattan Foodies", members: 445, emoji: "🍕", category: "Food" },
  ],
  bos: [
    { name: "Harbor Walk Club", members: 134, emoji: "🚶", category: "Outdoors" },
    { name: "Boston Intern Socials", members: 201, emoji: "🎉", category: "Social" },
    { name: "Cambridge Book Club", members: 89, emoji: "📖", category: "Culture" },
  ],
  chi: [
    { name: "Lakefront Volleyball", members: 178, emoji: "🏐", category: "Fitness" },
    { name: "Deep Dish Enthusiasts", members: 234, emoji: "🍕", category: "Food" },
    { name: "Chi-Town Intern Mixers", members: 312, emoji: "🎉", category: "Social" },
  ],
  atl: [
    { name: "Beltline Walkers", members: 198, emoji: "🚶", category: "Outdoors" },
    { name: "ATL Music Scene", members: 167, emoji: "🎵", category: "Culture" },
    { name: "Peach State Foodies", members: 145, emoji: "🍑", category: "Food" },
  ],
  sea: [
    { name: "PNW Hikers", members: 278, emoji: "⛰️", category: "Outdoors" },
    { name: "Seattle Coffee Crawl", members: 189, emoji: "☕", category: "Food" },
    { name: "Tech Intern Meetups", members: 234, emoji: "💻", category: "Professional" },
  ],
  la: [
    { name: "Beach Volleyball LA", members: 212, emoji: "🏐", category: "Fitness" },
    { name: "Taco Tuesday Crew", members: 389, emoji: "🌮", category: "Food" },
    { name: "Sunset Hikes", members: 267, emoji: "🌅", category: "Outdoors" },
  ],
  dc: [
    { name: "Monument Runners", members: 189, emoji: "🏃", category: "Fitness" },
    { name: "DC Policy Nerds", members: 234, emoji: "📜", category: "Professional" },
    { name: "Museum Hoppers", members: 312, emoji: "🏛️", category: "Culture" },
  ],
};

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
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [activeTab, setActiveTab] = useState("housing");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(true);

  const tabs = [
    { id: "housing", label: "Housing", icon: "🏠" },
    { id: "transport", label: "Transit", icon: "🚇" },
    { id: "community", label: "Community", icon: "👥" },
  ];

  const listings = LISTINGS[selectedCity.id] || [];
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
            {CITIES.map((city, i) => (
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
              {(TRANSPORT[selectedCity.id] || []).map((t, i) => (
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
              {(INTEREST_GROUPS[selectedCity.id] || []).map((g, i) => (
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
