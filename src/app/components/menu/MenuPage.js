"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import Image from 'next/image';
import { FiDownload, FiClock, FiFlame, FiDroplet } from 'react-icons/fi';

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
  border-radius: 12px;
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
  width: 120px;
  height: 120px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  
  ${theme.media.md} {
    width: 140px;
    height: 140px;
  }
`;

const MenuItemContent = styled.div`
  flex: 1;
`;

const MenuItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`;

const MenuItemTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.dark};
`;

const SpecialBadge = styled.span`
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const MenuItemDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const MenuItemFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.dark};
  background-color: ${theme.colors.secondary.offwhite};
  padding: 0.5rem;
  border-radius: 6px;
  
  svg {
    color: ${theme.colors.primary.red};
  }
`;

const MenuItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuItemPrice = styled.span`
  font-family: ${theme.typography.fontFamily.accent};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.primary.red};
`;

const MenuItemOrigin = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.primary.orange};
  font-style: italic;
`;

const NoItemsMessage = styled.p`
  text-align: center;
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.muted};
  margin: 3rem 0;
`;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // PDF bilgilerine göre güncellenmiş menü verileri
  const menuCategories = [
    { id: 'all', name: 'Tümü' },
    { id: 'signature', name: 'Özel Lezzetler' },
    { id: 'kebabs', name: 'Kebaplar' },
    { id: 'rice', name: 'Pilavlar' },
    { id: 'desserts', name: 'Tatlılar' },
    { id: 'drinks', name: 'İçecekler' }
  ];

  const menuItems = [
    {
      id: 1,
      title: 'Isparta Fırın Kebabı',
      description: 'Doğal ortamlarında yetişen hayvanlardan hijyenik koşullarda hazırlanan et, 3-3.5 saat çalı kökü odunuyla pişirilir. 2 saat alev, 1 saat korda pişirilen, buharla %50 fire veren özel kebap.',
      price: '85 TL',
      category: 'signature',
      image: '/images/isparta-kebap.jpg',
      special: '1851\'den Beri',
      origin: 'Hafız Dede\'nin Özel Tarifi'
    },
    {
      id: 2,
      title: 'Kabune Pilavı',
      description: 'Dolgun pirinç, tatlı soğan, karabiber ve nohut ile kuzu kaburga eti. Saç ayağında üzüm asması çırpısıyla 15 dakikada pişirilen geleneksel pilav. "Gelin Bu Ne" efsanesinden doğan tarih.',
      price: '35 TL',
      category: 'rice',
      image: '/images/kabune-pilavi.jpg',
      special: 'Geleneksel',
      origin: 'GIBUNE > KABUNE Hikayesi'
    },
    {
      id: 3,
      title: 'İrmik Helvası',
      description: 'O numara sarı irmik, hakiki tereyağı ve kunar (Antep) fıstığıyla büyük bakır kazanlarda mangal kömürü ateşinde özenerek pişirilen geleneksel helva.',
      price: '25 TL',
      category: 'desserts',
      image: '/images/irmik-helvasi.jpg',
      special: 'Özel Tarif',
      origin: 'Bakır Kazan Usulü'
    },
    {
      id: 4,
      title: 'Üzüm Şırası',
      description: 'Isparta\'nın siyah Dimlit üzümü kurutularak, mersin yaprağı, karanfil ve tatlı kabuk ile kaynatılır. Kebabın yanında tercih edilme sebebi besin değeri ve protein-glikoz dengesi.',
      price: '18 TL',
      category: 'drinks',
      image: '/images/uzum-sirasi.jpg',
      special: 'Sağlık Deposu',
      origin: 'Beyin Hücresi Yenileyici'
    },
    {
      id: 5,
      title: 'Adana Kebap',
      description: 'Geleneksel baharatlarla marine edilmiş, el ile yoğurulmuş kıyma ile hazırlanan, ateşte pişirilen klasik lezzet.',
      price: '40 TL',
      category: 'kebabs',
      image: '/images/adana-kebap.jpg',
      special: 'Klasik',
      origin: 'Geleneksel Tarif'
    },
    {
      id: 6,
      title: 'Urfa Kebap',
      description: 'Acısız baharatlarla hazırlanan, yumuşak kıvamda pişirilen, kömür ateşinde lezzetlendirilen kebap.',
      price: '40 TL',
      category: 'kebabs',
      image: '/images/urfa-kebap.jpg',
      special: 'Yumuşak',
      origin: 'Urfa Usulü'
    }
  ];
  
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <PageTitle>Menümüz</PageTitle>
          <PageDescription>1851'den beri süren gelenekle, Isparta'nın eşsiz lezzetlerini sofranıza getiriyoruz.</PageDescription>
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
                      {item.special && <SpecialBadge>{item.special}</SpecialBadge>}
                    </MenuItemHeader>
                    <MenuItemDescription>{item.description}</MenuItemDescription>
                    <MenuItemFooter>
                      <MenuItemPrice>{item.price}</MenuItemPrice>
                    </MenuItemFooter>
                    {item.origin && (
                      <MenuItemOrigin>{item.origin}</MenuItemOrigin>
                    )}
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