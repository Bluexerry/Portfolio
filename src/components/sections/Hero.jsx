import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink, Code } from 'lucide-react';
import Container from '../layout/Container';
import SocialLinks from '../ui/SocialLinks';
import Button from '../ui/Button';
import { fadeInUp, staggerChildren } from '../../utils/animation';

const Hero = () => {
    const [typedText, setTypedText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    // Usa useMemo para evitar recrear el array en cada renderizado
    const texts = useMemo(() => [
        "Desarrollador Web.",
        "Técnico Electricista.",
        "Especialista en Frontend.",
        "Entusiasta de la Domótica."
    ], []);

    // Efecto de escritura de texto
    useEffect(() => {
        const text = texts[currentTextIndex];
        let timeout;

        if (isTyping) {
            if (typedText.length < text.length) {
                timeout = setTimeout(() => {
                    setTypedText(text.substring(0, typedText.length + 1));
                }, 100);
            } else {
                timeout = setTimeout(() => setIsTyping(false), 1500);
            }
        } else {
            if (typedText.length > 0) {
                timeout = setTimeout(() => {
                    setTypedText(text.substring(0, typedText.length - 1));
                }, 50);
            } else {
                setCurrentTextIndex((currentTextIndex + 1) % texts.length);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [typedText, isTyping, currentTextIndex, texts]);

    // Animaciones para el indicador de cursor
    const cursorVariants = {
        blinking: {
            opacity: [0, 1],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-16">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-purple-500/10 dark:bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-pink-500/10 dark:bg-teal-500/10 rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10 py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left content - Text */}
                    <motion.div
                        className="lg:w-1/2"
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren(0.2)}
                    >
                        <motion.p
                            className="text-purple-600 dark:text-blue-400 font-medium mb-4"
                            variants={fadeInUp}
                        >
                            ¡Hola! Mi nombre es
                        </motion.p>

                        <motion.h1
                            className="text-5xl md:text-6xl font-bold mb-4"
                            variants={fadeInUp}
                        >
                            <span className="text-gray-900 dark:text-white">Jesús Manuel Vázquez Herrera</span>
                        </motion.h1>

                        <motion.div
                            className="flex items-end h-16 mb-6"
                            variants={fadeInUp}
                        >
                            <h2 className="text-3xl md:text-4xl font-semibold text-purple-600 dark:text-blue-400">
                                {typedText}
                            </h2>
                            <motion.span
                                className="inline-block w-[5px] h-[30px] bg-purple-600 dark:bg-blue-400 ml-1"
                                variants={cursorVariants}
                                animate="blinking"
                            />
                        </motion.div>

                        <motion.p
                            className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-lg"
                            variants={fadeInUp}
                        >
                            Desarrollador Web con formación en automatización del hogar y sistemas eléctricos, lo que me da
                            una base técnica sólida y una mentalidad orientada a la resolución de problemas.
                            Enfocado en crear soluciones innovadoras y eficientes.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 mb-10"
                            variants={fadeInUp}
                        >
                            <Button
                                href="#projects"
                                size="lg"
                                icon={<Code size={18} />}
                            >
                                Ver Proyectos
                            </Button>

                            <Button
                                href="#contact"
                                variant="secondary"
                                size="lg"
                                icon={<ExternalLink size={18} />}
                            >
                                Contáctame
                            </Button>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <SocialLinks />
                        </motion.div>
                    </motion.div>

                    {/* Right content - Image/Avatar */}
                    <motion.div
                        className="lg:w-1/2 flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            type: "spring",
                            damping: 15
                        }}
                    >
                        <div className="relative">
                            {/* Circle decoration behind the avatar */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-blue-900/30 dark:to-teal-900/30 -z-10 scale-[1.15]" />

                            {/* Avatar image */}
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                                <img
                                    src="/assets/avatar.jpg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-user'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                                    }}
                                />
                            </div>

                            {/* Experience badge */}
                            <motion.div
                                className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-full py-2 px-4 shadow-lg border border-gray-100 dark:border-gray-700"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <span className="text-gray-900 dark:text-white font-bold">2+ años</span> <span className="text-purple-600 dark:text-blue-400">experiencia</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Container>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <a
                        href="#about"
                        aria-label="Scroll to About section"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
                    >
                        <ChevronDown className="text-purple-600 dark:text-blue-400" size={20} />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;