import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Menu, Gamepad, FileText } from 'lucide-react';
import Container from './Container';
import ByteVoltLogo from '../ui/ByteVolt';
import MobileMenu from './MobileMenu';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrollbarWidth, setScrollbarWidth] = useState(0);

    // Recalcula el ancho de la scrollbar al cambiar mobileMenuOpen
    useEffect(() => {
        if (mobileMenuOpen) {
            const width = window.innerWidth - document.documentElement.clientWidth;
            setScrollbarWidth(width);
        } else {
            setScrollbarWidth(0);
        }
    }, [mobileMenuOpen]);

    // Definición de las secciones de navegación
    const navItems = useMemo(() => [
        { name: 'Inicio', href: '#home' },
        { name: 'Sobre mí', href: '#about' },
        { name: 'Formación', href: '#career' },
        { name: 'Habilidades', href: '#skills' },
        { name: 'Servicios', href: '#services' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Contacto', href: '#contact' },
    ], []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navItems.map(item => item.href.substring(1));
            let currentSection = sections[0];
            let maxVisibility = 0;
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                    const visibilityScore = visibleHeight > 0
                        ? visibleHeight / element.offsetHeight * (1 - rect.top / (window.innerHeight * 2))
                        : 0;
                    if (visibilityScore > maxVisibility) {
                        maxVisibility = visibilityScore;
                        currentSection = section;
                    }
                }
            });
            setActiveSection(currentSection);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    return (
        <>
            <header
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-gray-900/90 backdrop-blur-sm py-3 shadow-sm'
                    : 'bg-transparent py-5'
                    }`}
                // Se le aplica el mismo paddingRight que al body para compensar la scrollbar
                style={{ paddingRight: mobileMenuOpen ? `${scrollbarWidth}px` : undefined }}
            >
                <Container className="flex justify-between items-center">
                    <motion.a
                        href="#home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl font-bold"
                    >
                        <ByteVoltLogo />
                    </motion.a>

                    {/* Navegación desktop (visible en lg o superior) */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                whileHover={{ y: -2 }}
                                className={`font-medium transition-colors ${activeSection === item.href.substring(1)
                                    ? 'text-blue-400'
                                    : 'text-gray-300 hover:text-blue-400'
                                    }`}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                        {/* Enlaces adicionales para desktop */}
                        <div className="flex items-center gap-4">
                            <motion.a
                                href="#"
                                aria-label="TFG Videojuegos"
                                className="relative group"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span
                                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
                  px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0
                  group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                >
                                    TFG Videojuegos
                                </span>
                                <div className="p-2 bg-blue-900/30 rounded-full text-blue-400 hover:bg-blue-800/50 transition-colors">
                                    <Gamepad size={18} />
                                </div>
                            </motion.a>
                            <motion.a
                                href="/documents/TFG.pdf"
                                download="TFG_Domotica.pdf"
                                aria-label="Descargar TFG Domótica"
                                className="relative group"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span
                                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
                  px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0
                  group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                >
                                    TFG Domótica
                                </span>
                                <div className="p-2 bg-blue-900/30 rounded-full text-blue-400 hover:bg-blue-800/50 transition-colors">
                                    <FileText size={18} />
                                </div>
                            </motion.a>
                        </div>
                    </nav>

                    {/* Barra de navegación móvil (visible en pantallas menores a lg) */}
                    <div className="flex items-center lg:hidden gap-2">
                        <motion.a
                            href="#"
                            aria-label="TFG Videojuegos"
                            className="p-2 bg-blue-900/30 rounded-full"
                            whileTap={{ scale: 0.9 }}
                        >
                            <Gamepad size={18} className="text-blue-400" />
                        </motion.a>
                        <motion.a
                            href="/documents/TFG.pdf"
                            download="TFG_Domotica.pdf"
                            aria-label="Descargar TFG Domótica"
                            className="p-2 bg-blue-900/30 rounded-full"
                            whileTap={{ scale: 0.9 }}
                        >
                            <FileText size={18} className="text-blue-400" />
                        </motion.a>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`p-2 ml-2 rounded-full bg-gray-800 lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0 pointer-events-none transform scale-90' : 'opacity-100'
                                }`}
                            aria-label="Toggle mobile menu"
                        >
                            <Menu size={20} />
                        </motion.button>
                    </div>
                </Container>
            </header>

            <MobileMenu
                isOpen={mobileMenuOpen}
                setIsOpen={setMobileMenuOpen}
                navItems={navItems}
                activeSection={activeSection}
            />
        </>
    );
};

export default Header;