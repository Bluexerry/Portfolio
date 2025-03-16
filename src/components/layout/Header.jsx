import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Gamepad, FileText } from 'lucide-react';
import Container from './Container';
import MobileMenu from './MobileMenu';
import ByteVoltLogo from '../ui/ByteVolt';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Determinar sección activa por scroll
            const sections = ['home', 'about', 'skills', 'services', 'projects', 'contact'];
            let currentSection = 'home';

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        currentSection = section;
                    }
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Career', href: '#career' }, // Nueva sección
        { name: 'Skills', href: '#skills' },
        { name: 'Services', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-gray-900/90 backdrop-blur-sm py-3 shadow-sm'
                : 'bg-transparent py-5'
                }`}
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

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            whileHover={{ y: -2 }}
                            className={`font-medium transition-colors
                                ${activeSection === item.href.substring(1)
                                    ? 'text-blue-400'
                                    : 'text-gray-300 hover:text-blue-400'
                                }`}
                        >
                            {item.name}
                        </motion.a>
                    ))}

                    {/* TFG Links */}
                    <div className="flex items-center gap-4">
                        {/* TFG Videojuegos */}
                        <motion.a
                            href="#"
                            aria-label="TFG Videojuegos"
                            className="relative group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                TFG Videojuegos
                            </span>
                            <div className="p-2 bg-blue-900/30 rounded-full text-blue-400 hover:bg-blue-800/50 transition-colors">
                                <Gamepad size={18} />
                            </div>
                        </motion.a>

                        {/* TFG Domótica */}
                        <motion.a
                            href="/documents/TFG.pdf"
                            download="TFG_Domotica.pdf"
                            aria-label="Descargar TFG Domótica"
                            className="relative group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                TFG Domótica
                            </span>
                            <div className="p-2 bg-blue-900/30 rounded-full text-blue-400 hover:bg-blue-800/50 transition-colors">
                                <FileText size={18} />
                            </div>
                        </motion.a>
                    </div>
                </nav>

                {/* Mobile Menu Button and Icons */}
                <div className="flex items-center md:hidden gap-2">
                    {/* TFG Videojuegos - Mobile */}
                    <motion.a
                        href="#"
                        aria-label="TFG Videojuegos"
                        className="p-2 bg-blue-900/30 rounded-full"
                        whileTap={{ scale: 0.9 }}
                    >
                        <Gamepad size={18} className="text-blue-400" />
                    </motion.a>

                    {/* TFG Domótica - Mobile */}
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
                        className="p-2 ml-2 rounded-full bg-gray-800"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>
            </Container>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                setIsOpen={setMobileMenuOpen}
                navItems={navItems}
                activeSection={activeSection}
            />
        </header>
    );
};

export default Header;