"use client"

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import { FiChevronLeft, FiChevronRight, FiStar, FiMapPin, FiCalendar } from 'react-icons/fi';
import Image from 'next/image';

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background: linear-gradient(180deg, 
    ${theme.colors.background.main} 0%, 
    ${theme.colors.secondary.offwhite} 50%,
    ${theme.colors.background.main} 100%
  );
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
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C82C1B' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
  max-width: 700px;
  margin: 2rem auto 0;
  line-height: 1.8;
`;

const SliderContainer = styled(motion.div)`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  z-index: 1;
`;

const TestimonialSlider = styled.div`
  overflow: hidden;
  padding: 1rem 0;
`;

const TestimonialTrack = styled(motion.div)`
  display: flex;
  transition: transform 0.5s ease;
`;

const TestimonialSlide = styled.div`
  min-width: 100%;
  padding: 0 1rem;
`;

const TestimonialCard = styled.div`
  background-color: ${theme.colors.background.main};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  height: 100%;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, 
      ${theme.colors.primary.red}, 
      ${theme.colors.primary.orange}
    );
  }
`;

const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const QuoteMarkContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 4rem;
  color: ${theme.colors.primary.red};
  opacity: 0.1;
  font-family: ${theme.typography.fontFamily.accent};
`;

const TestimonialQuote = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  line-height: 1.8;
  margin-bottom: 2rem;
  font-style: italic;
  flex-grow: 1;
  
  ${theme.media.md} {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

const TestimonialStars = styled.div`
  display: flex;
  gap: 0.25rem;
  color: ${theme.colors.primary.yellow};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const TestimonialFooter = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
  margin-top: auto;
`;

const TestimonialImageContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 3px solid ${theme.colors.primary.orange};
  box-shadow: 0 0 0 3px ${theme.colors.secondary.beige};
`;

const TestimonialAuthor = styled.div``;

const TestimonialName = styled.h4`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  margin-bottom: 0.25rem;
`;

const TestimonialInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TestimonialRole = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TestimonialDate = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.primary.orange};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.colors.background.main};
  border: 2px solid ${theme.colors.secondary.beige};
  color: ${theme.colors.text.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: ${theme.colors.primary.red};
    color: ${theme.colors.text.light};
    border-color: ${theme.colors.primary.red};
    transform: translateY(-50%) scale(1.1);
  }
  
  ${({ direction }) => direction === 'left' && `
    left: -25px;
    
    ${theme.media.md} {
      left: -60px;
    }
  `}
  
  ${({ direction }) => direction === 'right' && `
    right: -25px;
    
    ${theme.media.md} {
      right: -60px;
    }
  `}
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
`;

const SliderDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? theme.colors.primary.red : theme.colors.secondary.beige};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background-color: ${props => props.active ? theme.colors.primary.red : theme.colors.primary.orange};
    transform: scale(1.2);
  }
  
  ${props => props.active && `
    &:after {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border: 2px solid ${theme.colors.primary.red};
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(1.2); }
      100% { opacity: 0.7; transform: scale(1); }
    }
  `}
`;

// Güncellenmiş müşteri yorumları - Isparta kebabı ve yerel kültürü yansıtan
const testimonials = [
  {
    id: 1,
    quote: "1851'den beri süren bu gelenek, sadece Isparta'da yaşanabilecek bir deneyim. Fırın kebabının o eşsiz lezzeti, üzüm şırasıyla perfect uyum... Büyüklerimin anlattığı tadın aynısını buldum burada.",
    author: "Prof. Dr. Mehmet Yılmaz",
    role: "Isparta Doğumlu",
    location: "Isparta",
    avatar: "/images/testimonial-1.jpg",
    stars: 5,
    date: "Aralık 2023"
  },
  {
    id: 2,
    quote: "Isparta'ya iş için geldim ama Kebapçı Kadir'i keşfettiğimde şehri tekrar ziyaret etmek için bahane aramaya başladım. O çalı kökü kokusu, közde pişen etlerin sesi... Unutulmaz bir deneyim.",
    author: "Ayşe Demir",
    role: "İstanbul Sakini",
    location: "İstanbul → Isparta",
    avatar: "/images/testimonial-2.jpg",
    stars: 5,
    date: "Ocak 2024"
  },
  {
    id: 3,
    quote: "Hafız Dede'nin döneminden kalma o otantik tarif, Hüseyin Usta'nın ellerinde yeniden hayat buluyor. Gül şehrinin bu saklı cevheri, gerçek bir lezzet hazinesi.",
    author: "Osman Kaya",
    role: "Gıda Kritik",
    location: "Antalya",
    avatar: "/images/testimonial-3.jpg",
    stars: 5,
    date: "Kasım 2023"
  },
  {
    id: 4,
    quote: "Kabune pilavının o efsanevi hikayesi kadar lezzetli! 'GIBUNE'dan 'KABUNE'ya uzanan bu miras, her lokmada hissediliyor. Aile olarak düzenli ziyaret ettiğimiz tek restoran.",
    author: "Fatma Özkan",
    role: "Yerel Aile",
    location: "Isparta",
    avatar: "/images/testimonial-4.jpg",
    stars: 5,
    date: "Şubat 2024"
  }
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  // Otomatik kaydırma
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <SectionContainer ref={ref}>
      <BackgroundPattern />
      
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Misafirlerimizden
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          172 yıldır aynı lezzetle ağırladığımız değerli misafirlerimizin 
          deneyimleri ve anıları.
        </SectionSubtitle>
      </SectionHeader>
      
      <SliderContainer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SliderButton 
          direction="left" 
          onClick={prevSlide}
          aria-label="Önceki yorum"
        >
          <FiChevronLeft />
        </SliderButton>
        
        <TestimonialSlider>
          <TestimonialTrack style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <TestimonialSlide key={testimonial.id}>
                <TestimonialCard>
                  <QuoteMarkContainer>&ldquo;</QuoteMarkContainer>
                  <TestimonialContent>
                    <TestimonialStars>
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <FiStar key={i} />
                      ))}
                    </TestimonialStars>
                    <TestimonialQuote>
                      {testimonial.quote}
                    </TestimonialQuote>
                    <TestimonialFooter>
                      <TestimonialImageContainer>
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          fill
                          style={{objectFit: "cover"}}
                        />
                      </TestimonialImageContainer>
                      <TestimonialAuthor>
                        <TestimonialName>{testimonial.author}</TestimonialName>
                        <TestimonialInfo>
                          <TestimonialRole>
                            <FiMapPin size={14} />
                            {testimonial.role} • {testimonial.location}
                          </TestimonialRole>
                          <TestimonialDate>
                            <FiCalendar size={14} />
                            {testimonial.date}
                          </TestimonialDate>
                        </TestimonialInfo>
                      </TestimonialAuthor>
                    </TestimonialFooter>
                  </TestimonialContent>
                </TestimonialCard>
              </TestimonialSlide>
            ))}
          </TestimonialTrack>
        </TestimonialSlider>
        
        <SliderButton 
          direction="right" 
          onClick={nextSlide}
          aria-label="Sonraki yorum"
        >
          <FiChevronRight />
        </SliderButton>
        
        <SliderDots>
          {testimonials.map((_, index) => (
            <SliderDot
              key={index}
              active={currentSlide === index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`${index + 1}. yoruma git`}
            />
          ))}
        </SliderDots>
      </SliderContainer>
    </SectionContainer>
  );
};

export default Testimonials;