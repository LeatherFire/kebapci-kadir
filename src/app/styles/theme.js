export const theme = {
    colors: {
      // Ana Renkler
      primary: {
        red: '#C82C1B',      // Köz Kırmızısı
        orange: '#D85B0A',   // Koyu Turuncu
        yellow: '#FFBF00',   // Safran Sarısı
        green: '#2C5E1A',    // Koyu Yeşil (Bitkiler/Baharatlar)
      },
      // Destekleyici Renkler
      secondary: {
        brown: '#5D4037',    // Toprak Tonu
        beige: '#D7CCC8',    // Bej
        terracotta: '#A74C1A', // Kiremit
        anthracite: '#263238', // Antrasit
        offwhite: '#F5F5F5',  // Kırık Beyaz
      },
      // Vurgu Renkler (Metalik)
      accent: {
        copper: '#B87333',   // Bakır
        bronze: '#CD7F32',   // Bronz
      },
      // Fonksiyonel Renkler
      text: {
        dark: '#212121',     // Ana metin rengi
        light: '#FFFFFF',    // Koyu arka planlarda kullanılacak metin rengi
        muted: '#757575',    // İkincil metin rengi
      },
      background: {
        main: '#FFFFFF',     // Ana arka plan
        alt: '#FAFAFA',      // Alternatif arka plan
        dark: '#121212',     // Koyu bölümler için
      }
    },
    typography: {
      fontFamily: {
        heading: 'var(--font-montserrat, "Montserrat", sans-serif)',
        body: 'var(--font-open-sans, "Open Sans", sans-serif)',
        accent: 'var(--font-playfair, "Playfair Display", serif)', // İmza, slogan gibi özel alanlarda
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
      },
    },
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    media: {
      xs: `@media (min-width: 320px)`,
      sm: `@media (min-width: 640px)`,
      md: `@media (min-width: 768px)`,
      lg: `@media (min-width: 1024px)`,
      xl: `@media (min-width: 1280px)`,
      '2xl': `@media (min-width: 1536px)`,
    },
  };