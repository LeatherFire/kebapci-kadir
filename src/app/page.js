import Hero from './components/home/Hero'
import LegacyIntro from './components/home/LegacyIntro'  // Yeni ekledi
import Heritage from './components/home/Heritage'
import OvenKebabStory from './components/home/OvenKebabStory'
import FeaturedDishes from './components/home/FeaturedDishes'
import KabunePilafStory from './components/home/KabunePilafStory'
import CurrentOwnerSpeech from './components/home/CurrentOwnerSpeech'
import Testimonials from './components/home/Testimonials'
import ReservationCTA from './components/home/ReservationCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <LegacyIntro />  {/* Yeni eklendi */}
      <Heritage />
      <OvenKebabStory />
      <FeaturedDishes />
      <KabunePilafStory />
      <CurrentOwnerSpeech />
      <Testimonials />
      <ReservationCTA />
    </>
  )
}