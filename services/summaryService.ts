import { WeatherResponse, HourForecast } from '@/types/weather';

class SummaryService {
  generateSummary(data: WeatherResponse): string {
    const { current, forecast } = data;
    const today = forecast.forecastday[0];
    const hours = today.hour;
    const now = new Date();
    const currentHour = now.getHours();

    // Get upcoming hours
    const upcomingHours = hours.filter(h => {
      const hourTime = new Date(h.time);
      return hourTime.getHours() >= currentHour;
    }).slice(0, 6);

    const parts: string[] = [];

    // Current condition
    const condition = current.condition.text.toLowerCase();
    const temp = Math.round(current.temp_c);
    parts.push(`Currently ${condition} with ${temp}°C.`);

    // Temperature trend
    if (upcomingHours.length > 1) {
      const laterTemp = Math.round(upcomingHours[upcomingHours.length - 1].temp_c);
      const tempDiff = laterTemp - temp;
      if (Math.abs(tempDiff) > 2) {
        parts.push(tempDiff > 0 
          ? `Temperature rising to ${laterTemp}°C later.` 
          : `Temperature dropping to ${laterTemp}°C later.`);
      }
    }

    // Rain check
    const rainHours = upcomingHours.filter(h => h.chance_of_rain > 30);
    if (rainHours.length > 0) {
      const firstRain = rainHours[0];
      const rainTime = new Date(firstRain.time).getHours();
      const timeLabel = rainTime <= 12 ? `${rainTime} AM` : `${rainTime - 12} PM`;
      parts.push(`Rain likely around ${timeLabel} (${firstRain.chance_of_rain}% chance).`);
    }

    // UV warning
    const maxUv = Math.max(...upcomingHours.map(h => h.uv));
    if (maxUv >= 7) {
      parts.push('High UV levels expected — use sunscreen.');
    }

    // Wind
    if (current.wind_kph > 30) {
      parts.push(`Strong winds at ${Math.round(current.wind_kph)} km/h.`);
    }

    return parts.join(' ');
  }

  generateHourlySummary(hours: HourForecast[]): string {
    const rainHours = hours.filter(h => h.chance_of_rain > 40);
    const tempHigh = Math.max(...hours.map(h => h.temp_c));
    const tempLow = Math.min(...hours.map(h => h.temp_c));

    if (rainHours.length > 0) {
      return `Expect rain with temperatures between ${Math.round(tempLow)}° and ${Math.round(tempHigh)}°.`;
    }
    return `Dry conditions with temperatures between ${Math.round(tempLow)}° and ${Math.round(tempHigh)}°.`;
  }
}

export const summaryService = new SummaryService();
