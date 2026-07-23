'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useWeatherStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { X, GripVertical, Heart } from 'lucide-react';

export function FavoritesList() {
  const favorites = useWeatherStore((state) => state.favorites);
  const removeFavorite = useWeatherStore((state) => state.removeFavorite);
  const setCurrentCity = useWeatherStore((state) => state.setCurrentCity);

  if (favorites.length === 0) {
    return (
      <Card className="glass border-0">
        <CardContent className="p-8 text-center">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Favorites Yet</h3>
          <p className="text-sm text-muted-foreground">
            Search for a city and add it to your favorites for quick access.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      <h2 className="text-xl font-semibold mb-4">Favorite Cities</h2>
      <AnimatePresence mode="popLayout">
        {favorites.map((city, index) => (
          <motion.div
            key={city.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className="glass border-0 cursor-pointer hover:bg-accent/50 transition-colors group"
              onClick={() => setCurrentCity(`${city.lat},${city.lon}`)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-50" />
                  <div>
                    <h3 className="font-medium">{city.name}</h3>
                    <p className="text-sm text-muted-foreground">{city.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {city.currentTemp !== undefined && (
                    <div className="flex items-center gap-2">
                      <WeatherIcon 
                        name={city.icon || 'cloud'} 
                        className="w-5 h-5" 
                      />
                      <span className="text-lg font-semibold">
                        {Math.round(city.currentTemp)}°
                      </span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(city.id);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
