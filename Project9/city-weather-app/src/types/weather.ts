export interface WeatherData {
  id: string;
  city: string;
  country: string;
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  };
  forecast: ForecastDay[];
  timezone: number;
  alerts?: WeatherAlert[];
}

export interface ForecastDay {
  date: string;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  };
}

export interface WeatherAlert {
  event: string;
  description: string;
  start: number;
  end: number;
}

export interface City {
  id: string;
  name: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherState {
  cities: City[];
  selectedCities: WeatherData[];
  temperatureUnit: TemperatureUnit;
  isLoading: boolean;
  error: string | null;
  // Store actions
  addCity: (city: City) => void;
  removeCity: (cityId: string) => void;
  updateWeatherData: (weatherData: WeatherData) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
} 