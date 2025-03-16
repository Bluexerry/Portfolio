import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const MobileMenu = ({ isOpen, setIsOpen, navItems, activeSection }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden bg-gray-900 shadow-lg"
                >
                    <nav className="py-2 px-4 flex flex-col">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`py-3 px-4 font-medium rounded-lg transition-colors
                                    ${activeSection === item.href.substring(1)
                                        ? 'text-blue-400 bg-gray-800'
                                        : 'text-gray-300 hover:bg-gray-800'
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

MobileMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ).isRequired,
    activeSection: PropTypes.string
};

export default MobileMenu;