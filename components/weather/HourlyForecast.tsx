'use client';

import { motion } from 'framer-motion';
import { HourForecast } from '@/types/weather';
import { useWeatherStore } from '@/lib/store';
import { formatTemperature, formatTime, getWeatherIcon } from '@/lib/utils';
import { WeatherIcon } from './WeatherIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HourlyForecastProps {
  hours: HourForecast[];
}

export function HourlyForecast({ hours }: HourlyForecastProps) {
  const settings = useWeatherStore((state) => state.settings);
  const now = new Date();
  const currentHour = now.getHours();

  const upcomingHours = hours.filter(h => {
    const hourTime = new Date(h.time);
    return hourTime.getHours() >= currentHour;
  }).slice(0, 24);

  if (upcomingHours.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg">Hourly Forecast</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hourly-scroll flex overflow-x-auto gap-4 px-6 pb-6 snap-x">
            {upcomingHours.map((hour, index) => {
              const iconName = getWeatherIcon(hour.condition.code, hour.is_day);
              const temp = settings.temperatureUnit === 'fahrenheit' ? hour.temp_f : hour.temp_c;

              return (
                <motion.div
                  key={hour.time}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[80px] snap-start"
                >
                  <span className="text-sm text-muted-foreground">{formatTime(hour.time)}</span>
                  <WeatherIcon name={iconName} className="w-8 h-8" />
                  <span className="text-lg font-semibold">{Math.round(temp)}°</span>
                  {hour.chance_of_rain > 0 && (
                    <span className="text-xs text-sky-500">{hour.chance_of_rain}%</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
