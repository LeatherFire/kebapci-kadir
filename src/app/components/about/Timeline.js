"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';

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
    width: 60px;
    height: 3px;
    background-color: ${theme.colors.primary.red};
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  
  &:after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: ${theme.colors.secondary.beige};
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    
    ${theme.media.sm} {
      left: 50%;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 0 30px 60px 30px;
  position: relative;
  width: 100%;
  
  ${theme.media.sm} {
    width: 50%;
    left: ${props => props.position === 'left' ? '0' : '50%'};
  }
  
  &:last-child {
    padding-bottom: 0;
  }
`;

const TimelineContent = styled.div`
  padding: 1.5rem;
  background-color: ${theme.colors.background.main};
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  
  ${theme.media.sm} {
    &:after {
      content: '';
      position: absolute;
      top: calc(50% - 10px);
      right: ${props => props.position === 'left' ? '-10px' : 'auto'};
      left: ${props => props.position === 'right' ? '-10px' : 'auto'};
      width: 20px;
      height: 20px;
      background-color: ${theme.colors.background.main};
      transform: rotate(45deg);
    }
  }
`;

const TimelineDate = styled.div`
  position: absolute;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.base};
  border-radius: 4px;
  top: calc(50% - 15px);
  
  ${theme.media.sm} {
    left: ${props => props.position === 'left' ? 'calc(100% + 15px)' : 'auto'};
    right: ${props => props.position === 'right' ? 'calc(100% + 15px)' : 'auto'};
  }
  
  /* Mobil görünüm için */
  ${theme.media.xs} {
    left: -30px;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${theme.colors.primary.orange};
  border-radius: 50%;
  top: calc(50% - 10px);
  z-index: 1;
  box-shadow: 0 0 0 4px ${theme.colors.secondary.beige};
  
  ${theme.media.sm} {
    left: ${props => props.position === 'left' ? 'calc(100% - 10px)' : '-10px'};
  }
  
  /* Mobil görünüm için */
  ${theme.media.xs} {
    left: 0;
  }
`;

const TimelineTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.dark};
  margin-bottom: 0.5rem;
`;

const TimelineDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  line-height: 1.6;
`;

// Zaman çizelgesi verileri
const timelineEvents = [
  {
    id: 1,
    year: 1965,
    title: "İlk Adımlar",
    description: "Adana'da kebapçı çırağı olarak mesleğe ilk adımımı attım.",
    position: "left"
  },
  {
    id: 2,
    year: 1975,
    title: "Ustalık Beratı",
    description: "Adana Esnaf ve Sanatkarlar Odası'ndan ustalık beratımı aldım.",
    position: "right"
  },
  {
    id: 3,
    year: 1980,
    title: "Mersin'e Göç",
    description: "Ailemle birlikte Mersin'e yerleşerek yeni bir başlangıç yaptım.",
    position: "left"
  },
  {
    id: 4,
    year: 1985,
    title: "İlk Dükkan",
    description: "Mersin'de ilk kebap dükkanımı açtım. Küçük ama sıcak bir mekan...",
    position: "right"
  },
  {
    id: 5,
    year: 1998,
    title: "Büyüme ve Tanınma",
    description: "Artan talep üzerine daha büyük bir restorana taşındık ve yerel basında tanınmaya başladık.",
    position: "left"
  },
  {
    id: 6,
    year: 2005,
    title: "Aile Geleneği",
    description: "Oğlum ve kızım işletmeye dahil oldu, aile geleneği devam etmeye başladı.",
    position: "right"
  },
  {
    id: 7,
    year: 2015,
    title: "Şimdiki Mekan",
    description: "Şu anki modern ve geniş mekanımızı açarak daha fazla misafirimizi ağırlamaya başladık.",
    position: "left"
  }
];

const Timeline = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <SectionContainer ref={ref}>
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Tarihçemiz
        </SectionTitle>
      </SectionHeader>
      
      <TimelineContainer>
        {timelineEvents.map((event, index) => (
          <TimelineItem 
            key={event.id}
            position={event.position}
            initial={{ opacity: 0, x: event.position === 'left' ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: event.position === 'left' ? -50 : 50 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <TimelineContent position={event.position}>
              <TimelineTitle>{event.title}</TimelineTitle>
              <TimelineDescription>{event.description}</TimelineDescription>
            </TimelineContent>
            <TimelineDate position={event.position}>{event.year}</TimelineDate>
            <TimelineDot position={event.position} />
          </TimelineItem>
        ))}
      </TimelineContainer>
    </SectionContainer>
  );
};

export default Timeline;