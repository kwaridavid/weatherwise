'use client';

import { motion } from 'framer-motion';
import { WeatherResponse } from '@/types/weather';
import { useWeatherStore } from '@/lib/store';
import { formatTemperature, getWeatherIcon } from '@/lib/utils';
import { WeatherIcon } from './WeatherIcon';
import { Card, CardContent } from '@/components/ui/card';

interface CurrentWeatherCardProps {
  data: WeatherResponse;
}

export function CurrentWeatherCard({ data }: CurrentWeatherCardProps) {
  const { current, location } = data;
  const settings = useWeatherStore((state) => state.settings);
  const iconName = getWeatherIcon(current.condition.code, current.is_day);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass border-0 overflow-hidden relative">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {formatTemperature(
                  settings.temperatureUnit === 'fahrenheit' ? current.temp_f : current.temp_c,
                  settings.temperatureUnit
                )}
              </motion.h1>
              <p className="text-lg text-muted-foreground mt-1">
                Feels like {formatTemperature(
                  settings.temperatureUnit === 'fahrenheit' ? current.feelslike_f : current.feelslike_c,
                  settings.temperatureUnit
                )}
              </p>
              <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
                <WeatherIcon name={iconName} className="w-5 h-5" />
                <span className="text-lg font-medium">{current.condition.text}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {location.name}, {location.country}
              </p>
            </div>

            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <WeatherIcon 
                name={iconName} 
                className="w-24 h-24 md:w-32 md:h-32 text-primary opacity-90" 
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/50">
            <WeatherDetail label="Humidity" value={`${current.humidity}%`} />
            <WeatherDetail label="Wind" value={`${settings.windUnit === 'mph' ? Math.round(current.wind_mph) : Math.round(current.wind_kph)} ${settings.windUnit}`} />
            <WeatherDetail label="Visibility" value={`${current.visibility_km} km`} />
            <WeatherDetail label="Pressure" value={`${current.pressure_mb} mb`} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function WeatherDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center md:text-left">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}
