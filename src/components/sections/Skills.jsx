import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Server, Database, Terminal, Smartphone, Settings } from 'lucide-react';
import Container from '../layout/Container';
import { skillsData } from '../../data/skills';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { staggerChildren, fadeInUp } from '../../utils/animation';
import { categoryColors } from '../../utils/categoryColors';

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
    const { ref, inView } = useScrollAnimation({ threshold: 0.1 });
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const cardRefs = useRef([]);
    const autoAnimationRef = useRef(null);

    // Mapeo de índices a coordenadas para la animación de aparición
    const getDelayByIndex = (index) => {
        const row = Math.floor(index / 3); // Para 3 columnas en desktop
        const col = index % 3;
        return (row * 0.1) + (col * 0.05);
    };

    // Obtener nombre de categoría para colores
    const getCategoryClass = (icon, property) => {
        const colorObject = categoryColors[icon] || categoryColors.frontend;
        return colorObject[property] || '';
    };

    // Función para animar una tarjeta aleatoria (usando useCallback para mantener referencia estable)
    const animateRandomCard = useCallback(() => {
        if (!inView) return;

        const randomIndex = Math.floor(Math.random() * skillsData.length);
        setHoveredCard(randomIndex);

        // Restaurar después de un tiempo
        setTimeout(() => {
            if (document.visibilityState === 'visible') { // Comprobación adicional para páginas en segundo plano
                setHoveredCard(null);
            }
        }, 2000);
    }, [inView]); // Ahora depende correctamente de inView

    // Efecto para gestionar vista inicial y animaciones automáticas
    useEffect(() => {
        // Cuando entra en vista por primera vez
        if (inView && !hasAnimated) {
            setHasAnimated(true);

            // Inicia animaciones automáticas después de que las tarjetas aparezcan
            const initialDelay = setTimeout(() => {
                animateRandomCard();

                // Configura intervalo para animaciones periódicas
                autoAnimationRef.current = setInterval(animateRandomCard, 4000);
            }, 2000); // Espera a que aparezcan las tarjetas

            return () => clearTimeout(initialDelay);
        }

        // Limpia el intervalo cuando sale de la vista
        if (!inView && autoAnimationRef.current) {
            clearInterval(autoAnimationRef.current);
            autoAnimationRef.current = null;
            setHoveredCard(null);
        }

        // Si vuelve a entrar en vista y ya se animó, reinicia el intervalo
        if (inView && hasAnimated && !autoAnimationRef.current) {
            autoAnimationRef.current = setInterval(animateRandomCard, 4000);
        }

        // Limpieza al desmontar
        return () => {
            if (autoAnimationRef.current) {
                clearInterval(autoAnimationRef.current);
            }
        };
    }, [inView, hasAnimated, animateRandomCard]); // Añadida la dependencia faltante

    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70 dark:opacity-30">
                <div className="absolute -top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-radial from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20" />
                <div className="absolute top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-purple-100/40 via-transparent to-transparent dark:from-purple-900/20" />
                <div className="absolute -bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-green-100/40 via-transparent to-transparent dark:from-green-900/20" />

                {/* Líneas técnicas decorativas */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                        d="M0,35 Q25,40 50,35 T100,35"
                        stroke="currentColor"
                        strokeWidth="0.1"
                        strokeDasharray="1,2"
                        className="text-blue-300/30 dark:text-blue-500/10"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M0,65 Q25,60 50,65 T100,65"
                        stroke="currentColor"
                        strokeWidth="0.1"
                        strokeDasharray="1,2"
                        className="text-purple-300/30 dark:text-purple-500/10"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M0,50 L100,50"
                        stroke="currentColor"
                        strokeWidth="0.1"
                        strokeDasharray="0.5,1.5"
                        className="text-gray-400/20 dark:text-gray-500/10"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            <Container className="relative z-10">
                <div ref={ref} className="w-full">
                    <motion.div
                        className="text-center space-y-4 mb-16"
                        variants={staggerChildren(0.2)}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white relative inline-block"
                            variants={fadeInUp}
                        >
                            Habilidades
                        </motion.h2>
                        <motion.p
                            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                            variants={fadeInUp}
                        >
                            Las tecnologías y herramientas con las que trabajo para crear experiencias web excepcionales
                        </motion.p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {skillsData.map((skillGroup, index) => {
                            const isHovered = hoveredCard === index;
                            const icon = skillGroup.icon;
                            const IconComponent = iconComponents[icon];

                            return (
                                <motion.div
                                    key={skillGroup.category}
                                    ref={el => (cardRefs.current[index] = el)}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={inView ? {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.6,
                                            delay: getDelayByIndex(index),
                                            ease: [0.215, 0.61, 0.355, 1]
                                        }
                                    } : { opacity: 0, y: 30 }}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.2, ease: "easeOut" }
                                    }}
                                    onHoverStart={() => setHoveredCard(index)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                    className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform"
                                >
                                    {/* Gradiente de fondo */}
                                    <div className="absolute inset-0 bg-white dark:bg-gray-800 transition-opacity duration-300 group-hover:opacity-95 opacity-100" />

                                    {/* Borde brillante animado */}
                                    <div className="absolute inset-0 p-0.5 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className={`absolute inset-0 ${getCategoryClass(icon, 'bg')} dark:bg-opacity-30 blur-sm`} />
                                    </div>

                                    <div className="p-6 md:p-8 relative">
                                        <div className="flex items-center mb-4">
                                            {/* Contenedor del icono con efecto de pulsación sutil */}
                                            <div
                                                className={`p-3 rounded-lg ${getCategoryClass(icon, 'bg')} relative`}
                                            >
                                                {IconComponent && (
                                                    <motion.div
                                                        animate={isHovered ? {
                                                            rotate: [0, 10, -10, 0],
                                                            scale: [1, 1.1, 1.1, 1]
                                                        } : { rotate: 0, scale: 1 }}
                                                        transition={isHovered ? {
                                                            duration: 0.6,
                                                            ease: "easeInOut"
                                                        } : { duration: 0.3 }}
                                                    >
                                                        <IconComponent className={`h-6 w-6 ${getCategoryClass(icon, 'text')}`} />
                                                    </motion.div>
                                                )}

                                                {/* Círculos concéntricos animados para el icono */}
                                                <AnimatePresence>
                                                    {isHovered && (
                                                        <>
                                                            <motion.div
                                                                className="absolute inset-0 rounded-lg"
                                                                initial={{ boxShadow: `0 0 0 2px ${getCategoryClass(icon, 'ringColor') || 'rgba(59, 130, 246, 0.2)'}`, opacity: 0.8 }}
                                                                animate={{
                                                                    boxShadow: `0 0 0 10px transparent`,
                                                                    opacity: 0
                                                                }}
                                                                exit={{ opacity: 0, scale: 0.9 }}
                                                                transition={{
                                                                    repeat: Infinity,
                                                                    duration: 2,
                                                                    ease: "easeOut"
                                                                }}
                                                            />
                                                            <motion.div
                                                                className="absolute inset-0 rounded-lg"
                                                                initial={{ boxShadow: `0 0 0 0px ${getCategoryClass(icon, 'ringColor') || 'rgba(59, 130, 246, 0.3)'}`, opacity: 0.6 }}
                                                                animate={{
                                                                    boxShadow: `0 0 0 15px transparent`,
                                                                    opacity: 0
                                                                }}
                                                                exit={{ opacity: 0, scale: 0.9 }}
                                                                transition={{
                                                                    repeat: Infinity,
                                                                    duration: 2.5,
                                                                    ease: "easeOut",
                                                                    delay: 0.3
                                                                }}
                                                            />
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <h3 className={`ml-4 text-xl font-semibold ${getCategoryClass(icon, 'text')} transition-colors duration-300`}>
                                                {skillGroup.category}
                                            </h3>
                                        </div>

                                        {/* Descripción con animación */}
                                        <p className="mb-5 text-gray-600 dark:text-gray-400 text-sm">
                                            {skillGroup.description}
                                        </p>

                                        {/* Etiquetas de habilidades */}
                                        <div className="flex flex-wrap gap-2">
                                            {skillGroup.skills.map((skill, skillIndex) => (
                                                <motion.span
                                                    key={skill}
                                                    animate={isHovered ? {
                                                        y: [-2, 0],
                                                        scale: [0.98, 1],
                                                        opacity: [0.9, 1]
                                                    } : { y: 0, scale: 1, opacity: 1 }}
                                                    transition={{
                                                        delay: isHovered ? 0.05 * skillIndex : 0,
                                                        duration: 0.2
                                                    }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        y: -2
                                                    }}
                                                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300
                                                        shadow-sm hover:shadow-md
                                                        ${getCategoryClass(icon, 'bg')} 
                                                        ${getCategoryClass(icon, 'text')}
                                                        ${getCategoryClass(icon, 'hoverBg')}`}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Línea decorativa en la parte inferior */}
                                    <motion.div
                                        className={`absolute bottom-0 left-0 h-1 ${getCategoryClass(icon, 'bg')} opacity-70`}
                                        initial={{ width: "30%" }}
                                        animate={{
                                            width: isHovered ? "100%" : (inView ? "30%" : "0%"),
                                        }}
                                        transition={{ duration: 0.8 }}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Skills;