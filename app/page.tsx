'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '@/hooks/useWeather';
import { useWeatherStore } from '@/lib/store';
import { useLocation } from '@/hooks/useLocation';
import { WeatherBackground } from '@/components/animations/WeatherBackground';
import { SearchBar } from '@/components/weather/SearchBar';
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import { WeeklyForecast } from '@/components/weather/WeeklyForecast';
import { UVIndex } from '@/components/weather/UVIndex';
import { TodaysPlan } from '@/components/weather/TodaysPlan';
import { AISummary } from '@/components/weather/AISummary';
import { SunriseSunset } from '@/components/weather/SunriseSunset';
import { WeatherMap } from '@/components/map/WeatherMap';
import { FavoritesList } from '@/components/weather/FavoritesList';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  MapPin, Settings, Heart, Home, Cloud, 
  Loader2, AlertCircle, Plus, Check
} from 'lucide-react';

type Tab = 'home' | 'map' | 'favorites' | 'settings';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { data, isLoading, error } = useWeather();
  const { detectLocation, isLoading: isLocating } = useLocation();
  const addFavorite = useWeatherStore((state) => state.addFavorite);
  const favorites = useWeatherStore((state) => state.favorites);
  const settings = useWeatherStore((state) => state.settings);

  const isFavorite = favorites.some(f => 
    data?.location.name.toLowerCase() === f.name.toLowerCase()
  );

  const handleAddFavorite = () => {
    if (!data) return;
    addFavorite({
      id: `${data.location.lat}-${data.location.lon}`,
      name: data.location.name,
      country: data.location.country,
      lat: data.location.lat,
      lon: data.location.lon,
      currentTemp: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4 animate-pulse">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[150px] w-full rounded-xl" />
        </div>
      );
    }

    if (error) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <AlertCircle className="w-16 h-16 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Unable to load weather</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            {error instanceof Error ? error.message : 'Please check your connection and try again.'}
          </p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </motion.div>
      );
    }

    if (!data) return null;

    const today = data.forecast.forecastday[0];

    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6 pb-20">
            <CurrentWeatherCard data={data} />
            <TodaysPlan data={data} />
            <AISummary data={data} />
            <HourlyForecast hours={today.hour} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UVIndex uv={data.current.uv} />
              <SunriseSunset sunrise={today.astro.sunrise} sunset={today.astro.sunset} />
            </div>
            <WeeklyForecast days={data.forecast.forecastday} />
          </div>
        );

      case 'map':
        return (
          <WeatherMap 
            lat={data.location.lat} 
            lon={data.location.lon} 
            cityName={data.location.name}
          />
        );

      case 'favorites':
        return <FavoritesList />;

      case 'settings':
        return <SettingsPanel />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      {data && (
        <WeatherBackground 
          conditionCode={data.current.condition.code} 
          isDay={data.current.is_day} 
        />
      )}

      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Cloud className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold hidden sm:block">WeatherWise</h1>
          </div>

          <SearchBar />

          <div className="flex items-center gap-2">
            {isLocating ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : (
              <Button variant="ghost" size="icon" onClick={detectLocation} title="Use my location">
                <MapPin className="w-5 h-5" />
              </Button>
            )}

            {data && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleAddFavorite}
                title={isFavorite ? 'Added to favorites' : 'Add to favorites'}
              >
                {isFavorite ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-border/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-around h-16">
            <NavButton 
              active={activeTab === 'home'} 
              onClick={() => setActiveTab('home')}
              icon={<Home className="w-5 h-5" />}
              label="Home"
            />
            <NavButton 
              active={activeTab === 'map'} 
              onClick={() => setActiveTab('map')}
              icon={<MapPin className="w-5 h-5" />}
              label="Map"
            />
            <NavButton 
              active={activeTab === 'favorites'} 
              onClick={() => setActiveTab('favorites')}
              icon={<Heart className="w-5 h-5" />}
              label="Favorites"
            />
            <NavButton 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')}
              icon={<Settings className="w-5 h-5" />}
              label="Settings"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavButton({ 
  active, 
  onClick, 
  icon, 
  label 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors relative ${
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-0 w-8 h-0.5 bg-primary rounded-full"
        />
      )}
    </button>
  );
}

function SettingsPanel() {
  const settings = useWeatherStore((state) => state.settings);
  const updateSettings = useWeatherStore((state) => state.updateSettings);

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold">Settings</h2>

      <div className="space-y-4">
        <SettingItem
          title="Temperature Unit"
          description="Choose your preferred temperature scale"
        >
          <div className="flex gap-2">
            <Button
              variant={settings.temperatureUnit === 'celsius' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSettings({ temperatureUnit: 'celsius' })}
            >
              Celsius
            </Button>
            <Button
              variant={settings.temperatureUnit === 'fahrenheit' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSettings({ temperatureUnit: 'fahrenheit' })}
            >
              Fahrenheit
            </Button>
          </div>
        </SettingItem>

        <SettingItem
          title="Wind Speed Unit"
          description="Choose your preferred wind speed unit"
        >
          <div className="flex gap-2">
            <Button
              variant={settings.windUnit === 'kph' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSettings({ windUnit: 'kph' })}
            >
              km/h
            </Button>
            <Button
              variant={settings.windUnit === 'mph' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSettings({ windUnit: 'mph' })}
            >
              mph
            </Button>
          </div>
        </SettingItem>

        <SettingItem
          title="Theme"
          description="Choose your preferred appearance"
        >
          <div className="flex gap-2">
            {(['light', 'dark', 'system'] as const).map((theme) => (
              <Button
                key={theme}
                variant={settings.theme === theme ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSettings({ theme })}
                className="capitalize"
              >
                {theme}
              </Button>
            ))}
          </div>
        </SettingItem>

        <SettingItem
          title="Auto Location"
          description="Automatically detect your location on startup"
        >
          <Button
            variant={settings.autoLocation ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateSettings({ autoLocation: !settings.autoLocation })}
          >
            {settings.autoLocation ? 'Enabled' : 'Disabled'}
          </Button>
        </SettingItem>
      </div>
    </div>
  );
}

function SettingItem({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-card border">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
