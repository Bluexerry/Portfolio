import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { techColorMap } from '../../utils/techColorMap';

// Función para determinar el color de borde principal basado en la tecnología dominante
const getBorderColor = (tags) => {
    const mainTag = tags[0];
    const color = techColorMap[mainTag] || 'border-gray-700';
    return color.replace('bg-', 'border-');
};

const ProjectCard = ({ project, index, onClick }) => {
    const { title, description, tags, demoUrl, repoUrl } = project;

    // Determinar el color de borde basado en la tecnología principal
    const borderColor = getBorderColor(tags);
    const baseColor = borderColor.replace('border-', '');
    const colorName = baseColor.split('-')[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    delay: index * 0.1
                }
            }}
            whileHover={{
                y: -5,
                transition: {
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1.0]
                }
            }}
            className={`group relative bg-gray-800 rounded-xl overflow-hidden shadow-md 
                border-l-4 ${borderColor} flex flex-col h-full transition-all duration-300`}
        >
            {/* Efectos de fondo */}
            <div className="absolute inset-0 z-0">
                {/* Fondo de cuadrícula técnica refinada */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                        mask: 'radial-gradient(circle at center, black 60%, transparent 100%)'
                    }}
                />

                {/* Puntos decorativos mejorados */}
                <div className="absolute right-0 bottom-0 w-28 h-28 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rotate-12"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '10px 10px',
                        color: `var(--${colorName}-400)`,
                        maskImage: 'linear-gradient(to bottom left, black, transparent)'
                    }}
                />

                {/* Degradado sutil mejorado */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br 
                    from-${colorName}-900/10 to-${colorName}-700/5`}
                />

                {/* Elemento decorativo adicional */}
                <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                    style={{
                        background: `radial-gradient(circle, var(--${colorName}-300), transparent 70%)`,
                    }}
                />
            </div>

            {/* Contenido */}
            <div className="p-6 flex-grow relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-200 relative">
                        {title}
                        <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-${colorName}-500 to-${colorName}-300 
                            transition-all duration-700 mt-1 opacity-70`} />
                    </h3>

                    <div className="flex space-x-2">
                        {repoUrl && (
                            <a
                                href={repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="relative p-1.5 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300"
                            >
                                <span className={`absolute inset-0 opacity-0 group-hover:opacity-20 
                                    bg-gradient-to-br from-${colorName}-900 to-${colorName}-800 
                                    rounded-full scale-0 group-hover:scale-100 transition-all duration-300`} />
                                <Github
                                    size={18}
                                    className={`relative z-10 text-gray-400 group-hover:text-${colorName}-400 transition-colors duration-300`}
                                />
                            </a>
                        )}

                        {demoUrl && (
                            <a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="relative p-1.5 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300"
                            >
                                <span className={`absolute inset-0 opacity-0 group-hover:opacity-20 
                                    bg-gradient-to-br from-${colorName}-900 to-${colorName}-800
                                    rounded-full scale-0 group-hover:scale-100 transition-all duration-300`} />
                                <ExternalLink
                                    size={18}
                                    className={`relative z-10 text-gray-400 group-hover:text-${colorName}-400 transition-colors duration-300`}
                                />
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                    {description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, i) => {
                        const bgColor = techColorMap[tag] || 'bg-gray-700';
                        return (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delay: (index * 0.1) + 0.1 + (i * 0.05)
                                    }
                                }}
                                whileHover={{ y: -2 }}
                                className={`${bgColor} px-2.5 py-1 rounded-full text-xs font-medium text-white 
                                    relative overflow-hidden group-hover:shadow-sm transition-all duration-300 
                                    transform-gpu`}
                            >
                                {/* Efecto de brillo mejorado */}
                                <span className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                                    -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                                {tag}
                            </motion.span>
                        );
                    })}
                </div>
            </div>

            {/* Botón de detalle - SIGNIFICATIVAMENTE MEJORADO */}
            <div
                onClick={onClick}
                className={`group-button group-even:bg-gray-800/50 group-odd:bg-gray-800 
                    mt-auto px-6 py-3 border-t border-gray-700 flex justify-between items-center 
                    cursor-pointer relative overflow-hidden`}
            >
                {/* Línea animada que conecta el texto con la flecha */}
                <div className={`absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-${colorName}-500/0 via-${colorName}-500/70 to-${colorName}-500/0
                    translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500`} />

                {/* Efecto de iluminación al hover mejorado */}
                <div className={`absolute inset-0 bg-gradient-to-r from-${colorName}-900/30 to-gray-800/30 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-500`} />

                {/* Efecto de rastro al hover */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full
                        group-hover:w-[200%] group-hover:h-40 bg-gradient-to-r from-${colorName}-400/0 via-${colorName}-400/5 to-${colorName}-400/0
                        transition-all duration-1000 ease-out opacity-0 group-hover:opacity-100`} />
                </div>

                {/* Texto con animación */}
                <div className="flex items-center relative z-10 overflow-hidden">
                    <span className={`text-sm font-medium text-gray-400 group-hover:text-${colorName}-400 transition-colors duration-300 relative`}>
                        Ver detalles

                        {/* Línea de subrayado animada */}
                        <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-${colorName}-500/70 
                            group-hover:w-full transition-all duration-500 delay-100`} />
                    </span>

                    {/* Partículas decorativas */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 flex space-x-0.5 opacity-0 
                        group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-500 ease-out">
                        <div className={`w-1 h-1 rounded-full bg-${colorName}-500/50`} style={{ animationDelay: '0.1s' }} />
                        <div className={`w-0.5 h-0.5 rounded-full bg-${colorName}-500/40`} style={{ animationDelay: '0.2s' }} />
                        <div className={`w-0.5 h-0.5 rounded-full bg-${colorName}-500/30`} style={{ animationDelay: '0.3s' }} />
                    </div>
                </div>

                {/* Flecha con animación mejorada */}
                <motion.div
                    initial={{ x: 0 }}
                    whileHover={{
                        x: 5,
                        transition: { duration: 0.2, ease: "easeOut", repeat: 1, repeatType: "reverse" }
                    }}
                    className={`text-gray-500 group-hover:text-${colorName}-400 relative z-10
                    translate-x-0 group-hover:translate-x-1 transition-all duration-300`}
                >
                    <div className={`absolute inset-0 rounded-full bg-${colorName}-900/30 scale-0 group-hover:scale-100 transition-transform duration-300`} />
                    <ArrowRight size={18} className="relative z-10" />
                </motion.div>
            </div>

            {/* Efecto de sombra mejorado con degradado */}
            <div className="absolute -z-10 inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    boxShadow: `0 15px 30px -10px rgba(var(--${colorName}-500-rgb), 0.15), 
                               0 10px 10px -5px rgba(var(--${colorName}-500-rgb), 0.08)`
                }}
            />

            {/* Contorno sutil en hover */}
            <div className={`absolute inset-0 rounded-xl border border-${colorName}-500/0 
                group-hover:border-${colorName}-500/10 
                transition-colors duration-500 pointer-events-none`} />
        </motion.div>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        longDescription: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        demoUrl: PropTypes.string,
        repoUrl: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    inView: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default ProjectCard;