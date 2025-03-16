import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
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

// Función para obtener un degradado de fondo basado en las tecnologías
const getBackgroundGradient = (tags) => {
    if (!tags || tags.length === 0) return 'bg-gradient-to-r from-gray-700 to-gray-900';

    // Seleccionar hasta 2 tecnologías para el gradiente
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

const ProjectModal = ({ project, isOpen, onClose }) => {
    // Solución mejorada para prevenir scroll Y EL DESPLAZAMIENTO LATERAL
    useEffect(() => {
        if (isOpen) {
            // Calcular el ancho de la barra de desplazamiento
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            // Aplicar estilos para prevenir scroll y compensar el ancho de la barra
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            // Asegurar que el header también compensé el desplazamiento si está fijo
            const header = document.querySelector('header');
            if (header && window.getComputedStyle(header).position === 'fixed') {
                header.style.paddingRight = `${scrollbarWidth}px`;
            }
        } else {
            // Restaurar estilos
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';

            const header = document.querySelector('header');
            if (header) {
                header.style.paddingRight = '';
            }
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';

            const header = document.querySelector('header');
            if (header) {
                header.style.paddingRight = '';
            }
        };
    }, [isOpen]);

    // Manejar tecla Escape para cerrar el modal
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEscKey);
        }

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    if (!project) return null;

    // Variantes de animación mejoradas
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, y: 100, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.5
            }
        }
    };

    // Variantes para animar elementos internos del modal en secuencia
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: custom => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: custom * 0.1,
                duration: 0.4
            }
        })
    };

    const headerBgStyle = getBackgroundGradient(project.tags);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={backdropVariants}
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header con degradado de fondo basado en tecnologías */}
                        <div className={`w-full py-8 px-6 relative text-white ${headerBgStyle}`}>
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold mb-3 max-w-[80%]"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                custom={0}
                            >
                                {project.title}
                            </motion.h2>

                            <motion.p
                                className="text-white/80 text-lg max-w-[90%]"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                custom={1}
                            >
                                {project.description}
                            </motion.p>

                            <motion.button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                                aria-label="Close modal"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={20} />
                            </motion.button>
                        </div>

                        {/* Contenido del proyecto */}
                        <div className="overflow-y-auto max-h-[calc(90vh-13rem)]">
                            <div className="px-6 py-5">
                                {/* Acciones */}
                                <motion.div
                                    className="flex flex-wrap gap-3 mb-6"
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={2}
                                >
                                    {project.demoUrl && (
                                        <Button
                                            href={project.demoUrl}
                                            target="_blank"
                                            variant="primary"
                                            size="sm"
                                            icon={<ExternalLink size={16} />}
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
                                        >
                                            Ver Código
                                        </Button>
                                    )}
                                </motion.div>

                                {/* Etiquetas */}
                                <motion.div
                                    className="flex flex-wrap gap-2 mb-6"
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={3}
                                >
                                    <div className="flex items-center text-gray-600 dark:text-gray-400 mr-2">
                                        <Calendar size={16} className="mr-1" />
                                        <span className="text-sm">2023</span>
                                    </div>
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
                                                    transition: { delay: 0.3 + (i * 0.05) }
                                                }}
                                            >
                                                <span className={`${bgColor} flex items-center px-3 py-1 rounded-full text-sm text-white`}>
                                                    <Tag size={12} className="mr-1" />
                                                    {tag}
                                                </span>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>

                                {/* Descripción completa */}
                                <motion.div
                                    className="prose dark:prose-invert max-w-none mb-8"
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={4}
                                >
                                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Acerca del proyecto</h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {project.longDescription || project.description}
                                    </p>
                                </motion.div>

                                {/* Características si están disponibles */}
                                {project.features && (
                                    <motion.div
                                        className="mb-8"
                                        variants={contentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        custom={5}
                                    >
                                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Características principales</h3>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {project.features.map((feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="flex items-start bg-gray-50 dark:bg-gray-750 p-3 rounded-lg"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                        transition: { delay: 0.5 + (index * 0.1) }
                                                    }}
                                                >
                                                    <div className="min-w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3 mt-0.5">
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

                        {/* Footer */}
                        <motion.div
                            className="px-6 py-4 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex justify-end"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            custom={6}
                        >
                            <Button onClick={onClose} variant="outline" size="sm">
                                Cerrar
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

ProjectModal.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        longDescription: PropTypes.string,
        image: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        features: PropTypes.arrayOf(PropTypes.string),
        technologies: PropTypes.arrayOf(PropTypes.string),
        demoUrl: PropTypes.string,
        repoUrl: PropTypes.string
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ProjectModal;