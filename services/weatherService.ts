import { WeatherResponse, SearchResult } from '@/types/weather';
import { WEATHER_API_BASE } from '@/constants/weather';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '';

class WeatherService {
  private async fetchWithError<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to fetch weather data');
    }
    return response.json();
  }

  async getCurrentWeather(query: string): Promise<WeatherResponse> {
    const url = `${WEATHER_API_BASE}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=7&aqi=no&alerts=yes`;
    return this.fetchWithError<WeatherResponse>(url);
  }

  async searchLocations(query: string): Promise<SearchResult[]> {
    if (query.length < 2) return [];
    const url = `${WEATHER_API_BASE}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`;
    return this.fetchWithError<SearchResult[]>(url);
  }

  async getForecast(query: string, days: number = 7): Promise<WeatherResponse> {
    const url = `${WEATHER_API_BASE}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=${days}&aqi=no&alerts=yes`;
    return this.fetchWithError<WeatherResponse>(url);
  }
}

export const weatherService = new WeatherService();
