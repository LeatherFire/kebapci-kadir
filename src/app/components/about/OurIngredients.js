"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Image from 'next/image';
import { FiCheckCircle } from 'react-icons/fi';

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

const SectionDescription = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.muted};
  max-width: 700px;
  margin: 2rem auto 0;
  line-height: 1.6;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  ${theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${theme.media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const IngredientCard = styled(motion.div)`
  background-color: ${theme.colors.background.main};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const IngredientImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const IngredientContent = styled.div`
  padding: 1.5rem;
`;

const IngredientTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.dark};
  margin-bottom: 1rem;
`;

const IngredientDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const IngredientFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const IngredientFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  margin-bottom: 0.5rem;
  color: ${theme.colors.text.dark};
  
  svg {
    color: ${theme.colors.primary.green};
    flex-shrink: 0;
  }
`;

// Örnek malzeme verileri
const ingredients = [
  {
    id: 1,
    title: "Etlerimiz",
    description: "En kaliteli kuzular ve büyükbaş hayvanlardan elde edilen taze etler, özenle seçiliyor ve işleniyor.",
    image: "/images/meat.jpg",
    features: [
      "Toros Yaylalarından serbest dolaşan kuzular",
      "Günlük olarak temin edilen taze etler",
      "Kendi mutfağımızda hazırlanan kıymalar",
      "Hormonsuz, doğal beslenmiş hayvanlar"
    ]
  },
  {
    id: 2,
    title: "Baharatlarımız",
    description: "Yöresel tedarikçilerden alınan, taze ve doğal baharatlar, geleneksel tarifleri canlandırıyor.",
    image: "/images/spices.jpg",
    features: [
      "Urfa ve Antep'ten gelen özel biber karışımları",
      "Çekilmeden önce el ile ayıklanan baharatlar",
      "Taş değirmende öğütülen toz baharatlar",
      "Gizli tarif ile harmanlanan karışımlar"
    ]
  },
  {
    id: 3,
    title: "Sebzelerimiz",
    description: "Mevsiminde, yerel üreticilerden temin edilen taze sebzeler, her öğünde mükemmel lezzeti garantiliyor.",
    image: "/images/vegetables.jpg",
    features: [
      "Mersin ve çevresindeki çiftliklerden günlük tedarik",
      "Tamamen organik yetiştirilen domates ve biberler",
      "Özenle yıkanan ve hazırlanan malzemeler",
      "Mevsim dışında asla dondurulmuş ürün kullanmama"
    ]
  }
];

const OurIngredients = () => {
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
          Malzemelerimiz
        </SectionTitle>
        <SectionDescription
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Kaliteli malzeme, lezzetli yemeğin temelidir. Bu nedenle en iyi malzemeleri, en güvenilir kaynaklardan tedarik ediyor, her detaya özen gösteriyoruz.
        </SectionDescription>
      </SectionHeader>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <IngredientsGrid>
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} variants={itemVariants}>
              <IngredientImageContainer>
                <Image
                  src={ingredient.image}
                  alt={ingredient.title}
                  fill
                  style={{objectFit: "cover"}}
                />
              </IngredientImageContainer>
              <IngredientContent>
                <IngredientTitle>{ingredient.title}</IngredientTitle>
                <IngredientDescription>{ingredient.description}</IngredientDescription>
                <IngredientFeatures>
                  {ingredient.features.map((feature, index) => (
                    <IngredientFeature key={index}>
                      <FiCheckCircle size={18} />
                      {feature}
                    </IngredientFeature>
                  ))}
                </IngredientFeatures>
              </IngredientContent>
            </IngredientCard>
          ))}
        </IngredientsGrid>
      </motion.div>
    </SectionContainer>
  );
};

export default OurIngredients;