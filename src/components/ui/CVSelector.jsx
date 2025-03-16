import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, Download } from 'lucide-react';
import PropTypes from 'prop-types';

const CVSelector = ({ className = '', buttonVariant = 'outline', buttonSize = 'md' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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
                {/* Fondo azul de la bandera de la UE */}
                <rect width="24" height="24" fill="#003399" />

                {/* Círculo de 12 estrellas doradas */}
                <circle cx="12" cy="12" r="8" stroke="#FFCC00" strokeOpacity="0.3" strokeWidth="0.2" fill="none" />

                {/* Las 12 estrellas como pequeños círculos (simplificado) */}
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

    // Cerrar el dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Determinamos las clases para el botón principal según la variante
    const buttonClasses = {
        outline: "border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400 text-gray-800 dark:text-gray-200",
        primary: "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md hover:shadow-lg border-0",
    };

    // Determinamos el tamaño para el botón
    const sizeClasses = {
        sm: "text-sm px-3 py-1.5",
        md: "px-5 py-2.5",
        lg: "text-lg px-6 py-3",
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center font-medium rounded-lg transition-all duration-300 ${buttonClasses[buttonVariant] || buttonClasses.outline} ${sizeClasses[buttonSize] || sizeClasses.md}`}
                whileTap={{ scale: 0.95 }}
            >
                <FileText size={18} className="mr-2" />
                <span>Descargar CV</span>
                <ChevronDown size={16} className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 z-50 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700"
                    >
                        {cvOptions.map((option) => (
                            <motion.a
                                key={option.name}
                                href={option.file}
                                download={`CV_JesusManuelVazquez_${option.name}.pdf`}
                                className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <span className="mr-2">{option.icon}</span>
                                <span>{option.name}</span>
                                <Download size={14} className="ml-auto" />
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

CVSelector.propTypes = {
    className: PropTypes.string,
    buttonVariant: PropTypes.oneOf(['outline', 'primary']),
    buttonSize: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default CVSelector;