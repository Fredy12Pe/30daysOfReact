"use client";

import { WeatherData, TemperatureUnit } from "@/types/weather";
import { celsiusToFahrenheit, getWeatherIcon } from "@/lib/api";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import React from "react";

interface WeatherCardProps {
  weather: WeatherData;
  temperatureUnit: TemperatureUnit;
  onRemove: (cityId: string) => void;
}

// Custom outline-style weather icons with increased stroke width
const SunnyIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    stroke="black"
    strokeWidth="4"
  >
    <circle cx="50" cy="50" r="20" />
    <line x1="50" y1="20" x2="50" y2="10" />
    <line x1="50" y1="90" x2="50" y2="80" />
    <line x1="20" y1="50" x2="10" y2="50" />
    <line x1="90" y1="50" x2="80" y2="50" />
    <line x1="30" y1="30" x2="22" y2="22" />
    <line x1="78" y1="78" x2="70" y2="70" />
    <line x1="30" y1="70" x2="22" y2="78" />
    <line x1="78" y1="22" x2="70" y2="30" />
  </svg>
);

// Updated cloud icon with a different design
const CloudyIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    stroke="black"
    strokeWidth="4"
  >
    <path
      d="M30,55 A15,15 0 1,1 50,55 A10,10 0 1,1 65,65 L30,65 A15,15 0 0,1 30,55"
      strokeLinejoin="round"
    />
    <path d="M40,45 A8,8 0 1,1 60,45" strokeLinejoin="round" />
  </svg>
);

// Updated partly cloudy icon to match the new cloud design
const PartlyCloudyIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    stroke="black"
    strokeWidth="4"
  >
    <circle cx="35" cy="40" r="15" />
    <path
      d="M30,65 A15,15 0 1,1 50,65 A10,10 0 1,1 65,75 L30,75 A15,15 0 0,1 30,65"
      strokeLinejoin="round"
    />
  </svg>
);

const RainyIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    stroke="black"
    strokeWidth="4"
  >
    <path
      d="M30,45 A15,15 0 1,1 50,45 A10,10 0 1,1 65,55 L30,55 A15,15 0 0,1 30,45"
      strokeLinejoin="round"
    />
    <line x1="35" y1="65" x2="30" y2="80" />
    <line x1="50" y1="65" x2="45" y2="80" />
    <line x1="65" y1="65" x2="60" y2="80" />
  </svg>
);

const ThunderstormIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    stroke="black"
    strokeWidth="4"
  >
    <path
      d="M30,45 A15,15 0 1,1 50,45 A10,10 0 1,1 65,55 L30,55 A15,15 0 0,1 30,45"
      strokeLinejoin="round"
    />
    <polyline points="55,60 45,75 55,75 45,90" strokeLinejoin="round" />
  </svg>
);

const SnowyIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    stroke="black"
    strokeWidth="4"
  >
    <path
      d="M30,45 A15,15 0 1,1 50,45 A10,10 0 1,1 65,55 L30,55 A15,15 0 0,1 30,45"
      strokeLinejoin="round"
    />
    <circle cx="35" cy="70" r="3" />
    <circle cx="50" cy="70" r="3" />
    <circle cx="65" cy="70" r="3" />
    <circle cx="42" cy="80" r="3" />
    <circle cx="57" cy="80" r="3" />
  </svg>
);

const MistyIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    stroke="black"
    strokeWidth="4"
  >
    <line x1="20" y1="40" x2="80" y2="40" />
    <line x1="25" y1="50" x2="75" y2="50" />
    <line x1="30" y1="60" x2="70" y2="60" />
    <line x1="35" y1="70" x2="65" y2="70" />
  </svg>
);

