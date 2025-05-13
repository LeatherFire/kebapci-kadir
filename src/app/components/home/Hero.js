"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import Link from 'next/link';
import Image from 'next/image';

const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/hero-background.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.5)
    );
  }
`;

const ContentWrapper = styled.div`
  text-align: center;
  color: ${theme.colors.text.light};
  z-index: 1;
  padding: 0 1rem;
  max-width: 900px;
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  margin-bottom: 1rem;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize['4xl']};
  }
  
  ${theme.media.lg} {
    font-size: ${theme.typography.fontSize['5xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: 2rem;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  
  ${theme.media.sm} {
    flex-direction: row;
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-block;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid ${theme.colors.primary.red};
  
  &:hover {
    background-color: transparent;
    color: ${theme.colors.text.light};
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-block;
  background-color: transparent;
  color: ${theme.colors.text.light};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid ${theme.colors.text.light};
  
  &:hover {
    background-color: ${theme.colors.text.light};
    color: ${theme.colors.text.dark};
  }
`;

const scrollDownAnimation = {
  y: [0, 10, 0],
  transition: {
    y: {
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${theme.colors.text.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.sm};
  margin-bottom: 0.5rem;
`;

const ScrollIcon = styled(motion.div)`
  width: 30px;
  height: 50px;
  border: 2px solid ${theme.colors.text.light};
  border-radius: 15px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background-color: ${theme.colors.text.light};
    border-radius: 50%;
  }
`;

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  return (
    <HeroContainer>
      {/* Video arka planı (opsiyonel, yoksa görsel kullanılabilir) */}
      {/* <VideoBackground autoPlay muted loop playsInline>
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </VideoBackground> */}
      
      {/* Görsel arka plan */}
      <ImageBackground />
      
      <ContentWrapper>
        <HeroTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ateşin ve Lezzetin Buluştuğu Yer
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          1851den Beri, Nesilden Nesile Aktarılan Lezzet
        </HeroSubtitle>
        
        <HeroButtons
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/menu" passHref>
            <PrimaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Menümüzü Keşfedin
            </PrimaryButton>
          </Link>
          
          <Link href="/contact" passHref>
            <SecondaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Rezervasyon Yap
            </SecondaryButton>
          </Link>
        </HeroButtons>
      </ContentWrapper>
      
      <ScrollIndicator onClick={scrollToContent}>
        <ScrollText>Keşfet</ScrollText>
        <ScrollIcon animate={scrollDownAnimation} />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero;