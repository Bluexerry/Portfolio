import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Tag, Calendar, Clock, Code } from 'lucide-react';
import PropTypes from 'prop-types';
import Button from './Button';
import { techColorMap } from '../../utils/techColorMap';

// Función para obtener gradiente (mejorada con efectos de dirección y opacidad)
const getBackgroundGradient = (tags) => {
    if (!tags || tags.length === 0) return 'bg-gradient-to-r from-gray-700 to-gray-900';

    const gradientTags = tags.slice(0, Math.min(2, tags.length));
    const colors = gradientTags.map(tag => {
        const baseColor = techColorMap[tag]?.replace('bg-', '') || 'gray-700';
        return baseColor;
    });

    if (colors.length === 1) {
        return `bg-gradient-to-br from-${colors[0]} via-${colors[0]}/85 to-${colors[0]}/70`;
    }

    return `bg-gradient-to-br from-${colors[0]} via-${colors[0]}/85 to-${colors[1]}`;
};

// Componente ModalPortal - renderiza el modal fuera del DOM principal
function ModalPortal({ children }) {
    const modalRoot = document.getElementById('modal-root') || document.body;
    const el = useRef(document.createElement('div'));

    useEffect(() => {
        const currentEl = el.current;
        modalRoot.appendChild(currentEl);
        return () => modalRoot.removeChild(currentEl);
    }, [modalRoot]);

    return createPortal(children, el.current);
}

const ProjectModal = ({ project, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('about');

    // Solución de scroll con React Portal
    useEffect(() => {
        if (isOpen) {
            // Solo bloquear el scroll sin cambiar padding
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Manejar tecla Escape
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [isOpen, onClose]);

    if (!project) return null;

    // Variantes de animación
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.2 }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300
            }
        }
    };

    const headerBgStyle = getBackgroundGradient(project.tags);
    const year = project.year || "2023";

    // Características ordenadas en dos columnas cuando es posible
    const features = project.features || [];
    const firstColFeatures = features.slice(0, Math.ceil(features.length / 2));
    const secondColFeatures = features.slice(Math.ceil(features.length / 2));

    // Renderizar el modal a través del portal
    return (
        <ModalPortal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            {/* Overlay con backdrop blur */}
                            <motion.div
                                className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={backdropVariants}
                                onClick={onClose}
                            />

                            {/* Modal container */}
                            <motion.div
                                className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden z-10"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header con gradiente mejorado */}
                                <div className={`w-full py-12 px-8 relative text-white ${headerBgStyle} overflow-hidden`}>
                                    {/* Patrones decorativos y efecto visual */}
                                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                                        {/* Patrón de puntos */}
                                        <div className="absolute top-0 left-0 w-full h-40"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                                backgroundSize: '20px 20px'
                                            }}>
                                        </div>

                                        {/* Líneas zigzag */}
                                        <svg className="absolute inset-0 w-full h-full">
                                            <motion.path
                                                d="M0,30 L40,60 L80,30 L120,60 L160,30 L200,60 L240,30 L280,60 L320,30"
                                                stroke="white"
                                                strokeWidth="1"
                                                fill="none"
                                                initial={{ pathLength: 0, opacity: 0.2 }}
                                                animate={{ pathLength: 1, opacity: 0.5 }}
                                                transition={{ duration: 2.5, ease: "easeInOut" }}
                                            />
                                        </svg>

                                        {/* Círculos decorativos */}
                                        <motion.div
                                            className="absolute bottom-0 right-0 w-64 h-64 rounded-full"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                                                transform: 'translate(30%, 30%)'
                                            }}
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                opacity: [0.1, 0.15, 0.1]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                repeatType: "reverse"
                                            }}
                                        />
                                    </div>

                                    <motion.h2
                                        className="text-3xl md:text-4xl font-bold mb-3 max-w-[85%]"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {project.title}
                                    </motion.h2>

                                    <motion.p
                                        className="text-white/90 text-lg max-w-[90%]"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {project.description}
                                    </motion.p>

                                    {/* Botón de cierre mejorado */}
                                    <motion.button
                                        onClick={onClose}
                                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-colors"
                                        aria-label="Close modal"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <X size={20} />
                                    </motion.button>
                                </div>

                                {/* Pestañas de navegación */}
                                <div className="bg-gray-900/50 border-b border-gray-700">
                                    <div className="flex overflow-x-auto scrollbar-hide">
                                        <button
                                            onClick={() => setActiveTab('about')}
                                            className={`px-6 py-3 text-sm font-medium relative ${activeTab === 'about'
                                                ? 'text-blue-400'
                                                : 'text-gray-400 hover:text-gray-200'
                                                }`}
                                        >
                                            Acerca de
                                            {activeTab === 'about' && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                                                    layoutId="activeTab"
                                                />
                                            )}
                                        </button>
                                        {project.features && project.features.length > 0 && (
                                            <button
                                                onClick={() => setActiveTab('features')}
                                                className={`px-6 py-3 text-sm font-medium relative ${activeTab === 'features'
                                                    ? 'text-blue-400'
                                                    : 'text-gray-400 hover:text-gray-200'
                                                    }`}
                                            >
                                                Características
                                                {activeTab === 'features' && (
                                                    <motion.div
                                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                                                        layoutId="activeTab"
                                                    />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Contenido del proyecto */}
                                <div className="overflow-y-auto max-h-[calc(85vh-13rem)]">
                                    <div className="px-8 py-6">
                                        {/* Meta información: año y duración */}
                                        <motion.div
                                            className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.25 }}
                                        >
                                            <div className="flex items-center">
                                                <Calendar size={16} className="mr-1.5" />
                                                <span>{year}</span>
                                            </div>
                                            {project.duration && (
                                                <div className="flex items-center">
                                                    <Clock size={16} className="mr-1.5" />
                                                    <span>{project.duration}</span>
                                                </div>
                                            )}
                                        </motion.div>

                                        {/* Acciones */}
                                        <motion.div
                                            className="flex flex-wrap gap-3 mb-8"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {project.demoUrl && (
                                                <Button
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    variant="primary"
                                                    size="sm"
                                                    icon={<ExternalLink size={16} />}
                                                    className="shadow-md hover:shadow-lg transition-shadow relative overflow-hidden group"
                                                >
                                                    <span className="relative z-10">Ver Demo</span>
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                                </Button>
                                            )}
                                            {project.repoUrl && (
                                                <Button
                                                    href={project.repoUrl}
                                                    target="_blank"
                                                    variant="outline"
                                                    size="sm"
                                                    icon={<Github size={16} />}
                                                    className="hover:shadow-sm"
                                                >
                                                    Ver Código
                                                </Button>
                                            )}
                                        </motion.div>

                                        {/* Etiquetas mejoradas */}
                                        <motion.div
                                            className="flex flex-wrap gap-2 mb-8"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {project.tags?.map((tag, i) => {
                                                const bgColor = techColorMap[tag] || 'bg-gray-600';

                                                return (
                                                    <motion.div
                                                        key={tag}
                                                        className="flex items-center"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                            transition: { delay: 0.4 + (i * 0.05) }
                                                        }}
                                                        whileHover={{
                                                            y: -3,
                                                            boxShadow: `0 3px 10px rgba(0,0,0,0.2)`,
                                                            transition: { duration: 0.2 }
                                                        }}
                                                    >
                                                        <span className={`${bgColor} flex items-center px-3 py-1.5 rounded-full text-sm text-white shadow-sm relative overflow-hidden group`}>
                                                            <Tag size={12} className="mr-1.5 opacity-80" />
                                                            {tag}
                                                            {/* Efecto de brillo */}
                                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-shimmer" />
                                                        </span>
                                                    </motion.div>
                                                );
                                            })}
                                        </motion.div>

                                        {/* Contenido basado en pestañas */}
                                        <AnimatePresence mode="wait">
                                            {activeTab === 'about' && (
                                                <motion.div
                                                    key="about-content"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="prose prose-invert max-w-none mb-10"
                                                >
                                                    <h3 className="text-xl font-semibold mb-4 text-gray-100 flex items-center">
                                                        <span className="inline-block w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                                                        Acerca del proyecto
                                                    </h3>

                                                    <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/30 mb-6 relative overflow-hidden">
                                                        {/* Patrón decorativo */}
                                                        <div className="absolute top-0 right-0 w-24 h-24 opacity-20 pointer-events-none">
                                                            <Code className="w-full h-full text-blue-500" />
                                                        </div>

                                                        <p className="text-gray-300 leading-relaxed relative z-10">
                                                            {project.longDescription || project.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {activeTab === 'features' && (
                                                <motion.div
                                                    key="features-content"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mb-8"
                                                >
                                                    <h3 className="text-xl font-semibold mb-4 text-gray-100 flex items-center">
                                                        <span className="inline-block w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                                                        Características principales
                                                    </h3>

                                                    {/* Versión mejorada para desktop: dos columnas con conectores */}
                                                    <div className="hidden md:block">
                                                        <div className="flex gap-6">
                                                            {/* Primera columna */}
                                                            <div className="w-1/2 space-y-4">
                                                                {firstColFeatures.map((feature, index) => (
                                                                    <motion.div
                                                                        key={index}
                                                                        className="flex items-start bg-gray-750 p-4 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
                                                                        initial={{ opacity: 0, x: -10 }}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            x: 0,
                                                                            transition: { delay: 0.3 + (index * 0.1) }
                                                                        }}
                                                                        whileHover={{
                                                                            scale: 1.02,
                                                                            transition: { duration: 0.2 }
                                                                        }}
                                                                    >
                                                                        {/* Fondo animado en hover */}
                                                                        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                                        <div className="min-w-7 h-7 flex items-center justify-center rounded-full bg-green-900/30 mr-3 mt-0.5 relative z-10">
                                                                            <span className="text-green-400 text-xs font-bold">
                                                                                {index + 1}
                                                                            </span>
                                                                        </div>
                                                                        <span className="text-gray-200 relative z-10">
                                                                            {feature}
                                                                        </span>
                                                                    </motion.div>
                                                                ))}
                                                            </div>

                                                            {/* Segunda columna */}
                                                            <div className="w-1/2 space-y-4">
                                                                {secondColFeatures.map((feature, index) => (
                                                                    <motion.div
                                                                        key={index}
                                                                        className="flex items-start bg-gray-750 p-4 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
                                                                        initial={{ opacity: 0, x: 10 }}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            x: 0,
                                                                            transition: { delay: 0.3 + (index * 0.1) }
                                                                        }}
                                                                        whileHover={{
                                                                            scale: 1.02,
                                                                            transition: { duration: 0.2 }
                                                                        }}
                                                                    >
                                                                        {/* Fondo animado en hover */}
                                                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                                        <div className="min-w-7 h-7 flex items-center justify-center rounded-full bg-blue-900/30 mr-3 mt-0.5 relative z-10">
                                                                            <span className="text-blue-400 text-xs font-bold">
                                                                                {firstColFeatures.length + index + 1}
                                                                            </span>
                                                                        </div>
                                                                        <span className="text-gray-200 relative z-10">
                                                                            {feature}
                                                                        </span>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Versión para móvil: una columna */}
                                                    <div className="md:hidden space-y-4">
                                                        {project.features.map((feature, index) => (
                                                            <motion.div
                                                                key={index}
                                                                className="flex items-start bg-gray-750 p-4 rounded-lg border border-gray-700 shadow-sm relative overflow-hidden"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                    transition: { delay: 0.3 + (index * 0.1) }
                                                                }}
                                                            >
                                                                <div className="min-w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-green-500 mr-3 mt-0.5">
                                                                    <span className="text-white text-xs font-bold">
                                                                        {index + 1}
                                                                    </span>
                                                                </div>
                                                                <span className="text-gray-200">
                                                                    {feature}
                                                                </span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Footer mejorado */}
                                <motion.div
                                    className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-750 border-t border-gray-700 flex justify-end"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <Button
                                        onClick={onClose}
                                        variant="close"
                                        size="sm"
                                        className="shadow-sm hover:shadow-md"
                                    >
                                        Cerrar
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </ModalPortal>
    );
};

ProjectModal.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        longDescription: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        features: PropTypes.arrayOf(PropTypes.string),
        year: PropTypes.string,
        duration: PropTypes.string,
        technologies: PropTypes.arrayOf(PropTypes.string),
        demoUrl: PropTypes.string,
        repoUrl: PropTypes.string
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ProjectModal;