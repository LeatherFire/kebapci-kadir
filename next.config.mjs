// next.config.mjs dosyasını düzeltme
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['kebapcikadir.com'],
    },
    compiler: {
      styledComponents: true,
    },
    i18n: {
      locales: ['tr'],
      defaultLocale: 'tr',
    },
  };
  
  // module.exports yerine export default kullanıyoruz
  export default nextConfig;