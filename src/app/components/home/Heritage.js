"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Image from 'next/image';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background-color: ${theme.colors.background.alt};
  position: relative;
  
  ${theme.media.md} {
    padding: 6rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 8rem 4rem;
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(200, 44, 27, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(216, 91, 10, 0.1) 0%, transparent 50%);
  z-index: 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 1;
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
  max-width: 700px;
  margin: 2rem auto 0;
  line-height: 1.8;
`;

const GenesisYear = styled(motion.div)`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.red};
  text-align: center;
  margin-bottom: 4rem;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;

const HeritageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  position: relative;
  z-index: 1;
  
  ${theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${theme.media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GenerationCard = styled(motion.div)`
  background-color: ${theme.colors.background.main};
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, 
      ${theme.colors.primary.red}, 
      ${theme.colors.primary.orange}
    );
    border-radius: 8px 8px 0 0;
  }
`;

const GenerationNumber = styled.div`
  position: absolute;
  top: -15px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.base};
  box-shadow: 0 4px 15px rgba(200, 44, 27, 0.3);
`;

const GenerationImageContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1.5rem;
  border: 4px solid ${theme.colors.primary.orange};
  box-shadow: 0 0 0 4px ${theme.colors.secondary.beige};
`;

const GenerationName = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.dark};
  text-align: center;
  margin-bottom: 0.5rem;
`;

const GenerationTitle = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.primary.red};
  text-align: center;
  margin-bottom: 1rem;
  font-weight: ${theme.typography.fontWeight.medium};
`;

const GenerationDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  text-align: center;
`;

const GenerationYear = styled.div`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.primary.orange};
  text-align: center;
  margin-top: 1rem;
  font-weight: ${theme.typography.fontWeight.bold};
`;

// Kuşak verileri
const generations = [
  {
    id: 1,
    name: "Hafız Dede",
    title: "Kurucu Usta",
    generation: "1. Kuşak",
    year: "1851",
    description: "Isparta'da kebap geleneğinin temellerini atan, Hz. Muhammed'in sünnetlerine sadık kalarak işini yapan büyük usta.",
    image: "/images/hafiz-dede.jpg"
  },
  {
    id: 2,
    name: "Siyasi Osman Dede",
    title: "Gelenek Koruyucusu",
    generation: "2. Kuşak",
    year: "1870-1920",
    description: "Hafız Dede'nin yolundan giderek geleneği güçlü ellerde taşıyan ve bu mesleği yaygınlaştıran değerli usta.",
    image: "/images/osman-dede.jpg"
  },
  {
    id: 3,
    name: "Kadir Açıkalın",
    title: "Marka Yaratıcısı",
    generation: "3. Kuşak",
    year: "1920-1985",
    description: "'Kebapçı Kadir' markasını yaratan ve Isparta'nın en tanınmış kebapçısı haline getiren usta.",
    image: "/images/kadir-acikalin.jpg"
  },
  {
    id: 4,
    name: "Hüseyin Açıkalın",
    title: "Modern Temsilci",
    generation: "4. Kuşak",
    year: "1985-Günümüz",
    description: "Geleneği modern çağa taşıyan, beş yıldızlı mutfak anlayışı ile kaliteyi zirveye çıkaran günümüz ustası.",
    image: "/images/huseyin-acikalin.jpg"
  }
];

const Heritage = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  return (
    <SectionContainer ref={ref}>
      <BackgroundPattern />
      
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Kuşaktan Kuşağa Gelen Gelenek
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Isparta kebap geleneğinin köklü tarihçesi, dört kuşakta yazılan eşsiz lezzet hikayesi.
        </SectionSubtitle>
      </SectionHeader>
      
      <GenesisYear
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        1851den Günümüze...
      </GenesisYear>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <HeritageGrid>
          {generations.map((generation, index) => (
            <GenerationCard key={generation.id} variants={itemVariants}>
              <GenerationNumber>
                {index + 1}
              </GenerationNumber>
              <GenerationImageContainer>
                <Image
                  src={generation.image}
                  alt={generation.name}
                  fill
                  style={{objectFit: "cover"}}
                />
              </GenerationImageContainer>
              <GenerationName>{generation.name}</GenerationName>
              <GenerationTitle>
                {generation.title} • {generation.generation}
              </GenerationTitle>
              <GenerationDescription>
                {generation.description}
              </GenerationDescription>
              <GenerationYear>{generation.year}</GenerationYear>
            </GenerationCard>
          ))}
        </HeritageGrid>
      </motion.div>
    </SectionContainer>
  );
};

export default Heritage;