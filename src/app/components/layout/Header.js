"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { FiMenu, FiX } from 'react-icons/fi';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease;
  padding: ${props => props.scrolled ? '1rem 2rem' : '1.5rem 2rem'};
  
  ${theme.media.lg} {
    padding: ${props => props.scrolled ? '1rem 4rem' : '1.5rem 4rem'};
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: ${theme.typography.fontFamily.accent};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${props => props.scrolled ? theme.colors.primary.red : theme.colors.text.light};
  transition: color 0.3s ease;
  
  span {
    color: ${theme.colors.primary.orange};
  }
`;

const NavLinksDesktop = styled.nav`
  display: none;
  
  ${theme.media.lg} {
    display: flex;
    gap: 2rem;
  }
`;

const NavLink = styled.a`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${props => props.scrolled ? theme.colors.text.dark : theme.colors.text.light};
  transition: all 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${theme.colors.primary.orange};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${theme.colors.primary.orange};
    
    &:after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  background: transparent;
  border: none;
  color: ${props => props.scrolled ? theme.colors.text.dark : theme.colors.text.light};
  font-size: 1.5rem;
  cursor: pointer;
  
  ${theme.media.lg} {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: ${theme.colors.background.dark};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 101;
`;

const MobileMenuCloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  color: ${theme.colors.text.light};
  font-size: 1.5rem;
  cursor: pointer;
`;

const MobileNavLink = styled.a`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.text.light};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${theme.colors.primary.orange};
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <HeaderContainer scrolled={scrolled}>
      <NavContainer>
        <Link href="/" passHref>
          <Logo scrolled={scrolled}>Kebapçı <span>Kadir</span></Logo>
        </Link>
        
        <NavLinksDesktop>
          <Link href="/" passHref>
            <NavLink scrolled={scrolled}>Ana Sayfa</NavLink>
          </Link>
          <Link href="/about" passHref>
            <NavLink scrolled={scrolled}>Hikayemiz</NavLink>
          </Link>
          <Link href="/menu" passHref>
            <NavLink scrolled={scrolled}>Menü</NavLink>
          </Link>
          <Link href="/gallery" passHref>
            <NavLink scrolled={scrolled}>Galeri</NavLink>
          </Link>
          <Link href="/contact" passHref>
            <NavLink scrolled={scrolled}>İletişim & Rezervasyon</NavLink>
          </Link>
        </NavLinksDesktop>
        
        <MobileMenuButton scrolled={scrolled} onClick={toggleMobileMenu}>
          <FiMenu />
        </MobileMenuButton>
      </NavContainer>
      
      {mobileMenuOpen && (
        <MobileMenu
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <MobileMenuCloseButton onClick={toggleMobileMenu}>
            <FiX />
          </MobileMenuCloseButton>
          
          <Link href="/" passHref>
            <MobileNavLink onClick={toggleMobileMenu}>Ana Sayfa</MobileNavLink>
          </Link>
          <Link href="/about" passHref>
            <MobileNavLink onClick={toggleMobileMenu}>Hikayemiz</MobileNavLink>
          </Link>
          <Link href="/menu" passHref>
            <MobileNavLink onClick={toggleMobileMenu}>Menü</MobileNavLink>
          </Link>
          <Link href="/gallery" passHref>
            <MobileNavLink onClick={toggleMobileMenu}>Galeri</MobileNavLink>
          </Link>
          <Link href="/contact" passHref>
            <MobileNavLink onClick={toggleMobileMenu}>İletişim & Rezervasyon</MobileNavLink>
          </Link>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;