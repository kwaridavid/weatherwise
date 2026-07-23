'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUVCategory } from '@/lib/utils';
import { Sun } from 'lucide-react';

interface UVIndexProps {
  uv: number;
}

export function UVIndex({ uv }: UVIndexProps) {
  const category = getUVCategory(uv);
  const percentage = Math.min((uv / 11) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sun className="w-5 h-5" /> UV Index
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-bold" style={{ color: category.color }}>
              {Math.round(uv)}
            </span>
            <span className="text-lg font-medium text-muted-foreground mb-1">
              {category.label}
            </span>
          </div>

          <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-3">
            <motion.div
              className="absolute h-full rounded-full"
              style={{ backgroundColor: category.color }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <p className="text-sm text-muted-foreground">{category.recommendation}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
