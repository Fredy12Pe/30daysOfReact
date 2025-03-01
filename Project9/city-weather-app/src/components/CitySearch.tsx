"use client";

import { useState } from "react";
import { City } from "@/types/weather";
import { searchCities } from "@/lib/api";

interface CitySearchProps {
  onCitySelect: (city: City) => void;
}

export default function CitySearch({ onCitySelect }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const cities = await searchCities(query);
      setResults(cities);
    } catch (err) {
      setError("Failed to search cities. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative" style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <label style={{ fontSize: "18px", fontWeight: "500", color: "#333" }}>
          Your City
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="London"
          style={{
            width: "220px",
            height: "36px",
            padding: "8px 12px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "white",
          }}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          style={{
            height: "36px",
            padding: "0 15px",
            backgroundColor: "#4d8bf8",
            color: "white",
            fontWeight: "500",
            fontSize: "14px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isLoading ? "..." : "Search"}
        </button>
      </div>

      {error && (
        <div
          style={{
            marginTop: "10px",
            color: "#d00",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            width: "220px",
            marginTop: "5px",
            marginLeft: "95px",
            backgroundColor: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            maxHeight: "250px",
            overflow: "auto",
          }}
        >
          {results.map((city) => (
            <button
              key={city.id}
              onClick={() => handleCitySelect(city)}
              style={{
                width: "100%",
                padding: "8px 12px",
                textAlign: "left",
                backgroundColor: "transparent",
                border: "none",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {city.name}, {city.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
