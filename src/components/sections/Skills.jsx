import { motion } from 'framer-motion';
import Container from '../layout/Container';
import SkillCard from '../ui/SkillCard';
import { skillsData } from '../../data/skills';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { staggerChildren } from '../../utils/animation';

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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">My Skills</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
                        Las tecnologías y herramientas con las que trabajo para crear experiencias web excepcionales
                    </p>

                    <motion.div
                        className="grid md:grid-cols-2 gap-6"
                        variants={staggerChildren(0.1)}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        {skillsData.map((skillGroup, index) => (
                            <SkillCard
                                key={skillGroup.category}
                                category={skillGroup.category}
                                icon={skillGroup.icon}
                                description={skillGroup.description}
                                skills={skillGroup.skills}
                                index={index}
                                inView={inView}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
};

export default Skills;