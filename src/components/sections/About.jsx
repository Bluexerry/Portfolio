import { motion } from 'framer-motion';
import { Lightbulb, Cpu, Zap, Calendar, MapPin, Car, Award, Briefcase } from 'lucide-react';
import Container from '../layout/Container';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { headingAnimation, fadeInUp } from '../../utils/animation';
import CVSelector from '../ui/CVSelector';

const About = () => {
    const { ref, inView } = useScrollAnimation();

    return (
        <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900">
            <Container>
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="space-y-10"
                >
                    {/* Título de la sección */}
                    <motion.div
                        variants={headingAnimation}
                        className="text-center space-y-3"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">Sobre mí</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Desarrollador de Aplicaciones Web con sólida formación técnica
                        </p>
                    </motion.div>

                    {/* Bio con tarjetas de fortalezas */}
                    <motion.div variants={fadeInUp}>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                            <div className="max-w-7xl mx-auto">
                                {/* Descripción principal */}
                                <div className="mb-6 space-y-3">
                                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                        Desarrollador especializado en tecnologías web
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Actualmente estudiante de Desarrollo de Aplicaciones Web en ADA ITS, Sevilla. Poseo una sólida formación técnica en automatización
                                        del hogar, sistemas eléctricos y instalaciones de telecomunicaciones complementada con gestión de almacenes y desarrollo de software.
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Mi pasión por la tecnología y la innovación me impulsa a crear soluciones eficientes y escalables,
                                        siempre orientadas a la mejora continua y la satisfacción del usuario.
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Actualmente dessarrollando aplicaciones web con React, Node.js y otras tecnologías modernas
                                        para construir productos digitales de alto rendimiento y calidad, siempre en constante aprendizaje y evolución.
                                    </p>
                                </div>

                                {/* Información personal */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                                        <Calendar className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                                        <span className="font-medium mr-2">Fecha de nacimiento:</span> 27/1/1999
                                    </div>
                                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                                        <Car className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                                        <span className="font-medium mr-2">Carnet de conducir:</span> B
                                    </div>
                                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                                        <MapPin className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                                        <span className="font-medium mr-2">Disponibilidad para viajar:</span> Sí
                                    </div>
                                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                                        <Briefcase className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                                        <span className="font-medium mr-2">Experiencia total:</span> +2 años
                                    </div>
                                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                                        <Award className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                                        <span className="font-medium mr-2">Certificados:</span> Conductor de carretilla
                                    </div>
                                </div>

                                {/* Tarjetas de fortalezas/habilidades */}
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-800">
                                                <Cpu className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-2 font-medium">Desarrollo Web</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Especializado en React, Node.js, JavaScript y otras tecnologías web modernas
                                            para construir aplicaciones frontend y backend de alto rendimiento.
                                        </p>
                                    </div>

                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-800">
                                                <Zap className="text-purple-600 dark:text-purple-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-2 font-medium">Sistemas Técnicos</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Formación en sistemas electrotécnicos, telecomunicaciones y automatización
                                            que complementa mi perfil como desarrollador de software.
                                        </p>
                                    </div>

                                    <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="p-1.5 rounded-full bg-teal-100 dark:bg-teal-800">
                                                <Lightbulb className="text-teal-600 dark:text-teal-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-2 font-medium">Sectores</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Experiencia en instalaciones eléctricas, telecomunicaciones,
                                            gestión de almacén y desarrollo de software.
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