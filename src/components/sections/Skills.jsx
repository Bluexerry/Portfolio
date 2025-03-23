import { motion } from 'framer-motion';
import { Code, Server, Database, Terminal, Smartphone, Settings } from 'lucide-react';
import Container from '../layout/Container';
import { skillsData } from '../../data/skills';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { staggerChildren, fadeInUp } from '../../utils/animation';
import { categoryColors } from '../../utils/categoryColors'; // Importa el array desde el archivo externo

// Mapeo de iconos para cada categoría
const iconComponents = {
    frontend: Code,
    backend: Server,
    database: Database,
    code: Terminal,
    mobile: Smartphone,
    setting: Settings
};

const Skills = () => {
    const { ref, inView } = useScrollAnimation();

    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
            <Container>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4 text-center"
                        initial={{ y: -20, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Habilidades
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12"
                        initial={{ y: 20, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Las tecnologías y herramientas con las que trabajo para crear experiencias web excepcionales
                    </motion.p>

                    <motion.div
                        className="grid md:grid-cols-2 gap-6"
                        variants={staggerChildren(0.1)}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        {skillsData.map((skillGroup, index) => (
                            <motion.div
                                key={skillGroup.category}
                                variants={fadeInUp}
                                custom={index}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        {/* Icono de la categoría */}
                                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                            {(() => {
                                                const IconComponent = iconComponents[skillGroup.icon];
                                                return IconComponent ?
                                                    <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                    : null;
                                            })()}
                                        </div>
                                        <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                                            {skillGroup.category}
                                        </h3>
                                    </div>

                                    <p className="mb-5 text-gray-600 dark:text-gray-400 text-sm">
                                        {skillGroup.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.skills.map((skill) => (
                                            <motion.span
                                                key={skill}
                                                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-200 
                                                ${categoryColors[skillGroup.icon].bg} 
                                                ${categoryColors[skillGroup.icon].text}
                                                ${categoryColors[skillGroup.icon].hoverBg}`}
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
};

export default Skills;