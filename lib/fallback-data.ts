export type Neighborhood = {
  name: string;
  vibe: string;
  avgRent: number;
  commuteScore: number;
  safetyScore: number;
  costScore: number;
  transitNotes: string;
  bestFor: string[];
  buildings: string[];
  walkability: number;
  highlight: string;
  color: string;
};

export type CityData = {
  city: string;
  emoji: string;
  slackLink: string;
  neighborhoods: Neighborhood[];
};

export const FALLBACK_NEIGHBORHOODS: Record<string, CityData> = {
  atl: {
    city: "Atlanta",
    emoji: "🍑",
    slackLink: "https://join.slack.com/t/internnest-atl",
    neighborhoods: [
      {
        name: "Midtown",
        vibe: "Urban core, walkable, arts & dining",
        avgRent: 1350,
        commuteScore: 9,
        safetyScore: 8,
        costScore: 6,
        transitNotes: "MARTA Gold/Red lines, walkable to most offices",
        bestFor: ["Tech", "Consulting", "Finance"],
        buildings: ["The Byron on Peachtree", "Modera Midtown", "Alexan on 8th"],
        walkability: 82,
        highlight: "Walking distance to Piedmont Park & Colony Square",
        color: "#E8871E",
      },
      {
        name: "Buckhead",
        vibe: "Upscale, suburban feel, shopping & nightlife",
        avgRent: 1550,
        commuteScore: 7,
        safetyScore: 8,
        costScore: 5,
        transitNotes: "MARTA Buckhead station, car helpful for some areas",
        bestFor: ["Finance", "Consulting", "Healthcare"],
        buildings: ["The Residence Buckhead", "Hanover Buckhead Village", "AMLI 3464"],
        walkability: 64,
        highlight: "Near Lenox Square & Phipps Plaza",
        color: "#C4A35A",
      },
      {
        name: "Old Fourth Ward / Poncey-Highland",
        vibe: "Trendy, Beltline access, craft food & bar scene",
        avgRent: 1250,
        commuteScore: 7,
        safetyScore: 7,
        costScore: 7,
        transitNotes: "Beltline Eastside Trail, bus routes, bikeable",
        bestFor: ["Startups", "Creative", "Tech"],
        buildings: ["Ponce City Market Flats", "Alexan O4W", "The Mix at Edgewood"],
        walkability: 78,
        highlight: "Right on the Beltline — ATL's best feature",
        color: "#D35D6E",
      },
      {
        name: "West Midtown / Westside",
        vibe: "Industrial-chic, food halls, emerging tech hub",
        avgRent: 1400,
        commuteScore: 6,
        safetyScore: 7,
        costScore: 6,
        transitNotes: "Limited transit, rideshare or bike recommended",
        bestFor: ["Tech", "Startups", "Media"],
        buildings: ["The Interlock Residences", "Westside Paper", "Star Metals"],
        walkability: 60,
        highlight: "Home to Westside Provisions & tons of food options",
        color: "#5B8C5A",
      },
      {
        name: "Downtown / South Downtown",
        vibe: "Budget-friendly, central, revitalizing area",
        avgRent: 1050,
        commuteScore: 10,
        safetyScore: 6,
        costScore: 9,
        transitNotes: "MARTA hub — Five Points station, walkable to govt offices",
        bestFor: ["Government", "Nonprofit", "Legal"],
        buildings: ["77 12th Street", "The Mitchell", "Artisan at South Downtown"],
        walkability: 88,
        highlight: "Most affordable + best transit access in the city",
        color: "#4A90A4",
      },
    ],
  },
  nyc: {
    city: "New York City",
    emoji: "🗽",
    slackLink: "https://join.slack.com/t/internnest-nyc",
    neighborhoods: [
      {
        name: "East Village / LES",
        vibe: "Gritty-cool, nightlife, diverse food scene",
        avgRent: 2400,
        commuteScore: 9,
        safetyScore: 7,
        costScore: 4,
        transitNotes: "F, L, 6 trains — quick to Midtown & FiDi",
        bestFor: ["Finance", "Tech", "Media"],
        buildings: ["The Ludlow", "Stuy Town (sublease)", "Essex Crossing"],
        walkability: 95,
        highlight: "Most fun neighborhood for a summer in your 20s",
        color: "#FF6B6B",
      },
      {
        name: "Brooklyn Heights / DUMBO",
        vibe: "Quiet, beautiful, waterfront views of Manhattan",
        avgRent: 2700,
        commuteScore: 8,
        safetyScore: 9,
        costScore: 3,
        transitNotes: "2/3, A/C trains — 15 min to FiDi, ferry to Midtown",
        bestFor: ["Finance", "Tech", "Consulting"],
        buildings: ["Brooklyner", "The Pierrepont", "1 John Street"],
        walkability: 90,
        highlight: "Brooklyn Bridge Park is your backyard",
        color: "#4ECDC4",
      },
      {
        name: "Williamsburg",
        vibe: "Trendy, brunch capital, young professional hub",
        avgRent: 2500,
        commuteScore: 7,
        safetyScore: 8,
        costScore: 4,
        transitNotes: "L train to Union Square (14 min), ferry to Midtown",
        bestFor: ["Tech", "Startups", "Creative"],
        buildings: ["The Edge", "325 Kent", "Schaefer Landing"],
        walkability: 88,
        highlight: "Best rooftop and outdoor bar scene in NYC",
        color: "#A8E6CE",
      },
      {
        name: "Harlem",
        vibe: "Cultural richness, best value in Manhattan",
        avgRent: 1700,
        commuteScore: 7,
        safetyScore: 7,
        costScore: 8,
        transitNotes: "A/B/C/D, 2/3 trains — 20 min to Midtown",
        bestFor: ["Healthcare", "Nonprofit", "Education", "Consulting"],
        buildings: ["The Rennie", "One Museum Mile", "Victoria Theater Condos"],
        walkability: 85,
        highlight: "Real NYC culture — best food per dollar in the city",
        color: "#FFD93D",
      },
      {
        name: "Murray Hill / Kips Bay",
        vibe: "Classic young professional, convenient, low-key",
        avgRent: 2200,
        commuteScore: 9,
        safetyScore: 8,
        costScore: 5,
        transitNotes: "6 train, close to Grand Central — easy commute anywhere",
        bestFor: ["Finance", "Consulting", "Healthcare"],
        buildings: ["Kips Bay Court", "Murray Hill Tower", "The Horizon"],
        walkability: 92,
        highlight: "Easiest commute to most Midtown offices",
        color: "#7B68EE",
      },
      {
        name: "Bushwick / Bed-Stuy",
        vibe: "Artsy, affordable, community-driven",
        avgRent: 1500,
        commuteScore: 6,
        safetyScore: 6,
        costScore: 9,
        transitNotes: "L, J/M/Z, A/C trains — 30-40 min to Midtown",
        bestFor: ["Startups", "Creative", "Tech"],
        buildings: ["The Rheingold", "Denizen Bushwick", "1000 Dean"],
        walkability: 80,
        highlight: "Most affordable option with tons of character",
        color: "#F4845F",
      },
    ],
  },
};

