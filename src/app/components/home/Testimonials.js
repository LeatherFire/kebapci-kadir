"use client"

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import Image from 'next/image';

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

const SliderContainer = styled(motion.div)`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
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
  background-color: ${theme.colors.background.alt};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TestimonialQuote = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.dark};
  line-height: 1.8;
  margin-bottom: 2rem;
  font-style: italic;
  position: relative;
  flex-grow: 1;
  
  &:before, &:after {
    content: '"';
    font-family: ${theme.typography.fontFamily.accent};
    font-size: 2.5rem;
    color: ${theme.colors.primary.red};
    position: absolute;
    opacity: 0.3;
  }
  
  &:before {
    top: -1.5rem;
    left: -0.5rem;
  }
  
  &:after {
    bottom: -2.5rem;
    right: -0.5rem;
  }
`;

const TestimonialStars = styled.div`
  display: flex;
  color: ${theme.colors.primary.yellow};
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const TestimonialFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
`;

const TestimonialImageContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;

const TestimonialAuthor = styled.div``;

const TestimonialName = styled.h4`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.dark};
`;

const TestimonialRole = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.muted};
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.background.main};
  border: 1px solid ${theme.colors.secondary.beige};
  color: ${theme.colors.text.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.primary.red};
    color: ${theme.colors.text.light};
    border-color: ${theme.colors.primary.red};
  }
  
  ${({ direction }) => direction === 'left' && `
    left: -20px;
    
    ${theme.media.md} {
      left: -50px;
    }
  `}
  
  ${({ direction }) => direction === 'right' && `
    right: -20px;
    
    ${theme.media.md} {
      right: -50px;
    }
  `}
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const SliderDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? theme.colors.primary.red : theme.colors.secondary.beige};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? theme.colors.primary.red : theme.colors.secondary.anthracite};
  }
`;

// Örnek müşteri yorumları
const testimonials = [
  {
    id: 1,
    quote: "Mersin'de yaşadığım 15 yıl boyunca keşfettiğim en iyi kebapçı. Kadir Usta'nın ellerinden çıkan Adana kebap, gerçekten memleket lezzetini yansıtıyor. Ailece sık sık gidiyoruz.",
    author: "Mustafa Yıldırım",
    role: "Yerel Müşteri",
    avatar: "/images/testimonial-1.jpg",
    stars: 5
  },
  {
    id: 2,
    quote: "İş seyahatim için geldiğim Mersin'de tesadüfen keşfettim ve harika bir sürpriz oldu. Beyti kebabı muhteşemdi. Atmosfer çok samimi, servis hızlı. Tekrar Mersin'e geldiğimde kesinlikle ziyaret edeceğim.",
    author: "Zeynep Kaya",
    role: "İş İnsanı",
    avatar: "/images/testimonial-2.jpg",
    stars: 5
  },
  {
    id: 3,
    quote: "Antep'ten geliyorum ve kebap konusunda oldukça seçiciyim. Kebapçı Kadir'in lezzetleri beni çok etkiledi. Özellikle kuzu şiş ve katmer tatlısı favorilerim oldu. Kesinlikle tavsiye ederim!",
    author: "Ahmet Demir",
    role: "Gurme",
    avatar: "/images/testimonial-3.jpg",
    stars: 4
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
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <SectionContainer ref={ref}>
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Misafirlerimizden
        </SectionTitle>
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
                        <TestimonialRole>{testimonial.role}</TestimonialRole>
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