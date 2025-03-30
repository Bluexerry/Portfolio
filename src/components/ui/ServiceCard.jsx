import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';

const ServiceCard = ({
    title,
    description,
    icon,
    bgColor,
    iconColor,
    index
}) => {
    const [isActive, setIsActive] = useState(false);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, {
        once: false,
        amount: 0.2, // Reducido para que sea más fácil activar
        margin: "0px 0px -50px 0px" // Margen ajustado
    });
    const controls = useAnimation();

    // Iniciar con animación básica sin esperar a scroll
    useEffect(() => {
        // Establecer la animación inicial inmediatamente
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: index * 0.1 }
        });

        // Agregar el movimiento flotante cuando es visible
        if (isInView) {
            controls.start({
                y: [0, -8, 0],
                transition: {
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }
            });

            // Activar efecto cuando la tarjeta está en vista
            const timer = setTimeout(() => {
                setIsActive(true);
                // Desactivar después de un tiempo
                setTimeout(() => {
                    setIsActive(false);
                }, 2500);
            }, index * 200); // Escalonar activación por índice

            return () => clearTimeout(timer);
        }
    }, [isInView, controls, index]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            className={`
                bg-gray-800 rounded-xl p-8 shadow-md 
                border border-transparent hover:border-blue-900
                transition-all duration-300 relative overflow-hidden
            `}
        >
            {/* Efectos visuales especiales - siempre activos inicialmente */}
            <>
                {/* Destello que recorre la tarjeta */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.2, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                        delay: index * 0.2
                    }}
                >
                    <motion.div
                        className="absolute w-20 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 blur-md"
                        style={{
                            transform: "skewX(-30deg)"
                        }}
                        animate={{
                            x: ["-100%", "200%"]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut",
                            delay: index * 0.2
                        }}
                    />
                </motion.div>

                {/* Partículas al activarse */}
                {isActive && (
                    <>
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={`particle-${i}`}
                                className="absolute w-1 h-1 rounded-full bg-blue-300"
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 60}%`,
                                    boxShadow: "0 0 10px 2px rgba(96, 165, 250, 0.7)"
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 0.8, 0],
                                    scale: [0, 1, 0],
                                    y: [0, -20 - Math.random() * 20],
                                    x: [0, (Math.random() - 0.5) * 30]
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </>
                )}
            </>

            {/* Gradient Background on scroll-trigger */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${bgColor} transition-opacity duration-700`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 0.9 : 0 }}
                transition={{ duration: 0.5 }}
            />

            {/* Content with higher z-index */}
            <div className="relative z-10">
                <div className={`
                    inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6
                    bg-gray-700 ${iconColor} text-2xl
                    transition-transform duration-300 ${isActive ? 'scale-110' : ''}
                `}>
                    {icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-200 transition-colors duration-300">
                    {title}
                </h3>

                <p className={`text-gray-400 transition-colors duration-300 ${isActive ? 'text-white' : ''}`}>
                    {description}
                </p>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? "100%" : 0 }}
                    className="h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 mt-4"
                    transition={{ duration: 0.5 }}
                />
            </div>
        </motion.div>
    );
};

ServiceCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    bgColor: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};

export default ServiceCard;