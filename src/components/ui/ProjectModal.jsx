import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Tag, Calendar, Clock } from 'lucide-react';
import PropTypes from 'prop-types';
import Button from './Button';

// Mapa de colores por tecnología (reutilizando el del ProjectCard)
const techColorMap = {
    'React': 'bg-blue-500',
    'Vue.js': 'bg-green-500',
    'JavaScript': 'bg-yellow-500',
    'TypeScript': 'bg-blue-600',
    'Node.js': 'bg-green-600',
    'Express': 'bg-gray-600',
    'PHP': 'bg-purple-600',
    'Laravel': 'bg-red-600',
    'C#': 'bg-purple-700',
    '.NET': 'bg-purple-600',
    'Java': 'bg-red-700',
    'Selenium': 'bg-green-700',
    'MongoDB': 'bg-green-600',
    'MySQL': 'bg-blue-700',
    'API': 'bg-indigo-600',
    'API REST': 'bg-indigo-600',
    'WebSockets': 'bg-purple-500',
    'CSS': 'bg-blue-400',
    'HTML': 'bg-orange-600',
    'Tailwind CSS': 'bg-teal-500',
    'Bootstrap': 'bg-purple-600',
    'Redux': 'bg-purple-600',
    'Framer Motion': 'bg-purple-500',
    'Mobile': 'bg-blue-600',
    'React Native': 'bg-blue-500',
    'TestNG': 'bg-yellow-600',
    'Maven': 'bg-red-600',
    'MVC': 'bg-gray-600',
    'Backend': 'bg-gray-700',
    'Swagger': 'bg-green-600',
    'Vuex': 'bg-green-600',
    'IoT': 'bg-blue-600',
    'Arduino': 'bg-teal-600',
    'Sensores': 'bg-yellow-600',
};

// Función para obtener gradiente (mantenida igual)
const getBackgroundGradient = (tags) => {
    if (!tags || tags.length === 0) return 'bg-gradient-to-r from-gray-700 to-gray-900';

    const gradientTags = tags.slice(0, Math.min(2, tags.length));
    const colors = gradientTags.map(tag => {
        const baseColor = techColorMap[tag]?.replace('bg-', '') || 'gray-700';
        return baseColor;
    });

    if (colors.length === 1) {
        return `bg-gradient-to-r from-${colors[0]} to-${colors[0]}/70`;
    }

    return `bg-gradient-to-r from-${colors[0]} to-${colors[1]}`;
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
                                className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden z-10"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header con gradiente mejorado */}
                                <div className={`w-full py-10 px-8 relative text-white ${headerBgStyle} overflow-hidden`}>
                                    {/* Patrones decorativos */}
                                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                                        <div className="absolute top-0 left-0 w-full h-40"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                                backgroundSize: '20px 20px'
                                            }}>
                                        </div>
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

                                {/* Contenido del proyecto */}
                                <div className="overflow-y-auto max-h-[calc(85vh-13rem)]">
                                    <div className="px-8 py-6">
                                        {/* Meta información: año y duración */}
                                        <motion.div
                                            className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400"
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
                                                    className="shadow-md hover:shadow-lg transition-shadow"
                                                >
                                                    Ver Demo
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
                                                const bgColor = techColorMap[tag] || 'bg-gray-200 dark:bg-gray-600';
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
                                                    >
                                                        <span className={`${bgColor} flex items-center px-3 py-1 rounded-full text-sm text-white shadow-sm`}>
                                                            <Tag size={12} className="mr-1.5 opacity-80" />
                                                            {tag}
                                                        </span>
                                                    </motion.div>
                                                );
                                            })}
                                        </motion.div>

                                        {/* Descripción completa mejorada */}
                                        <motion.div
                                            className="prose dark:prose-invert max-w-none mb-10"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
                                                <span className="inline-block w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                                                Acerca del proyecto
                                            </h3>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {project.longDescription || project.description}
                                            </p>
                                        </motion.div>

                                        {/* Características mejoradas */}
                                        {project.features && (
                                            <motion.div
                                                className="mb-8"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
                                                    <span className="inline-block w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                                                    Características principales
                                                </h3>
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    {project.features.map((feature, index) => (
                                                        <motion.div
                                                            key={index}
                                                            className="flex items-start bg-gray-50 dark:bg-gray-750 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                                transition: { delay: 0.6 + (index * 0.1) }
                                                            }}
                                                        >
                                                            <div className="min-w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3 mt-0.5">
                                                                <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">
                                                                    {index + 1}
                                                                </span>
                                                            </div>
                                                            <span className="text-gray-800 dark:text-gray-200">
                                                                {feature}
                                                            </span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer mejorado */}
                                <motion.div
                                    className="px-8 py-4 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex justify-end bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <Button
                                        onClick={onClose}
                                        variant="close"  // Cambia de "outline" a "close"
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