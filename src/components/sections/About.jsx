import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Briefcase, GraduationCap } from 'lucide-react';
// Corregir las importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards } from 'swiper/modules';
// Importar estilos necesarios
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import Container from '../layout/Container';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { headingAnimation, fadeInUp, fadeInRight } from '../../utils/animation';
// Importar datos desde archivo data/career.js
import { experienceData, educationData } from '../../data/career';
import CVSelector from '../ui/CVSelector';

// Asegúrate de crear la carpeta de assets y colocar tus imágenes
const profileImage = '/src/assets/images/profile.jpg';

const About = () => {
    const { ref, inView } = useScrollAnimation();
    const [activeTab, setActiveTab] = useState('experience');
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        if (swiper) {
            // Actualizar swiper cuando cambia la pestaña activa
            swiper.update();
        }
    }, [activeTab, swiper]);

    // Contenido según la pestaña activa
    const tabContent = {
        experience: experienceData,
        education: educationData,
    };

    return (
        <section id="about" className="py-20">
            <Container>
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="space-y-16"
                >
                    {/* Título de la sección */}
                    <motion.h2
                        variants={headingAnimation}
                        className="text-3xl md:text-4xl font-bold text-center"
                    >
                        Sobre mí
                    </motion.h2>

                    {/* Bio y foto */}
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <motion.div
                            variants={fadeInUp}
                            className="space-y-4 order-2 md:order-1"
                        >
                            <h3 className="text-2xl font-semibold">Un desarrollador apasionado por crear experiencias web increíbles</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Soy un desarrollador front-end especializado en construir (y ocasionalmente diseñar)
                                experiencias digitales excepcionales. Me enfoco en crear interfaces intuitivas y
                                dinámicas con un código limpio y eficiente.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                Con más de 5 años de experiencia en el desarrollo web, he trabajado con diversas
                                tecnologías modernas para crear soluciones escalables y de alto rendimiento.
                                Disfruto especialmente del trabajo en equipo y los proyectos que me permiten
                                explorar nuevas técnicas y herramientas.
                            </p>

                            <div className="pt-4">
                                <CVSelector variant="outline" />
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeInRight}
                            className="relative rounded-xl overflow-hidden aspect-square order-1 md:order-2 shadow-xl"
                        >
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-user'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                                }}
                            />

                            {/* Decoración de fondo */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-200/50 dark:bg-blue-900/30 rounded-full -z-10" />
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-pink-200/50 dark:bg-teal-900/30 rounded-full -z-10" />
                        </motion.div>
                    </div>

                    {/* Sección de experiencia/educación */}
                    <motion.div
                        variants={fadeInUp}
                        className="py-10"
                    >
                        {/* Pestañas */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                                <button
                                    onClick={() => setActiveTab('experience')}
                                    className={`flex items-center px-4 py-2 rounded-md transition ${activeTab === 'experience'
                                        ? 'bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-blue-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                                        }`}
                                >
                                    <Briefcase size={18} className="mr-2" />
                                    Experiencia
                                </button>

                                <button
                                    onClick={() => setActiveTab('education')}
                                    className={`flex items-center px-4 py-2 rounded-md transition ${activeTab === 'education'
                                        ? 'bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-blue-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                                        }`}
                                >
                                    <GraduationCap size={18} className="mr-2" />
                                    Educación
                                </button>
                            </div>
                        </div>

                        {/* Carrusel */}
                        <div className="relative py-4">
                            <div className="max-w-3xl mx-auto">
                                <Swiper
                                    modules={[Navigation, Pagination, EffectCards]}
                                    effect="cards"
                                    grabCursor={true}
                                    centeredSlides={true}
                                    pagination={{ clickable: true }}
                                    navigation={{
                                        prevEl: '.swiper-button-prev',
                                        nextEl: '.swiper-button-next',
                                    }}
                                    onSwiper={setSwiper}
                                    className="mySwiper about-swiper"
                                >
                                    {tabContent[activeTab].map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                                <h4 className="text-xl font-bold text-purple-600 dark:text-blue-400">{item.title}</h4>
                                                <div className="flex items-center justify-between mt-2 mb-4">
                                                    <p className="text-gray-800 dark:text-gray-200">{activeTab === 'experience' ? item.company : item.institution}</p>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.period}</span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Botones de navegación personalizados */}
                                <button className="swiper-button-prev absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                                    <ArrowLeft size={20} className="text-gray-800 dark:text-gray-200" />
                                </button>
                                <button className="swiper-button-next absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                                    <ArrowRight size={20} className="text-gray-800 dark:text-gray-200" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
};

export default About;