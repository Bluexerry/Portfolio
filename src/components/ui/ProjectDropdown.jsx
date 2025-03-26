import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';

const DropdownProjects = ({
    items,
    selectedItem,
    onItemSelected,
    countMap = {},
    buttonText = "Más categorías",
    maxWidth = "320px",
    gridCols = "grid-cols-1 sm:grid-cols-2"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Cerrar dropdown cuando se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Manejador para cuando se selecciona un item
    const handleItemClick = (item) => {
        onItemSelected(item);
        setIsOpen(false);
    };

    return (
        <motion.div
            ref={dropdownRef}
            className="relative inline-block z-30" // Aumentado el z-index del contenedor
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            {/* Botón del dropdown */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 
                    text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750 
                    transition-colors flex items-center gap-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                <Menu size={16} />
                <span>{buttonText}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={16} />
                </motion.span>
            </motion.button>

            {/* Menú desplegable con z-index mejorado */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scaleY: 0.5 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scaleY: 1,
                            transition: { type: "spring", stiffness: 300, damping: 24 }
                        }}
                        exit={{
                            opacity: 0,
                            y: 10,
                            scaleY: 0.5,
                            transition: { duration: 0.2 }
                        }}
                        className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-3 
                            bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 
                            overflow-hidden"
                        style={{
                            minWidth: maxWidth,
                            maxHeight: '60vh',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        {/* Resto del código del dropdown sin cambios */}
                        <div
                            className="overflow-y-auto"
                            style={{
                                maxHeight: 'calc(60vh - 24px)',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch',
                            }}
                        >
                            {/* Ocultar la barra de scroll */}
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                    .overflow-y-auto::-webkit-scrollbar {
                                        display: none;
                                    }
                                `
                            }} />

                            <div className={`grid ${gridCols} gap-3`}>
                                {items.map((item, index) => (
                                    <motion.button
                                        key={item}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            transition: { delay: index * 0.05 }
                                        }}
                                        onClick={() => handleItemClick(item)}
                                        className={`px-4 py-2.5 rounded-lg capitalize transition-colors 
                                            flex items-center justify-between text-base
                                            ${selectedItem === item
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <span className="truncate mr-2">{item}</span>
                                        {countMap[item] !== undefined && (
                                            <span className={`flex-shrink-0 ${selectedItem === item
                                                ? 'bg-blue-500/30 text-white'
                                                : 'bg-white/80 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                                                } text-xs py-0.5 px-1.5 rounded-full`}
                                            >
                                                {countMap[item]}
                                            </span>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

DropdownProjects.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedItem: PropTypes.string,
    onItemSelected: PropTypes.func.isRequired,
    countMap: PropTypes.object,
    buttonText: PropTypes.string,
    maxWidth: PropTypes.string,
    gridCols: PropTypes.string
};

export default DropdownProjects;