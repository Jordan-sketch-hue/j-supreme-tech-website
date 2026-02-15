'use client';

import React from 'react';
import * as Icons from 'lucide-react';
import { iconMap } from '@/lib/iconMap';

interface IconRendererProps {
  iconName: string;
  size?: number;
  className?: string;
}

export function IconRenderer({ iconName, size = 24, className = '' }: IconRendererProps) {
  const lucideIconName = iconMap[iconName] || 'Zap';
  const IconComponent =
    (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[lucideIconName] ||
    Icons.Zap;

  return <IconComponent size={size} className={className} />;
}
