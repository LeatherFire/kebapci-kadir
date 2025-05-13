import AboutHero from '../components/about/AboutHero';
import KadirStory from '../components/about/KadirStory';
import OurIngredients from '../components/about/OurIngredients';
import OurTeam from '../components/about/OurTeam';
import Timeline from '../components/about/Timeline';

export const metadata = {
  title: 'Hikayemiz | Kebapçı Kadir',
  description: 'Kebapçı Kadir\'in hikayesi, değerleri ve felsefesi. Kadir Usta\'nın kebap tutkusu ve lezzet serüveni.',
}

export default function About() {
  return (
    <>
      <AboutHero />
      <KadirStory />
      <OurIngredients />
      <Timeline />
      <OurTeam />
    </>
  );
}