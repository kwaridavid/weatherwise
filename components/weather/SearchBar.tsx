'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/useWeather';
import { useWeatherStore } from '@/lib/store';
import { SearchResult } from '@/types/weather';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, MapPin, Clock, Loader2 } from 'lucide-react';
import { debounce } from '@/lib/utils';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const setCurrentCity = useWeatherStore((state) => state.setCurrentCity);
  const recentSearches = useWeatherStore((state) => state.recentSearches);
  const clearRecentSearches = useWeatherStore((state) => state.clearRecentSearches);

  const { data: results, isLoading } = useSearch(query);

  const debouncedSearch = useRef(
    debounce((value: string) => setQuery(value), 300)
  ).current;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: SearchResult | string) => {
    const cityName = typeof city === 'string' ? city : `${city.lat},${city.lon}`;
    setCurrentCity(cityName);
    setIsOpen(false);
    setQuery('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search city, country..."
          className="pl-10 pr-10 h-11 bg-background/80 backdrop-blur-sm"
          onFocus={() => setIsOpen(true)}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => {
              setQuery('');
              if (inputRef.current) inputRef.current.value = '';
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-lg shadow-lg overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              </div>
            ) : results && results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    className="w-full px-4 py-2.5 text-left hover:bg-accent flex items-center gap-3 transition-colors"
                    onClick={() => handleSelect(result)}
                  >
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">{result.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {result.region}, {result.country}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No results found
              </div>
            ) : recentSearches.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                  <span>Recent</span>
                  <button onClick={clearRecentSearches} className="text-primary hover:underline">
                    Clear
                  </button>
                </div>
                {recentSearches.map((search) => (
                  <button
                    key={search}
                    className="w-full px-4 py-2.5 text-left hover:bg-accent flex items-center gap-3 transition-colors"
                    onClick={() => handleSelect(search)}
                  >
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
