export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  pressure_mb: number;
  visibility_km: number;
  wind_kph: number;
  wind_mph: number;
  wind_dir: string;
  uv: number;
  condition: WeatherCondition;
  last_updated: string;
  is_day: number;
  cloud: number;
  precip_mm: number;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DayForecast;
  astro: AstroData;
  hour: HourForecast[];
}

export interface DayForecast {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_kph: number;
  maxwind_mph: number;
  totalprecip_mm: number;
  avgvis_km: number;
  avghumidity: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  condition: WeatherCondition;
  uv: number;
}

export interface AstroData {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
}

export interface HourForecast {
  time: string;
  time_epoch: number;
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_kph: number;
  wind_mph: number;
  wind_dir: string;
  pressure_mb: number;
  precip_mm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  chance_of_rain: number;
  chance_of_snow: number;
  uv: number;
  is_day: number;
}

export interface LocationData {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
  localtime_epoch: number;
}

export interface WeatherResponse {
  location: LocationData;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface SearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export interface FavoriteCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  currentTemp?: number;
  condition?: string;
  icon?: string;
  lastUpdated?: string;
}

export interface WeatherRecommendation {
  id: string;
  icon: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'clothing' | 'health' | 'activity' | 'travel' | 'general';
}

export interface UVData {
  index: number;
  category: string;
  color: string;
  recommendation: string;
}

export interface ThemeConfig {
  gradient: string;
  particleType: 'none' | 'rain' | 'snow' | 'cloud' | 'star' | 'lightning';
  overlayOpacity: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindUnit = 'kph' | 'mph';
export type MapLayer = 'temp' | 'precipitation' | 'clouds' | 'wind' | 'pressure';

export interface AppSettings {
  temperatureUnit: TemperatureUnit;
  windUnit: WindUnit;
  theme: 'system' | 'light' | 'dark';
  notifications: boolean;
  autoLocation: boolean;
}
