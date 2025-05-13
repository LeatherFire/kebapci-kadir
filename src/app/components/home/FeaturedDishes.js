"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiThermometer, FiDroplet } from 'react-icons/fi';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background-color: ${theme.colors.background.main};
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
    radial-gradient(circle at 30% 40%, rgba(216, 91, 10, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(200, 44, 27, 0.05) 0%, transparent 50%);
  z-index: 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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
    width: 60px;
    height: 3px;
    background-color: ${theme.colors.primary.red};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.muted};
  max-width: 600px;
  margin: 0 auto;
  margin-top: 2rem;
`;

const DishesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  position: relative;
  z-index: 1;
  
  ${theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${theme.media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const DishCard = styled(motion.div)`
  background-color: ${theme.colors.background.main};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const DishImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%);
    z-index: 1;
  }
`;

const DishBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.sm};
  z-index: 2;
`;

const DishContent = styled.div`
  padding: 1.5rem;
`;

const DishTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.dark};
  margin-bottom: 0.5rem;
`;

const DishDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const DishFeatures = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.muted};
  
  svg {
    color: ${theme.colors.primary.orange};
  }
`;

const DishPrice = styled.span`
  font-family: ${theme.typography.fontFamily.accent};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.primary.red};
`;

const DishOrigin = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.primary.orange};
  font-style: italic;
  margin-top: 0.5rem;
`;

const ViewAllButton = styled(motion.a)`
  display: block;
  width: fit-content;
  margin: 3rem auto 0;
  padding: 0.75rem 2rem;
  background-color: transparent;
  border: 2px solid ${theme.colors.primary.red};
  color: ${theme.colors.primary.red};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.base};
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    background-color: ${theme.colors.primary.red};
    color: ${theme.colors.text.light};
  }
`;

// PDF bilgilerine göre güncellenmiş yemek verileri
const featuredDishes = [
  {
    id: 1,
    title: "Isparta Fırın Kebabı",
    description: "Çalı kökü odunuyla 3,5 saat pişirilen, hijyenik koşullarda hazırlanan, %50 fire veren eşsiz lezzet.",
    price: "280 TL",
    image: "/images/isparta-kebabi.jpg",
    badge: "1851'den Beri",
    features: [
      { icon: <FiClock />, text: "3.5 Saat" },
      { icon: <FiThermometer />, text: "Çalı Kökü" },
      { icon: <FiDroplet />, text: "%50 Fire" }
    ],
    origin: "Hafız Dede'nin Özel Tarifi"
  },
  {
    id: 2,
    title: "Kabune Pilavı",
    description: "Dolgun pirinç, kuzu kaburga, nohut ve özel tereyağı ile üzüm asması çırpısında pişirilen geleneksel pilav.",
    price: "120 TL",
    image: "/images/kabune-pilavi.jpg",
    badge: "Geleneksel",
    features: [
      { icon: <FiClock />, text: "15 Dakika" },
      { icon: <FiThermometer />, text: "Saç Ayağı" },
      { icon: <FiDroplet />, text: "Et Suyu" }
    ],
    origin: "Gelin-Kaynana Efsanesi"
  },
  {
    id: 3,
    title: "İrmik Helvası",
    description: "O numara sarı irmik, hakiki tereyağı ve Antep fıstığı ile mangal kömüründe özel kaynatma.",
    price: "85 TL",
    image: "/images/irmik-helvasi.jpg",
    badge: "Özel Tarif",
    features: [
      { icon: <FiClock />, text: "45 Dakika" },
      { icon: <FiThermometer />, text: "Mangal Kömürü" },
      { icon: <FiDroplet />, text: "Antep Fıstığı" }
    ],
    origin: "Bakır Kazan Usulü"
  },
  {
    id: 4,
    title: "Üzüm Şırası",
    description: "Dimlit üzümü, mersin yaprağı, karanfil ve tatlı kabuk ile hazırlanan sağlık deposu.",
    price: "45 TL",
    image: "/images/uzum-sirasi.jpg",
    badge: "Sağlık Deposu",
    features: [
      { icon: <FiClock />, text: "2 Saat" },
      { icon: <FiThermometer />, text: "Kaynatma" },
      { icon: <FiDroplet />, text: "Mersin Yaprağı" }
    ],
    origin: "Beyin Hücresi Yenileyici"
  }
];

const FeaturedDishes = () => {
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
    hidden: { y: 30, opacity: 0 },
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
          Öne Çıkan Lezzetlerimiz
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Nesilden nesile aktarılan gizli tariflerle, Ispartanın en otantik lezzetlerini sunuyoruz.
        </SectionSubtitle>
      </SectionHeader>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <DishesGrid>
          {featuredDishes.map((dish) => (
            <DishCard key={dish.id} variants={itemVariants}>
              <DishImageContainer>
                <Image
                  src={dish.image}
                  alt={dish.title}
                  fill
                  style={{objectFit: "cover"}}
                />
                <DishBadge>{dish.badge}</DishBadge>
              </DishImageContainer>
              <DishContent>
                <DishTitle>{dish.title}</DishTitle>
                <DishDescription>{dish.description}</DishDescription>
                <DishFeatures>
                  {dish.features.map((feature, index) => (
                    <FeatureItem key={index}>
                      {feature.icon}
                      <span>{feature.text}</span>
                    </FeatureItem>
                  ))}
                </DishFeatures>
                <DishPrice>{dish.price}</DishPrice>
                <DishOrigin>{dish.origin}</DishOrigin>
              </DishContent>
            </DishCard>
          ))}
        </DishesGrid>
      </motion.div>
      
      <Link href="/menu" passHref>
        <ViewAllButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tüm Menüyü Gör
        </ViewAllButton>
      </Link>
    </SectionContainer>
  );
};

export default FeaturedDishes;