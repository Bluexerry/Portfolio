import { motion } from 'framer-motion';
// Importamos íconos que están disponibles en todas las versiones de lucide-react
import { Code, Layout, Server, Database, Globe } from 'lucide-react';
import PropTypes from 'prop-types';

// Mapa de iconos simplificado con íconos disponibles
const iconMap = {
    frontend: Layout,
    backend: Server,
    database: Database,
    web: Globe,
    code: Code
};

// Colores según el nivel
const levelColorMap = {
    Advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    Intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    Basic: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
};

const SkillCard = ({ category, icon, description, skills, index, inView }) => {
    // Obtenemos el componente de icono correcto o usamos Code como fallback
    const IconComponent = iconMap[icon] || Code;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
        >
            <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-3">
                    <IconComponent size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{category}</h3>
            </div>

            {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
            )}

            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <motion.span
                        key={skill.name}
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 text-sm rounded-full ${levelColorMap[skill.level] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}
                    >
                        {skill.name}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};

SkillCard.propTypes = {
    category: PropTypes.string.isRequired,
    icon: PropTypes.string,
    description: PropTypes.string,
    skills: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            level: PropTypes.string.isRequired
        })
    ).isRequired,
    index: PropTypes.number.isRequired,
    inView: PropTypes.bool.isRequired
};

export default SkillCard;