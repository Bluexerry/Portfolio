import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, Download } from 'lucide-react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// Componente Portal para el dropdown con PropTypes
const DropdownPortal = ({ children }) => {
    // Asegurarse de que estamos en el cliente antes de usar ReactDOM.createPortal
    if (typeof window === 'undefined') return null;

    // Crear un nodo en el body para el portal si no existe
    let portalNode = document.getElementById('dropdown-portal');
    if (!portalNode) {
        portalNode = document.createElement('div');
        portalNode.id = 'dropdown-portal';
        document.body.appendChild(portalNode);
    }

    return ReactDOM.createPortal(children, portalNode);
};

// Añadimos la validación de PropTypes para el DropdownPortal
DropdownPortal.propTypes = {
    children: PropTypes.node.isRequired
};

const CVSelector = ({ className = '', buttonVariant = 'outline', buttonSize = 'md' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

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

    // Actualizar posición cuando se abre el dropdown
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    }, [isOpen]);

    // Cerrar el dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && buttonRef.current && !buttonRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Determinamos las clases para el botón principal según la variante
    const buttonClasses = {
        outline: "border border-gray-600 hover:border-blue-400 text-gray-200",
        primary: "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md hover:shadow-lg border-0",
    };

    // Determinamos el tamaño para el botón
    const sizeClasses = {
        sm: "text-sm px-3 py-1.5",
        md: "px-5 py-2.5",
        lg: "text-lg px-6 py-3",
    };

    return (
        <div className={`relative ${className}`}>
            <motion.button
                ref={buttonRef}
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
                    <DropdownPortal>
                        <motion.div
                            ref={dropdownRef}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                top: `${dropdownPosition.top}px`,
                                left: `${dropdownPosition.left}px`,
                                width: `${dropdownPosition.width}px`,
                                zIndex: 9999,
                            }}
                            className="bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-700"
                        >
                            {cvOptions.map((option) => (
                                <motion.a
                                    key={option.name}
                                    href={option.file}
                                    download={`CV_JesusManuelVazquez_${option.name}.pdf`}
                                    className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 transition-colors"
                                    whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }}
                                >
                                    <span className="mr-2">{option.icon}</span>
                                    <span>{option.name}</span>
                                    <Download size={14} className="ml-auto" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </DropdownPortal>
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