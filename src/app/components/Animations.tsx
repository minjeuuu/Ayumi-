import { motion } from 'motion/react';
import { Footprints } from 'lucide-react';

export function WalkingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className="fixed bottom-24 left-4 md:bottom-4 text-indigo-300 opacity-20"
    >
      <Footprints className="w-8 h-8" />
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, direction = 'left', delay = 0 }: { 
  children: React.ReactNode; 
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}) {
  const variants = {
    left: { x: -50 },
    right: { x: 50 },
    up: { y: -50 },
    down: { y: 50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...variants[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8 }}
          animate={{ scale: i === current ? 1.2 : 1 }}
          className={`w-2 h-2 rounded-full transition-colors ${
            i === current ? 'bg-indigo-600' : i < current ? 'bg-indigo-400' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export function PulseAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
