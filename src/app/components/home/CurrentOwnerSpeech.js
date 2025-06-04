"use client"

import React, { useState, useEffect, useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme as importedThemeFile } from '../../styles/theme';
import Image from 'next/image';
import { FiAward, FiHeart, FiTrendingUp, FiUsers, FiMessageSquare } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

// --- START: Theme Handling ---
const fallbackTheme = {
  colors: {
    background: { main: '#ffffff', alt: '#f8f9fa' },
    secondary: { offwhite: '#f1f3f5' },
    primary: { red: '#e63946', orange: '#f77f00', yellow: '#fcbf49' },
    text: { light: '#ffffff', dark: '#212529', muted: '#6c757d' },
  },
  media: {
    xs: '@media (min-width: 480px)',
    sm: '@media (min-width: 640px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1280px)',
  },
  typography: {
    fontFamily: {
      heading: 'Arial, Helvetica, sans-serif',
      body: 'Roboto, Arial, sans-serif',
      accent: 'Georgia, serif',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    fontSize: {
      xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
      xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem',
      '5xl': '3rem',
    },
  },
};

// Deep merge utility
function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

const theme = deepMerge(fallbackTheme, importedThemeFile || {});
// --- END: Theme Handling ---

// --- START: Styled Components Definitions ---
const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.background.alt} 0%, 
    ${props => props.theme.colors.secondary.offwhite} 100%
  );
  position: relative;
  overflow: hidden;
  
  ${props => props.theme.media.md} {
    padding: 8rem 2rem;
  }
  
  ${props => props.theme.media.lg} {
    padding: 10rem 4rem;
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

const BackgroundQuote = styled.div`
  position: absolute;
  top: 20%;
  right: 5%;
  font-size: 20rem;
  color: ${props => props.theme.colors.primary.red};
  opacity: 0.03;
  z-index: 0;
  font-family: ${props => props.theme.typography.fontFamily.accent};
  transform: rotate(15deg);
  
  ${props => props.theme.media.sm} {
    font-size: 25rem;
  }
  
  ${props => props.theme.media.lg} {
    font-size: 30rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SpeechWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  
  ${props => props.theme.media.lg} {
    grid-template-columns: 400px 1fr;
  }
`;

const OwnerSection = styled(motion.div)`
  position: relative;
  justify-self: center;
  
  ${props => props.theme.media.lg} {
    justify-self: start;
  }
`;

const OwnerFrame = styled.div`
  position: relative;
  width: 280px;
  height: 500px;
  
  ${props => props.theme.media.md} {
    width: 350px;
    height: 620px;
  }
`;

const OwnerImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 75%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  
  ${props => props.theme.media.md} {
    height: 85%;
  }
  
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
  
  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      ${props => props.theme.colors.primary.red}, 
      ${props => props.theme.colors.primary.orange},
      ${props => props.theme.colors.primary.yellow}
    );
    border-radius: 18px;
    z-index: -1;
  }
`;

const OwnerNameCard = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.red} 0%, 
    ${props => props.theme.colors.primary.orange} 100%
  );
  padding: 0.75rem 0.5rem;
  border-radius: 0 0 16px 16px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(200, 44, 27, 0.3);
  
  ${props => props.theme.media.xs} {
    padding: 1rem;
  }
  
  ${props => props.theme.media.md} {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 95%;
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

const OwnerName = styled.h3`
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.text.light};
  margin-bottom: 0.25rem;
  
  ${props => props.theme.media.xs} {
    font-size: ${props => props.theme.typography.fontSize.lg};
    margin-bottom: 0.5rem;
  }
  
  ${props => props.theme.media.md} {
    font-size: ${props => props.theme.typography.fontSize.xl};
  }
`;

const OwnerTitle = styled.p`
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.secondary.offwhite};
  margin-bottom: 0.125rem;
  
  ${props => props.theme.media.xs} {
    font-size: ${props => props.theme.typography.fontSize.sm};
    margin-bottom: 0.25rem;
  }
  
  ${props => props.theme.media.md} {
    font-size: ${props => props.theme.typography.fontSize.base};
    margin-bottom: 0.5rem;
  }
`;

const OwnerYears = styled.p`
  font-family: ${props => props.theme.typography.fontFamily.accent};
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.secondary.offwhite};
  opacity: 0.9;
  
  ${props => props.theme.media.xs} {
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

const SpeechContainer = styled.div`
  position: relative;
`;

const SpeechHeader = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  color: ${props => props.theme.colors.text.dark};
  margin-bottom: 0.5rem;
  
  ${props => props.theme.media.md} {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.text.muted};
  font-style: italic;
`;

const SpeechQuoteContainer = styled(motion.div)`
  position: relative;
  background-color: ${props => props.theme.colors.background.main};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${props => props.theme.colors.primary.red};
  
  ${props => props.theme.media.md} {
    padding: 3rem;
  }
`;

const QuoteIcon = styled(motion.div)`
  position: absolute;
  top: -15px;
  left: 30px;
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.colors.primary.red};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text.light};
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(200, 44, 27, 0.3);
`;

const QuoteText = styled.p`
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.text.dark};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  min-height: 10em; 
  
  ${props => props.theme.media.md} {
    font-size: ${props => props.theme.typography.fontSize.xl};
  }
