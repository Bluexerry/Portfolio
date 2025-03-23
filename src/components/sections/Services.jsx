import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Layout, Code, PenTool, Zap } from 'lucide-react';
import Container from '../layout/Container';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { headingAnimation, staggerChildren } from '../../utils/animation';
import { servicesData } from '../../data/services';

// Mapeo de nombres de iconos a componentes
const iconComponents = {
    monitor: <Monitor />,
    server: <Server />,
    layout: <Layout />,
    code: <Code />,
    penTool: <PenTool />,
    zap: <Zap />
};

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
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        variants={headingAnimation}
                    >
                        Servicios
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
                                    {iconComponents[service.iconName]}
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