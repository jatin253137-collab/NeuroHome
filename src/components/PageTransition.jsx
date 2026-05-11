import { motion } from 'framer-motion';

export function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-28 pt-24 sm:px-6 md:pb-12 lg:px-8"
    >
      {children}
    </motion.main>
  );
}