`;

const QuoteHighlight = styled.span`
  background: linear-gradient(120deg, ${props => props.theme.colors.primary.yellow}40 0%, ${props => props.theme.colors.primary.yellow}40 100%);
  background-repeat: no-repeat;
  background-size: 100% 0.4em;
  background-position: 0 88%;
  padding: 0 0.2rem;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.dark};
`;

const Cursor = styled(motion.span)`
  display: inline-block;
  width: 3px;
  height: 1.2em; 
  background-color: ${props => props.theme.colors.primary.red};
  margin-left: 3px;
  vertical-align: text-bottom; 
`;

const ExperienceGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const ExperienceCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.secondary.offwhite} 0%, 
    ${props => props.theme.colors.background.main} 100%
  );
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.orange};
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ExperienceIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary.red};
  margin-bottom: 1rem;
`;

const ExperienceNumber = styled.div`
  font-family: ${props => props.theme.typography.fontFamily.accent};
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary.red};
  margin-bottom: 0.5rem;
`;

const ExperienceLabel = styled.p`
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.text.dark};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;
// --- END: Styled Components Definitions ---

const CurrentOwnerSpeech = () => {
  const { t, currentLanguage } = useLanguage();
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const createSpeechParagraphs = useMemo(() => (t) => [
    t('home.owner_speech1'),
    t('home.owner_speech2').replace(/her tarif, her pişirme tekniği/g, '<QuoteHighlight>her tarif, her pişirme tekniği</QuoteHighlight>'),
    t('home.owner_speech3').replace(/Beş yıldızlı mutfağımızda/g, '<QuoteHighlight>Beş yıldızlı mutfağımızda</QuoteHighlight>'),
    t('home.owner_speech4')
  ], []);
  
  const speechParagraphs = useMemo(() => createSpeechParagraphs(t), [t, createSpeechParagraphs]);

  const parseParagraph = (paragraphText) => {
    const parts = [];
    let lastIndex = 0;
    const regex = /<QuoteHighlight>(.*?)<\/QuoteHighlight>/g; 
    let match;

    while ((match = regex.exec(paragraphText)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: paragraphText.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'highlight', content: match[1] });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < paragraphText.length) {
      parts.push({ type: 'text', content: paragraphText.substring(lastIndex) });
    }
    return parts;
  };
  
  const currentParagraphParts = useMemo(() => {
    if (currentParagraphIndex < speechParagraphs.length) {
      return parseParagraph(speechParagraphs[currentParagraphIndex]);
    }
    return [];
  }, [currentParagraphIndex, speechParagraphs]);

  const currentParagraphCleanLength = useMemo(() => {
    return currentParagraphParts.reduce((sum, part) => sum + part.content.length, 0);
  }, [currentParagraphParts]);

  useEffect(() => {
    if (!inView || currentParagraphIndex >= speechParagraphs.length || isTypingComplete) return;
    let typingInterval;
    if (displayedChars < currentParagraphCleanLength) {
      typingInterval = setInterval(() => {
        setDisplayedChars(prevChars => {
          if (prevChars < currentParagraphCleanLength) {
            return prevChars + 1;
          }
          clearInterval(typingInterval); 
          setIsTypingComplete(true);
          return prevChars;
        });
      }, 50); 
    } else if (!isTypingComplete) { 
        setIsTypingComplete(true);
    }
    return () => clearInterval(typingInterval);
  }, [inView, currentParagraphIndex, displayedChars, currentParagraphCleanLength, speechParagraphs.length, isTypingComplete]);

  useEffect(() => {
    if (isTypingComplete && currentParagraphIndex < speechParagraphs.length) {
      const nextParagraphTimeout = setTimeout(() => {
        if (currentParagraphIndex < speechParagraphs.length - 1) {
          setCurrentParagraphIndex(prevIndex => prevIndex + 1);
          setDisplayedChars(0); 
          setIsTypingComplete(false); 
        }
      }, 3000); 
      return () => clearTimeout(nextParagraphTimeout);
    }
  }, [isTypingComplete, currentParagraphIndex, speechParagraphs.length]);

  const renderTypedText = () => {
    if (currentParagraphIndex >= speechParagraphs.length) return null;
    let charsLeftToDisplay = displayedChars;
    const elements = [];
    for (let i = 0; i < currentParagraphParts.length; i++) {
      const part = currentParagraphParts[i];
      const partLength = part.content.length;
      if (charsLeftToDisplay <= 0) break; 
      const currentPartText = part.content.substring(0, Math.min(partLength, charsLeftToDisplay));
      if (part.type === 'highlight') {
        elements.push(<QuoteHighlight key={`part-${currentParagraphIndex}-${i}`}>{currentPartText}</QuoteHighlight>);
      } else {
        elements.push(<React.Fragment key={`part-${currentParagraphIndex}-${i}`}>{currentPartText}</React.Fragment>);
      }
      charsLeftToDisplay -= currentPartText.length;
    }
    return elements;
  };

  const createExperienceData = useMemo(() => (t) => [
    { icon: <FiAward />, number: "174", label: t('home.exp_years') },
    { icon: <FiUsers />, number: "4", label: t('home.exp_generations') },
    { icon: <FiTrendingUp />, number: "5", label: t('home.exp_star') },
    { icon: <FiHeart />, number: "1851", label: t('home.exp_founded') }
  ], []);
  
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer ref={ref}> 
        <BackgroundPattern />
        <BackgroundQuote>"</BackgroundQuote>
        
        <ContentContainer>
          <SpeechWrapper
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <OwnerSection
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <OwnerFrame>
                <OwnerImageWrapper>
                  <Image
                    src="/images/huseyin_acikalin.png" 
                    alt="Hüseyin Açıkalın"
                    fill
                    sizes="(max-width: 768px) 300px, 350px" 
                    style={{objectFit: "cover"}}
                    priority 
                  />
                </OwnerImageWrapper>
                <OwnerNameCard
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <OwnerName>Hüseyin Açıkalın</OwnerName>
                  <OwnerTitle>{currentLanguage === 'tr' ? '4. Kuşak Temsilcisi' : 
                                currentLanguage === 'en' ? '4th Generation Representative' : 
                                '4. Generation Vertreter'}</OwnerTitle>
                  <OwnerYears>{currentLanguage === 'tr' ? '1985 - Günümüz' : 
                             currentLanguage === 'en' ? '1985 - Present' : 
                             '1985 - Gegenwart'}</OwnerYears>
                </OwnerNameCard>
              </OwnerFrame>
            </OwnerSection>
            
            <SpeechContainer>
              <SpeechHeader>
                <SectionTitle
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {t('home.owner_title')}
                </SectionTitle>
                <SectionSubtitle
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {t('home.owner_subtitle')}
                </SectionSubtitle>
              </SpeechHeader>
              
              <SpeechQuoteContainer
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <QuoteIcon
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FiMessageSquare />
                </QuoteIcon>
                
                <QuoteText>
                  {currentParagraphIndex < speechParagraphs.length ? (
                    <>
                      {renderTypedText()}
                      {!isTypingComplete && currentParagraphCleanLength > 0 && displayedChars < currentParagraphCleanLength && (
                         <Cursor
                           animate={{ opacity: [1, 0] }}
                           transition={{ duration: 0.8, repeat: Infinity }}
                         />
                      )}
                    </>
                  ) : ( 
                    <>
                      {speechParagraphs.map((paragraph, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.15 }} 
                        >
                          {parseParagraph(paragraph).map((part, partIndex) => 
                            part.type === 'highlight' ? (
                              <QuoteHighlight key={`${index}-${partIndex}`}>{part.content}</QuoteHighlight>
                            ) : (
                              <React.Fragment key={`${index}-${partIndex}`}>{part.content}</React.Fragment>
                            )
                          )}
                          {index < speechParagraphs.length - 1 && <><br /><br /></>}
                        </motion.span>
                      ))}
                    </>
                  )}
                </QuoteText>
              </SpeechQuoteContainer>
              
              <ExperienceGrid
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: (currentParagraphIndex >= speechParagraphs.length ? 0.5 : 1.4) }} 
              >
                {createExperienceData(t).map((item, index) => (
                  <ExperienceCard
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: (currentParagraphIndex >= speechParagraphs.length ? 0.5 : 1.4) + index * 0.1 
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <ExperienceIcon>{item.icon}</ExperienceIcon>
                    <ExperienceNumber>{item.number}</ExperienceNumber>
                    <ExperienceLabel>{item.label}</ExperienceLabel>
                  </ExperienceCard>
                ))}
              </ExperienceGrid>
            </SpeechContainer>
          </SpeechWrapper>
        </ContentContainer>
      </SectionContainer>
    </ThemeProvider>
  );
};

export default CurrentOwnerSpeech;