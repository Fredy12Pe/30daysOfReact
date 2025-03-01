import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { City, WeatherData, TemperatureUnit } from '../types/weather';

interface WeatherState {
  cities: City[];
  selectedCities: WeatherData[];
  temperatureUnit: TemperatureUnit;
  isLoading: boolean;
  error: string | null;
  addCity: (city: City) => void;
  removeCity: (cityId: string) => void;
  updateWeatherData: (weatherData: WeatherData) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState = {
  cities: [],
  selectedCities: [],
  temperatureUnit: 'celsius' as TemperatureUnit,
  isLoading: false,
  error: null,
};

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      ...initialState,
      addCity: (city: City) =>
        set((state) => {
          console.log('Adding city:', city);
          if (state.cities.some(c => c.id === city.id)) {
            console.log('City already exists');
            return state;
          }
          console.log('New city added, replacing existing cities');
          return {
            ...state,
            cities: [city],
            selectedCities: [],
            error: null,
          };
        }),
      removeCity: (cityId: string) =>
        set((state) => {
          console.log('Removing city:', cityId);
          return {
            ...state,
            cities: state.cities.filter((city) => city.id !== cityId),
            selectedCities: state.selectedCities.filter((weather) => weather.id !== cityId),
            error: null,
          };
        }),
      updateWeatherData: (weatherData: WeatherData) =>
        set((state) => {
          console.log('Updating weather data:', weatherData);
          const existingIndex = state.selectedCities.findIndex(
            (city) => city.id === weatherData.id
          );
          const newSelectedCities = [...state.selectedCities];
          
          if (existingIndex >= 0) {
            newSelectedCities[existingIndex] = weatherData;
          } else {
            newSelectedCities.push(weatherData);
          }
          
          return {
            ...state,
            selectedCities: newSelectedCities,
            error: null,
          };
        }),
      setTemperatureUnit: (unit: TemperatureUnit) =>
        set((state) => ({
          ...state,
          temperatureUnit: unit,
          error: null,
        })),
      setLoading: (isLoading: boolean) =>
        set((state) => ({
          ...state,
          isLoading,
          ...(isLoading ? { error: null } : {}),
        })),
      setError: (error: string | null) =>
        set((state) => ({
          ...state,
          error,
          isLoading: false,
        })),
    }),
    {
      name: 'weather-storage',
      version: 1,
      partialize: (state) => ({
        cities: state.cities,
        selectedCities: state.selectedCities,
        temperatureUnit: state.temperatureUnit,
      }),
    }
  )
); 