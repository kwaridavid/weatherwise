export const WEATHER_API_BASE = 'https://api.weatherapi.com/v1';

export const DEFAULT_CITY = 'New York';

export const UV_CATEGORIES = [
  { max: 2, label: 'Low', color: '#22c55e', recommendation: 'No protection required. Safe to be outside.' },
  { max: 5, label: 'Moderate', color: '#eab308', recommendation: 'Wear sunglasses and use SPF 30+ sunscreen.' },
  { max: 7, label: 'High', color: '#f97316', recommendation: 'Seek shade during midday. Wear protective clothing.' },
  { max: 10, label: 'Very High', color: '#ef4444', recommendation: 'Avoid sun exposure between 10 AM and 4 PM.' },
  { max: 100, label: 'Extreme', color: '#a855f7', recommendation: 'Stay indoors if possible. Full protection essential.' },
];

export const WEATHER_CONDITION_CODES: Record<number, { icon: string; label: string; animation: string }> = {
  1000: { icon: 'sun', label: 'Sunny', animation: 'sunny' },
  1003: { icon: 'cloud-sun', label: 'Partly Cloudy', animation: 'cloudy' },
  1006: { icon: 'cloud', label: 'Cloudy', animation: 'cloudy' },
  1009: { icon: 'cloud', label: 'Overcast', animation: 'cloudy' },
  1030: { icon: 'cloud-fog', label: 'Mist', animation: 'cloudy' },
  1063: { icon: 'cloud-rain', label: 'Patchy Rain', animation: 'rainy' },
  1066: { icon: 'cloud-snow', label: 'Patchy Snow', animation: 'snow' },
  1069: { icon: 'cloud-sleet', label: 'Patchy Sleet', animation: 'rainy' },
  1072: { icon: 'cloud-drizzle', label: 'Patchy Drizzle', animation: 'rainy' },
  1087: { icon: 'cloud-lightning', label: 'Thundery Outbreaks', animation: 'storm' },
  1114: { icon: 'wind', label: 'Blowing Snow', animation: 'snow' },
  1117: { icon: 'wind', label: 'Blizzard', animation: 'snow' },
  1135: { icon: 'cloud-fog', label: 'Fog', animation: 'cloudy' },
  1147: { icon: 'cloud-fog', label: 'Freezing Fog', animation: 'cloudy' },
  1150: { icon: 'cloud-drizzle', label: 'Patchy Light Drizzle', animation: 'rainy' },
  1153: { icon: 'cloud-drizzle', label: 'Light Drizzle', animation: 'rainy' },
  1168: { icon: 'cloud-drizzle', label: 'Freezing Drizzle', animation: 'rainy' },
  1171: { icon: 'cloud-drizzle', label: 'Heavy Freezing Drizzle', animation: 'rainy' },
  1180: { icon: 'cloud-rain', label: 'Patchy Light Rain', animation: 'rainy' },
  1183: { icon: 'cloud-rain', label: 'Light Rain', animation: 'rainy' },
  1186: { icon: 'cloud-rain', label: 'Moderate Rain at Times', animation: 'rainy' },
  1189: { icon: 'cloud-rain', label: 'Moderate Rain', animation: 'rainy' },
  1192: { icon: 'cloud-rain', label: 'Heavy Rain at Times', animation: 'rainy' },
  1195: { icon: 'cloud-rain', label: 'Heavy Rain', animation: 'rainy' },
  1198: { icon: 'cloud-rain', label: 'Light Freezing Rain', animation: 'rainy' },
  1201: { icon: 'cloud-rain', label: 'Moderate/Heavy Freezing Rain', animation: 'rainy' },
  1204: { icon: 'cloud-sleet', label: 'Light Sleet', animation: 'rainy' },
  1207: { icon: 'cloud-sleet', label: 'Moderate/Heavy Sleet', animation: 'rainy' },
  1210: { icon: 'cloud-snow', label: 'Patchy Light Snow', animation: 'snow' },
  1213: { icon: 'cloud-snow', label: 'Light Snow', animation: 'snow' },
  1216: { icon: 'cloud-snow', label: 'Patchy Moderate Snow', animation: 'snow' },
  1219: { icon: 'cloud-snow', label: 'Moderate Snow', animation: 'snow' },
  1222: { icon: 'cloud-snow', label: 'Patchy Heavy Snow', animation: 'snow' },
  1225: { icon: 'cloud-snow', label: 'Heavy Snow', animation: 'snow' },
  1237: { icon: 'cloud-snow', label: 'Ice Pellets', animation: 'snow' },
  1240: { icon: 'cloud-rain', label: 'Light Rain Shower', animation: 'rainy' },
  1243: { icon: 'cloud-rain', label: 'Moderate/Heavy Rain Shower', animation: 'rainy' },
  1246: { icon: 'cloud-rain', label: 'Torrential Rain Shower', animation: 'rainy' },
  1249: { icon: 'cloud-sleet', label: 'Light Sleet Showers', animation: 'rainy' },
  1252: { icon: 'cloud-sleet', label: 'Moderate/Heavy Sleet Showers', animation: 'rainy' },
  1255: { icon: 'cloud-snow', label: 'Light Snow Showers', animation: 'snow' },
  1258: { icon: 'cloud-snow', label: 'Moderate/Heavy Snow Showers', animation: 'snow' },
  1261: { icon: 'cloud-snow', label: 'Light Showers of Ice Pellets', animation: 'snow' },
  1264: { icon: 'cloud-snow', label: 'Moderate/Heavy Showers of Ice Pellets', animation: 'snow' },
  1273: { icon: 'cloud-lightning', label: 'Patchy Light Rain with Thunder', animation: 'storm' },
  1276: { icon: 'cloud-lightning', label: 'Moderate/Heavy Rain with Thunder', animation: 'storm' },
  1279: { icon: 'cloud-lightning', label: 'Patchy Light Snow with Thunder', animation: 'storm' },
  1282: { icon: 'cloud-lightning', label: 'Moderate/Heavy Snow with Thunder', animation: 'storm' },
};

export const TIME_OF_DAY = {
  MORNING: { start: 6, end: 12, label: 'Morning', gradient: 'from-orange-400/20 via-sky-400/20 to-blue-500/20' },
  AFTERNOON: { start: 12, end: 17, label: 'Afternoon', gradient: 'from-sky-400/20 via-blue-500/20 to-indigo-500/20' },
  EVENING: { start: 17, end: 20, label: 'Evening', gradient: 'from-orange-500/20 via-purple-500/20 to-indigo-900/20' },
  NIGHT: { start: 20, end: 6, label: 'Night', gradient: 'from-indigo-900/20 via-slate-900/20 to-black/20' },
};

export const MAP_LAYERS = {
  temp: { label: 'Temperature', url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png' },
  precipitation: { label: 'Precipitation', url: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png' },
  clouds: { label: 'Clouds', url: 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png' },
  wind: { label: 'Wind', url: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png' },
  pressure: { label: 'Pressure', url: 'https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png' },
};

export const DEFAULT_SETTINGS = {
  temperatureUnit: 'celsius' as const,
  windUnit: 'kph' as const,
  theme: 'system' as const,
  notifications: true,
  autoLocation: true,
};