export type City = {
  id: string;
  name: string;
  state: string;
  emoji: string;
  lat: number;
  lng: number;
  avgRent: number;
  color: string;
};

export const FALLBACK_CITIES: City[] = [
  { id: "sf", name: "San Francisco", state: "CA", emoji: "🌉", lat: 37.77, lng: -122.42, avgRent: 2200, color: "#FF6B35" },
  { id: "ny", name: "New York", state: "NY", emoji: "🗽", lat: 40.71, lng: -74.01, avgRent: 2800, color: "#4ECDC4" },
  { id: "bos", name: "Boston", state: "MA", emoji: "🏛️", lat: 42.36, lng: -71.06, avgRent: 1900, color: "#C1666B" },
  { id: "chi", name: "Chicago", state: "IL", emoji: "🏙️", lat: 41.88, lng: -87.63, avgRent: 1500, color: "#48639C" },
  { id: "atl", name: "Atlanta", state: "GA", emoji: "🍑", lat: 33.75, lng: -84.39, avgRent: 1300, color: "#E8871E" },
  { id: "sea", name: "Seattle", state: "WA", emoji: "☕", lat: 47.61, lng: -122.33, avgRent: 1950, color: "#2E8B57" },
  { id: "la", name: "Los Angeles", state: "CA", emoji: "🌴", lat: 34.05, lng: -118.24, avgRent: 2100, color: "#D4A373" },
  { id: "dc", name: "Washington", state: "DC", emoji: "🏛️", lat: 38.91, lng: -77.04, avgRent: 1800, color: "#7B68EE" },
];

