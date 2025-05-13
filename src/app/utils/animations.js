export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  export const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };
  
  export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Ateş efekti animasyonu (kor/köz efekti için)
  export const fireGlow = {
    animate: {
      boxShadow: [
        '0 0 10px 0 rgba(200, 44, 27, 0.5)',
        '0 0 15px 2px rgba(216, 91, 10, 0.6)',
        '0 0 10px 0 rgba(200, 44, 27, 0.5)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };