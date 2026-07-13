'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export default function SectionWrapper({ id, className, children, dark }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'px-4 py-20 md:py-28',
        dark ? 'bg-alpine text-white' : 'bg-cream',
        className
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </motion.section>
  );
}
