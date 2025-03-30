import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
    X,
    Home,
    User,
    Briefcase,
    Code,
    Layers,
    Mail,
    ExternalLink,
    Lightbulb,
    Github,
    Linkedin,
    Gamepad,
    FileText,
    ChevronDown
} from 'lucide-react';

const MobileMenu = ({ isOpen, setIsOpen, navItems, activeSection }) => {
    // Referencia para el menú
    const menuRef = useRef(null);

    // Estado para el dropdown del CV
    const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
    const cvDropdownRef = useRef(null);

    // Capturar la altura inicial una sola vez al montar el componente
    const [initialHeight] = useState(window.innerHeight);

    // Nueva funcionalidad para cerrar al hacer clic fuera del menú
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            // Si el clic fue fuera del menú (y no en un elemento del menú), cerramos
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Añadimos el listener con un pequeño retraso para evitar cierres inmediatos
        const timer = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    // Cerrar CV dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cvDropdownRef.current && !cvDropdownRef.current.contains(event.target)) {
                setCvDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Mapea el icono según el href
    const getIcon = (href) => {
        switch (href.replace('#', '')) {
            case 'home': return <Home size={16} />;
            case 'about': return <User size={16} />;
            case 'career': return <Briefcase size={16} />;
            case 'projects': return <Code size={16} />;
            case 'skills': return <Lightbulb size={16} />;
            case 'services': return <Layers size={16} />;
            case 'contact': return <Mail size={16} />;
            default: return <ExternalLink size={16} />;
        }
    };

    // Control de scroll
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        }
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        };
    }, [isOpen]);

    // Función para navegar a la sección seleccionada
    const handleLinkClick = (href) => {
        setIsOpen(false);
        setTimeout(() => {
            const sectionId = href.replace('#', '');
            const element = document.getElementById(sectionId);
            if (element) {
                const rect = element.getBoundingClientRect();
                const offsetPosition = window.pageYOffset + rect.top - 80;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 150);
    };

    // Opciones de CV
    const cvOptions = [
        {
            name: 'ESP',
            icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="6" width="24" height="4" fill="#C60B1E" />
                <rect y="10" width="24" height="4" fill="#FFC400" />
                <rect y="14" width="24" height="4" fill="#C60B1E" />
            </svg>,
            file: '/CV/Jesús M. Vázquez Herrera - CV.pdf'
        },
        {
            name: 'ENG',
            icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="#00247D" />
                <path d="M0 0L24 24M24 0L0 24" stroke="white" strokeWidth="3" />
                <path d="M12 0V24M0 12H24" stroke="white" strokeWidth="5" />
                <path d="M12 0V24M0 12H24" stroke="#CF142B" strokeWidth="3" />
            </svg>,
            file: '/CV/Jesús M. Vázquez Herrera - CV ENG.pdf'
        },
        {
            name: 'EU',
            icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="#003399" />
                <circle cx="12" cy="12" r="8" stroke="#FFCC00" strokeOpacity="0.3" strokeWidth="0.2" fill="none" />
                <circle cx="12" cy="6" r="1" fill="#FFCC00" />
                <circle cx="15" cy="6.5" r="1" fill="#FFCC00" />
                <circle cx="17.5" cy="9" r="1" fill="#FFCC00" />
                <circle cx="18" cy="12" r="1" fill="#FFCC00" />
                <circle cx="17.5" cy="15" r="1" fill="#FFCC00" />
                <circle cx="15" cy="17.5" r="1" fill="#FFCC00" />
                <circle cx="12" cy="18" r="1" fill="#FFCC00" />
                <circle cx="9" cy="17.5" r="1" fill="#FFCC00" />
                <circle cx="6.5" cy="15" r="1" fill="#FFCC00" />
                <circle cx="6" cy="12" r="1" fill="#FFCC00" />
                <circle cx="6.5" cy="9" r="1" fill="#FFCC00" />
                <circle cx="9" cy="6.5" r="1" fill="#FFCC00" />
            </svg>,
            file: '/CV/EUROPASS.pdf'
        }
    ];

    const isLargeScreen = initialHeight > 750;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay de fondo - eliminamos el onClick de aquí */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Contenedor principal que actúa como espacio para centrar */}
                    <div className="fixed inset-0 flex items-center justify-end z-50 pr-4">
                        {/* Contenedor del menú con bordes redondeados */}
                        <motion.div
                            ref={menuRef} // Añadimos la referencia aquí
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className={`bg-gray-900 shadow-xl flex flex-col rounded-2xl
                                ${isLargeScreen
                                    ? 'max-h-[85vh] w-72'
                                    : 'h-[85vh] max-h-[600px] w-[85%] max-w-[280px]'}`}
                        >
                            {/* Header del menú */}
                            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                                <h2 className="text-white text-lg font-medium">Navegación</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label="Cerrar menú"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Área de navegación compacta */}
                            <nav className="flex-1 overflow-auto px-4 py-3">
                                <ul className="space-y-2">
                                    {navItems.map((item) => (
                                        <li key={item.name}>
                                            <button
                                                onClick={() => handleLinkClick(item.href)}
                                                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                                                    ${activeSection === item.href.substring(1)
                                                        ? 'bg-blue-600 text-white shadow-md'
                                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                    }`}
                                            >
                                                <span className={`p-1.5 rounded-lg ${activeSection === item.href.substring(1)
                                                    ? 'bg-blue-500/30'
                                                    : 'bg-gray-800'
                                                    }`}>
                                                    {getIcon(item.href)}
                                                </span>
                                                <span className="font-medium text-sm">{item.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Footer más compacto */}
                            <div className="p-4 border-t border-gray-700 space-y-3">
                                {/* Enlaces rápidos en una sola fila */}
                                <div className="grid grid-cols-3 gap-2">
                                    <a
                                        href="#"
                                        className="flex flex-col items-center p-2 bg-gray-800/60 rounded-lg hover:bg-gray-800 transition-colors"
                                        aria-label="TFG Videojuegos"
                                    >
                                        <Gamepad className="text-blue-400 mb-1" size={16} />
                                        <span className="text-xs text-gray-300 text-center">TFG Juegos</span>
                                    </a>

                                    <a
                                        href="/documents/TFG.pdf"
                                        download="TFG_Domotica.pdf"
                                        className="flex flex-col items-center p-2 bg-gray-800/60 rounded-lg hover:bg-gray-800 transition-colors"
                                        aria-label="Descargar TFG Domótica"
                                    >
                                        <FileText className="text-blue-400 mb-1" size={16} />
                                        <span className="text-xs text-gray-300 text-center">TFG Domótica</span>
                                    </a>

                                    {/* Selector de CV */}
                                    <div className="relative" ref={cvDropdownRef}>
                                        <button
                                            onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
                                            className="flex flex-col items-center p-2 bg-gray-800/60 rounded-lg hover:bg-gray-800 transition-colors w-full h-full"
                                        >
                                            <FileText className="text-blue-400 mb-1" size={16} />
                                            <span className="text-xs text-gray-300 flex items-center">
                                                CV
                                                <ChevronDown
                                                    size={12}
                                                    className={`ml-0.5 transition-transform ${cvDropdownOpen ? 'rotate-180' : ''}`}
                                                />
                                            </span>
                                        </button>

                                        {/* Dropdown del CV */}
                                        <AnimatePresence>
                                            {cvDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute right-0 mt-1 w-28 bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-700 z-10"
                                                >
                                                    {cvOptions.map((option) => (
                                                        <a
                                                            key={option.name}
                                                            href={option.file}
                                                            download={`CV_JesusManuelVazquez_${option.name}.pdf`}
                                                            className="flex items-center px-3 py-1.5 text-gray-300 hover:bg-gray-700 transition-colors text-xs"
                                                        >
                                                            <span className="mr-2">{option.icon}</span>
                                                            <span>{option.name}</span>
                                                        </a>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Redes sociales */}
                                <div className="flex justify-center gap-4 pt-1">
                                    <a
                                        href="https://github.com/bytevolt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-800/60 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                    >
                                        <Github size={18} />
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/bytevolt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-800/60 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                </div>

                                {/* Copyright */}
                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span>ByteVolt</span>
                                    <span>©2024</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

MobileMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired
        })
    ).isRequired,
    activeSection: PropTypes.string
};

export default MobileMenu;