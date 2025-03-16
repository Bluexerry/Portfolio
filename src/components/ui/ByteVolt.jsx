import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import PropTypes from 'prop-types';

const ByteVoltLogo = ({ className = '', showText = true, textClass = "text-blue-400" }) => {
    return (
        <motion.div
            className={`flex items-center ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Icono con animaciones */}
            <div className="relative flex items-center justify-center w-8 h-8">
                {/* Pulso de energía */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"
                        style={{
                            animationDuration: '3s',
                            animationIterationCount: 'infinite'
                        }}
                    />
                </div>

                {/* Círculo de fondo con brillo */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-75"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.7, 0.9, 0.7]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                />

                {/* Símbolos de programación orbitando */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Tag HTML */}
                    <motion.div
                        className="absolute top-1 left-1 text-[7px] font-mono text-white/90 font-bold"
                        animate={{
                            rotate: [0, 360],
                            opacity: [0.5, 0.9, 0.5]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 8,
                            ease: "linear"
                        }}
                    >
                        &lt;/&gt;
                    </motion.div>

                    {/* Llaves */}
                    <motion.div
                        className="absolute bottom-1 right-1 text-[7px] font-mono text-white/90 font-bold"
                        animate={{
                            rotate: [0, -360],
                            opacity: [0.5, 0.9, 0.5]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 8,
                            ease: "linear"
                        }}
                    >
                        {"{"}
                    </motion.div>

                    {/* Binario */}
                    <motion.div
                        className="absolute top-1 right-1 text-[7px] font-mono text-white/90"
                        animate={{
                            y: [0, -2, 0, 2, 0],
                            opacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                        }}
                    >
                        01
                    </motion.div>
                </div>

                {/* Icono de rayo */}
                <motion.div
                    className="relative z-10 flex items-center justify-center"
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeOut"
                    }}
                >
                    <Zap size={16} className="text-white" />
                </motion.div>
            </div>

            {/* Texto ByteVolt con brillo */}
            {showText && (
                <motion.div
                    className="ml-1.5"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <span className={`font-bold ${textClass}`}>
                        <span className="text-blue-500">Byte</span><span className="text-blue-300">Volt</span>
                    </span>

                    {/* Pequeño destello animado junto al texto */}
                    <motion.span
                        className="absolute ml-0.5 opacity-0"
                        animate={{
                            opacity: [0, 0.8, 0],
                            y: [0, -2, 0],
                            scale: [1, 1.2, 1],
                            x: [0, 2, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut",
                        }}
                    >
                        <span className="text-blue-200 text-xs">⚡</span>
                    </motion.span>
                </motion.div>
            )}
        </motion.div>
    );
};

ByteVoltLogo.propTypes = {
    className: PropTypes.string,
    showText: PropTypes.bool,
    textClass: PropTypes.string
};

export default ByteVoltLogo;