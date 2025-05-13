"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import Image from 'next/image';
import { FiDownload } from 'react-icons/fi';

const PageContainer = styled.div`
  padding-top: 80px; // Headerın altında kalmaması için
`;

const HeroSection = styled.section`
  height: 50vh;
  background-image: url('/images/menu-hero.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  color: ${theme.colors.text.light};
`;

const PageTitle = styled.h1`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['4xl']};
  margin-bottom: 1rem;
`;

const PageDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const MenuSection = styled.section`
  padding: 5rem 1rem;
  
  ${theme.media.md} {
    padding: 5rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 5rem 4rem;
  }
`;

const DownloadPdfButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${theme.colors.secondary.anthracite};
  color: ${theme.colors.text.light};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  margin: 0 auto 3rem;
  width: fit-content;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background-color: ${theme.colors.primary.red};
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  
  ${theme.media.md} {
    gap: 1rem;
  }
`;

const CategoryTab = styled.button`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.base};
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? theme.colors.primary.red : theme.colors.secondary.beige};
  background-color: ${props => props.active ? theme.colors.primary.red : 'transparent'};
  color: ${props => props.active ? theme.colors.text.light : theme.colors.text.dark};
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? theme.colors.primary.red : theme.colors.secondary.beige};
  }
`;

const MenuItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  ${theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MenuItem = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  background-color: ${theme.colors.background.main};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const MenuItemImageContainer = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  
  ${theme.media.md} {
    width: 120px;
    height: 120px;
  }
`;

const MenuItemContent = styled.div`
  flex: 1;
`;

const MenuItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const MenuItemTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
`;

const MenuItemPrice = styled.span`
  font-family: ${theme.typography.fontFamily.accent};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.primary.red};
`;

const MenuItemDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  line-height: 1.6;
`;

const NoItemsMessage = styled.p`
  text-align: center;
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.muted};
  margin: 3rem 0;
`;

// Örnek menü verileri
const menuCategories = [
  { id: 'all', name: 'Tümü' },
  { id: 'starters', name: 'Başlangıçlar' },
  { id: 'kebabs', name: 'Kebaplar' },
  { id: 'grills', name: 'Izgaralar' },
  { id: 'sides', name: 'Yan Lezzetler' },
  { id: 'desserts', name: 'Tatlılar' },
  { id: 'drinks', name: 'İçecekler' }
];

const menuItems = [
  {
    id: 1,
    title: 'Humus',
    description: 'Ev yapımı, tahin ve zeytinyağı ile servis edilen geleneksel humus.',
    price: '45 TL',
    category: 'starters',
    image: '/images/humus.jpg'
  },
  {
    id: 2,
    title: 'Muhammara',
    description: 'Közlenmiş kırmızı biber, ceviz ve özel baharatlarla harmanlanmış geleneksel meze.',
    price: '50 TL',
    category: 'starters',
    image: '/images/muhammara.jpg'
  },
  {
    id: 3,
    title: 'Adana Kebap',
    description: 'El yapımı, özel baharatlarla hazırlanan, közde pişirilmiş geleneksel lezzet.',
    price: '140 TL',
    category: 'kebabs',
    image: '/images/adana-kebap.jpg'
  },
  {
    id: 4,
    title: 'Urfa Kebap',
    description: 'Acısız, sadece taze baharatlarla harmanlanmış, közde pişirilmiş yumuşacık kebap.',
    price: '140 TL',
    category: 'kebabs',
    image: '/images/urfa-kebap.jpg'
  },
  {
    id: 5,
    title: 'Kuzu Şiş',
    description: 'Özel marine edilmiş kuzu eti, közde pişirilmiş sebzeler eşliğinde.',
    price: '160 TL',
    category: 'grills',
    image: '/images/kuzu-sis.jpg'
  },
  {
    id: 6,
    title: 'Kadir Usta\'nın Özel Karışık Kebabı',
    description: 'Adana, Urfa, kuzu şiş ve tavuk şişin muhteşem uyumu. Közde pişirilmiş sebzeler ve özel soslarla...',
    price: '190 TL',
    category: 'kebabs',
    image: '/images/karisik-kebap.jpg'
  },
  {
    id: 7,
    title: 'Künefe',
    description: 'Hatay peyniri ile hazırlanmış, sıcak servis edilen geleneksel künefe tatlısı.',
    price: '70 TL',
    category: 'desserts',
    image: '/images/kunefe.jpg'
  },
  {
    id: 8,
    title: 'Katmer',
    description: 'Antep fıstığı ile zenginleştirilmiş, ince hamurlu geleneksel tatlı.',
    price: '65 TL',
    category: 'desserts',
    image: '/images/katmer.jpg'
  }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <PageTitle>Menümüz</PageTitle>
          <PageDescription>Kadir Ustanın özenle hazırladığı, yılların tecrübesiyle harmanlanmış eşsiz lezzetler.</PageDescription>
        </HeroContent>
      </HeroSection>
      
      <MenuSection>
        
        <CategoryTabs>
          {menuCategories.map(category => (
            <CategoryTab
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </CategoryTab>
          ))}
        </CategoryTabs>
        
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <MenuItemsGrid
              as={motion.div}
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredItems.map(item => (
                <MenuItem
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <MenuItemImageContainer>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{objectFit: "cover"}}
                    />
                  </MenuItemImageContainer>
                  <MenuItemContent>
                    <MenuItemHeader>
                      <MenuItemTitle>{item.title}</MenuItemTitle>
                      <MenuItemPrice>{item.price}</MenuItemPrice>
                    </MenuItemHeader>
                    <MenuItemDescription>{item.description}</MenuItemDescription>
                  </MenuItemContent>
                </MenuItem>
              ))}
            </MenuItemsGrid>
          ) : (
            <NoItemsMessage
              as={motion.p}
              key="no-items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Bu kategoride ürün bulunmamaktadır.
            </NoItemsMessage>
          )}
        </AnimatePresence>
      </MenuSection>
    </PageContainer>
  );
};