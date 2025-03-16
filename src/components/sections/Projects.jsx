import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../layout/Container';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import { projects } from '../../data/projects';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { staggerChildren } from '../../utils/animation';

const Projects = () => {
    const { ref, inView } = useScrollAnimation();
    const [filter, setFilter] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Extract unique categories from projects
    const categories = ['all', ...new Set(projects.flatMap(project =>
        project.tags.map(tag => tag.toLowerCase())
    ))];

    // Update filtered projects when filter changes
    useEffect(() => {
        const filtered = filter === 'all'
            ? projects
            : projects.filter(project =>
                project.tags.some(tag => tag.toLowerCase() === filter)
            );
        setFilteredProjects(filtered);
    }, [filter]);

    // Función para abrir modal con detalles del proyecto
    const handleOpenProjectDetails = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section id="projects" className="py-20">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        Proyectos Destacados
                    </h2>

                    {/* Filter buttons */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mb-12"
                        variants={staggerChildren(0.05)}
                        initial="hidden"
                        animate="visible"
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-4 py-2 rounded-full capitalize transition-colors ${filter === category
                                    ? 'bg-purple-600 dark:bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        ref={ref}
                        variants={staggerChildren(0.1)}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <AnimatePresence mode="wait">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => handleOpenProjectDetails(project)}
                                        className="cursor-pointer"
                                    >
                                        <ProjectCard
                                            project={project}
                                            index={index}
                                            inView={inView}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    className="col-span-full text-center py-16"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <p className="text-xl text-gray-500 dark:text-gray-400">
                                        No se encontraron proyectos en esta categoría.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Show all projects button if filtered */}
                    {filter !== 'all' && filteredProjects.length > 0 && (
                        <motion.div
                            className="mt-10 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.button
                                onClick={() => setFilter('all')}
                                className="px-6 py-3 text-purple-600 dark:text-blue-400 border border-purple-600 dark:border-blue-400 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Mostrar Todos los Proyectos
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Modal de detalles del proyecto */}
                    <ProjectModal
                        project={selectedProject}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />
                </motion.div>
            </Container>
        </section>
    );
};

export default Projects;