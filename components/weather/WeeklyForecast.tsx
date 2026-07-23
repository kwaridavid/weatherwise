'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ForecastDay } from '@/types/weather';
import { useWeatherStore } from '@/lib/store';
import { formatTemperature, formatDate, getWeatherIcon } from '@/lib/utils';
import { WeatherIcon } from './WeatherIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface WeeklyForecastProps {
  days: ForecastDay[];
}

export function WeeklyForecast({ days }: WeeklyForecastProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const settings = useWeatherStore((state) => state.settings);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">7-Day Forecast</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" /> Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> More
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {days.slice(0, isExpanded ? 7 : 3).map((day, index) => {
              const iconName = getWeatherIcon(day.day.condition.code, 1);
              const maxTemp = settings.temperatureUnit === 'fahrenheit' ? day.day.maxtemp_f : day.day.maxtemp_c;
              const minTemp = settings.temperatureUnit === 'fahrenheit' ? day.day.mintemp_f : day.day.mintemp_c;

              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <span className="w-24 font-medium">{formatDate(day.date)}</span>
                  <div className="flex items-center gap-2 flex-1 justify-center">
                    <WeatherIcon name={iconName} className="w-5 h-5" />
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                      {day.day.condition.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 w-32 justify-end">
                    <span className="font-semibold">{Math.round(maxTemp)}°</span>
                    <span className="text-muted-foreground">{Math.round(minTemp)}°</span>
                    {day.day.daily_chance_of_rain > 20 && (
                      <span className="text-xs text-sky-500">{day.day.daily_chance_of_rain}%</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
