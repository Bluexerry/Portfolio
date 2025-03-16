import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import PropTypes from 'prop-types';
import Button from './Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Handle ESC key to close the modal
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

    // Animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={backdropVariants}
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                        variants={modalVariants}
                        onClick={e => e.stopPropagation()}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Header Image */}
                        <div
                            className="w-full h-64 md:h-80 bg-cover bg-center relative"
                            style={{
                                backgroundImage: project.image ? `url(${project.image})` : 'none',
                                backgroundColor: !project.image ? 'rgba(168, 85, 247, 0.1)' : undefined,
                            }}
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-20rem)]">
                            <div className="px-6 py-5">
                                <div className="flex items-start justify-between mb-5">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        {project.title}
                                    </h2>
                                    <div className="flex gap-2 ml-4">
                                        {project.demoUrl && (
                                            <Button
                                                href={project.demoUrl}
                                                target="_blank"
                                                variant="primary"
                                                size="sm"
                                                icon={<ExternalLink size={16} />}
                                            >
                                                Demo
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
                                                Code
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4 mb-6 flex-wrap">
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Calendar size={16} className="mr-1" />
                                        <span className="text-sm">2023</span>
                                    </div>
                                    {project.tags?.map(tag => (
                                        <div key={tag} className="flex items-center text-gray-600 dark:text-gray-400">
                                            <Tag size={16} className="mr-1" />
                                            <span className="text-sm">{tag}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="prose dark:prose-invert max-w-none mb-6">
                                    <h3 className="text-lg font-medium mb-2">Descripción</h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {project.longDescription || project.description}
                                    </p>
                                </div>

                                {project.features && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium mb-3">Características principales</h3>
                                        <ul className="space-y-2">
                                            {project.features.map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start"
                                                >
                                                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-purple-100 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400 text-sm">
                                                        •
                                                    </span>
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.technologies && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium mb-3">Tecnologías utilizadas</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map(tech => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
                            <Button onClick={onClose} variant="outline">
                                Cerrar
                            </Button>
                        </div>
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