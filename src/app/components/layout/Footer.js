"use client"

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { FiPhone, FiMail, FiMapPin, FiClock, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.secondary.anthracite};
  color: ${theme.colors.text.light};
  padding: 4rem 1rem 2rem;
  
  ${theme.media.md} {
    padding: 4rem 2rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 4rem 4rem 2rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  ${theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${theme.media.lg} {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

const FooterColumn = styled.div``;

const FooterLogo = styled.div`
  font-family: ${theme.typography.fontFamily.accent};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['2xl']};
  margin-bottom: 1rem;
  
  span {
    color: ${theme.colors.primary.orange};
  }
`;

const FooterDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

const FooterTitle = styled.h4`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: ${theme.colors.primary.red};
  }
`;

const FooterContactItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FooterContactIcon = styled.div`
  flex-shrink: 0;
  color: ${theme.colors.primary.orange};
`;

const FooterContactText = styled.p`
  font-size: ${theme.typography.fontSize.base};
  opacity: 0.8;
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterNavLink = styled.a`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.light};
  opacity: 0.8;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    color: ${theme.colors.primary.orange};
    padding-left: 5px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.text.light};
  font-size: 1.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.primary.red};
    transform: translateY(-3px);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: ${theme.typography.fontSize.sm};
  opacity: 0.7;
  
  ${theme.media.md} {
    flex-direction: row;
  }
`;

const Copyright = styled.p``;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterBottomLink = styled.a`
  transition: color 0.3s ease;
  
  &:hover {
    color: ${theme.colors.primary.orange};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo>
            Kebapçı <span>Kadir</span>
          </FooterLogo>
          <FooterDescription>
            1851'den beri İsparta'da geleneksel kebap kültürünü modern anlayışla sunan, yılların tecrübesiyle harmanlanmış eşsiz lezzetler.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FiFacebook />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </SocialLink>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>İletişim</FooterTitle>
          <FooterContactItem>
            <FooterContactIcon>
              <FiPhone />
            </FooterContactIcon>
            <FooterContactText>
              +90 246 218 24 60<br />
              +90 246 212 17 71
            </FooterContactText>
          </FooterContactItem>
          <FooterContactItem>
            <FooterContactIcon>
              <FiMail />
            </FooterContactIcon>
            <FooterContactText>
              info@kebapcikadir.com.tr
            </FooterContactText>
          </FooterContactItem>
          <FooterContactItem>
            <FooterContactIcon>
              <FiMapPin />
            </FooterContactIcon>
            <FooterContactText>
              Ulucami Yanı Valilik Arkası<br />
              Kebapçılar Arastası No: 8<br />
              ISPARTA / TÜRKİYE
            </FooterContactText>
          </FooterContactItem>
          <FooterContactItem>
            <FooterContactIcon>
              <FiClock />
            </FooterContactIcon>
            <FooterContactText>
              Pazartesi - Pazar: 11:00 - 23:00<br />
              (Mutfak kapanış: 22:30)
            </FooterContactText>
          </FooterContactItem>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Hızlı Bağlantılar</FooterTitle>
          <FooterNav>
            <Link href="/" passHref>
              <FooterNavLink>Ana Sayfa</FooterNavLink>
            </Link>
            <Link href="/about" passHref>
              <FooterNavLink>Hikayemiz</FooterNavLink>
            </Link>
            <Link href="/menu" passHref>
              <FooterNavLink>Menü</FooterNavLink>
            </Link>
            <Link href="/gallery" passHref>
              <FooterNavLink>Galeri</FooterNavLink>
            </Link>
            <Link href="/contact" passHref>
              <FooterNavLink>İletişim & Rezervasyon</FooterNavLink>
            </Link>
          </FooterNav>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Çalışma Saatleri</FooterTitle>
          <FooterContactText>
            <strong>Pazartesi - Pazar:</strong><br />
            11:00 - 23:00
          </FooterContactText>
          <FooterContactText style={{ marginTop: '1rem' }}>
            <strong>Mutfak Kapanış:</strong><br />
            22:30
          </FooterContactText>
          <FooterContactText style={{ marginTop: '1rem' }}>
            <strong>Web:</strong><br />
            www.kebapcikadir.com.tr
          </FooterContactText>
        </FooterColumn>
      </FooterContent>
      
      <Divider />
      
      <FooterBottom>
        <Copyright>
          &copy; {new Date().getFullYear()} Kebapçı Kadir. Tüm Hakları Saklıdır.
        </Copyright>
        
        <FooterBottomLinks>
          <Link href="/privacy" passHref>
            <FooterBottomLink>Gizlilik Politikası</FooterBottomLink>
          </Link>
          <Link href="/terms" passHref>
            <FooterBottomLink>Kullanım Koşulları</FooterBottomLink>
          </Link>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;