"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import { FiPlay, FiPause, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background: linear-gradient(135deg, 
    ${theme.colors.secondary.offwhite} 0%, 
    ${theme.colors.background.alt} 50%,
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
  margin-bottom: 4rem;
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

const StoryViewer = styled.div`
  background-color: ${theme.colors.background.main};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const StoryContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  min-height: 400px;
  
  ${theme.media.lg} {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const StoryImage = styled(motion.div)`
  position: relative;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(45deg, 
    ${theme.colors.primary.yellow}20, 
    ${theme.colors.primary.orange}20
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  
  ${theme.media.md} {
    height: 400px;
    font-size: 8rem;
  }
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  
  ${theme.media.md} {
    font-size: 3rem;
  }
`;

const StoryText = styled.div`
  padding: 1rem;
`;

const StoryParagraph = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const WordTransition = styled(motion.span)`
  display: inline-block;
  color: ${theme.colors.primary.red};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.xl};
  border: 2px dashed ${theme.colors.primary.red};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin: 0 0.5rem;
  background-color: ${theme.colors.primary.yellow}20;
`;

const StoryControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ControlButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.primary.orange};
    transform: scale(1.1);
  }
  
  &:disabled {
    background-color: ${theme.colors.secondary.beige};
    cursor: not-allowed;
    transform: none;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0 1rem;
`;

const StepDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? theme.colors.primary.red : theme.colors.secondary.beige};
  transition: all 0.3s ease;
