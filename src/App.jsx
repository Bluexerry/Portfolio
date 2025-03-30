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
  // Solución agresiva para prevenir temas oscuros
  useEffect(() => {
    // Función para limpiar y forzar tema claro
    const forceLightTheme = () => {
      // Limpiar localStorage
      localStorage.removeItem('theme');
      localStorage.removeItem('color-theme');
      localStorage.removeItem('darkMode');

      // Establecer explícitamente tema claro
      localStorage.setItem('theme', 'light');

      // Remover clase 'dark' del HTML
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    };

    // Ejecutar inmediatamente
    forceLightTheme();

    // Configurar intervalo para verificar constantemente
    const intervalId = setInterval(forceLightTheme, 1000);

    // Escuchar cambios en media query
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => forceLightTheme();
    mediaQuery.addEventListener('change', handleChange);

    // Interceptar cambios en classList
    const originalAdd = DOMTokenList.prototype.add;
    DOMTokenList.prototype.add = function (...tokens) {
      // Si intentan añadir clase 'dark', ignorarlo
      const filteredTokens = tokens.filter(token => token !== 'dark');
      if (filteredTokens.length > 0) {
        return originalAdd.apply(this, filteredTokens);
      }
    };

    // Limpiar al desmontar
    return () => {
      clearInterval(intervalId);
      mediaQuery.removeEventListener('change', handleChange);
      DOMTokenList.prototype.add = originalAdd;
    };
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