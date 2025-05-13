"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Link from 'next/link';
import Image from 'next/image';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background-color: ${theme.colors.background.alt};
  
  ${theme.media.md} {
    padding: 6rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 8rem 4rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  
  ${theme.media.lg} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContentContainer = styled.div`
  order: 2;
  
  ${theme.media.lg} {
    order: 1;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  order: 1;
  
  ${theme.media.md} {
    height: 500px;
  }
  
  ${theme.media.lg} {
    order: 2;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.text.dark};
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${theme.colors.primary.red};
  }
`;

const Paragraph = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const ReadMoreButton = styled(motion.a)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  border: 2px solid ${theme.colors.primary.red};
  color: ${theme.colors.primary.red};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.base};
  border-radius: 4px;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.primary.red};
    color: ${theme.colors.text.light};
  }
`;

const StoryPreview = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <SectionContainer ref={ref}>
      <ContentGrid>
        <ContentContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Yarım Asırlık Lezzet Yolculuğu
          </SectionTitle>
          
          <Paragraph
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            1965 yılında, henüz 15 yaşındayken Adananın en meşhur kebapçılarından birinde çırak olarak başladığım bu yolculuk, benim için sadece bir meslek değil, bir tutku haline geldi. Ustamın "Sırrımız taze malzeme ve sabırda" dediği günleri hiç unutmadım.
          </Paragraph>
          
          <Paragraph
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Bugün, oğlum ve kızımla birlikte bu geleneği sürdürüyor, her gün aynı heyecanla mutfağa giriyorum. Amacımız sadece karın doyurmak değil, unutulmaz bir lezzet deneyimi yaşatmak.
          </Paragraph>
          
          <Link href="/about" passHref>
            <ReadMoreButton
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hikayemizi Keşfedin
            </ReadMoreButton>
          </Link>
        </ContentContainer>
        
        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/restaurant-history.jpg"
            alt="Kebapçı Kadir'in Hikayesi"
            fill
            style={{objectFit: "cover"}}
          />
        </ImageContainer>
      </ContentGrid>
    </SectionContainer>
  );
};

export default StoryPreview;