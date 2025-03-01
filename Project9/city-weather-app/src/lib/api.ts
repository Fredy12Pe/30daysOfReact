import { WeatherData, City } from '../types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.error('OpenWeather API key is not configured');
}

export async function searchCities(query: string): Promise<City[]> {
  try {
    console.log('Searching cities with query:', query);
    const response = await fetch(
      `${BASE_URL}/find?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('City search failed:', errorData);
      throw new Error(`Failed to search cities: ${response.status}`);
    }

    const data = await response.json();
    console.log('City search results:', data);
    
    if (!data.list || !Array.isArray(data.list)) {
      console.error('Invalid response format:', data);
      return [];
    }

    return data.list.map((item: any) => ({
      id: item.id.toString(),
      name: item.name,
      country: item.sys.country,
      coord: {
        lat: item.coord.lat,
        lon: item.coord.lon,
      },
    }));
  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
}

export async function getWeatherData(city: City): Promise<WeatherData> {
  try {
    console.log('Fetching weather data for city:', city);
    // Get current weather
    const currentResponse = await fetch(
      `${BASE_URL}/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${API_KEY}&units=metric`
    );

    // Get forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${API_KEY}&units=metric`
    );

    if (!currentResponse.ok || !forecastResponse.ok) {
      console.error('Weather data fetch failed:', {
        current: currentResponse.status,
        forecast: forecastResponse.status
      });
      throw new Error('Failed to fetch weather data');
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    console.log('Weather data received:', { current: currentData, forecast: forecastData });

    // Process forecast data to get daily forecasts
    const dailyForecasts = forecastData.list.reduce((acc: any[], item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc.find((forecast) => forecast.date === date)) {
        acc.push({
          date,
          temp: {
            min: item.main.temp_min,
            max: item.main.temp_max,
          },
          weather: {
            main: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          },
        });
      }
      return acc;
    }, []).slice(0, 5);

    return {
      id: city.id,
      city: city.name,
      country: city.country,
      current: {
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        wind_speed: currentData.wind.speed,
        weather: {
          main: currentData.weather[0].main,
          description: currentData.weather[0].description,
          icon: currentData.weather[0].icon,
        },
      },
      forecast: dailyForecasts,
      timezone: currentData.timezone,
      alerts: currentData.alerts,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function getWeatherIcon(code: string): string {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
} 