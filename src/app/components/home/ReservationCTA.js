"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Link from 'next/link';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background-image: url('/images/reservation-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  
  ${theme.media.md} {
    padding: 8rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 10rem 4rem;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  color: ${theme.colors.text.light};
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  margin-bottom: 1.5rem;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize['4xl']};
  }
`;

const Paragraph = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: 2.5rem;
  line-height: 1.8;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  
  ${theme.media.sm} {
    flex-direction: row;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-block;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  padding: 1rem 2.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid ${theme.colors.primary.red};
  min-width: 200px;
  text-align: center;
  
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
  padding: 1rem 2.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid ${theme.colors.text.light};
  min-width: 200px;
  text-align: center;
  
  &:hover {
    background-color: ${theme.colors.text.light};
    color: ${theme.colors.text.dark};
  }
`;

const ReservationCTA = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <SectionContainer ref={ref}>
      <ContentContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Özel Anlarınızı Bizimle Paylaşın
        </SectionTitle>
        
        <Paragraph
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Aileniz, sevdikleriniz veya iş arkadaşlarınızla geçireceğiniz özel anlar için masanızı şimdiden ayırtın. Sizin için her şeyi düşündük, tek yapmanız gereken rezervasyon yapmak.
        </Paragraph>
        
        <ButtonsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/contact" passHref>
            <PrimaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Rezervasyon Yap
            </PrimaryButton>
          </Link>
          
          <Link href="/menu" passHref>
            <SecondaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Menüyü İncele
            </SecondaryButton>
          </Link>
        </ButtonsContainer>
      </ContentContainer>
    </SectionContainer>
  );
};

export default ReservationCTA;