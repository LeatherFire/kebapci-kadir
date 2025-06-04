# 🍖 Kebapçı Kadir - Geleneksel Türk Mutfağı

> **1851'den beri süren bir lezzet mirası**

Kebapçı Kadir, 174 yıllık köklü geçmişiyle Türk mutfağının en eski ve saygın temsilcilerinden biridir. Hafız Dede tarafından 1851 yılında kurulan bu eşsiz gelenek, 4 kuşaktır özenle korunarak günümüze kadar taşınmıştır.

## 🌐 Canlı Site

**[https://kebapcikadir.com.tr/](https://kebapcikadir.com.tr/)**

---

## ✨ Özellikler

### 🎯 Modern Web Teknolojileri
- **Next.js 13** - Server-side rendering ve optimum performans
- **React 18** - Modern component architecture
- **Styled Components** - CSS-in-JS ile dinamik stillendirme
- **Framer Motion** - Akıcı animasyonlar ve geçişler
- **React Intersection Observer** - Görüntü tabanlı etkileşimler

### 🌍 Çok Dilli Destek
- **Türkçe** - Ana dil
- **English** - International visitors
- **Deutsch** - German speakers
- Dinamik dil değiştirme sistemi

### 📱 Responsive Tasarım
- Mobil öncelikli yaklaşım
- Tablet ve desktop optimizasyonu
- Cross-browser uyumluluk
- Progressive Web App özellikleri

### 🎨 Kullanıcı Deneyimi
- Smooth scroll animasyonlar
- Interactive galeri sistemi
- Typing effect ile hikaye anlatımı
- Modern UI/UX tasarım prensipleri

---

## 🏗️ Teknik Detaylar

### 📦 Kullanılan Teknolojiler

| Teknoloji | Versiyon | Amaç |
|-----------|----------|------|
| Next.js | 13.4.4 | Framework |
| React | 18.2.0 | UI Library |
| Styled Components | 5.3.11 | CSS-in-JS |
| Framer Motion | 10.12.16 | Animasyonlar |
| React Icons | 4.12.0 | Icon seti |
| React i18next | 15.5.1 | Çoklu dil desteği |

### 🚀 Kurulum

```bash
# Proje dosyalarını klonlayın
git clone https://github.com/LeatherFire/kebapci-kadir.git

# Dizine geçin
cd kebapci-kadir

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

### 📋 Kullanılabilir Komutlar

```bash
npm run dev      # Geliştirme sunucusu (http://localhost:3000)
npm run build    # Production build
npm run start    # Production sunucusu
npm run lint     # ESLint kontrolü
npm run export   # Static export
```

---

## 📁 Proje Yapısı

```
kebapci-kadir/
├── 📂 public/
│   ├── 📂 images/           # Resim dosyaları
│   ├── 📂 icons/            # Favicon ve iconlar
│   └── 📄 manifest.json     # PWA ayarları
├── 📂 src/
│   └── 📂 app/
│       ├── 📂 components/   # React bileşenleri
│       │   ├── 📂 home/     # Ana sayfa bileşenleri
│       │   ├── 📂 about/    # Hakkımızda sayfası
│       │   ├── 📂 menu/     # Menü sayfası
│       │   ├── 📂 gallery/  # Galeri sayfası
│       │   ├── 📂 contact/  # İletişim sayfası
│       │   ├── 📂 layout/   # Header & Footer
│       │   └── 📂 language/ # Dil değiştirici
│       ├── 📂 contexts/     # React context'leri
│       ├── 📂 styles/       # Tema ve stil dosyaları
│       └── 📂 utils/        # Yardımcı fonksiyonlar
└── 📄 README.md
```

---

## 🎨 Tasarım Sistemi

### 🎯 Renk Paleti
- **Ana Renk**: `#e63946` (Kebap Kırmızısı)
- **İkincil Renk**: `#f77f00` (Turuncu)
- **Vurgu Rengi**: `#fcbf49` (Altın Sarısı)
- **Arka Plan**: `#ffffff` (Beyaz)
- **Metin**: `#212529` (Koyu Gri)

### 📝 Tipografi
- **Başlık Fontu**: Arial, Helvetica, sans-serif
- **Gövde Fontu**: Roboto, Arial, sans-serif
- **Vurgu Fontu**: Georgia, serif

### 📱 Breakpoint'ler
```css
xs: 480px   /* Küçük telefon */
sm: 640px   /* Büyük telefon */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Büyük ekran */
```

---

## 🍽️ Sayfalar ve Özellikler

### 🏠 **Ana Sayfa (Homepage)**
- Hero section - Video arka plan
- Miras hikayesi - Interaktif timeline
- Öne çıkan yemekler - Dinamik kart sistemi
- Müşteri yorumları - Carousel slider
- İstatistikler - Animasyonlu sayaçlar

### 👨‍🍳 **Hakkımızda (About)**
- Aile hikayesi - 4 kuşak anlatımı
- Timeline - 1851'den günümüze
- Takım üyeleri - Personel tanıtımları
- Değerlerimiz - Misyon & Vizyon

### 📋 **Menü (Menu)**
- Kategorize yemek listesi
- Fiyat bilgileri
- Yemek görselleri
- Özel tarifler

### 🖼️ **Galeri (Gallery)**
- Yemek fotoğrafları
- Restoran atmosferi
- Tarihsel görseller
- Video içerikler

### 📞 **İletişim (Contact)**
- İletişim formu
- Konum bilgileri
- Çalışma saatleri
- Sosyal medya linkleri

---

## 🚀 Performance Optimizasyonları

### 🖼️ **Görsel Optimizasyonu**
- WebP format kullanımı
- Lazy loading
- Responsive images
- Git LFS ile büyük dosya yönetimi

### ⚡ **Kod Optimizasyonu**
- Code splitting
- Tree shaking
- Bundle analizi
- Minification

### 🔍 **SEO Optimizasyonu**
- Meta etiketleri
- Structured data
- Sitemap.xml
- Robots.txt

---

## 🌍 İçerik Yönetimi

### 📚 **Çoklu Dil Desteği**
Tüm içerikler `LanguageContext` ile yönetilmektedir:

```javascript
// Dil değiştirme örneği
const { t, currentLanguage, changeLanguage } = useLanguage();

// Metin kullanımı
<h1>{t('home.title')}</h1>
```

### 🎭 **Animasyon Sistemi**
Framer Motion ile geliştirilmiş animasyonlar:

```javascript
// Sayfa girişi animasyonu
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

---

## 📈 Gelecek Planları

### 🔮 **Roadmap**
- [ ] Online sipariş sistemi
- [ ] Rezervasyon modülü
- [ ] Blog sistemi
- [ ] Müşteri paneli
- [ ] Mobil uygulama

### 🛠️ **Teknik Geliştirmeler**
- [ ] TypeScript migration
- [ ] Testing suite (Jest + React Testing Library)
- [ ] Storybook integration
- [ ] CI/CD pipeline
- [ ] Performance monitoring

---

## 👥 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje özel lisans altındadır. Ticari kullanım için izin gereklidir.

---

## 📞 İletişim

- **Web**: [https://kebapcikadir.com.tr/](https://kebapcikadir.com.tr/)
- **Email**: info@kebapcikadir.com.tr
- **GitHub**: [https://github.com/LeatherFire/kebapci-kadir](https://github.com/LeatherFire/kebapci-kadir)

---

<div align="center">

**🍖 1851'den beri lezzet geleneği 🍖**

*Hafız Dede'nin mirası, Hüseyin Açıkalın'ın ellerinde yaşamaya devam ediyor*

</div>