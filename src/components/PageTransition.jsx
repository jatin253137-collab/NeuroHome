import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const navOrder = ['/', '/rooms', '/analytics', '/security', '/settings'];
let prevIndex = -1;

export function PageTransition({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentIndex = navOrder.indexOf(location.pathname);
  const slideDirection = prevIndex !== -1 && currentIndex < prevIndex ? -1 : 1;

  useEffect(() => {
    prevIndex = currentIndex;
  }, [currentIndex]);

  const handleDragEnd = (event, { offset, velocity }) => {
    const swipeThreshold = 75;
    const swipeVelocity = 350;
    const isHorizontal = Math.abs(offset.x) > Math.abs(offset.y) * 1.5;

    if (isHorizontal) {
      if (offset.x < -swipeThreshold || velocity.x < -swipeVelocity) {
        if (currentIndex < navOrder.length - 1) {
          navigate(navOrder[currentIndex + 1]);
        }
      } else if (offset.x > swipeThreshold || velocity.x > swipeVelocity) {
        if (currentIndex > 0) {
          navigate(navOrder[currentIndex - 1]);
        }
      }
    }
  };

  const desktopVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
  };

  const mobileVariants = {
    initial: { opacity: 0, x: slideDirection * 15, filter: 'blur(2px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: slideDirection * -15, filter: 'blur(2px)' },
  };

  const transition = isMobile
    ? {
        duration: 0.62,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.62, ease: 'linear' },
        filter: { duration: 0.62, ease: 'linear' },
      }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.main
      variants={isMobile ? mobileVariants : desktopVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      drag={isMobile && !isAnimating ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.08}
      onDragEnd={handleDragEnd}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
      className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-28 pt-6 sm:px-6 md:pb-12 md:pt-24 lg:px-8"
    >
      {children}
    </motion.main>
  );
}
