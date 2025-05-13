import './globals.css'
import { Inter, Montserrat, Open_Sans, Playfair_Display } from 'next/font/google'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import StyledComponentsRegistry from './registry'


const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat'
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-open-sans'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair'
})

export const metadata = {
  title: 'Kebapçı Kadir | Ateşin ve Lezzetin Buluştuğu Yer',
  description: 'Kebapçı Kadir - Geleneksel kebap kültürünü modern bir anlayışla sunan, yılların tecrübesiyle harmanlanmış eşsiz lezzetler.',
  keywords: 'kebapçı, kebap, adana kebap, urfa kebap, türk mutfağı, restoran, mersin',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <StyledComponentsRegistry>
          <Header />
          <main>{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}