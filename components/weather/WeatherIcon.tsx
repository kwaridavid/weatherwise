'use client';

import { 
  Sun, Moon, Cloud, CloudSun, CloudMoon, CloudRain, CloudSnow, 
  CloudLightning, CloudDrizzle, CloudFog, CloudSleet, Wind, 
  ThermometerSun, ThermometerSnowflake, EyeOff, Droplets, 
  Umbrella, Sunset, TreePine, SunMedium
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'sun': Sun,
  'moon': Moon,
  'cloud': Cloud,
  'cloud-sun': CloudSun,
  'cloud-moon': CloudMoon,
  'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow,
  'cloud-lightning': CloudLightning,
  'cloud-drizzle': CloudDrizzle,
  'cloud-fog': CloudFog,
  'cloud-sleet': CloudSleet,
  'wind': Wind,
  'thermometer-sun': ThermometerSun,
  'thermometer-snowflake': ThermometerSnowflake,
  'eye-off': EyeOff,
  'droplets': Droplets,
  'umbrella': Umbrella,
  'sunset': Sunset,
  'tree-pine': TreePine,
  'sun-medium': SunMedium,
};

interface WeatherIconProps {
  name: string;
  className?: string;
}

export function WeatherIcon({ name, className = 'w-6 h-6' }: WeatherIconProps) {
  const Icon = iconMap[name] || Cloud;
  return <Icon className={className} />;
}
