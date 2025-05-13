"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Image from 'next/image';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background-color: ${theme.colors.background.main};
  
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

const ImageContainer = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  ${theme.media.md} {
    height: 500px;
  }
  
  ${theme.media.lg} {
    height: 600px;
  }
`;

const ContentContainer = styled.div``;

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

const Signature = styled(motion.div)`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.primary.red};
  margin-top: 2rem;
`;

const KadirStory = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <SectionContainer ref={ref}>
      <ContentGrid>
        <ImageContainer
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/kadir-usta.jpg"
            alt="Kadir Usta"
            fill
            style={{objectFit: "cover"}}
          />
        </ImageContainer>
        
        <ContentContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Adanadan Mersine Uzanan Bir Lezzet Serüveni
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
            1980 yılında Mersine yerleştikten sonra, kendime has tariflerimi geliştirmeye başladım. Yöresel baharatları, mevsiminde toplanan taze otları ve en kaliteli etleri kullanarak, geleneksel tadı korurken kendime özgü dokunuşlar katmayı başardım.
          </Paragraph>
          
          <Paragraph
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            1985te küçük bir dükkânda açtığım ilk restoranım, bugün Mersinin en çok tercih edilen kebap duraklarından biri haline geldi. Bu başarının arkasında, hiç taviz vermediğim kalite anlayışı ve misafirlerimize gösterdiğimiz samimi ilgi var.
          </Paragraph>
          
          <Paragraph
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Bugün, oğlum ve kızımla birlikte bu geleneği sürdürüyor, her gün aynı heyecanla mutfağa giriyorum. Amacımız sadece karın doyurmak değil, unutulmaz bir lezzet deneyimi yaşatmak. Sizi de bu lezzet yolculuğuna davet ediyorum.
          </Paragraph>
          
          <Signature
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Kadir Yılmaz
          </Signature>
        </ContentContainer>
      </ContentGrid>
    </SectionContainer>
  );
};

export default KadirStory;