import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards } from 'swiper/modules';
import { Briefcase, GraduationCap, Building, School, Calendar, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '../layout/Container';
import { experienceData, educationData } from '../../data/career';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Animaciones
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const headingAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.1 }
    }
};

// Hook personalizado para animación al hacer scroll
const useScrollAnimation = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return { ref, inView };
};

const Career = () => {
    const { ref, inView } = useScrollAnimation();
    const [activeTab, setActiveTab] = useState('experience');
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        if (swiper) {
            swiper.update();
            swiper.slideTo(0, 300);
        }
    }, [activeTab, swiper]);

    // Contenido según la pestaña activa
    const tabContent = {
        experience: experienceData,
        education: educationData,
    };

    return (
        <section id="career" className="py-20 bg-gray-900 overflow-x-hidden">
            <Container>
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="space-y-12"
                >
                    <motion.div
                        variants={headingAnimation}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">Formación</h2>
                        <p className="text-gray-400 max-w-3xl mx-auto">
                            Experiencia laboral y formación académica que han formado mi perfil profesional
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="py-6"
                    >
                        <div className="flex flex-wrap justify-center mb-8 gap-2">
                            <div className="inline-flex bg-gray-800 p-1 rounded-lg shadow-md">
                                <button
                                    onClick={() => setActiveTab('experience')}
                                    className={`flex items-center px-6 py-3 rounded-md transition ${activeTab === 'experience'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    <Briefcase size={18} className="mr-2" />
                                    Experiencia
                                </button>

                                <button
                                    onClick={() => setActiveTab('education')}
                                    className={`flex items-center px-6 py-3 rounded-md transition ${activeTab === 'education'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    <GraduationCap size={18} className="mr-2" />
                                    Educación
                                </button>
                            </div>
                        </div>

                        <div className="relative py-4">
                            {/* Swiper sacado de los contenedores restrictivos */}
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
                                style={{ overflow: 'visible', width: '90%', maxWidth: '600px', margin: '0 auto' }}
                                cardsEffect={{
                                    perSlideOffset: 8,
                                    perSlideRotate: 2,
                                    slideShadows: false
                                }}
                            >
                                {tabContent[activeTab]?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 h-full overflow-y-auto">
                                            <h4 className="text-xl font-bold text-blue-400">{item.title}</h4>
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 mb-4 gap-2">
                                                <div className="flex items-center">
                                                    {activeTab === 'experience' ? (
                                                        <Building size={16} className="text-gray-400 mr-2" />
                                                    ) : (
                                                        <School size={16} className="text-gray-400 mr-2" />
                                                    )}
                                                    <p className="text-gray-200 font-medium">
                                                        {activeTab === 'experience' ? item.company : item.institution}
                                                    </p>
                                                </div>
                                                <div className="flex items-center text-sm bg-gray-700 px-3 py-1 rounded-full text-gray-300 w-fit">
                                                    <Calendar size={14} className="mr-1" />
                                                    {item.period}
                                                </div>
                                            </div>

                                            <div className="mb-2 text-sm text-gray-400">
                                                <MapPin size={14} className="inline mr-1" />
                                                {item.location}
                                            </div>

                                            <p className="text-gray-300 mb-4">{item.description}</p>

                                            {(item.responsibilities || item.details) && (
                                                <div className="mt-4">
                                                    <h5 className="font-medium text-gray-200 mb-2">
                                                        {activeTab === 'experience' ? 'Responsabilidades' : 'Contenido'}:
                                                    </h5>
                                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-400">
                                                        {(activeTab === 'experience' ? item.responsibilities : item.details)?.map((detail, i) => (
                                                            <li key={i}>{detail}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="mt-4 text-center">
                                <span className="text-sm text-gray-400">
                                    Desliza para ver más
                                </span>
                            </div>

                            <button
                                className="swiper-button-prev absolute top-1/2 -left-2 md:left-0 z-10 transform -translate-y-1/2 p-2.5 transition-all duration-300"
                                aria-label="Anterior"
                            >
                                <ArrowLeft
                                    size={20}
                                    className="text-blue-400 transition-all duration-300 hover:text-blue-300 hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.9)]"
                                />
                            </button>
                            <button
                                className="swiper-button-next absolute top-1/2 -right-2 md:right-0 z-10 transform -translate-y-1/2 p-2.5 transition-all duration-300"
                                aria-label="Siguiente"
                            >
                                <ArrowRight
                                    size={20}
                                    className="text-blue-400 transition-all duration-300 hover:text-blue-300 hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.9)]"
                                />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
};

export default Career;