'use client';

import { useState, useEffect, useCallback } from 'react';
import { locationService } from '@/services/locationService';
import { useWeatherStore } from '@/lib/store';

export function useLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setCurrentCity = useWeatherStore((state) => state.setCurrentCity);
  const autoLocation = useWeatherStore((state) => state.settings.autoLocation);

  const detectLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await locationService.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const city = await locationService.getCityFromCoords(latitude, longitude);
      setCurrentCity(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to detect location');
    } finally {
      setIsLoading(false);
    }
  }, [setCurrentCity]);

  useEffect(() => {
    if (autoLocation && typeof window !== 'undefined') {
      detectLocation();
    }
  }, [autoLocation, detectLocation]);

  return { detectLocation, isLoading, error };
}
