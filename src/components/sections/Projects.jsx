import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../layout/Container';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import { projects } from '../../data/projects';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { staggerChildren, headingAnimation } from '../../utils/animation';

const Projects = () => {
    const { ref, inView } = useScrollAnimation();
    const [filter, setFilter] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Extraer categorías únicas de las etiquetas de proyectos
    const categories = ['all', ...new Set(projects.flatMap(project =>
        project.tags.map(tag => tag.toLowerCase())
    ))].sort();

    // Obtener hasta 5 categorías principales para mostrar siempre (las más usadas)
    const getCategoryCount = () => {
        const counts = {};
        projects.forEach(project => {
            project.tags.forEach(tag => {
                const lowerTag = tag.toLowerCase();
                counts[lowerTag] = (counts[lowerTag] || 0) + 1;
            });
        });
        return counts;
    };

    const categoryRef = useRef(null);
    const [showAllCategories, setShowAllCategories] = useState(false);

    // Filtrar proyectos cuando cambia el filtro
    useEffect(() => {
        const filtered = filter === 'all'
            ? projects
            : projects.filter(project =>
                project.tags.some(tag => tag.toLowerCase() === filter)
            );
        setFilteredProjects(filtered);
    }, [filter]);

    // Manejar apertura del modal de detalles
    const handleOpenProjectDetails = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    // Ordenar las categorías por popularidad
    const categoryCounts = getCategoryCount();
    const popularCategories = [...categories].sort((a, b) => {
        if (a === 'all') return -1;
        if (b === 'all') return 1;
        return (categoryCounts[b] || 0) - (categoryCounts[a] || 0);
    });

    const displayCategories = showAllCategories ?
        popularCategories :
        popularCategories.slice(0, Math.min(6, popularCategories.length));

    const hasMoreCategories = popularCategories.length > 6;

    return (
        <section id="projects" className="py-20">
            <Container>
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={staggerChildren(0.1)}
                    className="space-y-12"
                >
                    {/* Título de la sección */}
                    <motion.div
                        variants={headingAnimation}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">Proyectos Destacados</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Una selección de proyectos recientes que destacan mis habilidades y
                            expertise en diferentes tecnologías.
                        </p>
                    </motion.div>

                    {/* Filtros de categorías */}
                    <div className="relative">
                        <motion.div
                            ref={categoryRef}
                            className="flex flex-wrap justify-center gap-3 mb-10"
                        >
                            {displayCategories.map((category) => (
                                <motion.button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`px-4 py-2 rounded-full capitalize transition-colors ${filter === category
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {category}
                                    {category !== 'all' && (
                                        <span className="ml-1.5 bg-white dark:bg-gray-700 text-xs py-0.5 px-1.5 rounded-full text-blue-600 dark:text-blue-400">
                                            {categoryCounts[category] || 0}
                                        </span>
                                    )}
                                </motion.button>
                            ))}

                            {hasMoreCategories && (
                                <motion.button
                                    onClick={() => setShowAllCategories(!showAllCategories)}
                                    className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {showAllCategories ? 'Mostrar menos' : 'Mostrar más'}
                                </motion.button>
                            )}
                        </motion.div>
                    </div>

                    {/* Grid de proyectos */}
                    <div ref={ref} className="relative">
                        {filteredProjects.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-16 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                            >
                                <p className="text-xl text-gray-500 dark:text-gray-400">
                                    No se encontraron proyectos para esta categoría.
                                </p>
                                <button
                                    onClick={() => setFilter('all')}
                                    className="mt-4 px-6 py-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                                >
                                    Ver todos los proyectos
                                </button>
                            </motion.div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AnimatePresence mode="wait">
                                    {filteredProjects.map((project, index) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            index={index}
                                            inView={inView}
                                            onClick={() => handleOpenProjectDetails(project)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Botón para mostrar todos los proyectos si se está filtrando */}
                        {filter !== 'all' && filteredProjects.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-10 text-center"
                            >
                                <motion.button
                                    onClick={() => setFilter('all')}
                                    className="px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Ver todos los proyectos
                                </motion.button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </Container>

            {/* Modal de detalles del proyecto */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default Projects;