// Function to get the appropriate weather icon based on condition code
const getOutlineWeatherIcon = (conditionCode: number) => {
  // Clear
  if (conditionCode === 1000) {
    return <SunnyIcon />;
  }
  // Partly cloudy
  else if (conditionCode === 1003) {
    return <PartlyCloudyIcon />;
  }
  // Cloudy, overcast
  else if ([1006, 1009].includes(conditionCode)) {
    return <CloudyIcon />;
  }
  // Mist, fog
  else if ([1030, 1135, 1147].includes(conditionCode)) {
    return <MistyIcon />;
  }
  // Rain, drizzle
  else if (
    [
      1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198,
      1201, 1240, 1243, 1246,
    ].includes(conditionCode)
  ) {
    return <RainyIcon />;
  }
  // Snow, sleet
  else if (
    [
      1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222,
      1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264,
    ].includes(conditionCode)
  ) {
    return <SnowyIcon />;
  }
  // Thunder
  else if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
    return <ThunderstormIcon />;
  }
  // Default
  return <CloudyIcon />;
};

// Remove the problematic WhiteOutlineIcon component
// Function to get a white stroke version of an icon for the blue card
const getWhiteStrokeIcon = (iconName: string) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      stroke="white"
      strokeWidth="4"
    >
      <path
        d="M30,55 A15,15 0 1,1 50,55 A10,10 0 1,1 65,65 L30,65 A15,15 0 0,1 30,55"
        strokeLinejoin="round"
      />
      <path d="M40,45 A8,8 0 1,1 60,45" strokeLinejoin="round" />
    </svg>
  );
};

