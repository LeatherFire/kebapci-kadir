"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Image from 'next/image';
import Link from 'next/link';

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
  margin-bottom: 3rem;
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
  
  ${theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${theme.media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const DishCard = styled(motion.div)`
  background-color: ${theme.colors.background.main};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const DishImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
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

const DishPrice = styled.span`
  font-family: ${theme.typography.fontFamily.accent};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.primary.red};
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
  
  &:hover {
    background-color: ${theme.colors.primary.red};
    color: ${theme.colors.text.light};
  }
`;

// Örnek veri
// Bu kısmı bulun ve değiştirin:
const featuredDishes = [
  {
    id: 1,
    title: "Fırın Kebabı",
    description: "1851'den beri aynı taş fırında pişen eşsiz lezzetimiz. Kuzu etinin yanına yerleştirilen Urfa biberli, sarımsaklı patateslerle beraber 6 saatte pişen muhteşem bir deneyim.",
    price: "180 TL",
    image: "/images/firin-kebabi.jpg"
  },
  {
    id: 2,
    title: "Kabine Pilavı", 
    description: "Büyük annemiz Fatma Hanım'ın 1920'lerden kalma özel tarifi. İçindeki ceviz, üzüm, badem ve özel baharat karışımı ile sanatın en güzel hali. Sadece aile geleneği olarak aktarılan gizli tarif.",
    price: "85 TL",
    image: "/images/kabine-pilavi.jpg"
  },
  {
    id: 3,
    title: "Diyarbakır Usulü İçli Köfte",
    description: "Hüseyin Usta'nın özel su testi yöntemiyle hazırlanan, bugday ve kırmızı mercimek karışımından oluşan, içi özenle hazırlanmış dana etiyle doldurulmuş geleneksel lezzetimiz.",
    price: "35 TL (adet)",
    image: "/images/icli-kofte.jpg"
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
          Kadir Ustanın yılların tecrübesiyle hazırladığı, müşterilerimizin en sevdiği özel lezzetler.
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
              </DishImageContainer>
              <DishContent>
                <DishTitle>{dish.title}</DishTitle>
                <DishDescription>{dish.description}</DishDescription>
                <DishPrice>{dish.price}</DishPrice>
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