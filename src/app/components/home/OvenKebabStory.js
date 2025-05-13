"use client"

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import { FiClock, FiThermometer, FiDroplet } from 'react-icons/fi';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background: linear-gradient(180deg, 
    ${theme.colors.background.main} 0%, 
    ${theme.colors.secondary.offwhite} 100%
  );
  position: relative;
  overflow: hidden;
  
  ${theme.media.md} {
    padding: 8rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 10rem 4rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.text.dark};
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${theme.colors.primary.red};
  }
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize['4xl']};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.muted};
  max-width: 800px;
  margin: 2rem auto 0;
  line-height: 1.8;
`;

const StoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const StepsContainer = styled.div`
  position: relative;
  padding: 2rem 0;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50px;
    right: 50px;
    height: 2px;
    background-color: ${theme.colors.secondary.beige};
    z-index: 0;
  }
`;

const StepButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? theme.colors.primary.red : theme.colors.secondary.beige};
  color: ${props => props.active ? theme.colors.text.light : theme.colors.text.dark};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  cursor: pointer;
  z-index: 1;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const StepContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  min-height: 300px;
  
  ${theme.media.lg} {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const StepImage = styled(motion.div)`
  position: relative;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${theme.colors.secondary.beige};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  
  ${theme.media.md} {
    height: 400px;
  }
`;

const StepInfo = styled.div`
  padding: 1rem;
`;

const StepTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.text.dark};
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const StepDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

const DetailCard = styled.div`
  background-color: ${theme.colors.background.alt};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const DetailIcon = styled.div`
  color: ${theme.colors.primary.red};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const DetailTitle = styled.h4`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.dark};
  margin-bottom: 0.5rem;
`;

const DetailValue = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
`;

const FireAnimation = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${theme.colors.primary.orange};
  font-size: 6rem;
  z-index: 2;
`;

// Fırın kebabı yapım aşamaları
const kebabSteps = [
  {
    id: 1,
    title: "Seçilmiş Etlerimiz",
    description: "Doğal ortamlarda yetişen hayvanlardan, hijyenik koşullarda ayrıştırılan en kaliteli etler. Böbrek yağları ve kan damarları özenle temizlenir.",
    icon: "🥩",
    details: [
      { title: "Et Kalitesi", value: "100% Doğal", icon: <FiDroplet /> },
      { title: "Kolesterol", value: "Yok denecek", icon: <FiThermometer /> }
    ]
  },
  {
    id: 2,
    title: "Fırın Hazırlığı",
    description: "Fırın önceden yakılır ve ısıtılır. Çiğ etler şişe takılarak duvara dik olarak sıralanır, pişirmeye hazır hale getirilir.",
    icon: "🔥",
    details: [
      { title: "Hazırlık", value: "Özel Sıralama", icon: <FiThermometer /> },
      { title: "Yakıt", value: "Çalı Kökü Odunu", icon: <FiClock /> }
    ]
  },
  {
    id: 3,
    title: "Pişirme Süreci",
    description: "3-3.5 saat aralığında çalı kökü odunuyla pişirilir. 2 saat alev, 1 saat korda (köz) üzerinde özel teknikle hazırlanır.",
    icon: "⏰",
    details: [
      { title: "Süre", value: "3-3.5 Saat", icon: <FiClock /> },
      { title: "Alev", value: "2 Saat", icon: <FiThermometer /> },
      { title: "Köz", value: "1 Saat", icon: <FiDroplet /> }
    ]
  },
  {
    id: 4,
    title: "Buharlaştırma",
    description: "Bakır sahanlardaki su ile buharlaştırılarak hem buhar, hem alev arasında %50 fire vererek mükemmel lezzeti yakalar.",
    icon: "💨",
    details: [
      { title: "Fire Oranı", value: "%50", icon: <FiDroplet /> },
      { title: "Araç", value: "Bakır Sahan", icon: <FiThermometer /> }
    ]
  },
  {
    id: 5,
    title: "Servis",
    description: "Fırından çıkan nar gibi kuzu eti, kendine özgü bakır tabaklarda lavaş ekmeği üzerine servis edilir.",
    icon: "🍽️",
    details: [
      { title: "Servis", value: "Lavaş Ekmek", icon: <FiDroplet /> },
      { title: "Tabak", value: "Bakır Özel", icon: <FiThermometer /> }
    ]
  }
];

const OvenKebabStory = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (autoPlay && inView) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % kebabSteps.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [autoPlay, inView]);
  
  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
    setAutoPlay(false);
  };
  
  return (
    <SectionContainer ref={ref}>
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Fırın Kebabının Sırrı
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Yüzyıllar süren tecrübe ile mükemmelleşen, her aşaması özenle yapılan 
          Isparta fırın kebabının benzersiz hazırlanış hikayesi.
        </SectionSubtitle>
      </SectionHeader>
      
      <StoryContainer>
        <StepsContainer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <StepIndicator>
              {kebabSteps.map((step, index) => (
                <StepButton
                  key={step.id}
                  active={currentStep === index}
                  onClick={() => handleStepChange(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index + 1}
                </StepButton>
              ))}
            </StepIndicator>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <StepContent
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <StepImage>
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {kebabSteps[currentStep].icon}
                </motion.div>
                {currentStep === 1 && (
                  <FireAnimation
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🔥
                  </FireAnimation>
                )}
              </StepImage>
              
              <StepInfo>
                <StepTitle>{kebabSteps[currentStep].title}</StepTitle>
                <StepDescription>{kebabSteps[currentStep].description}</StepDescription>
                <StepDetails>
                  {kebabSteps[currentStep].details.map((detail, index) => (
                    <DetailCard key={index}>
                      <DetailIcon>{detail.icon}</DetailIcon>
                      <DetailTitle>{detail.title}</DetailTitle>
                      <DetailValue>{detail.value}</DetailValue>
                    </DetailCard>
                  ))}
                </StepDetails>
              </StepInfo>
            </StepContent>
          </AnimatePresence>
        </StepsContainer>
      </StoryContainer>
    </SectionContainer>
  );
};

export default OvenKebabStory;