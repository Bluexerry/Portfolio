import { motion } from 'framer-motion';
import { Lightbulb, Cpu, Zap } from 'lucide-react';
import Container from '../layout/Container';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { headingAnimation, fadeInUp } from '../../utils/animation';
import CVSelector from '../ui/CVSelector';

const About = () => {
    const { ref, inView } = useScrollAnimation();

    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
            <Container>
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="space-y-16"
                >
                    {/* Título de la sección */}
                    <motion.div
                        variants={headingAnimation}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">Sobre mí</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Combinando mis habilidades en desarrollo web con mi formación en sistemas eléctricos
                        </p>
                    </motion.div>

                    {/* Bio con tarjetas de fortalezas */}
                    <motion.div variants={fadeInUp}>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
                            <div className="max-w-4xl mx-auto">
                                {/* Descripción principal */}
                                <div className="mb-10 space-y-4">
                                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                        Un desarrollador con doble perfil técnico
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Soy un desarrollador front-end con formación en sistemas electrotécnicos y automatizados,
                                        lo que me brinda una perspectiva única para crear interfaces web intuitivas y dinámicas con un
                                        código limpio y eficiente. Mi experiencia combinada en estos campos me permite
                                        abordar problemas desde múltiples ángulos técnicos.
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Actualmente, me estoy especializando en el desarrollo de aplicaciones web modernas utilizando
                                        React y otras tecnologías frontend, mientras aprovecho mi conocimiento previo en sistemas eléctricos
                                        y automatización para construir soluciones completas.
                                    </p>
                                </div>

                                {/* Tarjetas de fortalezas/habilidades */}
                                <div className="grid md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                                        <div className="flex items-center mb-4">
                                            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800">
                                                <Cpu className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-3 font-medium">Desarrollo Web</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Creación de interfaces modernas y responsivas con React, JavaScript y CSS avanzado,
                                            centradas en la experiencia del usuario.
                                        </p>
                                    </div>

                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                                        <div className="flex items-center mb-4">
                                            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800">
                                                <Zap className="text-purple-600 dark:text-purple-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-3 font-medium">Sistemas Eléctricos</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Diseño y mantenimiento de sistemas eléctricos, automatización industrial,
                                            domótica y energías renovables.
                                        </p>
                                    </div>

                                    <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg">
                                        <div className="flex items-center mb-4">
                                            <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-800">
                                                <Lightbulb className="text-teal-600 dark:text-teal-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-3 font-medium">Solución de Problemas</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Capacidad para analizar problemas complejos y encontrar soluciones
                                            innovadoras combinando conocimientos de diferentes disciplinas técnicas.
                                        </p>
                                    </div>
                                </div>

                                {/* Botón de descarga CV */}
                                <div className="flex justify-center">
                                    <CVSelector variant="primary" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
};

export default About;