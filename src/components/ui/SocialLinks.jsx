import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { socialLinks } from '../../data/social';
import PropTypes from 'prop-types';

const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    mail: Mail,
};

const SocialLinks = ({ className = '' }) => {
    return (
        <div className={`flex items-center justify-center gap-4 ${className}`}>
            {socialLinks.map((link) => {
                const IconComponent = iconMap[link.icon] || Mail;

                return (
                    <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        whileHover={{ y: -3 }}
                        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <IconComponent size={20} />
                    </motion.a>
                );
            })}
        </div>
    );
};

SocialLinks.propTypes = {
    className: PropTypes.string,
};

export default SocialLinks;