`;

// Kabune pilavı hikayesi adımları
const storySteps = [
  {
    id: 1,
    text: "Yüzyıllar öncesi küçük Isparta şehrinde gelin ile kaynana gezmeye giderler, akşam saati olup eve geç kalınır.",
    emoji: "🏠",
    floatingElements: [
      { emoji: "🌅", x: 20, y: 20 },
      { emoji: "👰", x: 80, y: 60 }
    ]
  },
  {
    id: 2,
    text: "Eve geç kalınca hazırda bir yemek yoktur. Kaynana telaşlanır: 'Gelin ne yapacağız?' diye sorar.",
    emoji: "😰",
    floatingElements: [
      { emoji: "⏰", x: 30, y: 30 },
      { emoji: "🤷‍♀️", x: 70, y: 50 }
    ]
  },
  {
    id: 3,
    text: "Gelin 'Merak etme ana, hemen hallederim' der. Mutfakta tel dolabın içerisinde bir gün öncesinden kalan haşlanmış etli nohut yemeği vardır.",
    emoji: "💡",
    floatingElements: [
      { emoji: "🥘", x: 25, y: 40 },
      { emoji: "💪", x: 75, y: 25 }
    ]
  },
  {
    id: 4,
    text: "Hemen soğan doğrayıp bir kazana koyar, üzerine et ve nohutu ilave eder. Pirinç ve et suyunu da ilave eder.",
    emoji: "👩‍🍳",
    floatingElements: [
      { emoji: "🧅", x: 20, y: 35 },
      { emoji: "🍚", x: 60, y: 55 },
      { emoji: "🥩", x: 80, y: 25 }
    ]
  },
  {
    id: 5,
    text: "Saç ayağında üzüm asmasının çırpısı ile 5 dakikada pişirerek kapağı ile birlikte yemek tablası olarak kullanılan zinini üzerine bakır kazanı koyar.",
    emoji: "🔥",
    floatingElements: [
      { emoji: "🍇", x: 30, y: 20 },
      { emoji: "⚡", x: 70, y: 40 },
      { emoji: "🥄", x: 50, y: 70 }
    ]
  },
  {
    id: 6,
    text: "Akşam yemeğinde kaynana ve kaynata sulu yemek beklemektedir. Kapağı ilk açan kaynana gördüğü pirinç pilavının şaşkınlığı ile",
    emoji: "😲",
    floatingElements: [
      { emoji: "🍽️", x: 25, y: 30 },
      { emoji: "❓", x: 75, y: 45 }
    ]
  },
  {
    id: 7,
    text: "",
    emoji: "",
    showWordTransition: true,
    fromWord: "GIBUNE",
    toWord: "KABUNE",
    transitionText: "der ve bu pilav o günden bugüne çabuk pişmesi ve doyurucu bir yemek olması ile günümüze kadar düğünlerde, mevlütlerde ve toplu yemeklerde verilmeye başlar.",
    floatingElements: [
      { emoji: "💫", x: 30, y: 30 },
      { emoji: "✨", x: 70, y: 50 }
    ]
  }
];

const KabunePilafStory = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  React.useEffect(() => {
    let interval;
    if (isPlaying && inView) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= storySteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, inView]);
  
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(storySteps.length - 1, prev + 1));
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const currentStepData = storySteps[currentStep];
  
  return (
    <SectionContainer ref={ref}>
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Kabune Pilavının Efsanesi
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Gelin bu NE? sorusundan doğan efsanevi pilavın hikayesini, 
          interaktif anlatımla keşfedin.
        </SectionSubtitle>
      </SectionHeader>
      
      <StoryContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <StoryViewer>
            <AnimatePresence mode="wait">
              <StoryContent
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <StoryImage>
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {currentStepData.showWordTransition ? (
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <motion.span
                          initial={{ x: -100 }}
                          animate={{ x: 0 }}
                          transition={{ duration: 0.6 }}
                          style={{ fontSize: '4rem', marginRight: '2rem' }}
                        >
                          {currentStepData.fromWord}
                        </motion.span>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          style={{ fontSize: '3rem', color: theme.colors.primary.red }}
                        >
                          →
                        </motion.span>
                        <motion.span
                          initial={{ x: 100 }}
                          animate={{ x: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          style={{ fontSize: '4rem', marginLeft: '2rem' }}
                        >
                          {currentStepData.toWord}
                        </motion.span>
                      </motion.div>
                    ) : (
                      currentStepData.emoji
                    )}
                  </motion.div>
                  
                  {currentStepData.floatingElements?.map((element, index) => (
                    <FloatingElement
                      key={index}
                      style={{ 
                        left: `${element.x}%`, 
                        top: `${element.y}%` 
                      }}
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity 
                      }}
                    >
                      {element.emoji}
                    </FloatingElement>
                  ))}
                </StoryImage>
                
                <StoryText>
                  {currentStepData.showWordTransition ? (
                    <StoryParagraph>
                      <strong>Gelin Bu NE?</strong>
                      <WordTransition
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {currentStepData.fromWord}
                      </WordTransition>
                      {currentStepData.transitionText}
                      <br /><br />
                      İsmide Gelin Bu NE anlamına gelen GIBUNE pilavı günümüze kadar
                      <WordTransition
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {currentStepData.toWord}
                      </WordTransition>
                      Pilavı olarak ismi değişerek bugünlere gelmiştir.
                    </StoryParagraph>
                  ) : (
                    <StoryParagraph>{currentStepData.text}</StoryParagraph>
                  )}
                </StoryText>
              </StoryContent>
            </AnimatePresence>
            
            <StoryControls>
              <ControlButton
                onClick={handlePrevious}
                disabled={currentStep === 0}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiArrowLeft />
              </ControlButton>
              
              <ControlButton
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <FiPause /> : <FiPlay />}
              </ControlButton>
              
              <ControlButton
                onClick={handleNext}
                disabled={currentStep === storySteps.length - 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiArrowRight />
              </ControlButton>
              
              <StepIndicator>
                {storySteps.map((_, index) => (
                  <StepDot key={index} active={currentStep === index} />
                ))}
              </StepIndicator>
            </StoryControls>
          </StoryViewer>
        </motion.div>
      </StoryContainer>
    </SectionContainer>
  );
};

export default KabunePilafStory;