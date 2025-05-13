"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Image from 'next/image';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background: linear-gradient(45deg, ${theme.colors.background.main} 0%, ${theme.colors.background.alt} 100%);
  position: relative;
  overflow: hidden;
  
  ${theme.media.md} {
    padding: 8rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 10rem 4rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/images/texture-background.png');
    background-size: cover;
    opacity: 0.05;
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  
  ${theme.media.lg} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 0%, rgba(200, 44, 27, 0.1) 100%);
    z-index: 1;
  }
`;

const QuoteContainer = styled.div`
  position: relative;
`;

const GenerationBadge = styled(motion.div)`
  display: inline-block;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const QuoteMark = styled.div`
  position: absolute;
  top: -2rem;
  left: -1rem;
  font-family: ${theme.typography.fontFamily.accent};
  font-size: 10rem;
  color: ${theme.colors.primary.red};
  opacity: 0.2;
  line-height: 1;
  z-index: -1;
`;

const Quote = styled(motion.blockquote)`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.dark};
  line-height: 1.8;
  margin: 2rem 0;
  padding-left: 2rem;
  border-left: 4px solid ${theme.colors.primary.orange};
  font-style: italic;
  position: relative;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

const Signature = styled(motion.div)`
  text-align: right;
  margin-top: 2rem;
`;

const Name = styled.h3`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.primary.red};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 0.5rem;
`;

const Title = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  font-style: italic;
`;

const DecorativeElement = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, ${theme.colors.primary.red}10, ${theme.colors.primary.orange}10);
  border-radius: 50%;
  top: -100px;
  right: -100px;
  z-index: -1;
`;

const StoryHighlight = styled(motion.div)`
  background-color: ${theme.colors.secondary.beige};
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;
  border-left: 4px solid ${theme.colors.primary.red};
  
  p {
    font-family: ${theme.typography.fontFamily.body};
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.dark};
    margin: 0;
    font-style: italic;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: ${theme.colors.primary.orange};
  border-radius: 50%;
  opacity: 0.6;
`;

const HuseyinAcikalin = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      opacity: [0.3, 0.8, 0.3]
    }
  };
  
  return (
    <SectionContainer ref={ref}>
      <DecorativeElement
        initial={{ rotate: 0, scale: 0 }}
        animate={inView ? { rotate: 360, scale: 1 } : { rotate: 0, scale: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
      <FloatingElements>
        {[...Array(5)].map((_, i) => (
          <FloatingElement
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={floatingVariants.animate}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </FloatingElements>
      
      <ContentWrapper>
        <ImageContainer
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/huseyin-acikalin.jpg"
            alt="Hüseyin Açıkalın - 4. Kuşak Temsilcisi"
            fill
            style={{objectFit: "cover"}}
          />
        </ImageContainer>
        
        <QuoteContainer>
          <GenerationBadge
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            4. Kuşak Temsilcisi
          </GenerationBadge>
          
          <QuoteMark>"</QuoteMark>
          
          <Quote
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            "170 yıldır elimizden hiç düşürmediğimiz bu emaneti, babamdan aldığım gibi oğluma da aynı özveri ile aktarıyorum. Fırınımızın kor kırmızısı ateşi nasıl ki hiç sönmezse, bizim geleneğimiz de sonsuza kadar yaşayacak. 
            <br/><br/>
            Her gün güneş doğmadan fırınımızı yakarken, sadece et pişirmiyorum; 4 kuşağın hikayesini, sevgisini, alın terini ve duasını da o ateşe katıyorum. Müşterilerimiz bir lokma aldığında, aslında geçmişimizin en güzel tadını alıyor."
          </Quote>
          
          <Signature
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Name>Hüseyin Açıkalın</Name>
            <Title>Dördüncü Kuşak - Baş Usta</Title>
          </Signature>
          
          <StoryHighlight
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p>"Dedem diyordu ki: 'İyi kebabın sırrı etin cinsinde değil, ustanın niyetindedir. Eğer gönlünle yaparsan, yemek de gönle dokunur.'"</p>
          </StoryHighlight>
        </QuoteContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default HuseyinAcikalin;