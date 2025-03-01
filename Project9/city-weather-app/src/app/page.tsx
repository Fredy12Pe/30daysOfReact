"use client";

import { useEffect } from "react";
import { useWeatherStore } from "@/store/weatherStore";
import { getWeatherData } from "@/lib/api";
import CitySearch from "@/components/CitySearch";
import WeatherCard from "@/components/WeatherCard";
import { SunIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const {
    cities,
    selectedCities,
    temperatureUnit,
    isLoading,
    error,
    addCity,
    removeCity,
    updateWeatherData,
    setTemperatureUnit,
    setLoading,
    setError,
  } = useWeatherStore();

  // Fetch weather data for all selected cities
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const weatherPromises = cities.map((city) => getWeatherData(city));
      const weatherData = await Promise.all(weatherPromises);
      weatherData.forEach((data) => updateWeatherData(data));
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data on initial load and when cities change
  useEffect(() => {
    if (cities.length > 0) {
      fetchWeatherData();
    }
  }, [cities]);

  // Auto-refresh weather data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (cities.length > 0) {
        fetchWeatherData();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [cities]);

  return (
    <main
      style={{
        backgroundColor: "#f7f9fc",
        minHeight: "100vh",
        fontSize: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1600px",
          padding: "40px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "50px",
            padding: "10px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}>
              Weather App
            </h1>
          </div>

          <button
            onClick={() =>
              setTemperatureUnit(
                temperatureUnit === "celsius" ? "fahrenheit" : "celsius"
              )
            }
            style={{
              backgroundColor: "#4d8bf8",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "18px",
              border: "none",
            }}
          >
            {temperatureUnit === "celsius" ? "Switch to °F" : "Switch to °C"}
          </button>
        </div>

        {/* Search Bar */}
        <div
          style={{
            marginBottom: "70px",
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto 70px auto",
          }}
        >
          <CitySearch onCitySelect={addCity} />
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              color: "#d00",
              padding: "15px 20px",
              borderRadius: "8px",
              marginBottom: "30px",
              fontSize: "16px",
              textAlign: "center",
              maxWidth: "1200px",
              margin: "0 auto 30px auto",
            }}
          >
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div
            style={{
              color: "#666",
              textAlign: "center",
              padding: "20px",
              marginBottom: "30px",
              fontSize: "18px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            Loading weather data...
          </div>
        )}

        {/* Weather Cards */}
        {selectedCities.length > 0 ? (
          <div style={{ width: "100%" }}>
            {selectedCities.map((weather) => (
              <WeatherCard
                key={weather.id}
                weather={weather}
                temperatureUnit={temperatureUnit}
                onRemove={removeCity}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#666",
              padding: "50px",
              fontSize: "18px",
              backgroundColor: "white",
              borderRadius: "12px",
              maxWidth: "1200px",
              margin: "0 auto",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            Search for a city to view weather information
          </div>
        )}
      </div>
    </main>
  );
}
