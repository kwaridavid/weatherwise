import { ThemeConfig } from '@/types/weather';

class ThemeService {
  getThemeByTimeAndWeather(isDay: number, conditionCode: number): ThemeConfig {
    const hour = new Date().getHours();
    const isNight = isDay === 0 || hour < 6 || hour >= 20;

    // Storm conditions take priority
    if (conditionCode >= 1273 && conditionCode <= 1282) {
      return {
        gradient: 'weather-gradient-storm',
        particleType: 'lightning',
        overlayOpacity: 0.3,
      };
    }

    // Rain
    if ([1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(conditionCode)) {
      return {
        gradient: 'weather-gradient-rainy',
        particleType: 'rain',
        overlayOpacity: 0.2,
      };
    }

    // Snow
    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264, 1279, 1282].includes(conditionCode)) {
      return {
        gradient: 'weather-gradient-snow',
        particleType: 'snow',
        overlayOpacity: 0.15,
      };
    }

    // Night
    if (isNight) {
      return {
        gradient: 'weather-gradient-night',
        particleType: 'star',
        overlayOpacity: 0.1,
      };
    }

    // Cloudy
    if ([1003, 1006, 1009, 1030, 1135, 1147].includes(conditionCode)) {
      return {
        gradient: 'weather-gradient-cloudy',
        particleType: 'cloud',
        overlayOpacity: 0.1,
      };
    }

    // Default sunny
    return {
      gradient: 'weather-gradient-sunny',
      particleType: 'none',
      overlayOpacity: 0,
    };
  }

  getTimeOfDayGradient(): string {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'from-orange-400/10 via-sky-400/10 to-blue-500/10';
    if (hour >= 12 && hour < 17) return 'from-sky-400/10 via-blue-500/10 to-indigo-500/10';
    if (hour >= 17 && hour < 20) return 'from-orange-500/10 via-purple-500/10 to-indigo-900/10';
    return 'from-indigo-900/10 via-slate-900/10 to-black/10';
  }
}

export const themeService = new ThemeService();
