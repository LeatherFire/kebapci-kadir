"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import Image from 'next/image';
import { FiClock, FiThermometer, FiDroplet, FiShield, FiHeart, FiTrendingUp, FiMapPin } from 'react-icons/fi';
import { FaLeaf } from "react-icons/fa6";


const PageContainer = styled.div`
  padding-top: 80px;
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

// Malzeme Kalitesi Bölümü
const IngredientsQualitySection = styled.section`
  padding: 5rem 1rem;
  background: linear-gradient(135deg, 
    ${theme.colors.background.main} 0%, 
    ${theme.colors.secondary.offwhite} 50%,
    ${theme.colors.background.main} 100%
  );
  position: relative;
  overflow: hidden;
  
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
    radial-gradient(circle at 25% 25%, rgba(200, 44, 27, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(216, 91, 10, 0.05) 0%, transparent 50%);
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
  max-width: 800px;
  margin: 2rem auto 0;
  line-height: 1.8;
`;

// Malzeme Kartları - Yeniden Tasarlanmış
const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-top: 4rem;
  
  ${theme.media.md} {
    grid-template-columns: 1fr;
  }
  
  ${theme.media.lg} {
    grid-template-columns: 1fr;
  }
`;

const IngredientCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    ${theme.colors.background.main} 0%, 
    rgba(200, 44, 27, 0.02) 100%
  );
  border-radius: 20px;
  padding: 3rem;
  text-align: left;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  min-height: 400px;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, 
      ${theme.colors.primary.red}, 
      ${theme.colors.primary.orange},
      ${theme.colors.primary.yellow}
    );
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, 
      rgba(200, 44, 27, 0.05) 0%, 
      transparent 70%
    );
    opacity: 0.5;
  }
`;

const IngredientHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const IngredientIconContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: linear-gradient(135deg, 
    ${theme.colors.secondary.offwhite} 0%, 
    ${theme.colors.background.main} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 2px solid ${theme.colors.background.main};
`;

const IngredientTitleSection = styled.div``;

const IngredientTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.text.dark};
  margin-bottom: 0.5rem;
`;

const IngredientSubtitle = styled.p`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.primary.orange};
  font-style: italic;
`;

const IngredientDescription = styled.div`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  line-height: 1.8;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1rem;
  }
`;

const IngredientDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const IngredientDetailCard = styled.div`
  background-color: ${theme.colors.background.main};
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid ${theme.colors.secondary.beige};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${theme.colors.primary.orange};
    transform: translateY(-3px);
  }
`;

const DetailTitle = styled.h4`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.dark};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${theme.colors.primary.red};
  }
`;

const DetailText = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.muted};
  line-height: 1.5;
`;

const IngredientHighlight = styled.div`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.yellow}20 0%, 
    ${theme.colors.primary.orange}20 100%
  );
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid ${theme.colors.primary.orange};
  position: relative;
  
  &:before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 3rem;
    color: ${theme.colors.primary.orange};
    font-family: ${theme.typography.fontFamily.accent};
  }
`;

const HighlightText = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.dark};
  font-style: italic;
  margin: 0;
  padding-left: 1rem;
`;

// Kalite Güvencesi - Geliştirilmiş
const QualityAssurance = styled.div`
  margin-top: 8rem;
  padding: 4rem;
  background: linear-gradient(135deg, 
    ${theme.colors.background.main} 0%, 
    ${theme.colors.secondary.offwhite} 100%
  );
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, 
      rgba(200, 44, 27, 0.03) 0%, 
      transparent 50%
    );
    animation: rotate 30s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const QualityTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.text.dark};
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, 
      ${theme.colors.primary.red}, 
      ${theme.colors.primary.orange}
    );
    border-radius: 2px;
  }
