'use client';

import { motion } from 'framer-motion';
import { Sunrise, Sunset } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SunriseSunsetProps {
  sunrise: string;
  sunset: string;
}

export function SunriseSunset({ sunrise, sunset }: SunriseSunsetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <Card className="glass border-0">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-500/10">
                <Sunrise className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sunrise</p>
                <p className="text-lg font-semibold">{sunrise}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-indigo-500/10">
                <Sunset className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sunset</p>
                <p className="text-lg font-semibold">{sunset}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
