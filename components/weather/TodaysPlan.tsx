'use client';

import { motion } from 'framer-motion';
import { WeatherResponse, WeatherRecommendation } from '@/types/weather';
import { recommendationService } from '@/services/recommendationService';
import { WeatherIcon } from './WeatherIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface TodaysPlanProps {
  data: WeatherResponse;
}

export function TodaysPlan({ data }: TodaysPlanProps) {
  const recommendations = recommendationService.generateRecommendations(data);

  if (recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg">Today's Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.slice(0, 4).map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
            >
              <div className={`mt-0.5 ${getPriorityColor(rec.priority)}`}>
                <WeatherIcon name={rec.icon} className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{rec.title}</span>
                  <PriorityBadge priority={rec.priority} />
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{rec.description}</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high': return 'text-destructive';
    case 'medium': return 'text-orange-500';
    default: return 'text-muted-foreground';
  }
}

function PriorityBadge({ priority }: { priority: string }) {
  const icons = {
    high: <AlertTriangle className="w-3 h-3" />,
    medium: <Info className="w-3 h-3" />,
    low: <CheckCircle2 className="w-3 h-3" />,
  };

  return (
    <Badge variant="secondary" className="text-xs gap-1">
      {icons[priority as keyof typeof icons]}
      {priority}
    </Badge>
  );
}
