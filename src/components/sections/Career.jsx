import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Briefcase, GraduationCap, Calendar, Building, School } from 'lucide-react';
// Importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards } from 'swiper/modules';
// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import Container from '../layout/Container';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { headingAnimation, fadeInUp } from '../../utils/animation';
// Importar datos desde archivo data/career.js
import { experienceData, educationData } from '../../data/career';

const Career = () => {
    const { ref, inView } = useScrollAnimation();
    const [activeTab, setActiveTab] = useState('experience');
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        if (swiper) {
            swiper.update();
        }
    }, [activeTab, swiper]);

    // Contenido según la pestaña activa
    const tabContent = {
        experience: experienceData,
        education: educationData,
    };

    return (
        <section id="career" className="py-20 bg-gray-50 dark:bg-gray-900">
            <Container>
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="space-y-16"
                >
                    {/* Título de la sección */}
                    <motion.div
                        variants={headingAnimation}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">Mi Trayectoria</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Experiencia profesional y formación académica
                        </p>
                    </motion.div>

                    {/* Pestañas de selección */}
                    <motion.div
                        variants={fadeInUp}
                        className="py-6"
                    >
                        {/* Pestañas */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md">
                                <button
                                    onClick={() => setActiveTab('experience')}
                                    className={`flex items-center px-6 py-3 rounded-md transition ${activeTab === 'experience'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <Briefcase size={18} className="mr-2" />
                                    Experiencia
                                </button>

                                <button
                                    onClick={() => setActiveTab('education')}
                                    className={`flex items-center px-6 py-3 rounded-md transition ${activeTab === 'education'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <GraduationCap size={18} className="mr-2" />
                                    Educación
                                </button>
                            </div>
                        </div>

                        {/* Contenedor con altura mínima fija para evitar saltos */}
                        <div className="relative py-4">
                            <div className="max-w-3xl mx-auto">
                                <div className="min-h-[400px] md:min-h-[350px]"> {/* Altura mínima para evitar saltos */}
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
                                        className="mySwiper career-swiper"
                                    >
                                        {tabContent[activeTab].map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full">
                                                    <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400">{item.title}</h4>
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 mb-4 gap-2">
                                                        <div className="flex items-center">
                                                            {activeTab === 'experience' ? (
                                                                <Building size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
                                                            ) : (
                                                                <School size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
                                                            )}
                                                            <p className="text-gray-800 dark:text-gray-200 font-medium">
                                                                {activeTab === 'experience' ? item.company : item.institution}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 w-fit">
                                                            <Calendar size={14} className="mr-1" />
                                                            {item.period}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

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

export default Career;