"use client";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

function makeIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:14px;height:14px;border-radius:50%;
      background:${color};border:2.5px solid #fff;
      box-shadow:0 2px 8px rgba(0,0,0,0.45);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
  });
}

function FitBounds({ listingKey, listings }) {
  const map = useMap();
  useEffect(() => {
    const pts = listings.filter(l => l.lat && l.lng).map(l => [l.lat, l.lng]);
    if (pts.length > 1) {
      map.fitBounds(pts, { padding: [50, 50], maxZoom: 14 });
    } else if (pts.length === 1) {
      map.setView(pts[0], 14);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingKey]);
  return null;
}

export default function ApartmentMap({ listings, cityColor, darkMode, cityId }) {
  const withCoords = listings.filter(l => l.lat && l.lng);
  if (withCoords.length === 0) return null;

  const center = [
    withCoords.reduce((s, l) => s + l.lat, 0) / withCoords.length,
    withCoords.reduce((s, l) => s + l.lng, 0) / withCoords.length,
  ];

  const tileUrl = darkMode
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const listingKey = withCoords.map(l => l.id).join(",");
  const icon = makeIcon(cityColor);

  return (
    <MapContainer
      key={cityId}
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 380, width: "100%", borderRadius: 20 }}
    >
      <TileLayer
        url={tileUrl}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
        maxZoom={19}
      />
      <FitBounds listingKey={listingKey} listings={withCoords} />
      {withCoords.map(l => (
        <Marker key={l.id} position={[l.lat, l.lng]} icon={icon}>
          <Popup>
            <div style={{ fontFamily: "'DM Sans', sans-serif", minWidth: 170, padding: "2px 0" }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, lineHeight: 1.3 }}>{l.title}</div>
              <div style={{ color: cityColor, fontWeight: 700, fontSize: 16 }}>${l.price}<span style={{ fontWeight: 400, fontSize: 12, color: "#888" }}>/mo</span></div>
              <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>{l.type} · {l.neighborhood ?? ""}</div>
              {l.link && (
                <a href={l.link} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-block", marginTop: 8, fontSize: 12, color: cityColor, fontWeight: 600, textDecoration: "none" }}>
                  View listing ↗
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
