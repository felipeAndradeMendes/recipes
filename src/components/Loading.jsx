import React from 'react';
import { motion } from 'framer-motion';

const loadingContainer = {
  width: '4rem',
  height: '4rem',
  display: 'flex',
  justifyContent: 'space-around',
};
const loadingCircle = {
  display: 'block',
  width: '1rem',
  height: '1rem',
  backgroundColor: '#0a9b61',
  borderRadius: '0.5rem',
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '60%',
  },
};
const loadingCircleTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: 'easeInOut',
};

function Loader() {
  return (
    <div>
      <div className="fixed  w-[360px] h-[640px] min-h-screen z-50" />
      <div
        className="flex fixed w-[360px] h-[640px]
       justify-center items-center"
      >
        <motion.div
          style={ loadingContainer }
          variants={ loadingContainerVariants }
          initial="start"
          animate="end"
        >
          <motion.span
            style={ loadingCircle }
            variants={ loadingCircleVariants }
            transition={ loadingCircleTransition }
          />
          <motion.span
            style={ loadingCircle }
            variants={ loadingCircleVariants }
            transition={ loadingCircleTransition }
          />
          <motion.span
            style={ loadingCircle }
            variants={ loadingCircleVariants }
            transition={ loadingCircleTransition }
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Loader;
