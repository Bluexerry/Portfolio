import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Career from './components/sections/Career'; // Nueva importación
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import Toast from './components/ui/Toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Career /> {/* Nuevo componente */}
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Toast />
      <div id="modal-root"></div>
    </div>
  );
}

export default App;