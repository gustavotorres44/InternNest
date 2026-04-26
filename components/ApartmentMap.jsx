"use client";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

function makeIcon(color, highlighted) {
  const size = highlighted ? 22 : 14;
  const border = highlighted ? "3px" : "2.5px";
  const shadow = highlighted
    ? `0 0 0 5px ${color}30, 0 3px 10px rgba(0,0,0,0.5)`
    : `0 2px 8px rgba(0,0,0,0.45)`;
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${color};border:${border} solid #fff;
      box-shadow:${shadow};
      transition:all 0.2s ease;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
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

export default function ApartmentMap({ listings, cityColor, darkMode, cityId, onSelectListing, highlightedListingId }) {
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

  return (
    <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
      <MapContainer
        key={cityId}
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 480, width: "100%" }}
      >
        <TileLayer
          url={tileUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
          maxZoom={19}
        />
        <FitBounds listingKey={listingKey} listings={withCoords} />
        {withCoords.map(l => {
          const isHighlighted = l.id === highlightedListingId;
          return (
            <Marker
              key={l.id}
              position={[l.lat, l.lng]}
              icon={makeIcon(cityColor, isHighlighted)}
              eventHandlers={{
                click: () => onSelectListing && onSelectListing(isHighlighted ? null : l.id),
              }}
              zIndexOffset={isHighlighted ? 1000 : 0}
            >
              <Popup>
                <div style={{ fontFamily: "'DM Sans', sans-serif", minWidth: 170, padding: "2px 0" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, lineHeight: 1.3 }}>{l.title}</div>
                  <div style={{ color: cityColor, fontWeight: 700, fontSize: 16 }}>
                    ${l.price}<span style={{ fontWeight: 400, fontSize: 12, color: "#888" }}>/mo</span>
                  </div>
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
          );
        })}
      </MapContainer>
    </div>
  );
}
