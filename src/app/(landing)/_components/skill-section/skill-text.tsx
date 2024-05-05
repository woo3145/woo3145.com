'use client';
import * as React from 'react';
import { motion, useInView } from 'framer-motion';

import { slideInFromLeft, slideInFromRight } from '@/lib/motion';
import { useTranslation } from '../../translation-provider';

export const SkillText = () => {
  const { translate } = useTranslation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="w-full h-auto flex flex-col items-center justify-center"
    >
      <motion.div
        variants={slideInFromRight(0.5)}
        className="flex items-center gap-2"
      >
        {(translate('skillTags') as string[]).map((tag) => (
          <div
            key={tag}
            className="py-2 px-2 border border-[#7042f88b] opacity-[0.9] rounded-md"
          >
            <h1 className="text-xs">{tag}</h1>
          </div>
        ))}
      </motion.div>
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-foreground font-medium mt-[10px] text-center mb-[15px]"
      >
        {translate('skillTitle')}
      </motion.div>
      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-[20px] text-foreground/40 mb-10 mt-[10px] text-center"
      >
        {translate('skillDescription')}
      </motion.div>
    </motion.div>
  );
};
