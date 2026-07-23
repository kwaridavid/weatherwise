'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { weatherService } from '@/services/weatherService';
import { useWeatherStore } from '@/lib/store';

export function useWeather(city?: string) {
  const currentCity = useWeatherStore((state) => state.currentCity);
  const targetCity = city || currentCity;

  return useQuery({
    queryKey: ['weather', targetCity],
    queryFn: () => weatherService.getCurrentWeather(targetCity),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => weatherService.searchLocations(query),
    enabled: query.length >= 2,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

export function usePrefetchWeather() {
  const queryClient = useQueryClient();

  return (city: string) => {
    queryClient.prefetchQuery({
      queryKey: ['weather', city],
      queryFn: () => weatherService.getCurrentWeather(city),
      staleTime: 5 * 60 * 1000,
    });
  };
}
