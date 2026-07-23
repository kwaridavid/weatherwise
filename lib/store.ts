import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoriteCity, AppSettings, TemperatureUnit, WindUnit } from '@/types/weather';
import { DEFAULT_SETTINGS } from '@/constants/weather';

interface WeatherState {
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Current location
  currentCity: string;
  setCurrentCity: (city: string) => void;

  // Favorites
  favorites: FavoriteCity[];
  addFavorite: (city: FavoriteCity) => void;
  removeFavorite: (id: string) => void;
  reorderFavorites: (favorites: FavoriteCity[]) => void;
  updateFavoriteWeather: (id: string, temp: number, condition: string, icon: string) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // UI
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Recent searches
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      currentCity: 'New York',
      setCurrentCity: (city) => {
        set({ currentCity: city });
        get().addRecentSearch(city);
      },

      favorites: [],
      addFavorite: (city) => {
        const exists = get().favorites.find(f => f.name === city.name);
        if (!exists) {
          set({ favorites: [...get().favorites, city] });
        }
      },
      removeFavorite: (id) => {
        set({ favorites: get().favorites.filter(f => f.id !== id) });
      },
      reorderFavorites: (favorites) => set({ favorites }),
      updateFavoriteWeather: (id, temp, condition, icon) => {
        set({
          favorites: get().favorites.map(f =>
            f.id === id ? { ...f, currentTemp: temp, condition, icon, lastUpdated: new Date().toISOString() } : f
          ),
        });
      },

      settings: DEFAULT_SETTINGS,
      updateSettings: (newSettings) => {
        set({ settings: { ...get().settings, ...newSettings } });
      },

      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),

      activeTab: 'home',
      setActiveTab: (tab) => set({ activeTab: tab }),

      recentSearches: [],
      addRecentSearch: (query) => {
        const searches = [query, ...get().recentSearches.filter(s => s !== query)].slice(0, 10);
        set({ recentSearches: searches });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'weatherwise-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        settings: state.settings,
        recentSearches: state.recentSearches,
        currentCity: state.currentCity,
      }),
    }
  )
);
