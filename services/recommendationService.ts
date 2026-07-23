import { WeatherResponse, WeatherRecommendation } from '@/types/weather';

class RecommendationService {
  generateRecommendations(data: WeatherResponse): WeatherRecommendation[] {
    const { current, forecast } = data;
    const today = forecast.forecastday[0];
    const recommendations: WeatherRecommendation[] = [];

    // Temperature-based
    if (current.temp_c > 30) {
      recommendations.push({
        id: 'heat-warning',
        icon: 'thermometer-sun',
        title: 'Extreme Heat',
        description: 'Stay hydrated and avoid prolonged sun exposure. Seek air-conditioned spaces.',
        priority: 'high',
        category: 'health',
      });
    } else if (current.temp_c > 25) {
      recommendations.push({
        id: 'warm-day',
        icon: 'sun',
        title: 'Warm Day Ahead',
        description: 'Wear light, breathable clothing. Stay hydrated throughout the day.',
        priority: 'medium',
        category: 'clothing',
      });
    } else if (current.temp_c < 5) {
      recommendations.push({
        id: 'cold-warning',
        icon: 'thermometer-snowflake',
        title: 'Very Cold',
        description: 'Wear warm layers, gloves, and a hat. Limit time outdoors.',
        priority: 'high',
        category: 'clothing',
      });
    } else if (current.temp_c < 15) {
      recommendations.push({
        id: 'cool-day',
        icon: 'wind',
        title: 'Cool Temperatures',
        description: 'Bring a jacket or sweater. Layer your clothing for comfort.',
        priority: 'medium',
        category: 'clothing',
      });
    }

    // Rain
    if (current.precip_mm > 0 || today.day.daily_chance_of_rain > 50) {
      recommendations.push({
        id: 'rain-expected',
        icon: 'umbrella',
        title: 'Carry an Umbrella',
        description: `Rain is expected (${today.day.daily_chance_of_rain}% chance). Don't forget waterproof footwear.`,
        priority: 'high',
        category: 'travel',
      });
    } else if (today.day.daily_chance_of_rain > 20) {
      recommendations.push({
        id: 'rain-possible',
        icon: 'cloud-rain',
        title: 'Rain Possible',
        description: 'Pack a light rain jacket just in case.',
        priority: 'low',
        category: 'travel',
      });
    }

    // UV
    if (current.uv >= 7) {
      recommendations.push({
        id: 'high-uv',
        icon: 'sun',
        title: 'High UV Alert',
        description: 'Apply SPF 50+ sunscreen. Wear sunglasses and a wide-brimmed hat.',
        priority: 'high',
        category: 'health',
      });
    } else if (current.uv >= 3 && current.is_day === 1) {
      recommendations.push({
        id: 'moderate-uv',
        icon: 'sun-medium',
        title: 'UV Protection Recommended',
        description: 'Use SPF 30+ sunscreen if spending time outdoors.',
        priority: 'medium',
        category: 'health',
      });
    }

    // Wind
    if (current.wind_kph > 40) {
      recommendations.push({
        id: 'strong-wind',
        icon: 'wind',
        title: 'Strong Winds',
        description: 'Secure loose items outdoors. Be cautious when driving high-profile vehicles.',
        priority: 'high',
        category: 'travel',
      });
    }

    // Visibility
    if (current.visibility_km < 5) {
      recommendations.push({
        id: 'low-visibility',
        icon: 'eye-off',
        title: 'Low Visibility',
        description: 'Drive with headlights on. Reduce speed and increase following distance.',
        priority: 'high',
        category: 'travel',
      });
    }

    // Humidity
    if (current.humidity > 80 && current.temp_c > 20) {
      recommendations.push({
        id: 'high-humidity',
        icon: 'droplets',
        title: 'High Humidity',
        description: 'It will feel warmer than the actual temperature. Stay cool and hydrated.',
        priority: 'medium',
        category: 'health',
      });
    }

    // Snow
    if (today.day.daily_chance_of_snow > 30) {
      recommendations.push({
        id: 'snow-expected',
        icon: 'snowflake',
        title: 'Snow Expected',
        description: 'Roads may be slippery. Wear warm, waterproof boots and drive carefully.',
        priority: 'high',
        category: 'travel',
      });
    }

    // Thunderstorm
    const conditionCode = current.condition.code;
    if (conditionCode >= 1273 && conditionCode <= 1282) {
      recommendations.push({
        id: 'thunderstorm',
        icon: 'cloud-lightning',
        title: 'Thunderstorm Warning',
        description: 'Stay indoors if possible. Avoid open areas and tall structures.',
        priority: 'high',
        category: 'general',
      });
    }

    // Activity recommendations
    if (current.temp_c >= 15 && current.temp_c <= 28 && current.precip_mm === 0 && current.wind_kph < 20) {
      recommendations.push({
        id: 'great-outdoors',
        icon: 'tree-pine',
        title: 'Perfect for Outdoors',
        description: 'Great conditions for walking, jogging, or outdoor activities.',
        priority: 'low',
        category: 'activity',
      });
    }

    // Sunset
    const sunsetTime = today.astro.sunset;
    const sunsetHour = parseInt(sunsetTime.split(':')[0]);
    const currentHour = new Date().getHours();
    if (currentHour >= sunsetHour - 2 && currentHour < sunsetHour && current.cloud < 50) {
      recommendations.push({
        id: 'sunset-viewing',
        icon: 'sunset',
        title: 'Beautiful Sunset Expected',
        description: 'Clear skies mean a great sunset view. Find a good vantage point!',
        priority: 'low',
        category: 'activity',
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }
}

export const recommendationService = new RecommendationService();
