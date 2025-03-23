import { motion } from 'framer-motion';
import { ExternalLink, Heart, ArrowUp, Mail } from 'lucide-react';
import Container from './Container';
import SocialLinks from '../ui/SocialLinks';
import ByteVoltLogo from '../ui/ByteVolt';
import { fadeInUp, staggerChildren } from '../../utils/animation';
import CVSelector from '../ui/CVSelector';
import { getSocialLink, contactInfo } from '../../data/social';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const quickLinks = [
        { name: 'Inicio', href: '#home' },
        { name: 'Sobre mí', href: '#about' },
        { name: 'Formación', href: '#career' },
        { name: 'Habilidades', href: '#skills' },
        { name: 'Servicios', href: '#services' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Contacto', href: '#contact' },
    ];

    return (
        <footer className="bg-gray-100 dark:bg-gray-800 pt-16 pb-8">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerChildren(0.1)}
                    className="grid gap-10 md:grid-cols-3 lg:grid-cols-4"
                >
                    {/* Columna 1: Logo e info */}
                    <motion.div variants={fadeInUp} className="space-y-4">
                        <a href="#home">
                            <ByteVoltLogo textClass="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400" />
                        </a>
                        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
                            Desarrollando experiencias web creativas y funcionales con tecnologías modernas.
                        </p>
                        <div className="pt-4">
                            <SocialLinks />
                        </div>
                    </motion.div>

                    {/* Columna 2: Enlaces rápidos */}
                    <motion.div variants={fadeInUp} className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Enlaces rápidos
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Columna 3: Recursos */}
                    <motion.div variants={fadeInUp} className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Recursos
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <CVSelector buttonVariant="text" buttonSize="sm" className="text-left" />
                            </li>
                            <li>
                                <a
                                    href={getSocialLink("GitHub")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-blue-400 transition-colors flex items-center"
                                >
                                    <span>GitHub</span>
                                    <ExternalLink size={14} className="ml-1" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href={getSocialLink("LinkedIn")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-blue-400 transition-colors flex items-center"
                                >
                                    <span>LinkedIn</span>
                                    <ExternalLink size={14} className="ml-1" />
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Columna 4: Contacto */}
                    <motion.div variants={fadeInUp} className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Contacto
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center">
                            <Mail size={16} className="mr-2" />
                            <a href={getSocialLink("Email")} className="hover:text-purple-600 dark:hover:text-blue-400">
                                {contactInfo.email}
                            </a>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            {contactInfo.location}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Separador */}
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-8" />

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            &copy; {currentYear} Jesús Manuel Vázquez Herrera. Todos los derechos reservados.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center justify-center md:justify-start">
                            Hecho con <Heart size={14} className="inline mx-1 text-red-500" /> usando React + Tailwind + Framer Motion
                        </p>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500"
                        aria-label="Volver arriba"
                    >
                        <ArrowUp size={18} className="text-gray-700 dark:text-gray-300" />
                    </button>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;