"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheck } from 'react-icons/fi';

const PageContainer = styled.div`
  padding-top: 80px; // Headerın altında kalmaması için
`;

const HeroSection = styled.section`
  height: 40vh;
  background-image: url('/images/contact-hero.jpg');
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

const ContactSection = styled.section`
  padding: 5rem 1rem;
  
  ${theme.media.md} {
    padding: 5rem 2rem;
  }
  
  ${theme.media.lg} {
    padding: 5rem 4rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  ${theme.media.lg} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  padding: 2rem;
  background-color: ${theme.colors.background.alt};
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const ContactTitle = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.text.dark};
  margin-bottom: 2rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: ${theme.colors.primary.red};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const ContactText = styled.div`
  font-family: ${theme.typography.fontFamily.body};
`;

const ContactLabel = styled.h3`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.dark};
  margin-bottom: 0.25rem;
`;

const ContactDetail = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.muted};
  line-height: 1.6;
`;

const MapContainer = styled.div`
  margin-top: 2rem;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
`;

const ReservationForm = styled.div`
  padding: 2rem;
  background-color: ${theme.colors.background.main};
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  ${theme.media.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Label = styled.label`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.dark};
`;

const Input = styled.input`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.secondary.beige};
  border-radius: 4px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.orange};
  }
`;

const Select = styled.select`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.secondary.beige};
  border-radius: 4px;
  background-color: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.orange};
  }
`;

const Textarea = styled.textarea`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.secondary.beige};
  border-radius: 4px;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.orange};
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${theme.colors.primary.red};
  color: ${theme.colors.text.light};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.base};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    background-color: ${theme.colors.primary.orange};
  }
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #e6f4ea;
  border-left: 4px solid #34a853;
  padding: 1rem;
  border-radius: 4px;
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  color: #1e8e3e;
  margin-top: 1rem;
`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada form verilerinin işlenmesi için gerekli kodlar yazılacak
    // API'ye gönderme, veritabanına kaydetme vb.
    
    console.log(formData);
    setIsSubmitted(true);
    
    // Form gönderildikten sonra formu temizleyelim
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: '',
      message: ''
    });
    
    // 5 saniye sonra başarı mesajını kaldıralım
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <PageTitle>İletişim & Rezervasyon</PageTitle>
          <PageDescription>Bize ulaşın, masanızı ayırtın, özel anlarınızı unutulmaz kılalım.</PageDescription>
        </HeroContent>
      </HeroSection>
      
      <ContactSection>
        <ContactGrid>
          <ContactInfo>
            <ContactTitle>İletişim Bilgilerimiz</ContactTitle>
            
            <ContactItem>
              <ContactIcon>
                <FiPhone />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Telefon</ContactLabel>
                <ContactDetail>+90 324 123 45 67</ContactDetail>
              </ContactText>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FiMail />
              </ContactIcon>
              <ContactText>
                <ContactLabel>E-posta</ContactLabel>
                <ContactDetail>info@kebapcikadir.com</ContactDetail>
              </ContactText>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FiMapPin />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Adres</ContactLabel>
                <ContactDetail>
                  Merkez Mahallesi, Atatürk Caddesi No: 123<br />
                  Mersin / Türkiye
                </ContactDetail>
              </ContactText>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FiClock />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Çalışma Saatleri</ContactLabel>
                <ContactDetail>
                  Pazartesi - Pazar: 11:00 - 23:00<br />
                  (Mutfak kapanış: 22:30)
                </ContactDetail>
              </ContactText>
            </ContactItem>
            
            <MapContainer>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.0564553727237!2d34.6105493768222!3d36.78939867138364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1527f4a4c0be6729%3A0xac6e03ac21e75c68!2sMersin%2C%20Merkez%2FMersin%2C%20T%C3%BCrkiye!5e0!3m2!1str!2str!4v1683145876428!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </MapContainer>
          </ContactInfo>
          
          <ReservationForm>
            <ContactTitle>Rezervasyon Formu</ContactTitle>
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Adınız Soyadınız</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">E-posta</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="date">Tarih</Label>
                  <Input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleChange}
                    required 
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="time">Saat</Label>
                  <Select 
                    id="time" 
                    name="time" 
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                  </Select>
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label htmlFor="guests">Kişi Sayısı</Label>
                <Select 
                  id="guests" 
                  name="guests" 
                  value={formData.guests}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seçiniz</option>
                  <option value="1">1 kişi</option>
                  <option value="2">2 kişi</option>
                  <option value="3">3 kişi</option>
                  <option value="4">4 kişi</option>
                  <option value="5">5 kişi</option>
                  <option value="6">6 kişi</option>
                  <option value="7">7 kişi</option>
                  <option value="8">8 kişi</option>
                  <option value="9+">9+ kişi (Lütfen mesajda belirtiniz)</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Özel İstekler / Notlar</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                ></Textarea>
              </FormGroup>
              
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Rezervasyon Yap
              </SubmitButton>
              
              {isSubmitted && (
                <SuccessMessage
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiCheck /> Rezervasyon talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.
                </SuccessMessage>
              )}
            </Form>
          </ReservationForm>
        </ContactGrid>
      </ContactSection>
    </PageContainer>
  );
}