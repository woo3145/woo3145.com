'use client';
import * as React from 'react';
import {
  IconCode,
  IconDatabase,
  IconDeviceDesktopAnalytics,
  IconServer,
} from '@tabler/icons-react';

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { cn } from '@/lib/utils';
import { SkillText } from './skill-text';
import { DynamicBrowserCard } from './dynamic-browser-card';
import { NextJsCard } from './nextjs-card';
import { BaaSCard } from './baas-card';
import { ResponsiveDesignCard } from './responsive-design-card';
import { BackEndCard } from './backend-card';
import { useTranslatedItems } from '../../_hooks/useTranslatedItems';

interface SkillSectionProps {
  className?: string;
}

export const SkillSection = ({ className }: SkillSectionProps) => {
  const { items } = useTranslatedItems();
  return (
    <section className={className}>
      <SkillText />
      <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn('[&>p:text-lg]', item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  );
};