export type Listing = {
  id: number;
  title: string;
  price: number;
  type: string;
  dates: string;
  amenities: string[];
  poster: string;
  posterCompany: string;
  verified: boolean;
  img: string;
  link?: string;
  transport?: string;
  neighborhood?: string;
};

export const FALLBACK_LISTINGS: Record<string, Listing[]> = {
  sf: [
    // Celine's Meta HQ search — 1BR near Menlo Park, car commute, ~$2600/mo budget
    { id: 300, title: "Bay Oak Apartments", price: 2200, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Parking", "Pool", "8 min to Meta"], poster: "Celine B.", posterCompany: "Meta", verified: true, img: "🌉", link: "https://www.apartments.com/bay-oak-apartments-east-palo-alto-ca/", transport: "Car", neighborhood: "East Palo Alto" },
    { id: 301, title: "Peninsula Park Apartments", price: 2100, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Parking", "Pool", "10 min to Meta", "East Palo Alto"], poster: "Celine B.", posterCompany: "Meta", verified: true, img: "🏡", link: "https://www.apartments.com/peninsula-park-apartments-east-palo-alto-ca/", transport: "Car", neighborhood: "East Palo Alto" },
    { id: 302, title: "Stanford Garden Apartments", price: 1986, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Parking", "Pool", "10 min to Meta", "East Palo Alto"], poster: "Celine B.", posterCompany: "Meta", verified: true, img: "🎓", link: "https://www.apartments.com/stanford-garden-apartments-east-palo-alto-ca/7dkjl6k/", transport: "Car", neighborhood: "East Palo Alto" },
    { id: 303, title: "Woodland Park", price: 2248, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Parking", "Gym", "Pool", "10 min to Meta"], poster: "Celine B.", posterCompany: "Meta", verified: true, img: "🌳", link: "https://www.woodlandparkca.com", transport: "Car", neighborhood: "Menlo Park" },
    { id: 304, title: "Larklanding", price: 1986, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Parking", "Pool", "15 min to Meta", "East Palo Alto"], poster: "Celine B.", posterCompany: "Meta", verified: true, img: "🌿", link: "https://larklanding.live", transport: "Car", neighborhood: "East Palo Alto" },
    { id: 305, title: "Menlo Park Apartments", price: 2295, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Parking", "Gym", "10 min to Meta", "Menlo Park"], poster: "Celine B.", posterCompany: "Meta", verified: true, img: "🏢", link: "https://www.apartments.com/menlo-park-apartments-menlopark-ca/s399d87/", transport: "Car", neighborhood: "Menlo Park" },
    { id: 306, title: "Wildwood Manor Apartments", price: 2045, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Parking", "Pool", "20 min to Meta", "San Mateo"], poster: "Celine B.", posterCompany: "Meta", verified: false, img: "🏡", link: "https://www.wildwoodmanorapts.com/floor-plans/", transport: "Car", neighborhood: "San Mateo" },
    { id: 307, title: "HNE Apartments", price: 2595, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Parking", "Gym", "18 min to Meta", "Redwood City"], poster: "Celine B.", posterCompany: "Meta", verified: true, img: "🏘️", link: "https://www.hneapartments.com/listings/detail/439bf6e5-fe90-4f32-8125-a1d7c232e0b1", transport: "Car", neighborhood: "Redwood City" },
    { id: 308, title: "3633 Colegrove (Studio)", price: 1945, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Parking", "20 min to Meta", "Redwood City"], poster: "Celine B.", posterCompany: "Meta", verified: false, img: "🏠", link: "https://www.apartmenthomeliving.com/redwood-city-ca/apartments-for-rent/cheap", transport: "Car", neighborhood: "Redwood City" },
    { id: 309, title: "Tradewinds Surf Apartments", price: 2300, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Parking", "Pool", "20 min to Meta", "Foster City"], poster: "Celine B.", posterCompany: "Meta", verified: true, img: "🏄", link: "https://www.tradewindsaptsca.com/foster-city/tradewind-surf-apartments/floorplans/one-bedroom-one-bath-1004592/", transport: "Car", neighborhood: "Foster City" },
  ],
  ny: [
    // Keziah's Google NYC search — studio, public transit, ~$2600/mo, near 111 8th Ave (Chelsea)
    { id: 200, title: "FOUND Study Chelsea", price: 1900, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Furnished", "Utilities Incl.", "Intern-Friendly", "2-5 min to Google NYC"], poster: "Keziah M.", posterCompany: "Google", verified: true, img: "📚", link: "https://www.apartmentfinder.com/Short-Term-Housing/New-York/New-York", transport: "Public Transit", neighborhood: "Chelsea" },
    { id: 201, title: "320 W 20th St #15", price: 2650, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Chelsea", "4-7 min to Google NYC"], poster: "Keziah M.", posterCompany: "Google", verified: true, img: "🗽", link: "https://www.rent.com/p/new-york/manhattan-apartments/8thavenue", transport: "Public Transit", neighborhood: "Chelsea" },
    { id: 202, title: "144 W 23rd St #11-F", price: 2650, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Chelsea", "5-8 min to Google NYC"], poster: "Keziah M.", posterCompany: "Google", verified: true, img: "🏙️", link: "https://www.rent.com/p/new-york/manhattan-apartments/8thavenue", transport: "Public Transit", neighborhood: "Chelsea" },
    { id: 203, title: "21 Chelsea", price: 2950, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "Doorman", "Gym", "Chelsea", "3-6 min to Google NYC"], poster: "Keziah M.", posterCompany: "Google", verified: true, img: "🌃", link: "https://www.zillow.com/new-york-ny/short-term-apartments/", transport: "Public Transit", neighborhood: "Chelsea" },
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
    // Gustavo's Bank of America search — 2BR, public transit, ~$1900/mo budget, near Midtown/Downtown
    { id: 100, title: "The Waterford on Piedmont", price: 1602, type: "2 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Pool", "Parking", "5 min walk to BofA"], poster: "Gustavo T.", posterCompany: "Bank of America", verified: true, img: "🏙️", link: "https://thewaterfordonpiedmont.com/", transport: "Walk", neighborhood: "Midtown" },
    { id: 101, title: "Skyline at ATL", price: 1685, type: "2 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Gym", "Rooftop", "Near MARTA"], poster: "Gustavo T.", posterCompany: "Bank of America", verified: true, img: "🌆", link: "https://www.skylineatlapts.com/", transport: "Public Transit", neighborhood: "Midtown" },
    { id: 102, title: "131 Ponce", price: 1819, type: "2 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Gym", "4 min walk to BofA"], poster: "Gustavo T.", posterCompany: "Bank of America", verified: true, img: "🏢", link: "https://www.live131ponce.com/", transport: "Walk", neighborhood: "Midtown" },
    { id: 103, title: "Crest at Midtown", price: 1610, type: "2 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Pool", "Gym", "Parking", "5 min walk to BofA"], poster: "Gustavo T.", posterCompany: "Bank of America", verified: true, img: "🏡", link: "https://www.crestatmidtown.com/", transport: "Walk", neighborhood: "Midtown" },
    { id: 104, title: "Centennial Place Apartments", price: 1535, type: "2 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Pool", "Parking", "Near MARTA"], poster: "Gustavo T.", posterCompany: "Bank of America", verified: true, img: "🍑", link: "https://www.centennialplaceapartments.com/", transport: "Public Transit", neighborhood: "Downtown" },
    // Anusha's Coca-Cola HQ search — 1BR/Studio, bike-friendly, ~$1500/mo budget
    { id: 105, title: "Monroe Place Apartments", price: 1010, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Bikeable", "Near Coca-Cola HQ"], poster: "Anusha R.", posterCompany: "Coca-Cola", verified: true, img: "🚲", link: "https://www.veryapt.com/n90-apartments-near-one-coca-cola-plaza-atlanta", transport: "Bike", neighborhood: "Downtown" },
    { id: 106, title: "Myrtle Street Apartments", price: 1054, type: "Studio", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Bikeable", "Midtown"], poster: "Anusha R.", posterCompany: "Coca-Cola", verified: true, img: "🌿", link: "https://www.veryapt.com/n90-apartments-near-one-coca-cola-plaza-atlanta", transport: "Bike", neighborhood: "Midtown" },
    { id: 107, title: "855 Charles Allen Dr NE", price: 1295, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Bikeable", "Midtown East"], poster: "Anusha R.", posterCompany: "Coca-Cola", verified: false, img: "🏠", link: "https://www.redfin.com/neighborhood/147258/GA/Atlanta/Midtown-Atlanta/apartments-under-1500-for-rent", transport: "Bike", neighborhood: "Midtown East" },
    { id: 108, title: "The Mitchell", price: 1392, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Downtown", "Near MARTA"], poster: "Anusha R.", posterCompany: "Coca-Cola", verified: true, img: "🏛️", link: "https://www.zillow.com/downtown-atlanta-ga/apartments-under-1500/", transport: "Bike", neighborhood: "Downtown" },
    { id: 109, title: "The Haynes House", price: 1400, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Near Coca-Cola HQ", "Bikeable"], poster: "Anusha R.", posterCompany: "Coca-Cola", verified: true, img: "🏡", link: "https://www.veryapt.com/n90-apartments-near-one-coca-cola-plaza-atlanta", transport: "Bike", neighborhood: "Downtown" },
    { id: 110, title: "Arts Center Tower Apartments", price: 1480, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Gym", "Midtown"], poster: "Anusha R.", posterCompany: "Coca-Cola", verified: true, img: "🎨", link: "https://www.zillow.com/midtown-atlanta-ga/apartments-under-1500/", transport: "Bike", neighborhood: "Midtown" },
    { id: 111, title: "Ascent Peachtree", price: 1491, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Gym", "Downtown", "Near MARTA"], poster: "Anusha R.", posterCompany: "Coca-Cola", verified: true, img: "🏙️", link: "https://www.zillow.com/atlanta-ga/apartments-under-1500/6_p/", transport: "Bike", neighborhood: "Downtown" },
    { id: 112, title: "1660 Peachtree", price: 1495, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Midtown", "Near MARTA"], poster: "Anusha R.", posterCompany: "Coca-Cola", verified: false, img: "🏢", link: "https://www.zillow.com/midtown-atlanta-ga/apartments-under-1500/", transport: "Bike", neighborhood: "Midtown" },
    { id: 113, title: "Crescent Apartments", price: 1500, type: "1 Bedroom", dates: "Jun 1 – Aug 31", amenities: ["WiFi", "AC", "Gym", "Midtown"], poster: "Anusha R.", posterCompany: "Coca-Cola", verified: true, img: "🌙", link: "https://www.redfin.com/neighborhood/147258/GA/Atlanta/Midtown-Atlanta/apartments-under-1500-for-rent", transport: "Bike", neighborhood: "Midtown" },
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

export type TransportOption = {
  mode: string;
  icon: string;
  desc: string;
  cost: string;
  tip: string;
};

export const FALLBACK_TRANSPORT: Record<string, TransportOption[]> = {
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

export type InterestGroup = {
  name: string;
  members: number;
  emoji: string;
  category: string;
};

export const FALLBACK_INTEREST_GROUPS: Record<string, InterestGroup[]> = {
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
