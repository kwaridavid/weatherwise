import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTemperature(temp: number, unit: 'celsius' | 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    return `${Math.round((temp * 9/5) + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

export function formatWindSpeed(speed: number, unit: 'kph' | 'mph'): string {
  if (unit === 'mph') {
    return `${Math.round(speed * 0.621371)} mph`;
  }
  return `${Math.round(speed)} km/h`;
}

export function formatTime(timeStr: string): string {
  const date = new Date(timeStr);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export function getUVCategory(uv: number): { label: string; color: string; recommendation: string } {
  if (uv <= 2) return { label: 'Low', color: '#22c55e', recommendation: 'No protection required' };
  if (uv <= 5) return { label: 'Moderate', color: '#eab308', recommendation: 'Wear sunglasses, use SPF 30+' };
  if (uv <= 7) return { label: 'High', color: '#f97316', recommendation: 'Seek shade, protective clothing' };
  if (uv <= 10) return { label: 'Very High', color: '#ef4444', recommendation: 'Avoid sun 10AM-4PM' };
  return { label: 'Extreme', color: '#a855f7', recommendation: 'Stay indoors if possible' };
}

export function getWeatherIcon(conditionCode: number, isDay: number = 1): string {
  const codeMap: Record<number, string> = {
    1000: isDay ? 'sun' : 'moon',
    1003: isDay ? 'cloud-sun' : 'cloud-moon',
    1006: 'cloud',
    1009: 'cloud',
    1030: 'cloud-fog',
    1063: 'cloud-rain',
    1066: 'cloud-snow',
    1069: 'cloud-sleet',
    1072: 'cloud-drizzle',
    1087: 'cloud-lightning',
    1114: 'wind',
    1117: 'wind',
    1135: 'cloud-fog',
    1147: 'cloud-fog',
    1150: 'cloud-drizzle',
    1153: 'cloud-drizzle',
    1168: 'cloud-drizzle',
    1171: 'cloud-drizzle',
    1180: 'cloud-rain',
    1183: 'cloud-rain',
    1186: 'cloud-rain',
    1189: 'cloud-rain',
    1192: 'cloud-rain',
    1195: 'cloud-rain',
    1198: 'cloud-rain',
    1201: 'cloud-rain',
    1204: 'cloud-sleet',
    1207: 'cloud-sleet',
    1210: 'cloud-snow',
    1213: 'cloud-snow',
    1216: 'cloud-snow',
    1219: 'cloud-snow',
    1222: 'cloud-snow',
    1225: 'cloud-snow',
    1237: 'cloud-snow',
    1240: 'cloud-rain',
    1243: 'cloud-rain',
    1246: 'cloud-rain',
    1249: 'cloud-sleet',
    1252: 'cloud-sleet',
    1255: 'cloud-snow',
    1258: 'cloud-snow',
    1261: 'cloud-snow',
    1264: 'cloud-snow',
    1273: 'cloud-lightning',
    1276: 'cloud-lightning',
    1279: 'cloud-lightning',
    1282: 'cloud-lightning',
  };
  return codeMap[conditionCode] || 'cloud';
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
