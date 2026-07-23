'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { MapLayer } from '@/types/weather';
import { MAP_LAYERS } from '@/constants/weather';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Cloud, Droplets, Wind, Thermometer, Gauge } from 'lucide-react';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon path for Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface WeatherMapProps {
  lat: number;
  lon: number;
  cityName: string;
}

export function WeatherMap({ lat, lon, cityName }: WeatherMapProps) {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('temp');
  const [isClient, setIsClient] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    setMapKey((prev) => prev + 1);
  }, [lat, lon]);

  const layerIcons = {
    temp: <Thermometer className="w-4 h-4" />,
    precipitation: <Droplets className="w-4 h-4" />,
    clouds: <Cloud className="w-4 h-4" />,
    wind: <Wind className="w-4 h-4" />,
    pressure: <Gauge className="w-4 h-4" />,
  };

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!isClient) {
    return (
      <Card className="glass border-0 h-[500px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading map...</div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass border-0 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Weather Map
          </CardTitle>
          <div className="flex gap-1 flex-wrap">
            {(Object.keys(MAP_LAYERS) as MapLayer[]).map((layer) => (
              <Button
                key={layer}
                variant={activeLayer === layer ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveLayer(layer)}
                className="gap-1 text-xs"
              >
                {layerIcons[layer]}
                {MAP_LAYERS[layer].label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <div ref={containerRef} className="h-[400px] relative" key={mapKey}>
          <MapContainer
            key={`map-${mapKey}`}
            center={[lat, lon]}
            zoom={10}
            scrollWheelZoom={true}
            className="h-full w-full"
            style={{ background: 'hsl(var(--background))' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {apiKey && (
              <TileLayer
                key={`layer-${activeLayer}-${mapKey}`}
                url={`https://tile.openweathermap.org/map/${activeLayer}_new/{z}/{x}/{y}.png?appid=${apiKey}`}
                attribution='&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
                opacity={0.6}
              />
            )}
            <Marker position={[lat, lon]}>
              <Popup>{cityName}</Popup>
            </Marker>
          </MapContainer>

          <Badge className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm">
            {MAP_LAYERS[activeLayer].label} Layer
            {!apiKey && ' (No API Key)'}
          </Badge>
        </div>
      </Card>
    </motion.div>
  );
}
