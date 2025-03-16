import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SkillBar = ({ name, level, description, index, inView }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
        >
            <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800 dark:text-gray-200">{name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{level}%</span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-3">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className="h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-500 dark:to-teal-500"
                />
            </div>

            {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
            )}
        </motion.div>
    );
};

SkillBar.propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    description: PropTypes.string,
    index: PropTypes.number.isRequired,
    inView: PropTypes.bool.isRequired
};

export default SkillBar;