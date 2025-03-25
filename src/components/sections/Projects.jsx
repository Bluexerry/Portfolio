import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../layout/Container';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import DropdownProjects from '../ui/DropdownProjects';
import ProjectButton from '../ui/ProjectButton';
import { projects } from '../../data/projects';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { staggerChildren, headingAnimation } from '../../utils/animation';

const Projects = () => {
    // Configuración mejorada para el threshold
    const { ref, inView } = useScrollAnimation({ threshold: 0.05 });
    const [filter, setFilter] = useState('Todos');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skipExitAnimation, setSkipExitAnimation] = useState(false);

    // Extraer categorías únicas de las etiquetas de proyectos
    const TodosCategories = ['Todos', ...new Set(projects.flatMap(project =>
        project.tags.map(tag => tag.toLowerCase())
    ))].sort();

    // Contar proyectos por categoría
    const categoryCounts = TodosCategories.reduce((acc, category) => {
        if (category === 'Todos') {
            acc[category] = projects.length;
        } else {
            acc[category] = projects.filter(project =>
                project.tags.some(tag => tag.toLowerCase() === category)
            ).length;
        }
        return acc;
    }, {});

    // Ordenar categorías por popularidad (cantidad de proyectos)
    const popularCategories = [...TodosCategories].sort((a, b) => {
        if (a === 'Todos') return -1;
        if (b === 'Todos') return 1;
        return categoryCounts[b] - categoryCounts[a];
    });

    const hasMoreCategories = popularCategories.length > 6;
    const mainCategories = popularCategories.slice(0, 6);
    const extraCategories = popularCategories.slice(6);

    // Filtrar proyectos cuando cambia el filtro
    useEffect(() => {
        const filtered = filter === 'Todos'
            ? projects
            : projects.filter(project =>
                project.tags.some(tag => tag.toLowerCase() === filter)
            );

        setSkipExitAnimation(true);
        setTimeout(() => {
            setFilteredProjects(filtered);
            setSkipExitAnimation(false);
        }, 50);
    }, [filter]);

    // Manejar apertura del modal de detalles
    const handleOpenProjectDetails = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section
            id="projects"
            className="py-20"
            ref={ref}
        >
            <Container>
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={staggerChildren(0.1)}
                    className="space-y-12"
                >
                    <motion.div
                        variants={headingAnimation}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">Proyectos</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Explora mi portfolio de proyectos en diversas áreas y tecnologías, donde aplico diferentes enfoques para resolver desafíos de manera eficiente.
                        </p>
                    </motion.div>

                    {/* Envolvemos el contenido que queremos colapsar con ProjectButton */}
                    <ProjectButton>
                        {/* CATEGORÍAS CON COMPONENTE DROPDOWN */}
                        <div className="mb-10">
                            {/* Categorías principales visibles */}
                            <div className="flex flex-wrap justify-center gap-3 mb-4">
                                {mainCategories.map((category) => (
                                    <motion.button
                                        key={category}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        onClick={() => setFilter(category)}
                                        className={`px-4 py-2 rounded-full capitalize transition-colors ${filter === category
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {category}
                                        {category !== 'Todos' && (
                                            <span className="ml-1.5 bg-white dark:bg-gray-700 text-xs py-0.5 px-1.5 rounded-full text-blue-600 dark:text-blue-400">
                                                {categoryCounts[category] || 0}
                                            </span>
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Dropdown para categorías adicionales */}
                            {hasMoreCategories && (
                                <div className="flex justify-center">
                                    <DropdownProjects
                                        items={extraCategories}
                                        selectedItem={filter}
                                        onItemSelected={setFilter}
                                        countMap={categoryCounts}
                                        buttonText={`Ver ${extraCategories.length} categorías más`}
                                    />
                                </div>
                            )}
                        </div>

                        {/* GRID DE PROYECTOS */}
                        <div className="relative">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={filter}
                                    initial={skipExitAnimation ? { opacity: 1 } : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={skipExitAnimation ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {filteredProjects.length > 0 ? (
                                        filteredProjects.map(project => (
                                            <ProjectCard
                                                key={project.id}
                                                project={project}
                                                onClick={() => handleOpenProjectDetails(project)}
                                            />
                                        ))
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="col-span-full text-center py-16"
                                        >
                                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                                No se encontraron proyectos en esta categoría.
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </ProjectButton>
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