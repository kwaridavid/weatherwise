'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { themeService } from '@/services/themeService';

interface WeatherBackgroundProps {
  conditionCode: number;
  isDay: number;
}

export function WeatherBackground({ conditionCode, isDay }: WeatherBackgroundProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const theme = themeService.getThemeByTimeAndWeather(isDay, conditionCode);

  useEffect(() => {
    if (theme.particleType === 'none') {
      setParticles([]);
      return;
    }

    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [theme.particleType]);

  return (
    <div className={`fixed inset-0 -z-10 transition-all duration-1000 ${theme.gradient}`}>
      <div className={`absolute inset-0 bg-gradient-to-b ${themeService.getTimeOfDayGradient()}`} />

      {theme.particleType === 'rain' && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-0.5 h-4 bg-blue-400/30 rounded-full"
          style={{ left: `${p.x}%` }}
          animate={{ y: ['-10vh', '110vh'] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}

      {theme.particleType === 'snow' && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          style={{ left: `${p.x}%` }}
          animate={{ 
            y: ['-10vh', '110vh'],
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}

      {theme.particleType === 'star' && particles.slice(0, 30).map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ 
            left: `${p.x}%`, 
            top: `${Math.random() * 60}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {theme.particleType === 'cloud' && (
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      )}
    </div>
  );
}
