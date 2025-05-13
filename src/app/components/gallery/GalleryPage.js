"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

const PageContainer = styled.div`
  padding-top: 80px; // Headerın altında kalmaması için
`;

const HeroSection = styled.section`
  height: 40vh;
  background-image: url('/images/gallery-hero.jpg');
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

const GallerySection = styled.section`
  padding: 5rem 1rem;
  
  ${theme.media.md} {
    padding: 5rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 5rem 4rem;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  
  ${theme.media.md} {
    gap: 1rem;
  }
`;

const FilterTab = styled.button`
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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  ${theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${theme.media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
  
  ${theme.media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
  
  &:hover div {
    opacity: 1;
  }
`;

const GalleryImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: ${theme.colors.text.light};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.lg};
  text-align: center;
  padding: 1rem;
`;

const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const LightboxImage = styled.div`
  position: relative;
  width: 90%;
  height: 80%;
  max-width: 1200px;
  
  img {
    object-fit: contain;
  }
`;

const LightboxClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: ${theme.colors.text.light};
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
`;

const LightboxCaption = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  text-align: center;
  color: ${theme.colors.text.light};
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
`;

const NoItemsMessage = styled.p`
  text-align: center;
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.muted};
  margin: 3rem 0;
`;

// Örnek galeri kategorileri ve öğeleri
const galleryCategories = [
  { id: 'all', name: 'Tümü' },
  { id: 'food', name: 'Lezzetler' },
  { id: 'place', name: 'Mekan' },
  { id: 'team', name: 'Ekibimiz' },
  { id: 'events', name: 'Etkinlikler' }
];

const galleryItems = [
  {
    id: 1,
    title: 'Adana Kebap',
    category: 'food',
    image: '/images/adana-kebap.jpg'
  },
  {
    id: 2,
    title: 'Karışık Kebap',
    category: 'food',
    image: '/images/karisik-kebap.jpg'
  },
  {
    id: 3,
    title: 'Künefe',
    category: 'food',
    image: '/images/kunefe.jpg'
  },
  {
    id: 4,
    title: 'İç Mekan',
    category: 'place',
    image: '/images/restaurant-interior.jpg'
  },
  {
    id: 5,
    title: 'Bahçe',
    category: 'place',
    image: '/images/restaurant-garden.jpg'
  },
  {
    id: 6,
    title: 'Kadir Usta',
    category: 'team',
    image: '/images/kadir-usta.jpg'
  },
  {
    id: 7,
    title: 'Ekibimiz',
    category: 'team',
    image: '/images/team.jpg'
  },
  {
    id: 8,
    title: 'Özel Gece',
    category: 'events',
    image: '/images/special-event.jpg'
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);
  
  const openLightbox = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <PageTitle>Galeri</PageTitle>
          <PageDescription>Lezzetlerimiz, mekanımız ve özel anlardan kareler.</PageDescription>
        </HeroContent>
      </HeroSection>
      
      <GallerySection>
        <FilterTabs>
          {galleryCategories.map(category => (
            <FilterTab
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </FilterTab>
          ))}
        </FilterTabs>
        
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <GalleryGrid
              as={motion.div}
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredItems.map(item => (
                <GalleryItem
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => openLightbox(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{objectFit: "cover"}}
                  />
                  <GalleryImageOverlay>
                    {item.title}
                  </GalleryImageOverlay>
                </GalleryItem>
              ))}
            </GalleryGrid>
          ) : (
            <NoItemsMessage
              as={motion.p}
              key="no-items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Bu kategoride fotoğraf bulunmamaktadır.
            </NoItemsMessage>
          )}
        </AnimatePresence>
      </GallerySection>
      
      <AnimatePresence>
        {selectedImage && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <LightboxClose onClick={closeLightbox}>
              <FiX />
            </LightboxClose>
            <LightboxImage onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                style={{objectFit: "contain"}}
              />
              <LightboxCaption>
                {selectedImage.title}
              </LightboxCaption>
            </LightboxImage>
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}