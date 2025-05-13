"use client"

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Image from 'next/image';

const SectionContainer = styled.section`
  position: relative;
  background-color: ${theme.colors.background.dark};
  color: ${theme.colors.text.light};
  overflow: hidden;
`;

const ParallaxContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
  z-index: 0;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  
  ${theme.media.lg} {
    grid-template-columns: 1fr 1fr;
    padding: 0 4rem;
  }
`;

const StoryContent = styled(motion.div)`
  text-align: left;
`;

const StoryBadge = styled(motion.div)`
  display: inline-block;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StoryTitle = styled(motion.h2)`
  font-family: ${theme.typography.fontFamily.accent};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  margin-bottom: 1.5rem;
  color: ${theme.colors.primary.yellow};
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize['4xl']};
  }
`;

const StoryText = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: ${theme.colors.text.light};
  opacity: 0.9;
`;

const StoryHighlight = styled(motion.div)`
  background: linear-gradient(135deg, ${theme.colors.primary.red}20, ${theme.colors.primary.orange}20);
  border-left: 4px solid ${theme.colors.primary.orange};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  
  p {
    font-family: ${theme.typography.fontFamily.body};
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.light};
    margin: 0;
    font-style: italic;
  }
`;

const VisualContainer = styled(motion.div)`
  position: relative;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 60px;
  background: ${props => props.gradient};
  border-radius: 50%;
  opacity: 0.7;
  blur: 1px;
`;

const FireAnimation = styled(motion.div)`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 60px;
  background: linear-gradient(to top, 
    ${theme.colors.primary.red} 0%,
    ${theme.colors.primary.orange} 50%,
    ${theme.colors.primary.yellow} 100%
  );
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  filter: blur(2px);
`;

const dishStories = {
  firinkebabi: {
    badge: "Tarihi Lezzet",
    title: "Fırın Kebabının Hikayesi",
    story: [
      "1851 yılında atalarımızın ilk yaktığı taş fırın, bugün hala aynı sıcaklıkta yanmaya devam ediyor. 4 kuşak boyunca özenle korunan bu fırında, aynı geleneksel yöntemlerle hazırlanan kebaplarımız, zamansız bir lezzet sunuyor.",
      "Her sabah güneş doğmadan önce yakılan fırın, 6 saatlik pre-heating süreci ile optimum sıcaklığa ulaşıyor. 300 derece sabit sıcaklıkta, özenle marine edilmiş et parçalarımız, kendi yağında pişerek eşsiz bir tat elde ediyor.",
      "Kuzu etinin yanına yerleştirilen Urfa biberli, sarımsaklı patateslerimiz ve özel baharat karışımımız, fırının büyülü atmosferinde birleşerek unutulmaz bir lezzet senfonisi yaratıyor."
    ],
    highlight: "Dedemizin dediği gibi: 'Fırın kebabı acele edeni ihmal eder, sabır eden ise cennet-i alama kadar tadını taşır.'",
    backgroundImage: "/images/firinKebabi-background.jpg",
    dishImage: "/images/firinKebabi-hero.jpg"
  },
  kabinepilavi: {
    badge: "Aile Sırrı",
    title: "Kabine Pilavının Sırrı",
    story: [
      "1920'li yıllarda büyük annemiz Fatma Hanım'ın mutfağından çıkan bu lezzet, aile içinde 'kabine pilavı' adını almıştı. Çünkü o dönemde sadece özel misafirlere, kapalı bir bölümde (kabine) servis edilirdi.",
      "İçindeki ceviz, üzüm, badem ve özel baharat karışımı, normal bir pilavı sanata dönüştürür. Her tanesi ayrı ayrı pişirilen malzemeler, son anda ustaca birleştirilerek benzersiz bir aroma yaratır.",
      "Pilavın üzerine serpilen kavrulmuş kuzu etli, safran püsküllü garnişi, her lokmada farklı bir tat deneyimi sunar. Bu tarif, sadece aile içinden erkek evlatlara, gelin girişinde öğretilir."
    ],
    highlight: "Fatma Nine'nin not defterinden: 'Pirinçte Sevgi, Baharatta Sabır, Hediyede Gelenek Saklıdır'",
    backgroundImage: "/images/kabinePilavi-background.jpg",
    dishImage: "/images/kabinePilavi-hero.jpg"
  }
};

const DishStory = ({ dishName }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  
  const story = dishStories[dishName];
  
  if (!story) return null;
  
  return (
    <SectionContainer ref={ref}>
      <ParallaxContainer>
        <BackgroundImage style={{ y, scale }}>
          <Image
            src={story.backgroundImage}
            alt={story.title}
            fill
            style={{objectFit: "cover"}}
          />
        </BackgroundImage>
        
        <ContentWrapper>
          <StoryContent>
            <StoryBadge
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              {story.badge}
            </StoryBadge>
            
            <StoryTitle
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {story.title}
            </StoryTitle>
            
            {story.story.map((paragraph, index) => (
              <StoryText
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
              >
                {paragraph}
              </StoryText>
            ))}
            
            <StoryHighlight
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p>{story.highlight}</p>
            </StoryHighlight>
          </StoryContent>
          
          <VisualContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image
              src={story.dishImage}
              alt={story.title}
              fill
              style={{objectFit: "cover"}}
            />
            
            <FloatingElements>
              <FloatingElement
                gradient={`linear-gradient(45deg, ${theme.colors.primary.red}40, transparent)`}
                style={{ top: '10%', left: '20%' }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0
                }}
              />
              <FloatingElement
                gradient={`linear-gradient(45deg, ${theme.colors.primary.orange}40, transparent)`}
                style={{ top: '30%', right: '15%' }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1
                }}
              />
              <FloatingElement
                gradient={`linear-gradient(45deg, ${theme.colors.primary.yellow}40, transparent)`}
                style={{ bottom: '20%', left: '30%' }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 2
                }}
              />
            </FloatingElements>
            
            {dishName === 'firinkebabi' && (
              <FireAnimation
                animate={{
                  scaleY: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </VisualContainer>
        </ContentWrapper>
      </ParallaxContainer>
    </SectionContainer>
  );
};

export default DishStory;