export default function WeatherCard({
  weather,
  temperatureUnit,
  onRemove,
}: WeatherCardProps) {
  const formatTemperature = (celsius: number) => {
    const temp =
      temperatureUnit === "celsius" ? celsius : celsiusToFahrenheit(celsius);
    return `${Math.round(temp)}°${temperatureUnit === "celsius" ? "C" : "F"}`;
  };

  // Function to display both temperature formats
  const dualTemperatureDisplay = (celsius: number) => {
    const tempC = Math.round(celsius);
    const tempF = Math.round(celsiusToFahrenheit(celsius));
    return `${tempC}°C / ${tempF}°F`;
  };

  // Mock data for the current time since we don't have it in the API
  const currentDate = new Date();
  const formattedDate = `${currentDate.getHours()}:${String(
    currentDate.getMinutes()
  ).padStart(2, "0")} ${currentDate.getHours() >= 12 ? "PM" : "AM"}, ${
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][currentDate.getDay()]
  }, ${
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][currentDate.getMonth()]
  } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  // Generate mock humidity values for the forecast
  const forecastHumidity = [36, 28, 20, 15]; // Decreasing humidity values

  // Function to get the appropriate icon based on weather condition
  const getWeatherSvgIcon = (iconCode: string) => {
    if (iconCode.includes("01")) return SunnyIcon;
    if (
      iconCode.includes("02") ||
      iconCode.includes("03") ||
      iconCode.includes("04")
    )
      return CloudyIcon;
    if (iconCode.includes("09") || iconCode.includes("10")) return RainyIcon;
    if (iconCode.includes("13")) return SnowyIcon;
    return CloudyIcon;
  };

  // Current weather icon component
  const CurrentWeatherIcon = getWeatherSvgIcon(weather.current.weather.icon);

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "30px",
        color: "#333",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto 40px auto",
      }}
    >
      <button
        onClick={() => onRemove(weather.id)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "#aaa",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <XCircleIcon style={{ width: "20px", height: "20px" }} />
      </button>

      {/* Date display */}
      <div style={{ fontSize: "16px", color: "#888", marginBottom: "30px" }}>
        {formattedDate}
      </div>

      {/* Main content area */}
      <div style={{ display: "flex", marginBottom: "40px" }}>
        {/* Left side - Weather details */}
        <div style={{ width: "30%", paddingRight: "30px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <div style={{ width: "100px", height: "100px" }}>
              <CurrentWeatherIcon />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <div style={{ fontSize: "48px", fontWeight: "bold" }}>
                {formatTemperature(weather.current.temp)}
              </div>
              <div style={{ fontSize: "16px", color: "#666" }}>
                {temperatureUnit === "celsius"
                  ? `${Math.round(celsiusToFahrenheit(weather.current.temp))}°F`
                  : `${Math.round(weather.current.temp)}°C`}
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              textTransform: "capitalize",
            }}
          >
            {weather.current.weather.description}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span style={{ color: "#888" }}>Humidity</span>
              <span style={{ fontWeight: "500" }}>
                {weather.current.humidity}%
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#888" }}>Wind speed</span>
              <span style={{ fontWeight: "500" }}>
                {weather.current.wind_speed} km/j
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Temperature graph - Simplified and clearer */}
        <div style={{ width: "70%", paddingLeft: "30px" }}>
          <div
            style={{ marginBottom: "15px", fontSize: "18px", color: "#666" }}
          >
            Temperature
          </div>
          <div
            style={{
              width: "100%",
              height: "180px",
              backgroundColor: "#f5f9ff",
              borderRadius: "10px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Simplified temperature display in the graph */}
            <div
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                color: "#4d8bf8",
                position: "relative",
                zIndex: "2",
              }}
            >
              {formatTemperature(weather.current.temp)}
            </div>

            {/* Temperature line graph - smoother curve */}
            <svg
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0, zIndex: "1" }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,70 C20,65 40,50 60,50 S80,50 100,45"
                fill="none"
                stroke="#4d8bf8"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 4-Day Forecast */}
      <div>
        <div style={{ fontSize: "18px", color: "#666", marginBottom: "15px" }}>
          4-Day Forecast
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          {/* Today's Forecast (Blue) */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#4d8bf8",
              borderRadius: "10px",
              padding: "15px",
              color: "white",
              textAlign: "center",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Today
            </div>
            <div style={{ width: "50px", height: "50px", margin: "5px auto" }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                stroke="white"
                strokeWidth="4"
              >
                <path
                  d="M30,55 A15,15 0 1,1 50,55 A10,10 0 1,1 65,65 L30,65 A15,15 0 0,1 30,55"
                  strokeLinejoin="round"
                />
                <path d="M40,45 A8,8 0 1,1 60,45" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              style={{ fontSize: "16px", marginTop: "8px", fontWeight: "bold" }}
            >
              {dualTemperatureDisplay(weather.current.temp)}
            </div>
            <div style={{ fontSize: "14px", marginTop: "10px" }}>
              {weather.current.weather.description}
            </div>
            <div style={{ fontSize: "14px", marginTop: "5px" }}>
              Humidity: {weather.current.humidity}%
            </div>
          </div>

          {/* Next 3 days */}
          {weather.forecast.slice(0, 3).map((day, index) => {
            // Create a function component to render the icon
            const WeatherIcon = () => {
              // Use the icon string from the forecast data to determine which icon to show
              const iconCode = day.weather.icon;
              if (iconCode.includes("01")) return <SunnyIcon />;
              if (
                iconCode.includes("02") ||
                iconCode.includes("03") ||
                iconCode.includes("04")
              )
                return <CloudyIcon />;
              if (iconCode.includes("09") || iconCode.includes("10"))
                return <RainyIcon />;
              if (iconCode.includes("13")) return <SnowyIcon />;
              return <CloudyIcon />;
            };

            return (
              <div
                key={day.date}
                style={{
                  flex: 1,
                  backgroundColor: "#f5f5f5",
                  borderRadius: "10px",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {new Date(
                    new Date().setDate(new Date().getDate() + index + 1)
                  ).toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div
                  style={{ width: "50px", height: "50px", margin: "5px auto" }}
                >
                  <WeatherIcon />
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    marginTop: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {dualTemperatureDisplay(day.temp.max)}
                </div>
                <div style={{ fontSize: "14px", marginTop: "10px" }}>
                  {day.weather.description}
                </div>
                <div style={{ fontSize: "14px", marginTop: "5px" }}>
                  Humidity: {forecastHumidity[index + 1]}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
