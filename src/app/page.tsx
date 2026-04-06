import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import HorizontalScroll from '@/components/HorizontalScroll'
import TechStack from '@/components/TechStack'
import Footer from '@/components/Footer'
import Intro from '@/components/Intro'
import SwaySurface from '@/components/SwaySurface'

export default function Home() {
  return (
    <>
      <Intro />
      <main>
        <SwaySurface>
          <Nav />
          <Hero />
          <Marquee />
          <About />
        </SwaySurface>
        <HorizontalScroll />
        <SwaySurface>
          <TechStack />
          <Footer />
        </SwaySurface>
      </main>
    </>
  )
}
