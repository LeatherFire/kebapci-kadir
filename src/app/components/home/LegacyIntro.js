"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import { FiClock, FiHeart, FiUsers, FiTrendingUp } from 'react-icons/fi';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background: linear-gradient(135deg, 
    ${theme.colors.background.main} 0%, 
    ${theme.colors.secondary.offwhite} 50%,
    ${theme.colors.background.main} 100%
  );
  position: relative;
  overflow: hidden;
  
  ${theme.media.md} {
    padding: 6rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 8rem 4rem;
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  color: ${theme.colors.primary.red};
  opacity: 0.03;
  font-size: ${props => props.size || '8rem'};
  font-family: ${theme.typography.fontFamily.accent};
  
  &:nth-child(1) {
    top: 10%;
    left: 10%;
    font-size: 10rem;
  }
  
  &:nth-child(2) {
    top: 20%;
    right: 15%;
    font-size: 6rem;
  }
  
  &:nth-child(3) {
    bottom: 15%;
    left: 20%;
    font-size: 8rem;
  }
  
  &:nth-child(4) {
    bottom: 25%;
    right: 10%;
    font-size: 5rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const YearHighlight = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const YearNumber = styled.div`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize['5xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(45deg, 
    ${theme.colors.primary.red}, 
    ${theme.colors.primary.orange}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  
  ${theme.media.md} {
    font-size: 8rem;
  }
`;

const YearFromTo = styled.div`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.muted};
  margin-top: 0.5rem;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

const MainContent = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const MainTitle = styled(motion.h2)`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.text.dark};
  margin-bottom: 1.5rem;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize['4xl']};
  }
`;

const MainDescription = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatCard = styled(motion.div)`
  background-color: ${theme.colors.background.main};
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${theme.colors.primary.orange};
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.primary.red};
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.dark};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const stats = [
  {
    icon: <FiClock />,
    number: "174",
    label: "Yıl"
  },
  {
    icon: <FiUsers />,
    number: "4",
    label: "Kuşak"
  },
  {
    icon: <FiHeart />,
    number: "1",
    label: "Tutku"
  },
  {
    icon: <FiTrendingUp />,
    number: "∞",
    label: "Lezzet"
  }
];

const LegacyIntro = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
  
  return (
    <SectionContainer ref={ref}>
      <BackgroundElements>
        <FloatingElement
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          1851
        </FloatingElement>
        <FloatingElement
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🍖
        </FloatingElement>
        <FloatingElement
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🔥
        </FloatingElement>
        <FloatingElement
          animate={{
            y: [0, 12, 0],
            rotate: [0, -4, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          2025
        </FloatingElement>
      </BackgroundElements>
      
      <ContentContainer>
        <YearHighlight
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <YearNumber>174</YearNumber>
          <YearFromTo>YIL (1851 - 2025)</YearFromTo>
        </YearHighlight>
        
        <MainContent>
          <MainTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Yaklaşık İki Asırlık Lezzet Serüveni
          </MainTitle>
          
          <MainDescription
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Hafız Dedenin 1851de başlattığı bu mübarek yolculuk, bugün 174 yılını geride bırakarak 
            Ispartanın en köklü kebap geleneğini temsil ediyor. Dört kuşaktır aktarılan gizli tarifler, 
            zahmetli ustalık ve hiç değişmeyen lezzet sevgisiyle... Yaklaşık iki asırdır aynı ateşle 
            yanıyoruz, aynı tutku ile pişiriyoruz.
          </MainDescription>
        </MainContent>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <StatIcon>{stat.icon}</StatIcon>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </motion.div>
      </ContentContainer>
    </SectionContainer>
  );
};

export default LegacyIntro;