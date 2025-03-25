import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const ProjectButton = ({ children }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isDisintegrating, setIsDisintegrating] = useState(false);

    // Detectar tamaño de pantalla
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 992);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Manejar el clic con animación de rayo mejorada
    const handleClick = () => {
        setIsClicked(true);

        // Comenzar la desintegración después de la explosión de rayos
        setTimeout(() => {
            setIsDisintegrating(true);
        }, 800);

        // Esperar a que termine la animación completa antes de expandir
        setTimeout(() => {
            setIsExpanded(true);
        }, 1400);
    };

    // Si no es pantalla pequeña, mostrar el contenido normalmente
    if (!isSmallScreen) {
        return <>{children}</>;
    }

    // Cuando está expandido, devolver los children con una animación
    if (isExpanded) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1] // Ease-out-quint para una aceleración natural
                }}
            >
                {children}
            </motion.div>
        );
    }

    // Partículas para el efecto de desintegración
    const particles = Array.from({ length: 80 }, (_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 0.2
    }));

    return (
        <div className="space-y-6 my-10">
            <AnimatePresence mode="wait">
                <motion.div
                    className="relative w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="button-container"
                    transition={{ duration: 0.5 }}
                >
                    {/* Botón con diseño artístico y animaciones de neón */}
                    <motion.button
                        onClick={handleClick}
                        disabled={isClicked}
                        className="relative w-full py-5 px-6 overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white rounded-lg border border-indigo-500/30 shadow-[0_0_25px_rgba(79,70,229,0.4)]"
                        animate={isDisintegrating ? {
                            opacity: [1, 0],
                            scale: [1, 0.95],
                            y: [0, 10]
                        } : {}}
                        transition={isDisintegrating ? {
                            duration: 0.6,
                            ease: "easeInOut"
                        } : {}}
                    >
                        {/* Efecto de desintegración */}
                        {isDisintegrating && (
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {particles.map(particle => (
                                    <motion.div
                                        key={`particle-disintegrate-${particle.id}`}
                                        className="absolute rounded-full bg-blue-400"
                                        style={{
                                            left: `${particle.x}%`,
                                            top: `${particle.y}%`,
                                            width: `${particle.size}px`,
                                            height: `${particle.size}px`,
                                            boxShadow: "0 0 8px 2px rgba(147, 197, 253, 0.6)"
                                        }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0, 1, 0],
                                            y: [0, -20 - Math.random() * 50],
                                            x: [0, (Math.random() - 0.5) * 60]
                                        }}
                                        transition={{
                                            duration: 0.6 + Math.random() * 0.4,
                                            delay: particle.delay,
                                            ease: "easeOut"
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Efectos de fondo */}
                        <div className="absolute inset-0 overflow-hidden">
                            {/* Gradiente animado de fondo */}
                            <motion.div
                                className="absolute inset-0 opacity-70"
                                style={{
                                    background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, rgba(30, 58, 138, 0.1) 70%)"
                                }}
                                animate={isDisintegrating ? {
                                    opacity: [0.7, 0],
                                    scale: [1, 1.2]
                                } : {
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.7, 0.5]
                                }}
                                transition={isDisintegrating ? {
                                    duration: 0.5
                                } : {
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Partículas brillantes */}
                            {!isDisintegrating && [...Array(12)].map((_, i) => (
                                <motion.div
                                    key={`particle-${i}`}
                                    className="absolute w-1 h-1 rounded-full bg-blue-300"
                                    style={{
                                        left: `${15 + Math.random() * 70}%`,
                                        top: `${10 + Math.random() * 80}%`,
                                        boxShadow: "0 0 10px 2px rgba(147, 197, 253, 0.7)"
                                    }}
                                    animate={{
                                        opacity: [0, 0.8, 0],
                                        scale: [0, 1, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2 + Math.random() * 3,
                                        delay: Math.random() * 2,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}

                            {/* Líneas de circuito en el fondo */}
                            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 100">
                                <motion.path
                                    d="M20,50 C60,30 80,70 120,50 C160,30 180,70 220,50 C260,30 280,70 320,50"
                                    stroke="#4f46e5"
                                    strokeWidth="1"
                                    fill="none"
                                    strokeDasharray="0 1"
                                    initial={{ strokeDasharray: "0 1" }}
                                    animate={isDisintegrating ? {
                                        strokeDasharray: "1 0",
                                        opacity: [1, 0]
                                    } : {
                                        strokeDasharray: "1 0"
                                    }}
                                    transition={isDisintegrating ? {
                                        duration: 0.6
                                    } : {
                                        repeat: Infinity,
                                        duration: 4,
                                        ease: "easeInOut"
                                    }}
                                />
                                <motion.path
                                    d="M20,70 C60,50 80,90 120,70 C160,50 180,90 220,70 C260,50 280,90 320,70"
                                    stroke="#818cf8"
                                    strokeWidth="1"
                                    fill="none"
                                    strokeDasharray="0 1"
                                    initial={{ strokeDasharray: "0 1" }}
                                    animate={isDisintegrating ? {
                                        strokeDasharray: "1 0",
                                        opacity: [1, 0]
                                    } : {
                                        strokeDasharray: "1 0"
                                    }}
                                    transition={isDisintegrating ? {
                                        duration: 0.5,
                                        delay: 0.1
                                    } : {
                                        repeat: Infinity,
                                        duration: 4,
                                        delay: 0.5,
                                        ease: "easeInOut"
                                    }}
                                />
                            </svg>
                        </div>

                        {/* Rayos de neón que se forman dinámicamente */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 100">
                            <defs>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>

                                <linearGradient id="neonBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#60a5fa" />
                                    <stop offset="50%" stopColor="#93c5fd" />
                                    <stop offset="100%" stopColor="#60a5fa" />
                                </linearGradient>

                                <linearGradient id="neonPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#a78bfa" />
                                    <stop offset="50%" stopColor="#c4b5fd" />
                                    <stop offset="100%" stopColor="#a78bfa" />
                                </linearGradient>

                                <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#22d3ee" />
                                    <stop offset="50%" stopColor="#67e8f9" />
                                    <stop offset="100%" stopColor="#22d3ee" />
                                </linearGradient>
                            </defs>

                            {/* Rayo 1: zigzag horizontal */}
                            <motion.path
                                d="M10,40 L30,50 L50,30 L70,50 L90,30 L110,50 L130,30 L150,50 L170,30 L190,50 L210,30 L230,50 L250,30 L270,50 L290,40"
                                stroke="url(#neonBlue)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                filter="url(#glow)"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isDisintegrating ? {
                                    opacity: [1, 0],
                                    pathLength: 1
                                } : {
                                    pathLength: isClicked ? [0, 1] : [0, 1, 1, 0],
                                    opacity: isClicked ? [0, 1] : [0, 0.8, 0.8, 0],
                                }}
                                transition={isDisintegrating ? {
                                    duration: 0.3
                                } : {
                                    duration: isClicked ? 0.5 : 3,
                                    ease: "easeInOut",
                                    repeat: isClicked ? 0 : Infinity,
                                    times: isClicked ? [0, 1] : [0, 0.3, 0.7, 1]
                                }}
                            />

                            {/* Rayo 2: forma más vertical y orgánica */}
                            <motion.path
                                d="M100,10 L90,30 L110,40 L95,60 L115,70 L100,90"
                                stroke="url(#neonPurple)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                filter="url(#glow)"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isDisintegrating ? {
                                    opacity: [1, 0],
                                    pathLength: 1
                                } : {
                                    pathLength: isClicked ? [0, 1] : [0, 1, 1, 0],
                                    opacity: isClicked ? [0, 1] : [0, 0.8, 0.8, 0],
                                }}
                                transition={isDisintegrating ? {
                                    duration: 0.4,
                                    delay: 0.1
                                } : {
                                    duration: isClicked ? 0.4 : 2.5,
                                    delay: isClicked ? 0.1 : 1,
                                    ease: "easeInOut",
                                    repeat: isClicked ? 0 : Infinity,
                                    times: isClicked ? [0, 1] : [0, 0.3, 0.7, 1]
                                }}
                            />

                            {/* Rayo 3: forma más vertical y orgánica (lado derecho) */}
                            <motion.path
                                d="M200,10 L210,30 L190,40 L205,60 L185,70 L200,90"
                                stroke="url(#neonPurple)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                filter="url(#glow)"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isDisintegrating ? {
                                    opacity: [1, 0],
                                    pathLength: 1
                                } : {
                                    pathLength: isClicked ? [0, 1] : [0, 1, 1, 0],
                                    opacity: isClicked ? [0, 1] : [0, 0.8, 0.8, 0],
                                }}
                                transition={isDisintegrating ? {
                                    duration: 0.4,
                                    delay: 0.2
                                } : {
                                    duration: isClicked ? 0.4 : 2.5,
                                    delay: isClicked ? 0.2 : 1.5,
                                    ease: "easeInOut",
                                    repeat: isClicked ? 0 : Infinity,
                                    times: isClicked ? [0, 1] : [0, 0.3, 0.7, 1]
                                }}
                            />

                            {/* Animación de clic: rayos explosivos */}
                            {isClicked && !isDisintegrating && (
                                <>
                                    {/* Destello central inicial */}
                                    <motion.circle
                                        cx="150"
                                        cy="50"
                                        r="0"
                                        fill="white"
                                        initial={{ r: 0, opacity: 0 }}
                                        animate={{
                                            r: [0, 30, 10],
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeOut"
                                        }}
                                    />

                                    {/* Rayos radiales que salen del centro */}
                                    {[...Array(12)].map((_, i) => {
                                        const angle = (i * 30) * (Math.PI / 180);
                                        const startX = 150;
                                        const startY = 50;
                                        // Creamos un punto intermedio para hacer que los rayos no sean rectos
                                        const midDist = 60 + (i % 3) * 20;
                                        const midX = startX + Math.cos(angle) * midDist * 0.5;
                                        const midY = startY + Math.sin(angle) * midDist * 0.4;
                                        // Añadimos un giro aleatorio
                                        const midTwist = (i % 2 === 0) ? 10 : -10;
                                        const midTwistedX = midX + Math.cos(angle + Math.PI / 2) * midTwist;
                                        const midTwistedY = midY + Math.sin(angle + Math.PI / 2) * midTwist;

                                        const endX = startX + Math.cos(angle) * midDist * 1.5;
                                        const endY = startY + Math.sin(angle) * midDist;

                                        return (
                                            <motion.path
                                                key={`ray-${i}`}
                                                d={`M${startX},${startY} Q${midTwistedX},${midTwistedY} ${endX},${endY}`}
                                                stroke={i % 3 === 0 ? "url(#neonBlue)" : (i % 3 === 1 ? "url(#neonPurple)" : "url(#neonCyan)")}
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                filter="url(#glow)"
                                                fill="none"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{
                                                    pathLength: [0, 1],
                                                    opacity: [0, 1, 0.2]
                                                }}
                                                transition={{
                                                    duration: 0.7,
                                                    times: [0, 0.6, 1],
                                                    delay: 0.1 + (i * 0.03),
                                                    ease: "easeOut"
                                                }}
                                            />
                                        );
                                    })}

                                    {/* Ondas expansivas múltiples */}
                                    {[...Array(3)].map((_, i) => (
                                        <motion.circle
                                            key={`wave-${i}`}
                                            cx="150"
                                            cy="50"
                                            r="5"
                                            fill="none"
                                            stroke={i % 2 === 0 ? "#93c5fd" : "#c4b5fd"}
                                            strokeWidth={2 - i * 0.5}
                                            filter="url(#glow)"
                                            initial={{ r: 5, opacity: 0 }}
                                            animate={{
                                                r: [5, 200],
                                                opacity: [0.8, 0],
                                                strokeWidth: [2 - i * 0.5, 0.2]
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2 + i * 0.15,
                                                ease: "easeOut"
                                            }}
                                        />
                                    ))}
                                </>
                            )}
                        </svg>

                        {/* Contenido del botón */}
                        <div className="relative z-10 flex items-center justify-center gap-4">
                            {/* Icono de rayo izquierdo */}
                            <motion.svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]"
                                animate={isDisintegrating ? {
                                    opacity: [1, 0],
                                    x: -10,
                                    y: -5,
                                    rotate: -20
                                } : {
                                    filter: [
                                        "drop-shadow(0 0 3px rgba(147, 197, 253, 0.3))",
                                        "drop-shadow(0 0 8px rgba(147, 197, 253, 0.7))",
                                        "drop-shadow(0 0 3px rgba(147, 197, 253, 0.3))"
                                    ]
                                }}
                                transition={isDisintegrating ? {
                                    duration: 0.5
                                } : {
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut"
                                }}
                            >
                                <motion.path
                                    d="M13 2L4 14H11L9 22L20 9H12L13 2Z"
                                    stroke="#93c5fd"
                                    strokeWidth="2"
                                    fill="#4338ca"
                                    initial={{ opacity: 0.7 }}
                                    animate={isDisintegrating ? {
                                        opacity: [0.7, 1, 0]
                                    } : {
                                        opacity: [0.7, 1, 0.7]
                                    }}
                                    transition={isDisintegrating ? {
                                        duration: 0.4
                                    } : {
                                        repeat: Infinity,
                                        duration: 1.5,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.svg>

                            {/* Texto con resplandor neón */}
                            <motion.div
                                className="text-center"
                                animate={isDisintegrating ? {
                                    opacity: [1, 0],
                                    y: -8
                                } : {}}
                                transition={isDisintegrating ? {
                                    duration: 0.5,
                                    delay: 0.1
                                } : {}}
                            >
                                <motion.span
                                    className="text-lg font-medium tracking-wide text-white"
                                    animate={isDisintegrating ? {
                                        textShadow: "0 0 20px rgba(147,197,253,1), 0 0 30px rgba(147,197,253,0.8)"
                                    } : {
                                        textShadow: [
                                            "0 0 5px rgba(255,255,255,0.3)",
                                            "0 0 10px rgba(147,197,253,0.7), 0 0 20px rgba(147,197,253,0.5)",
                                            "0 0 5px rgba(255,255,255,0.3)"
                                        ]
                                    }}
                                    transition={isDisintegrating ? {
                                        duration: 0.3
                                    } : {
                                        repeat: Infinity,
                                        duration: 2.5,
                                        ease: "easeInOut"
                                    }}
                                >
                                    Ver proyectos y categorías
                                </motion.span>
                            </motion.div>

                            {/* Icono de rayo derecho */}
                            <motion.svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]"
                                animate={isDisintegrating ? {
                                    opacity: [1, 0],
                                    x: 10,
                                    y: -5,
                                    rotate: 20
                                } : {
                                    filter: [
                                        "drop-shadow(0 0 3px rgba(147, 197, 253, 0.3))",
                                        "drop-shadow(0 0 8px rgba(147, 197, 253, 0.7))",
                                        "drop-shadow(0 0 3px rgba(147, 197, 253, 0.3))"
                                    ]
                                }}
                                transition={isDisintegrating ? {
                                    duration: 0.5
                                } : {
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                            >
                                <motion.path
                                    d="M13 2L4 14H11L9 22L20 9H12L13 2Z"
                                    stroke="#93c5fd"
                                    strokeWidth="2"
                                    fill="#4338ca"
                                    initial={{ opacity: 0.7 }}
                                    animate={isDisintegrating ? {
                                        opacity: [0.7, 1, 0]
                                    } : {
                                        opacity: [0.7, 1, 0.7]
                                    }}
                                    transition={isDisintegrating ? {
                                        duration: 0.4
                                    } : {
                                        repeat: Infinity,
                                        duration: 1.5,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }}
                                />
                            </motion.svg>
                        </div>

                        {/* Borde neón pulsante */}
                        <motion.div
                            className="absolute inset-0 rounded-lg z-0"
                            style={{
                                boxShadow: "inset 0 0 0 1px rgba(99, 102, 241, 0.3)"
                            }}
                            animate={isDisintegrating ? {
                                boxShadow: [
                                    "inset 0 0 0 1px rgba(139, 92, 246, 0.7), 0 0 20px 1px rgba(79, 70, 229, 0.5)",
                                    "inset 0 0 0 2px rgba(139, 92, 246, 0.9), 0 0 30px 5px rgba(79, 70, 229, 0.7)",
                                    "inset 0 0 0 0px rgba(139, 92, 246, 0), 0 0 0px 0px rgba(79, 70, 229, 0)"
                                ],
                                opacity: [1, 1, 0]
                            } : {
                                boxShadow: [
                                    "inset 0 0 0 1px rgba(99, 102, 241, 0.3), 0 0 0 0 rgba(99, 102, 241, 0)",
                                    "inset 0 0 0 1px rgba(139, 92, 246, 0.7), 0 0 20px 1px rgba(79, 70, 229, 0.5)",
                                    "inset 0 0 0 1px rgba(99, 102, 241, 0.3), 0 0 0 0 rgba(99, 102, 241, 0)"
                                ]
                            }}
                            transition={isDisintegrating ? {
                                duration: 0.7,
                                times: [0, 0.4, 1]
                            } : {
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

ProjectButton.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProjectButton;