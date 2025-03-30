import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Award, MapPin, Calendar, Car, Briefcase, ChevronDown, Layers, BookOpen, Cpu } from 'lucide-react';

const ProfessionalBackground = ({ isOpen, onToggle }) => {
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);

    // Medir la altura del contenido cuando se monta y cuando cambia isOpen
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        <div className="w-full">
            {/* Botón animado con diseño modernizado */}
            <motion.button
                onClick={onToggle}
                className="group relative w-full overflow-hidden bg-gray-800 text-gray-200 rounded-xl py-4 px-6 flex items-center shadow-md border border-gray-700"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                {/* Fondo animado */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 opacity-10"
                        initial={{ backgroundPosition: "0% 0%" }}
                        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
                        style={{
                            backgroundImage: `radial-gradient(circle at 30% 30%, rgb(99, 102, 241, 0.8) 0%, transparent 40%), 
                                            radial-gradient(circle at 70% 70%, rgb(59, 130, 246, 0.8) 0%, transparent 35%)`,
                            filter: "blur(40px)"
                        }}
                    />
                </div>

                {/* Contenido del botón */}
                <div className="relative flex-1">
                    <h3 className="text-lg font-medium">Formación técnica complementaria</h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Experiencia en electricidad, gestión y sistemas técnicos
                    </p>
                </div>

                {/* Indicador de expandir */}
                <div className="relative">
                    <motion.div
                        className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full shadow-lg text-white"
                        animate={{
                            rotate: isOpen ? 180 : 0,
                            boxShadow: isOpen
                                ? "0 4px 10px rgba(79, 70, 229, 0.4)"
                                : "0 10px 15px rgba(79, 70, 229, 0.3)"
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                    >
                        <ChevronDown className="w-5 h-5" />

                        {/* Ondas concéntricas animadas */}
                        {!isOpen && (
                            <>
                                <motion.span
                                    className="absolute inset-0 rounded-full border-2 border-indigo-400"
                                    animate={{
                                        scale: [1, 1.5],
                                        opacity: [0.6, 0]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        ease: "easeOut"
                                    }}
                                />
                                <motion.span
                                    className="absolute inset-0 rounded-full border border-blue-400"
                                    animate={{
                                        scale: [1, 2],
                                        opacity: [0.5, 0]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.8,
                                        ease: "easeOut",
                                        delay: 0.3
                                    }}
                                />
                            </>
                        )}
                    </motion.div>
                </div>
            </motion.button>

            {/* Contenido desplegable con diseño mejorado */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{
                            height: contentHeight,
                            opacity: 1,
                            y: 0,
                            transition: {
                                height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
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
                        className="overflow-hidden bg-gray-800 rounded-xl mt-4 shadow-lg border border-gray-700"
                    >
                        <div ref={contentRef} className="p-5">
                            <div className="mb-6">
                                <p className="text-gray-300 mb-6">
                                    Mi formación en desarrollo web se complementa con una sólida base técnica en varios campos que me permite abordar proyectos con una perspectiva única y multidisciplinar.
                                </p>

                                <div className="space-y-4 mb-6">
                                    <motion.div
                                        className="bg-indigo-900/20 p-4 rounded-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex items-center mb-2">
                                            <div className="p-1.5 rounded-full bg-indigo-800">
                                                <Layers className="text-indigo-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-2 font-medium">Sistemas Técnicos</h4>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Formación en sistemas electrotécnicos, telecomunicaciones y automatización que enriquece mi comprensión de infraestructuras técnicas.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        className="bg-blue-900/20 p-4 rounded-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        <div className="flex items-center mb-2">
                                            <div className="p-1.5 rounded-full bg-blue-800">
                                                <BookOpen className="text-blue-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-2 font-medium">Gestión</h4>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Experiencia en gestión de almacenes y logística que me aporta habilidades organizativas y de optimización de procesos.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        className="bg-teal-900/20 p-4 rounded-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        <div className="flex items-center mb-2">
                                            <div className="p-1.5 rounded-full bg-teal-800">
                                                <Cpu className="text-teal-400 h-5 w-5" />
                                            </div>
                                            <h4 className="ml-2 font-medium">Electricidad</h4>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Conocimientos en instalaciones eléctricas y telecomunicaciones que potencian mi capacidad para entender sistemas complejos e interconectados.
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Información personal */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                >
                                    <h4 className="text-base font-semibold mb-4 text-gray-200 flex items-center">
                                        <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                                        Datos complementarios
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2 text-sm">
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
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

ProfessionalBackground.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default ProfessionalBackground;