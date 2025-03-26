import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Rocket, Code, Layers, HardDrive, BookOpen } from 'lucide-react';
import Container from '../layout/Container';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { headingAnimation, fadeInUp } from '../../utils/animation';
import CVSelector from '../ui/CVSelector';
import AboutProfessionalBackground from '../ui/AboutProfessionalBackground';

const About = () => {
    const { ref, inView } = useScrollAnimation();
    const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    // Detectar si es pantalla de escritorio
    useEffect(() => {
        const checkDevice = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return (
        <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
            <Container className="relative z-10">
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
                            Desarrollador de Aplicaciones Web especializado en tecnologías modernas
                        </p>
                    </motion.div>

                    {/* Contenido principal */}
                    <div className={`grid ${isDesktop ? 'lg:grid-cols-5' : 'grid-cols-1'} gap-6`}>
                        {/* Columna principal - perfil desarrollador */}
                        <motion.div
                            variants={fadeInUp}
                            className={`bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-md ${isDesktop ? 'lg:col-span-3' : ''}`}
                        >
                            <div className="space-y-6">
                                {/* Encabezado con símbolos de código */}
                                <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 font-mono text-sm pb-2 border-b border-slate-200 dark:border-slate-700">
                                    <span>&lt;Perfil</span>
                                    <span className="text-blue-500 dark:text-blue-400">Desarrollador</span>
                                    <span>/&gt;</span>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            Desarrollador Web Full Stack
                                        </span>
                                    </h3>

                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Actualmente estudiante de <span className="font-medium">Desarrollo de Aplicaciones Web</span> en ADA ITS, Sevilla, con un enfoque en tecnologías modernas como React, Node.js y ecosistemas JavaScript avanzados. Mi objetivo es crear soluciones digitales que combinen rendimiento, escalabilidad y experiencias de usuario excepcionales.
                                    </p>

                                    <div className="relative pl-4 border-l-2 border-indigo-500 dark:border-indigo-400 italic text-gray-600 dark:text-gray-400">
                                        Mi experiencia me permite abordar proyectos desde múltiples perspectivas, identificando oportunidades para implementar soluciones técnicas innovadoras que maximicen el valor tanto para usuarios como para stakeholders.
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Busco constantemente expandir mis conocimientos y mantenerme al día con las últimas tendencias en desarrollo web, enfocándome en construir aplicaciones robustas pero elegantes que resuelvan problemas reales.
                                    </p>
                                </div>

                                {/* Tarjetas de especialización - diseño mejorado */}
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="relative group overflow-hidden rounded-lg">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-indigo-600/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                                        <div className="bg-indigo-50 dark:bg-gray-800/80 group-hover:bg-transparent p-4 rounded-lg relative z-10 h-full border border-transparent dark:border-indigo-900/50 transition-colors duration-300">
                                            <div className="flex items-center mb-3">
                                                <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 group-hover:bg-white/20 transition-colors duration-300">
                                                    <Code className="text-blue-600 dark:text-blue-400 group-hover:text-white h-5 w-5 transition-colors duration-300" />
                                                </div>
                                                <h4 className="ml-2 font-medium text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors duration-300">Frontend</h4>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/90 transition-colors duration-300">
                                                Desarrollo de interfaces dinámicas con React, manejo de estados complejos y optimización para performance.
                                            </p>
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-500"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative group overflow-hidden rounded-lg">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/80 to-blue-600/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                                        <div className="bg-blue-50 dark:bg-gray-800/80 group-hover:bg-transparent p-4 rounded-lg relative z-10 h-full border border-transparent dark:border-blue-900/50 transition-colors duration-300">
                                            <div className="flex items-center mb-3">
                                                <div className="p-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/50 group-hover:bg-white/20 transition-colors duration-300">
                                                    <HardDrive className="text-cyan-600 dark:text-cyan-400 group-hover:text-white h-5 w-5 transition-colors duration-300" />
                                                </div>
                                                <h4 className="ml-2 font-medium text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors duration-300">Backend</h4>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/90 transition-colors duration-300">
                                                Construcción de APIs REST y GraphQL con Node.js, gestión de bases de datos y servicios cloud.
                                            </p>
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative group overflow-hidden rounded-lg">
                                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/80 to-emerald-600/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                                        <div className="bg-teal-50 dark:bg-gray-800/80 group-hover:bg-transparent p-4 rounded-lg relative z-10 h-full border border-transparent dark:border-teal-900/50 transition-colors duration-300">
                                            <div className="flex items-center mb-3">
                                                <div className="p-1.5 rounded-full bg-teal-100 dark:bg-teal-900/50 group-hover:bg-white/20 transition-colors duration-300">
                                                    <Rocket className="text-teal-600 dark:text-teal-400 group-hover:text-white h-5 w-5 transition-colors duration-300" />
                                                </div>
                                                <h4 className="ml-2 font-medium text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors duration-300">Metodologías</h4>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/90 transition-colors duration-300">
                                                Trabajo con enfoque en Agile/Scrum, integración continua y despliegue automatizado.
                                            </p>
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-teal-400 to-emerald-500"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                transition={{ duration: 0.8, delay: 0.6 }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Selector de CV */}
                                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                                    <CVSelector variant="primary" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Columna secundaria - formación técnica (versión desktop) */}
                        {/*{isDesktop ? (
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-md lg:col-span-2 relative self-start"
                            >*/}
                        {isDesktop ? (
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-md lg:col-span-2 relative self-center"
                            >
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-medium py-1 px-2 rounded-md shadow-lg">
                                    Formación complementaria
                                </div>

                                <div className="space-y-6">
                                    {/* Encabezado con símbolos de código */}
                                    <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 font-mono text-sm pb-2 border-b border-slate-200 dark:border-slate-700">
                                        <span>&lt;Background</span>
                                        <span className="text-blue-500 dark:text-blue-400">Técnico</span>
                                        <span>/&gt;</span>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            Mi formación en desarrollo web se complementa con una sólida base técnica en varios campos que me permite abordar proyectos con una perspectiva única y multidisciplinar.
                                        </p>

                                        {/* Áreas de experiencia previa */}
                                        <div className="space-y-3">
                                            <div className="flex items-start">
                                                <div className="p-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mr-3 mt-0.5">
                                                    <Layers className="text-indigo-600 dark:text-indigo-400 h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">Sistemas Técnicos</h4>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                        Formación en sistemas electrotécnicos y telecomunicaciones que enriquece mi comprensión de infraestructuras.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="p-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 mr-3 mt-0.5">
                                                    <BookOpen className="text-cyan-600 dark:text-cyan-400 h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">Gestión de Almacén</h4>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                        Experiencia en gestión de almacenes y logística que me aporta habilidades organizativas y de optimización.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="p-1.5 rounded-full bg-teal-100 dark:bg-teal-900/30 mr-3 mt-0.5">
                                                    <Cpu className="text-teal-600 dark:text-teal-400 h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">Electricidad</h4>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                        Conocimientos en instalaciones eléctricas que potencian mi capacidad para entender sistemas complejos e interconectados.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <motion.button
                                            onClick={() => setIsBackgroundVisible(true)}
                                            className="w-full bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-800 hover:from-gray-700 hover:to-gray-600 text-white rounded-lg py-2 px-4 text-sm font-medium shadow-inner flex items-center justify-center"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Ver más detalles
                                            <motion.span
                                                className="ml-2 relative w-5 h-5 flex items-center justify-center"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 1.5,
                                                    repeatType: "reverse"
                                                }}
                                            >
                                                <span className="absolute w-full h-full bg-white/20 rounded-full animate-ping opacity-75"></span>
                                                <span className="relative block w-2 h-2 bg-white rounded-full"></span>
                                            </motion.span>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            // Botón expandible para formación técnica (versión móvil/tablet)
                            <motion.div
                                variants={fadeInUp}
                                className="relative w-full"
                            >
                                <AboutProfessionalBackground
                                    isOpen={isBackgroundVisible}
                                    onToggle={() => setIsBackgroundVisible(!isBackgroundVisible)}
                                />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </Container>

            {/* Modal para mostrar detalles completos en escritorio */}
            <AnimatePresence>
                {isDesktop && isBackgroundVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsBackgroundVisible(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-3xl shadow-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-4 px-6 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-white">Información Técnica Complementaria</h3>
                                <button
                                    className="text-white/80 hover:text-white transition-colors"
                                    onClick={() => setIsBackgroundVisible(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6 max-h-[70vh] overflow-y-auto">
                                <div className="prose dark:prose-invert prose-indigo max-w-none">
                                    <p>
                                        Mi formación en desarrollo web se complementa con una sólida base técnica en varios campos que me permite abordar proyectos con una perspectiva única y multidisciplinar.
                                    </p>

                                    <div className="grid md:grid-cols-3 gap-4 my-6">
                                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                <div className="p-1.5 rounded-full bg-indigo-100 dark:bg-indigo-800">
                                                    <Layers className="text-indigo-600 dark:text-indigo-400 h-5 w-5" />
                                                </div>
                                                <h4 className="ml-2 font-medium">Sistemas Técnicos</h4>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Formación en sistemas electrotécnicos, telecomunicaciones y automatización que enriquece mi comprensión de infraestructuras técnicas.
                                            </p>
                                        </div>

                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-800">
                                                    <BookOpen className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                                                </div>
                                                <h4 className="ml-2 font-medium">Gestión</h4>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Experiencia en gestión de almacenes y logística que me aporta habilidades organizativas y de optimización de procesos.
                                            </p>
                                        </div>

                                        <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                <div className="p-1.5 rounded-full bg-teal-100 dark:bg-teal-800">
                                                    <Cpu className="text-teal-600 dark:text-teal-400 h-5 w-5" />
                                                </div>
                                                <h4 className="ml-2 font-medium">Electricidad</h4>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Conocimientos en instalaciones eléctricas y telecomunicaciones que potencian mi capacidad para entender sistemas complejos e interconectados.
                                            </p>
                                        </div>
                                    </div>

                                    <h5 className="font-medium mt-6 mb-4 flex items-center gap-2">
                                        <span className="inline-block w-4 h-4 rounded-full bg-indigo-500"></span>
                                        Datos complementarios
                                    </h5>

                                    <table className="w-full text-sm">
                                        <tbody>
                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                                <td className="py-3 font-medium">Fecha de nacimiento</td>
                                                <td className="py-3">27/1/1999</td>
                                            </tr>
                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                                <td className="py-3 font-medium">Carnet de conducir</td>
                                                <td className="py-3">B</td>
                                            </tr>
                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                                <td className="py-3 font-medium">Disponibilidad</td>
                                                <td className="py-3">Para viajar</td>
                                            </tr>
                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                                <td className="py-3 font-medium">Experiencia total</td>
                                                <td className="py-3">+2 años</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 font-medium">Certificados</td>
                                                <td className="py-3">Conductor de carretilla</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900/50 py-3 px-6 flex justify-end">
                                <button
                                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    onClick={() => setIsBackgroundVisible(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default About;