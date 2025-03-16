import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import PropTypes from 'prop-types';

const ProjectCard = ({ project, index, inView }) => {
    const { title, description, image, tags, demoUrl, repoUrl } = project;
    const [imageLoaded, setImageLoaded] = useState(false);

    // Precargar imagen para comprobar si existe
    useEffect(() => {
        if (!image) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            setImageLoaded(true);
        };
        img.onerror = () => {
            setImageLoaded(false);
        };
    }, [image]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
        >
            <div className="h-48 w-full relative bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
                {/* Contenedor centrado para la imagen más pequeña */}
                {imageLoaded && (
                    <div className="w-32 h-32 flex items-center justify-center">
                        <img
                            src={image}
                            alt={title}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                )}

                {/* Fallback para cuando la imagen no carga */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white/80">{title.charAt(0)}</span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between">
                    {demoUrl && (
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 dark:bg-blue-600 text-white rounded-lg text-sm font-medium"
                        >
                            <ExternalLink size={16} /> Demo
                        </motion.a>
                    )}

                    {repoUrl && (
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium"
                        >
                            <Github size={16} /> Code
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        longDescription: PropTypes.string,
        image: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        demoUrl: PropTypes.string,
        repoUrl: PropTypes.string,
        featured: PropTypes.bool
    }).isRequired,
    index: PropTypes.number.isRequired,
    inView: PropTypes.bool.isRequired
};

export default ProjectCard;