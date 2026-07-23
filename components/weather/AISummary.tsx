'use client';

import { motion } from 'framer-motion';
import { WeatherResponse } from '@/types/weather';
import { summaryService } from '@/services/summaryService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface AISummaryProps {
  data: WeatherResponse;
}

export function AISummary({ data }: AISummaryProps) {
  const summary = summaryService.generateSummary(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <Card className="glass border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Weather Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground/90">{summary}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
