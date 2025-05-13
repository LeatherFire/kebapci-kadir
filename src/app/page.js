import Hero from './components/home/Hero'
import GenerationsStory from './components/home/GenerationsStory'
import DishStory from './components/home/DishStory'
import FeaturedDishes from './components/home/FeaturedDishes'
import HuseyinAcikalin from './components/home/HuseyinAcikalin'
import Testimonials from './components/home/Testimonials'
import ReservationCTA from './components/home/ReservationCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <GenerationsStory />
      <DishStory dishName="firinkebabi" />
      <FeaturedDishes />
      <DishStory dishName="kabinepilavi" />
      <HuseyinAcikalin />
      <Testimonials />
      <ReservationCTA />
    </>
  )
}