import { createClient } from '@supabase/supabase-js';
import {
  FALLBACK_CITIES,
  FALLBACK_NEIGHBORHOODS,
  FALLBACK_LISTINGS,
  FALLBACK_TRANSPORT,
  FALLBACK_INTEREST_GROUPS
} from '../lib/fallback-data.ts';
import 'dotenv/config'; // Optional if they run with --env-file, but we'll try to load automatically or expect env vars to be set

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding cities...");
  for (const city of FALLBACK_CITIES) {
    const { error } = await supabase.from('cities').upsert({
      id: city.id,
      name: city.name,
      state: city.state,
      emoji: city.emoji,
      lat: city.lat,
      lng: city.lng,
      avg_rent: city.avgRent,
      color: city.color,
      listings: city.listings,
      groups: city.groups
    }, { onConflict: 'id' });
    if (error) console.error("Error inserting city:", city.id, error.message);
  }

  console.log("Seeding neighborhoods...");
  for (const [cityId, data] of Object.entries(FALLBACK_NEIGHBORHOODS)) {
    for (const nb of data.neighborhoods) {
      const { error } = await supabase.from('neighborhoods').upsert({
        city_id: cityId,
        name: nb.name,
        vibe: nb.vibe,
        avg_rent: nb.avgRent,
        commute_score: nb.commuteScore,
        safety_score: nb.safetyScore,
        cost_score: nb.costScore,
        transit_notes: nb.transitNotes,
        best_for: nb.bestFor,
        buildings: nb.buildings,
        walkability: nb.walkability,
        highlight: nb.highlight,
        color: nb.color
      });
      if (error) console.error("Error inserting neighborhood:", nb.name, error.message);
    }
  }

  console.log("Seeding listings...");
  for (const [cityId, listings] of Object.entries(FALLBACK_LISTINGS)) {
    for (const listing of listings) {
      const { error } = await supabase.from('listings').upsert({
        id: listing.id,
        city_id: cityId,
        title: listing.title,
        price: listing.price,
        type: listing.type,
        dates: listing.dates,
        amenities: listing.amenities,
        poster_name: listing.poster,
        poster_company: listing.posterCompany,
        verified: listing.verified,
        img: listing.img
      }, { onConflict: 'id' });
      if (error) console.error("Error inserting listing:", listing.id, error.message);
    }
  }

  console.log("Seeding transport...");
  for (const [cityId, transports] of Object.entries(FALLBACK_TRANSPORT)) {
    for (const t of transports) {
      const { error } = await supabase.from('transport').upsert({
        city_id: cityId,
        mode: t.mode,
        icon: t.icon,
        desc: t.desc,
        cost: t.cost,
        tip: t.tip
      });
      if (error) console.error("Error inserting transport:", t.mode, error.message);
    }
  }

  console.log("Seeding interest groups...");
  for (const [cityId, groups] of Object.entries(FALLBACK_INTEREST_GROUPS)) {
    for (const g of groups) {
      const { error } = await supabase.from('interest_groups').upsert({
        city_id: cityId,
        name: g.name,
        members: g.members,
        emoji: g.emoji,
        category: g.category
      });
      if (error) console.error("Error inserting interest group:", g.name, error.message);
    }
  }

  console.log("Seed complete!");
}

seed().catch(console.error);
