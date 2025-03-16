import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, FileText, Briefcase, GraduationCap } from 'lucide-react';
// Corregir las importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards } from 'swiper/modules';
// Importar estilos necesarios
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import Container from '../layout/Container';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { headingAnimation, fadeInUp, fadeInRight } from '../../utils/animation';

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

    // Datos de experiencia
    const experienceData = [
        {
            title: "Frontend Developer",
            company: "Tech Innovations Inc.",
            period: "2022 - Presente",
            description: "Desarrollo de aplicaciones web con React y optimización de rendimiento. Implementación de interfaces de usuario responsivas y accesibles.",
        },
        {
            title: "UI/UX Designer",
            company: "Creative Solutions",
            period: "2020 - 2022",
            description: "Diseño de experiencias de usuario centradas en el usuario. Creación de prototipos interactivos y realización de pruebas de usabilidad.",
        },
        {
            title: "Web Developer",
            company: "Digital Agency",
            period: "2018 - 2020",
            description: "Desarrollo frontend con JavaScript y CSS. Colaboración con equipos de diseño para implementar interfaces de usuario.",
        },
    ];

    // Datos de educación
    const educationData = [
        {
            title: "Máster en Desarrollo Web",
            institution: "Universidad Tecnológica",
            period: "2018 - 2020",
            description: "Especialización en tecnologías web modernas, arquitectura de aplicaciones y experiencia de usuario.",
        },
        {
            title: "Grado en Ingeniería Informática",
            institution: "Universidad Nacional",
            period: "2014 - 2018",
            description: "Fundamentos de programación, algoritmos, estructura de datos y desarrollo de software.",
        },
        {
            title: "Curso Especializado en UX/UI",
            institution: "Instituto de Diseño Digital",
            period: "2016",
            description: "Principios de diseño centrado en el usuario, prototipado y evaluación de usabilidad.",
        },
    ];

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
                                <Button
                                    href="/cv.pdf"  // Asegúrate de tener este archivo en la carpeta pública
                                    target="_blank"
                                    variant="outline"
                                    icon={<FileText size={18} />}
                                >
                                    Descargar CV
                                </Button>
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