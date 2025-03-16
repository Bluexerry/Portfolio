import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Layout, Code, PenTool, Zap } from 'lucide-react';
import Container from '../layout/Container';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { headingAnimation, staggerChildren } from '../../utils/animation';

const servicesData = [
    {
        icon: <Monitor />,
        title: 'Desarrollo Web Frontend',
        description: 'Creación de interfaces de usuario modernas, responsivas y de alto rendimiento utilizando React, Next.js y otras tecnologías frontend.',
        bgColor: 'from-purple-500/10 to-pink-500/10',
        iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
        icon: <Layout />,
        title: 'Diseño UI/UX',
        description: 'Diseño de experiencias de usuario centradas en el usuario, prototipos interactivos y flujos de usuario que transmiten la identidad de marca.',
        bgColor: 'from-blue-500/10 to-teal-500/10',
        iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
        icon: <Server />,
        title: 'Desarrollo Backend',
        description: 'Construcción de APIs RESTful, autenticación, bases de datos y servicios de backend con Node.js, Express y tecnologías relacionadas.',
        bgColor: 'from-green-500/10 to-emerald-500/10',
        iconColor: 'text-green-600 dark:text-green-400'
    },
    {
        icon: <Code />,
        title: 'Optimización Web',
        description: 'Mejora del rendimiento, SEO y velocidad de carga para sitios web existentes, aumentando las métricas Core Web Vitals.',
        bgColor: 'from-amber-500/10 to-yellow-500/10',
        iconColor: 'text-amber-600 dark:text-amber-400'
    },
    {
        icon: <PenTool />,
        title: 'Animaciones Web',
        description: 'Creación de animaciones interactivas, transiciones fluidas y micro-interacciones para mejorar la experiencia de usuario.',
        bgColor: 'from-red-500/10 to-pink-500/10',
        iconColor: 'text-red-600 dark:text-red-400'
    },
    {
        icon: <Zap />,
        title: 'Integración de APIs',
        description: 'Conexión de tu aplicación con servicios externos, pasarelas de pago, CMS headless y otras plataformas de terceros.',
        bgColor: 'from-indigo-500/10 to-violet-500/10',
        iconColor: 'text-indigo-600 dark:text-indigo-400'
    }
];

const Services = () => {
    const { ref, inView } = useScrollAnimation();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
            <Container>
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={staggerChildren(0.1)}
                    ref={ref}
                    className="text-center mb-16"
                >
                    <motion.span
                        className="inline-block text-purple-600 dark:text-blue-400 font-medium mb-2"
                        variants={headingAnimation}
                    >
                        Mis Servicios
                    </motion.span>
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        variants={headingAnimation}
                    >
                        Lo que ofrezco
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                        variants={headingAnimation}
                    >
                        Brindo soluciones digitales completas, desde el diseño hasta la implementación,
                        para ayudarte a alcanzar tus objetivos de negocio con tecnologías modernas.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                y: -10,
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className={`
                bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md 
                border border-transparent hover:border-purple-200 dark:hover:border-blue-900
                transition-all duration-300 relative overflow-hidden
              `}
                        >
                            {/* Gradient Background on hover */}
                            <div
                                className={`
                  absolute inset-0 bg-gradient-to-br ${service.bgColor} 
                  opacity-0 transition-opacity duration-300
                  ${hoveredIndex === index ? 'opacity-100' : ''}
                `}
                            />

                            {/* Content with higher z-index */}
                            <div className="relative z-10">
                                <div className={`
                  inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6
                  bg-gray-100 dark:bg-gray-700 ${service.iconColor} text-2xl
                `}>
                                    {service.icon}
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400">
                                    {service.description}
                                </p>

                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: hoveredIndex === index ? "100%" : 0 }}
                                    className="h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-500 dark:to-teal-500 mt-4"
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Services;