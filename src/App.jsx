import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import Services from "./components/Services";
import Works from "./components/Works";
import Meme from "./components/Meme";
import Clients from "./components/Clients";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import SmoothScroll from "./components/SmoothScroll";

export default function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Process />
        <Services />
        <Works />
        <Meme />
        <Clients />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
