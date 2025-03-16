import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

// Mapa de colores por tecnología (simplificado por categorías principales)
const techColorMap = {
    // Frontend
    'React': 'bg-blue-500',
    'Vue.js': 'bg-green-500',
    'JavaScript': 'bg-yellow-500',
    'TypeScript': 'bg-blue-600',
    'Tailwind CSS': 'bg-teal-500',
    'CSS': 'bg-blue-400',
    'HTML': 'bg-orange-600',
    'Redux': 'bg-purple-600',
    'Framer Motion': 'bg-purple-500',
    'Bootstrap': 'bg-purple-600',

    // Backend
    'Node.js': 'bg-green-600',
    'Express': 'bg-gray-600',
    'PHP': 'bg-purple-600',
    'Laravel': 'bg-red-600',
    'C#': 'bg-purple-700',
    '.NET': 'bg-purple-600',
    'Java': 'bg-red-700',

    // Bases de datos
    'MongoDB': 'bg-green-600',
    'MySQL': 'bg-blue-700',

    // APIs y comunicación
    'API': 'bg-indigo-600',
    'API REST': 'bg-indigo-600',
    'WebSockets': 'bg-purple-500',
    'Swagger': 'bg-green-600',

    // Mobile y específicos
    'React Native': 'bg-blue-500',
    'Mobile': 'bg-blue-600',

    // Testing y automatización
    'Selenium': 'bg-green-700',
    'TestNG': 'bg-yellow-600',
    'Maven': 'bg-red-600',

    // Otros
    'MVC': 'bg-gray-600',
    'Backend': 'bg-gray-700',
    'IoT': 'bg-blue-600',
    'Arduino': 'bg-teal-600',
    'Sensores': 'bg-yellow-600',
    'Vuex': 'bg-green-600'
};

// Función para determinar el color de borde principal basado en la tecnología dominante
const getBorderColor = (tags) => {
    const mainTag = tags[0];
    const color = techColorMap[mainTag] || 'border-gray-200 dark:border-gray-700';
    return color.replace('bg-', 'border-');
};

const ProjectCard = ({ project, index, onClick }) => {
    const { title, description, tags, demoUrl, repoUrl } = project;

    // Determinar el color de borde basado en la tecnología principal
    const borderColor = getBorderColor(tags);

    return (
        <motion.div
            whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: {
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1.0]
                }
            }}
            whileTap={{ scale: 0.98 }}
            className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl border-l-4 ${borderColor} flex flex-col h-full`}
        >
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 leading-tight">
                        {title}
                    </h3>
                    <div className="flex space-x-2">
                        {repoUrl && (
                            <motion.a
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9, rotate: 0 }}
                                href={repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                                aria-label="View code on GitHub"
                            >
                                <Github size={18} />
                            </motion.a>
                        )}
                        {demoUrl && (
                            <motion.a
                                whileHover={{ scale: 1.2, rotate: -5 }}
                                whileTap={{ scale: 0.9, rotate: 0 }}
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                                aria-label="View live demo"
                            >
                                <ExternalLink size={18} />
                            </motion.a>
                        )}
                    </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.slice(0, 4).map((tag, i) => {
                        const bgColor = techColorMap[tag] || 'bg-gray-200 dark:bg-gray-700';
                        return (
                            <motion.span
                                key={tag}
                                className={`${bgColor} px-2.5 py-1 rounded-full text-xs font-medium text-white`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        delay: (index * 0.12) + 0.3 + (i * 0.07)
                                    }
                                }}
                                whileHover={{ y: -2 }}
                            >
                                {tag}
                            </motion.span>
                        );
                    })}
                    {tags.length > 4 && (
                        <motion.span
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    delay: (index * 0.12) + 0.3 + (4 * 0.07)
                                }
                            }}
                            whileHover={{ y: -2 }}
                        >
                            +{tags.length - 4}
                        </motion.span>
                    )}
                </div>
            </div>

            <motion.div
                onClick={onClick}
                className="mt-auto px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                whileHover={{ backgroundColor: "rgb(51, 67, 99)" }}
                whileTap={{ backgroundColor: "rgba(229, 231, 235, 1)" }}
                transition={{ duration: 0.2 }}
            >
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                    Ver detalles
                </span>
                <motion.div
                    className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <ChevronRight size={18} />
                </motion.div>
            </motion.div>
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
    inView: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ProjectCard;