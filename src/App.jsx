import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Career from './components/sections/Career';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import Toast from './components/ui/Toast';
import './App.css';

function App() {
  // Asegurarse de que no haya clase 'dark' en ningún momento
  useEffect(() => {
    // Remover clase 'dark' del HTML
    document.documentElement.classList.remove('dark');
    
    // Reiniciar cualquier configuración de tema
    localStorage.removeItem('theme');
    localStorage.removeItem('color-theme');
    
    // Prevenir que MediaQuery active el tema oscuro
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      document.documentElement.classList.remove('dark');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Limpiar evento al desmontar
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Career />
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