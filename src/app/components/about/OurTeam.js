"use client"

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../styles/theme';
import Image from 'next/image';
import { FiInstagram, FiLinkedin } from 'react-icons/fi';

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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  ${theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${theme.media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TeamMemberCard = styled(motion.div)`
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

const TeamMemberImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const TeamMemberContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const TeamMemberName = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.dark};
  margin-bottom: 0.5rem;
`;

const TeamMemberTitle = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.primary.red};
  margin-bottom: 1rem;
`;

const TeamMemberDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${theme.colors.secondary.beige};
  color: ${theme.colors.text.dark};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.primary.red};
    color: ${theme.colors.text.light};
  }
`;

// Örnek ekip verileri
const teamMembers = [
  {
    id: 1,
    name: "Kadir Yılmaz",
    title: "Kurucu Usta",
    description: "55 yıllık kebapçılık tecrübesiyle işletmemizin kurucusu ve baş ustası.",
    image: "/images/kadir-usta.jpg",
    socialMedia: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: 2,
    name: "Ahmet Yılmaz",
    title: "İşletme Müdürü",
    description: "Kadir Usta'nın oğlu, 20 yıllık tecrübesiyle işletmenin yönetiminden sorumlu.",
    image: "/images/ahmet-yilmaz.jpg",
    socialMedia: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: 3,
    name: "Ayşe Yılmaz",
    title: "Şef",
    description: "Kadir Usta'nın kızı, özel tarifleri ve mezelerle menüyü zenginleştiriyor.",
    image: "/images/ayse-yilmaz.jpg",
    socialMedia: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: 4,
    name: "Mehmet Demir",
    title: "Baş Garson",
    description: "15 yıldır ekibimizde, misafirlerimize en iyi hizmeti sunmak için çalışıyor.",
    image: "/images/mehmet-demir.jpg",
    socialMedia: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  }
];

const OurTeam = () => {
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
          Ekibimiz
        </SectionTitle>
        <SectionDescription
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Kebapçı Kadirin arkasındaki güç, tutkulu ve deneyimli ekibimiz. Her biri kendi alanında uzman olan çalışanlarımız, size en iyi hizmeti sunmak için burada.
        </SectionDescription>
      </SectionHeader>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <TeamGrid>
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} variants={itemVariants}>
              <TeamMemberImageContainer>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  style={{objectFit: "cover"}}
                />
              </TeamMemberImageContainer>
              <TeamMemberContent>
                <TeamMemberName>{member.name}</TeamMemberName>
                <TeamMemberTitle>{member.title}</TeamMemberTitle>
                <TeamMemberDescription>{member.description}</TeamMemberDescription>
                <SocialLinks>
                  <SocialLink href={member.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    <FiInstagram />
                  </SocialLink>
                  <SocialLink href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                    <FiLinkedin />
                  </SocialLink>
                </SocialLinks>
              </TeamMemberContent>
            </TeamMemberCard>
          ))}
        </TeamGrid>
      </motion.div>
    </SectionContainer>
  );
};

export default OurTeam;