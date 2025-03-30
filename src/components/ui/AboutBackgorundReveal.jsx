import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Lightbulb, Zap, Award, MapPin, Calendar, Car, Briefcase, ChevronDown, Activity, Database, Layers } from 'lucide-react';

const AboutBackgroundReveal = ({ isOpen, onToggle }) => {
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);

    // Medir la altura del contenido cuando se monta y cuando cambia isOpen
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        <div className="w-full md:w-auto">
            {/* Botón animado */}
            <motion.button
                onClick={onToggle}
                className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg px-6 py-3 w-full md:w-auto flex items-center justify-center gap-2 shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                {/* Efecto de partículas en movimiento */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute w-1 h-1 rounded-full bg-white opacity-60"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                            animate={{
                                y: [0, -15 - Math.random() * 15],
                                x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 30],
                                opacity: [0.4, 0],
                                scale: [1, 0]
                            }}
                            transition={{
                                duration: 1 + Math.random() * 1.5,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>

                {/* Luces de fondo */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 via-transparent to-blue-500/30"
                    animate={{
                        background: [
                            "radial-gradient(circle at 25% 100%, rgba(79, 70, 229, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 75% 100%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 25% 100%, rgba(79, 70, 229, 0.3) 0%, transparent 50%)"
                        ]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                />

                {/* Texto e iconos */}
                <span className="relative z-10 font-medium">Formación técnica previa</span>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>

                {/* Líneas técnicas en segundo plano */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                        d="M0,50 Q25,45 50,50 T100,50"
                        stroke="white"
                        strokeWidth="0.5"
                        fill="none"
                        animate={{
                            d: [
                                "M0,50 Q25,45 50,50 T100,50",
                                "M0,50 Q25,55 50,50 T100,50",
                                "M0,50 Q25,45 50,50 T100,50"
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.path
                        d="M0,60 L100,60"
                        stroke="white"
                        strokeWidth="0.2"
                        strokeDasharray="1,2"
                        fill="none"
                        animate={{
                            y: [0, 5, 0],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.path
                        d="M0,40 L100,40"
                        stroke="white"
                        strokeWidth="0.2"
                        strokeDasharray="1,2"
                        fill="none"
                        animate={{
                            y: [0, -5, 0],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </svg>
            </motion.button>

            {/* Contenido desplegable */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{
                            height: contentHeight,
                            opacity: 1,
                            y: 0,
                            transition: {
                                height: { duration: 0.4 },
                                opacity: { duration: 0.3, delay: 0.1 }
                            }
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            y: -10,
                            transition: {
                                height: { duration: 0.3 },
                                opacity: { duration: 0.2 }
                            }
                        }}
                        className="overflow-hidden bg-gray-800 rounded-lg mt-4 shadow-lg border border-gray-700"
                    >
                        <div ref={contentRef} className="p-5">
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-3 text-gray-200 flex items-center">
                                    <Activity className="w-5 h-5 mr-2 text-indigo-400" />
                                    Formación técnica complementaria
                                </h4>
                                <p className="text-gray-300 mb-4">
                                    Mi formación en desarrollo web se complementa con una sólida base técnica en varios campos que me permite abordar proyectos con una perspectiva única y multidisciplinar.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-indigo-900/20 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="p-1.5 rounded-full bg-indigo-800">
                                                <Layers className="text-indigo-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-2 font-medium">Sistemas Técnicos</h4>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Formación en sistemas electrotécnicos, telecomunicaciones y automatización que enriquece mi comprensión de infraestructuras técnicas.
                                        </p>
                                    </div>

                                    <div className="bg-blue-900/20 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="p-1.5 rounded-full bg-blue-800">
                                                <Database className="text-blue-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-2 font-medium">Gestión</h4>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Experiencia en gestión de almacenes y logística que me aporta habilidades organizativas y de optimización de procesos.
                                        </p>
                                    </div>

                                    <div className="bg-teal-900/20 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="p-1.5 rounded-full bg-teal-800">
                                                <Zap className="text-teal-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-2 font-medium">Electricidad</h4>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Conocimientos en instalaciones eléctricas y telecomunicaciones que potencian mi capacidad para entender sistemas complejos e interconectados.
                                        </p>
                                    </div>
                                </div>

                                {/* Información personal */}
                                <h4 className="text-base font-semibold mb-3 text-gray-200 flex items-center">
                                    <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                                    Datos complementarios
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-2 text-sm">
                                    <div className="flex items-center text-gray-300">
                                        <Calendar className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                                        <span className="font-medium mr-1">Fecha de nacimiento:</span> 27/1/1999
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Car className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                                        <span className="font-medium mr-1">Carnet de conducir:</span> B
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <MapPin className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                                        <span className="font-medium mr-1">Disponibilidad:</span> Para viajar
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Briefcase className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                                        <span className="font-medium mr-1">Experiencia total:</span> +2 años
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Award className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                                        <span className="font-medium mr-1">Certificados:</span> Conductor de carretilla
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

AboutBackgroundReveal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default AboutBackgroundReveal;