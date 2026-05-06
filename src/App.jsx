import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import Work from './components/Work'
import Tools from './components/Tools'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <CustomCursor />
      <div className="grain-overlay" />
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Work />
      <Tools />
      <Process />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
