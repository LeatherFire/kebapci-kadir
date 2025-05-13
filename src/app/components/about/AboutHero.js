"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const HeroSection = styled.section`
  height: 60vh;
  background-image: url('/images/about-hero.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  color: ${theme.colors.text.light};
  max-width: 800px;
  padding: 0 1rem;
`;

const PageTitle = styled(motion.h1)`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['4xl']};
  margin-bottom: 1.5rem;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize['5xl']};
  }
`;

const PageDescription = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

const AboutHero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Kadir Ustanın Hikayesi
        </PageTitle>
        <PageDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Yarım asrı aşkın kebapçılık geleneği, dededen toruna aktarılan tarifler ve yılların getirdiği ustalık...
        </PageDescription>
      </HeroContent>
    </HeroSection>
  );
};

export default AboutHero;