import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, Send, Mail, MapPin, Phone, Clock } from 'lucide-react';
import Container from '../layout/Container';
import Button from '../ui/Button';
import { isValidEmail, debounce } from '../../utils/helpers';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { headingAnimation, fadeInUp } from '../../utils/animation';
import { contactInfo, getSocialLink } from '../../data/social';
import { sendContactForm } from '../../utils/contactApi';

const Contact = () => {
    const { ref, inView } = useScrollAnimation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const formValues = useRef(null);

    // Guardar los valores del formulario para restaurarlos después
    useEffect(() => {
        if (isSubmitting) {
            formValues.current = { ...formData };
        }
    }, [isSubmitting, formData]);

    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
        },
        email: {
            required: true,
            validate: (value) => isValidEmail(value) ? true : 'Por favor, ingresa un email válido'
        },
        subject: {
            required: true,
            minLength: 5
        },
        message: {
            required: true,
            minLength: 10
        }
    };

    // Validate a single field
    const validateField = (name, value) => {
        const rules = validationRules[name];
        let error = '';

        if (rules.required && !value.trim()) {
            error = 'Este campo es requerido';
        } else if (rules.minLength && value.trim().length < rules.minLength) {
            error = `Mínimo ${rules.minLength} caracteres`;
        } else if (rules.validate && typeof rules.validate === 'function') {
            const validationResult = rules.validate(value);
            if (validationResult !== true) {
                error = validationResult;
            }
        }

        return error;
    };

    // Validate all fields
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return { isValid, errors: newErrors };
    };

    // Handle change with debounced validation
    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData(prev => ({ ...prev, [id]: value }));

        // Mark field as touched
        if (!touched[id]) {
            setTouched(prev => ({ ...prev, [id]: true }));
        }

        // Debounced validation for better UX
        debounceValidation(id, value);
    };

    // Debounced validation function
    const debounceValidation = debounce((id, value) => {
        const error = validateField(id, value);
        setErrors(prev => ({ ...prev, [id]: error }));
    }, 300);

    const handleBlur = (e) => {
        const { id, value } = e.target;
        setTouched(prev => ({ ...prev, [id]: true }));

        const error = validateField(id, value);
        setErrors(prev => ({ ...prev, [id]: error }));

        // Validación manual para el campo 'name' si el campo ya está tocado
        if (id === 'name' && touched.name) {
            const nameError = validateField('name', value);
            setErrors(prev => ({ ...prev, name: nameError }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Marcar todos los campos como tocados
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);

        // Usar validateForm mejorado
        const { isValid, errors: newErrors } = validateForm();

        // Actualizar el estado de errores
        setErrors(newErrors);

        // Verifica los errores en la consola
        console.log("Errores de validación:", newErrors);
        if (!isValid) {
            // Consolida todos los errores en un solo mensaje
            const errorMessages = [];
            if (newErrors.name) errorMessages.push(`• Nombre: ${newErrors.name}`);
            if (newErrors.email) errorMessages.push(`• Email: ${newErrors.email}`);
            if (newErrors.subject) errorMessages.push(`• Asunto: ${newErrors.subject}`);
            if (newErrors.message) errorMessages.push(`• Mensaje: ${newErrors.message}`);

            // Muestra un solo toast con todos los errores
            toast.error(
                <div className="space-y-1">
                    <p className="font-semibold">Por favor, corrige los siguientes errores:</p>
                    {errorMessages.map((msg, index) => (
                        <p key={index} className="ml-1">{msg}</p>
                    ))}
                </div>,
                {
                    duration: 5000, // Más tiempo para leer todos los errores
                    style: { maxWidth: '380px' }
                }
            );
            return;
        }

        // Submit form
        setIsSubmitting(true);

        try {
            // Simulate API call
            await sendContactForm(formData);

            toast.success('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');

            // Mantener los valores para la animación
            setShowConfetti(true);
            setFormSubmitted(true);

            // Reset form success message after 5 seconds
            setTimeout(() => {
                setIsAnimatingOut(true);
                setTimeout(() => {
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    setTouched({});
                    setFormSubmitted(false);
                    setIsAnimatingOut(false);
                    setShowConfetti(false);
                }, 500); // Duración de la animación de salida
            }, 4500);
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Partículas para el efecto de confeti
    const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 5,
        color: [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500',
            'bg-yellow-400', 'bg-pink-500', 'bg-indigo-500'
        ][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.8
    }));

    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
            <Container>
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="max-w-5xl mx-auto"
                >
                    <motion.div
                        variants={headingAnimation}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            ¿Tienes alguna pregunta o quieres trabajar juntos?
                            No dudes en ponerte en contacto conmigo.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-5 gap-10">
                        {/* Información de contacto */}
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                        >
                            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                                Información de contacto
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                                        <Mail className="text-purple-600 dark:text-purple-400" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <a
                                            href={getSocialLink("Email")}
                                            className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-blue-400"
                                        >
                                            {contactInfo.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                                        <MapPin className="text-purple-600 dark:text-purple-400" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Ubicación</p>
                                        <p className="text-gray-800 dark:text-gray-200">{contactInfo.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                                        <Phone className="text-purple-600 dark:text-purple-400" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Teléfono</p>
                                        <p className="text-gray-800 dark:text-gray-200">{contactInfo.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
                                <div className="flex items-center mb-3">
                                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                                        Disponibilidad
                                    </h4>
                                </div>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start text-sm">
                                        <span className="min-w-[4px] h-4 bg-purple-400 dark:bg-purple-500 rounded-full mr-2 mt-1"></span>
                                        <span>Respuesta garantizada en menos de 48 horas</span>
                                    </li>
                                    <li className="flex items-start text-sm">
                                        <span className="min-w-[4px] h-4 bg-purple-400 dark:bg-purple-500 rounded-full mr-2 mt-1"></span>
                                        <span>Disponible para nuevos proyectos a partir de Junio 2025</span>
                                    </li>
                                    <li className="flex items-start text-sm">
                                        <span className="min-w-[4px] h-4 bg-purple-400 dark:bg-purple-500 rounded-full mr-2 mt-1"></span>
                                        <span>Consultas iniciales sin compromiso</span>
                                    </li>
                                    <li className="flex items-start text-sm">
                                        <span className="min-w-[4px] h-4 bg-purple-400 dark:bg-purple-500 rounded-full mr-2 mt-1"></span>
                                        <span>Abierto a colaboraciones y proyectos remotos</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Formulario de contacto */}
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-3"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md relative overflow-hidden" style={{ minHeight: '506px' }}>
                                <AnimatePresence mode="wait">
                                    {formSubmitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: isAnimatingOut ? 0 : 1, scale: isAnimatingOut ? 0.9 : 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{
                                                type: "spring",
                                                damping: 20,
                                                stiffness: 100
                                            }}
                                            className="p-6 absolute inset-0 flex flex-col items-center justify-center" // Cambiar esta línea
                                        >
                                            {/* Efecto de confeti */}
                                            {showConfetti && (
                                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                                    {confettiParticles.map(particle => (
                                                        <motion.div
                                                            key={`confetti-${particle.id}`}
                                                            className={`absolute rounded-sm ${particle.color}`}
                                                            style={{
                                                                width: `${particle.size}px`,
                                                                height: `${particle.size}px`,
                                                                left: `${particle.x}%`,
                                                                top: 0,
                                                                opacity: 0
                                                            }}
                                                            animate={{
                                                                y: ["0%", "100%"],
                                                                opacity: [0, 1, 0],
                                                                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
                                                            }}
                                                            transition={{
                                                                duration: 2.5 + Math.random() * 2,
                                                                ease: [0.4, 0, 0.2, 1],
                                                                delay: particle.delay,
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Círculo verde con animación */}
                                            <motion.div
                                                className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 dark:bg-green-900/20 mb-6"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    damping: 15,
                                                    stiffness: 200,
                                                    delay: 0.2
                                                }}
                                            >
                                                {/* Ondas expansivas */}
                                                <motion.div
                                                    className="absolute inset-0 rounded-full border-2 border-green-400"
                                                    initial={{ scale: 0.8, opacity: 0.8 }}
                                                    animate={{ scale: 1.6, opacity: 0 }}
                                                    transition={{
                                                        duration: 1.5,
                                                        ease: "easeOut",
                                                        repeat: 2,
                                                        repeatDelay: 1
                                                    }}
                                                />

                                                {/* Check mark animation */}
                                                <motion.svg
                                                    className="w-10 h-10 text-green-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    initial={{ pathLength: 0, opacity: 0 }}
                                                    animate={{ pathLength: 1, opacity: 1 }}
                                                    transition={{ duration: 0.8, delay: 0.3 }}
                                                >
                                                    <motion.path
                                                        d="M5 13l4 4L19 7"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 0.8, delay: 0.3 }}
                                                    />
                                                </motion.svg>
                                            </motion.div>

                                            <motion.h3
                                                className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                ¡Mensaje enviado!
                                            </motion.h3>

                                            <motion.p
                                                className="text-gray-600 dark:text-gray-400 text-center max-w-md"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                Gracias por contactarme. Te responderé lo antes posible.
                                                <br />¡Que tengas un excelente día!
                                            </motion.p>

                                            <motion.div
                                                className="mt-8 text-sm text-gray-500 dark:text-gray-400 flex items-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1.2 }}
                                            >
                                                <Clock size={14} className="mr-1" />
                                                <span>El formulario se reiniciará en unos segundos...</span>
                                            </motion.div>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            onSubmit={handleSubmit}
                                            className="p-6 space-y-5"
                                            initial={{ opacity: 0, x: formSubmitted ? -20 : 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="grid grid-cols-2 gap-5">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Nombre completo
                                                    </label>
                                                    <motion.input
                                                        whileFocus={{ scale: 1.01 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                        type="text"
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border ${touched.name && errors.name
                                                            ? 'border-red-500 dark:border-red-500'
                                                            : 'border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-blue-500'
                                                            } focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500`}
                                                        placeholder="Juan Pérez"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Email
                                                    </label>
                                                    <motion.input
                                                        whileFocus={{ scale: 1.01 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                        type="email"
                                                        id="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border ${touched.email && errors.email
                                                            ? 'border-red-500 dark:border-red-500'
                                                            : 'border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-blue-500'
                                                            } focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500`}
                                                        placeholder="juan@ejemplo.com"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Asunto
                                                </label>
                                                <motion.input
                                                    whileFocus={{ scale: 1.01 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                    type="text"
                                                    id="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border ${touched.subject && errors.subject
                                                        ? 'border-red-500 dark:border-red-500'
                                                        : 'border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-blue-500'
                                                        } focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500`}
                                                    placeholder="Asunto del mensaje"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Mensaje
                                                </label>
                                                <motion.textarea
                                                    whileFocus={{ scale: 1.01 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                    id="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    rows={5}
                                                    className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border ${touched.message && errors.message
                                                        ? 'border-red-500 dark:border-red-500'
                                                        : 'border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-blue-500'
                                                        } focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500`}
                                                    placeholder="Tu mensaje..."
                                                />
                                            </div>

                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            >
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    icon={isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                                >
                                                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                                                </Button>
                                            </motion.div>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default Contact;