`;

const QualitySubtitle = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.muted};
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const QualityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  position: relative;
  
  ${theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${theme.media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const QualityItem = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 16px;
  background-color: ${theme.colors.background.main};
  transition: all 0.4s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    
    &:before {
      opacity: 1;
    }
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
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

const QualityIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    ${theme.colors.primary.red}20 0%, 
    ${theme.colors.primary.orange}20 100%
  );
  font-size: 2rem;
  color: ${theme.colors.primary.red};
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  ${QualityItem}:hover & {
    transform: scale(1.1);
    background: linear-gradient(135deg, 
      ${theme.colors.primary.red}30 0%, 
      ${theme.colors.primary.orange}30 100%
    );
  }
`;

const QualityText = styled.div`
  h4 {
    font-family: ${theme.typography.fontFamily.heading};
    font-weight: ${theme.typography.fontWeight.semibold};
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.dark};
    margin-bottom: 0.5rem;
  }
  
  p {
    font-family: ${theme.typography.fontFamily.body};
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.muted};
    line-height: 1.6;
  }
`;

// Menü Bölümü
const MenuSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${theme.colors.background.alt};
  
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

const MenuGrid = styled.div`
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

const MenuItem = styled(motion.div)`
  background-color: ${theme.colors.background.main};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const MenuItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const MenuItemContent = styled.div`
  padding: 1.5rem;
`;

const MenuItemTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  margin-bottom: 0.75rem;
`;

const MenuItemDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  line-height: 1.6;
`;

// 4 Özel Yemek Hikayeleri Bölümü
const SpecialDishesSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${theme.colors.background.main};
  
  ${theme.media.md} {
    padding: 6rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 8rem 4rem;
  }
`;

const DishStoryCard = styled(motion.div)`
  background-color: ${theme.colors.background.alt};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 4rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  
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
  }
`;

const DishStoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  
  ${theme.media.lg} {
    grid-template-columns: 1fr 1fr;
  }
`;

const DishStoryImageContainer = styled.div`
  position: relative;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  
  ${theme.media.lg} {
    height: 400px;
  }
`;

const DishStoryContent = styled.div``;

const DishStoryTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.text.dark};
  margin-bottom: 1rem;
`;

const DishStoryBadge = styled.span`
  display: inline-block;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: 1rem;
`;

const DishStoryDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const DishStoryFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DishStoryFeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: ${theme.colors.background.main};
  padding: 0.75rem;
  border-radius: 8px;
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.dark};
  
  svg {
    color: ${theme.colors.primary.red};
    flex-shrink: 0;
  }
`;

const DishStoryHighlight = styled.p`
  font-family: ${theme.typography.fontFamily.accent};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.primary.orange};
  font-style: italic;
  border-left: 4px solid ${theme.colors.primary.orange};
  padding-left: 1rem;
`;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const menuCategories = [
    { id: 'all', name: 'Tümü' },
    { id: 'kebabs', name: 'Kebaplar' },
    { id: 'meats', name: 'Et Yemekleri' },
    { id: 'appetizers', name: 'Mezeler' },
    { id: 'rice', name: 'Pilavlar' },
    { id: 'desserts', name: 'Tatlılar' },
    { id: 'drinks', name: 'İçecekler' }
  ];

  const menuItems = [
    {
      id: 1,
      title: 'Adana Kebap',
      description: 'Özel baharatlarla marine edilmiş kıyma, ateşte ustaca pişirilir.',
      category: 'kebabs',
      image: '/images/adana-kebap.jpg'
    },
    {
      id: 2,
      title: 'Urfa Kebap',
      description: 'Acısız, aromatik baharatlarla hazırlanan yumuşacık kebap.',
      category: 'kebabs',
      image: '/images/urfa-kebap.jpg'
    },
    {
      id: 3,
      title: 'Karışık Izgara',
      description: 'Çeşit çeşit etlerin bir araya geldiği muhteşem lezzet.',
      category: 'meats',
      image: '/images/karisik-izgara.jpg'
    }
  ];

  const specialDishes = [
    {
      id: 1,
      title: 'Isparta Fırın Kebabı',
      badge: '172 Yıllık Gelenek',
      description: 'Hayvanlar doğal ortamlarında yetiştirilip, kesim aşamasında hijyenik ortamda eti ayrıştırılır. Mezbahaneden işletmemize kendi kapalı arabamızla getirilip, böbrek yağları ve kan damarları temizlenen etlerimizi önceden yakılıp ısıtılan fırında 3 - 3.5 saat aralığında çalı kökü odunuyla 2 saat alev 1 saat korda pişirilir.',
      image: '/images/isparta-kebabi.jpg',
      features: [
        { icon: <FiThermometer />, text: 'Çalı Kökü Odunu' },
        { icon: <FiClock />, text: '3.5 Saat Pişirme' },
        { icon: <FiDroplet />, text: '%50 Fire' },
        { icon: <FiShield />, text: '100% Doğal' }
      ],
      highlight: 'Fırından çıkan nar gibi kuzu etini kendine özgü bakır tabaklarda lavaş ekmeği üzerine servise yapılır.',
      direction: 'normal'
    },
    {
      id: 2,
      title: 'Kabune Pilavı',
      badge: 'Efsaneli Lezzet',
      description: 'Dolgun pirinçten yapılan pilavımız tatlı soğanın halka halka doğranıp karabiber ve tuz ile ovularak bakır kazanların altına konur. Üzerine haşlanmış nohut ilave edilir. Nohutun üzerine önceden haşlanmış kuzu kaburgalarının etlerinin didilerek üzerine takviye olur.',
      image: '/images/kabune-pilavi.jpg',
      features: [
        { icon: <FiClock />, text: '15 Dakika Pişirme' },
        { icon: <FiThermometer />, text: 'Saç Ayağında' },
        { icon: <FiMapPin />, text: 'Üzüm Asması Çırpısı' },
        { icon: <FiHeart />, text: 'Doyurucu Yemek' }
      ],
      highlight: 'Kız Bu NE anlamına gelen GIBUNE pilavı günümüze kadar KABUNE Pilavı olarak ismi değişerek bugünlere gelmiştir.',
      direction: 'reverse'
    },
    {
      id: 3,
      title: 'İrmik Helvası',
      badge: 'Hakiki Tereyağı',
      description: 'O numara sarı irmiğin hakiki tereyağı ve kunar fıstığıyla büyük bakır kazanlarda mangal kömürü ateşinde kaynatılarak belirli bir kıvama gelinceye kadar hiç ara vermeden ahşap küreği ile karıştırılarak pişirilir.',
      image: '/images/irmik-helvasi.jpg',
      features: [
        { icon: <FiThermometer />, text: 'Mangal Kömürü' },
        { icon: <FiClock />, text: 'Sürekli Karıştırma' },
        { icon: <FiDroplet />, text: 'Hakiki Tereyağı' },
        { icon: <FaLeaf />, text: 'Antep Fıstığı' }
      ],
      highlight: 'Servisi soğuk ve sıcak olarak sunulur.',
      direction: 'normal'
    },
    {
      id: 4,
      title: 'Üzüm Şırası',
      badge: 'Sağlık Deposu',
      description: 'Yöremizin siyah Dimlit üzümlerinini kurutularak ve çöpleri ayrıştırılarak temizliği yapıldıktan sonra yarım kazan su içerisinde şişinceye kadar kaynatılır. Kaynama esnasında içerisine tülbent içerisinde mersin yaprağı karanfil ve tatlı kabuk konularak kaynatmaya devam edilir.',
      image: '/images/uzum-sirasi.jpg',
      features: [
        { icon: <FaLeaf />, text: 'Dimlit Üzümü' },
        { icon: <FiHeart />, text: 'Mersin Yaprağı' },
        { icon: <FiDroplet />, text: 'Karanfil & Tatlı Kabuk' },
        { icon: <FiTrendingUp />, text: 'Protein-Glikoz Dengesi' }
      ],
      highlight: 'Kebabın yanında tercih edilmesinin sebebi besin değeri olarak etin protein, üzüm hoşafınında glikoz ihtiva etmesinden dolayı insan vücudunda bir birini parçalar.',
      direction: 'reverse'
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
          <PageDescription>
            1851'den beri süren gelenek, en kaliteli malzemeler ve ustalık...
          </PageDescription>
        </HeroContent>
      </HeroSection>

      {/* Malzeme Kalitesi Bölümü */}
      <IngredientsQualitySection>
        <BackgroundPattern />
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Malzemelerimizin Kalitesi
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Lezzetin temelinde kaliteli malzeme vardır. Yılların tecrübesiyle 
            en uygun tedarikçilerden aldığımız en taze malzemelerle hazırladığımız yemekler.
          </SectionSubtitle>
        </SectionHeader>

        {/* Malzeme Kalitesi İçerik Kartları */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <IngredientsGrid>
            <IngredientCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <IngredientHeader>
                <IngredientIconContainer>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🥩
                  </motion.div>
                </IngredientIconContainer>
                <IngredientTitleSection>
                  <IngredientTitle>Premium Etlerimiz</IngredientTitle>
                  <IngredientSubtitle>Doğal ve Sağlıklı Seçim</IngredientSubtitle>
                </IngredientTitleSection>
              </IngredientHeader>
              
              <IngredientDescription>
                <p>Hayvanlar doğal ortamlarında yetiştirilip, kesim aşamasında en hijyenik koşullarda eti ayrıştırılır. Mezbahaneden işletmemize kendi kapalı arabamızla getirilen etlerimiz, böbrek yağları ve kan damarları özenle temizlenir.</p>
                <p>Etlerimiz 100% doğaldır ve kolesterolü yok denecek kadar azdır. Kızarmış yağ doymuş yağdır ve vücuttaki doymamış yağları erittiği bilinmektedir.</p>
              </IngredientDescription>
              
              <IngredientDetails>
                <IngredientDetailCard>
                  <DetailTitle>
                    <FiShield /> Hijyen Standardı
                  </DetailTitle>
                  <DetailText>En strict hijyen koşullarında ayrıştırma ve temizleme işlemleri yapılır.</DetailText>
                </IngredientDetailCard>
                <IngredientDetailCard>
                  <DetailTitle>
                    <FiThermometer /> Soğuk Zincir
                  </DetailTitle>
                  <DetailText>Kendi araçlarımızla soğuk zincir korunarak taşınır.</DetailText>
                </IngredientDetailCard>
                <IngredientDetailCard>
                  <DetailTitle>
                    <FiHeart /> Sağlık Değeri
                  </DetailTitle>
                  <DetailText>Kolesterolü minimal, protein değeri maksimum.</DetailText>
                </IngredientDetailCard>
              </IngredientDetails>
              
              <IngredientHighlight>
                <HighlightText>
                  Böbrek yağları ve kan damarları özenle temizlenen etlerimiz, vücutta doymuş yağları eritme özelliğine sahiptir.
                </HighlightText>
              </IngredientHighlight>
            </IngredientCard>

            <IngredientCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <IngredientHeader>
                <IngredientIconContainer>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌶️
                  </motion.div>
                </IngredientIconContainer>
                <IngredientTitleSection>
                  <IngredientTitle>Özel Baharatlarımız</IngredientTitle>
                  <IngredientSubtitle>Gizli Tarif & Harmanlama Sanatı</IngredientSubtitle>
                </IngredientTitleSection>
              </IngredientHeader>
              
              <IngredientDescription>
                <p>Özel baharatlarımız Antep ve Urfa'dan getirilen en taze karabiberler ile özenle harmanlanır. Her karışım ustalık gerektiren bir sanattır ve ailemizin gizli tarifidir.</p>
                <p>Nesillerce aktarılan özel harmanlama teknikleri ile hazırlanan baharat karışımlarımız, yemeklerimize eşsiz aroma ve lezzet katar.</p>
              </IngredientDescription>
              
              <IngredientDetails>
                <IngredientDetailCard>
                  <DetailTitle>
                    <FiMapPin /> Coğrafi Köken
                  </DetailTitle>
                  <DetailText>Antep ve Urfa'dan özel olarak getirilen premium baharatlar.</DetailText>
                </IngredientDetailCard>
                <IngredientDetailCard>
                  <DetailTitle>
                    <FaLeaf /> Taze Karabiber
                  </DetailTitle>
                  <DetailText>Her gün taze çekilmiş, aromatik karabiber.</DetailText>
                </IngredientDetailCard>
                <IngredientDetailCard>
                  <DetailTitle>
                    <FiHeart /> Gizli Formül
                  </DetailTitle>
                  <DetailText>172 yıldır korunan aile formülü ile harmanlama.</DetailText>
                </IngredientDetailCard>
              </IngredientDetails>
              
              <IngredientHighlight>
                <HighlightText>
                  Baharatlarımızın gizli tarifi, Hafız Dede'den günümüze nesilden nesile aktarılan kutsal bir mirastır.
                </HighlightText>
              </IngredientHighlight>
            </IngredientCard>

            <IngredientCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <IngredientHeader>
                <IngredientIconContainer>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    🌾
                  </motion.div>
                </IngredientIconContainer>
                <IngredientTitleSection>
                  <IngredientTitle>Pirinç & Tahıllar</IngredientTitle>
                  <IngredientSubtitle>Seçilmiş Kalite & Dolgunluk</IngredientSubtitle>
                </IngredientTitleSection>
              </IngredientHeader>
              
              <IngredientDescription>
                <p>Dolgun pirinçlerimiz özenle seçilir ve temizliği yapılır. O numara sarı irmiğimiz en kaliteli üreticilerden temin edilir. Her tahıl tek tek gözden geçirilir.</p>
                <p>Pirinçlerimiz ıslatılıp temizliği yapıldıktan sonra, geleneksel yöntemlerle pişirilir ve mükemmel kıvamı yakalanır.</p>
              </IngredientDescription>
              
              <IngredientDetails>
                <IngredientDetailCard>
                  <DetailTitle>
                    <FiDroplet /> Dolgun Taneli
                  </DetailTitle>
                  <DetailText>Premium kalite, dolgun taneli pirinç seçimi.</DetailText>
                </IngredientDetailCard>
                <IngredientDetailCard>
                  <DetailTitle>
                    <FaLeaf /> O Numara Irmik
                  </DetailTitle>
                  <DetailText>En kaliteli sarı irmik, özel tedarikçilerden.</DetailText>
                </IngredientDetailCard>
                <IngredientDetailCard>
                  <DetailTitle>
                    <FiShield /> Temizlik Süreci
                  </DetailTitle>
                  <DetailText>Tek tek kontrol, özenli yıkama ve temizlik.</DetailText>
                </IngredientDetailCard>
              </IngredientDetails>
              
              <IngredientHighlight>
                <HighlightText>
                  Pirinçlerimiz bire birbuçuk ölçeğinde et suyuyla pişirilir ve saç ayağında üzüm asmasının çırpısıyla mükemmel lezzeti yakalar.
                </HighlightText>
              </IngredientHighlight>
            </IngredientCard>
          </IngredientsGrid>
        </motion.div>

        {/* Kalite Güvencesi Bölümü */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <QualityAssurance>
            <QualityTitle>Kalite Güvencemiz</QualityTitle>
            <QualitySubtitle>
              172 yıllık deneyimimizle, en yüksek kalite standartlarını garanti ediyoruz. 
              Her aşamada titizlikle kontrol edilen süreçlerimiz.
            </QualitySubtitle>
            <QualityGrid>
              <QualityItem>
                <QualityIcon>
                  <FiShield />
                </QualityIcon>
                <QualityText>
                  <h4>Hijyenik Koşullar</h4>
                  <p>Tüm malzemeler en strict hijyen koşullarında hazırlanır. Her aşamada sağlık kontrolleri yapılır.</p>
                </QualityText>
              </QualityItem>
              <QualityItem>
                <QualityIcon>
                  <FiClock />
                </QualityIcon>
                <QualityText>
                  <h4>Günlük Tedarik</h4>
                  <p>Malzemeler sabah erken saatlerde taze olarak temin edilir. Her gün yeni, hiçbir zaman önceki gün kalma.</p>
                </QualityText>
              </QualityItem>
              <QualityItem>
                <QualityIcon>
                  <FiThermometer />
                </QualityIcon>
                <QualityText>
                  <h4>Soğuk Zincir</h4>
                  <p>Kendi araçlarımız ile soğuk zincir korunur. Taşıma sürecinde hiçbir kalite kaybı yaşanmaz.</p>
                </QualityText>
              </QualityItem>
              <QualityItem>
                <QualityIcon>
                  <FiHeart />
                </QualityIcon>
                <QualityText>
                  <h4>Sağlıklı Seçim</h4>
                  <p>100% doğal, katkısız malzemeler. Hiçbir kimyasal koruyucu veya katkı maddesi kullanılmaz.</p>
                </QualityText>
              </QualityItem>
            </QualityGrid>
          </QualityAssurance>
        </motion.div>
      </IngredientsQualitySection>

      {/* Menü Bölümü */}
      <MenuSection>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Menü
          </SectionTitle>
        </SectionHeader>

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
          <MenuGrid
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
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
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
                  <MenuItemTitle>{item.title}</MenuItemTitle>
                  <MenuItemDescription>{item.description}</MenuItemDescription>
                </MenuItemContent>
              </MenuItem>
            ))}
          </MenuGrid>
        </AnimatePresence>
      </MenuSection>

      {/* 4 Özel Yemek Hikayeleri */}
      <SpecialDishesSection>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Özel Lezzetlerimiz ve Hikayeleri
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Her bir lezzetimizin arkasında yıllarca aktarılan bir hikaye, 
            bir ustalık ve bir tutku var.
          </SectionSubtitle>
        </SectionHeader>

        {specialDishes.map((dish, index) => (
          <DishStoryCard
            key={dish.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <DishStoryGrid style={{ 
              gridTemplateColumns: dish.direction === 'reverse' ? '1fr 1fr' : '1fr 1fr'
            }}>
              {dish.direction === 'reverse' ? (
                <>
                  <DishStoryContent>
                    <DishStoryBadge>{dish.badge}</DishStoryBadge>
                    <DishStoryTitle>{dish.title}</DishStoryTitle>
                    <DishStoryDescription>{dish.description}</DishStoryDescription>
                    <DishStoryFeatures>
                      {dish.features.map((feature, idx) => (
                        <DishStoryFeatureItem key={idx}>
                          {feature.icon}
                          <span>{feature.text}</span>
                        </DishStoryFeatureItem>
                      ))}
                    </DishStoryFeatures>
                    <DishStoryHighlight>{dish.highlight}</DishStoryHighlight>
                  </DishStoryContent>
                  <DishStoryImageContainer>
                    <Image
                      src={dish.image}
                      alt={dish.title}
                      fill
                      style={{objectFit: "cover"}}
                    />
                  </DishStoryImageContainer>
                </>
              ) : (
                <>
                  <DishStoryImageContainer>
                    <Image
                      src={dish.image}
                      alt={dish.title}
                      fill
                      style={{objectFit: "cover"}}
                    />
                  </DishStoryImageContainer>
                  <DishStoryContent>
                    <DishStoryBadge>{dish.badge}</DishStoryBadge>
                    <DishStoryTitle>{dish.title}</DishStoryTitle>
                    <DishStoryDescription>{dish.description}</DishStoryDescription>
                    <DishStoryFeatures>
                      {dish.features.map((feature, idx) => (
                        <DishStoryFeatureItem key={idx}>
                          {feature.icon}
                          <span>{feature.text}</span>
                        </DishStoryFeatureItem>
                      ))}
                    </DishStoryFeatures>
                    <DishStoryHighlight>{dish.highlight}</DishStoryHighlight>
                  </DishStoryContent>
                </>
              )}
            </DishStoryGrid>
          </DishStoryCard>
        ))}
      </SpecialDishesSection>
    </PageContainer>
  );
}