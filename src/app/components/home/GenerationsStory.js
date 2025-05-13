"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Image from 'next/image';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background: linear-gradient(135deg, ${theme.colors.background.alt} 0%, ${theme.colors.background.main} 100%);
  
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

const YearBadge = styled(motion.div)`
  display: inline-block;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.text.dark};
  margin-bottom: 1.5rem;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize['4xl']};
  }
`;

const SectionDescription = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.muted};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
`;

const GenerationsWrapper = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const GenerationCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 8rem;
  
  ${theme.media.lg} {
    grid-template-columns: ${props => props.reverse ? '1fr 1fr' : '1fr 1fr'};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  order: ${props => props.reverse ? '-1' : '1'};
  
  ${theme.media.lg} {
    order: ${props => props.reverse ? '2' : '1'};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${theme.colors.primary.red}20, transparent);
    z-index: 1;
  }
`;

const ContentContainer = styled.div`
  order: 2;
  
  ${theme.media.lg} {
    order: ${props => props.reverse ? '1' : '2'};
  }
`;

const GenerationNumber = styled.span`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize['5xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.red};
  opacity: 0.1;
  position: absolute;
  top: -1rem;
  left: 0;
`;

const GenerationTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.text.dark};
  margin-bottom: 1rem;
  position: relative;
`;

const GenerationPeriod = styled.p`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.primary.red};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: 1.5rem;
`;

const GenerationStory = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const GenerationHighlight = styled.div`
  background-color: ${theme.colors.secondary.beige};
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid ${theme.colors.primary.red};
  
  p {
    font-family: ${theme.typography.fontFamily.body};
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.dark};
    margin: 0;
    font-style: italic;
  }
`;

const TimelineConnector = styled.div`
  position: absolute;
  left: 50%;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, 
    ${theme.colors.primary.red} 0%, 
    ${theme.colors.primary.orange} 50%, 
    ${theme.colors.primary.yellow} 100%
  );
  transform: translateX(-50%);
  z-index: -1;
  
  ${theme.media.lg} {
    display: block;
  }
  
  ${theme.media.xs} {
    display: none;
  }
`;

// Mock data - gerçek verilere değiştirilecek
const generations = [
  {
    id: 1,
    number: "1",
    title: "Temellerin Atıldığı Dönem",
    period: "1851 - 1900",
    story: "1851 yılında Diyarbakır'da mütevazı bir dükkanla başlayan yolculuğumuz, ilk kuşağın fedakarlığı ve kararlılığıyla temellerini attı. O günlerden bu güne kadar değişmeyen ilkemiz: En taze malzemeler, geleneksel yöntemler ve müşteri memnuniyeti.",
    highlight: "İlk taş fırınımız bu dönemde inşa edildi ve hala aynı tariflerle kullanılmaya devam ediyor.",
    image: "/images/generation-1.jpg",
    reverse: false
  },
  {
    id: 2,
    number: "2",
    title: "Geleneğin Pekiştiği Yıllar",
    period: "1900 - 1950",
    story: "İkinci kuşak olarak babamızdan aldığımız mirası geliştirerek, fırın kebabımızın ününü şehrin dört bir yanına yaydık. Bu dönemde kabine pilavımızın da tarihi başladı ve müşterilerimizin vazgeçilmezi haline geldi.",
    highlight: "Bu dönemde 'Açıkalın Fırın Kebabı' artık Diyarbakır'ın bir markası haline geldi.",
    image: "/images/generation-2.jpg",
    reverse: true
  },
  {
    id: 3,
    number: "3",
    title: "Modernleşme ve Büyüme",
    period: "1950 - 2000",
    story: "Üçüncü kuşak döneminde, geleneksel lezzetlerimizi korurken modern tesislere geçiş yaptık. Hijyen standartlarını yükseltirken, aile usulü servis anlayışımızdan asla taviz vermedik.",
    highlight: "İlk klimalı salonumuzu açtık, ancak geleneksel mangal ve fırın sistemimizi hiç değiştirmedik.",
    image: "/images/generation-3.jpg",
    reverse: false
  },
  {
    id: 4,
    number: "4",
    title: "Mirasın Devamı",
    period: "2000 - Günümüz",
    story: "Dördüncü kuşak olarak Hüseyin Açıkalın önderliğinde, 170 yıllık geleneğimizi 21. yüzyıla taşıyoruz. Dijital çağın gerekliliklerini benimserken, ata yadigarı tariflerimizin tadına dokunmuyoruz.",
    highlight: "Online sipariş sistemimizi kurduk ama her kebabı hala elle şişliyoruz.",
    image: "/images/generation-4.jpg",
    reverse: true
  }
];

const GenerationsStory = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  return (
    <SectionContainer ref={ref}>
      <SectionHeader>
        <YearBadge
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          1851 - 2024
        </YearBadge>
        
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          4 Kuşak, Tek Gelenek
        </SectionTitle>
        
        <SectionDescription
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          170 yıldır değişmeyen kalite, nesilden nesile aktarılan tarifler ve her lokmada hissettiğiniz aile sıcaklığı. Açıkalın ailesi olarak, ecdadımızdan aldığımız mirası aynı özveri ile gelecek nesillere taşıyoruz.
        </SectionDescription>
      </SectionHeader>
      
      <GenerationsWrapper>
        <TimelineConnector />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {generations.map((generation) => (
            <GenerationCard
              key={generation.id}
              variants={cardVariants}
              reverse={generation.reverse}
            >
              <ImageContainer reverse={generation.reverse}>
                <Image
                  src={generation.image}
                  alt={generation.title}
                  fill
                  style={{objectFit: "cover"}}
                />
              </ImageContainer>
              
              <ContentContainer reverse={generation.reverse}>
                <GenerationNumber>{generation.number}</GenerationNumber>
                <GenerationTitle>{generation.title}</GenerationTitle>
                <GenerationPeriod>{generation.period}</GenerationPeriod>
                <GenerationStory>{generation.story}</GenerationStory>
                <GenerationHighlight>
                  <p>{generation.highlight}</p>
                </GenerationHighlight>
              </ContentContainer>
            </GenerationCard>
          ))}
        </motion.div>
      </GenerationsWrapper>
    </SectionContainer>
  );
};

export default GenerationsStory;