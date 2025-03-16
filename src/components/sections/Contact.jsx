import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, Send, Mail, MapPin, Phone, Clock } from 'lucide-react';
import Container from '../layout/Container';
import Button from '../ui/Button';
import { isValidEmail, debounce } from '../../utils/helpers';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { headingAnimation, fadeInUp } from '../../utils/animation';
import { contactInfo, getSocialLink } from '../../data/social';

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

    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            // Cambiamos la función de validación para que sea menos estricta
            validate: (value) => {
                // Si tiene al menos 2 palabras (cualquier tipo de separación)
                const words = value.trim().split(/\s+/);
                return words.length >= 2 || 'Por favor, ingresa nombre y apellido';
            }
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
        return isValid;
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

    // Handle blur for immediate validation
    const handleBlur = (e) => {
        const { id, value } = e.target;
        setTouched(prev => ({ ...prev, [id]: true }));

        const error = validateField(id, value);
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set all fields as touched
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);

        // Validate form
        if (!validateForm()) {
            // Mostrar errores como toasts específicos
            if (errors.name) toast.error(`Nombre: ${errors.name}`);
            if (errors.email) toast.error(`Email: ${errors.email}`);
            if (errors.subject) toast.error(`Asunto: ${errors.subject}`);
            if (errors.message) toast.error(`Mensaje: ${errors.message}`);
            return;
        }

        // Submit form
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTouched({});
            setFormSubmitted(true);

            // Reset form success message after 5 seconds
            setTimeout(() => {
                setFormSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                        <span>Respuesta en menos de 48 horas</span>
                                    </li>
                                    <li className="flex items-start text-sm">
                                        <span className="min-w-[4px] h-4 bg-purple-400 dark:bg-purple-500 rounded-full mr-2 mt-1"></span>
                                        <span>Disponible para proyectos a partir de Junio 2025</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Formulario de contacto */}
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-3"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md" style={{ minHeight: '506px' }}> {/* Altura fija calculada */}
                                {formSubmitted ? (
                                    <div className="p-6 h-full flex flex-col items-center justify-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                                            ¡Mensaje enviado!
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Gracias por contactarme. Te responderé lo antes posible.
                                        </p>

                                        {/* Espaciador flex que ocupa el espacio necesario */}
                                        <div className="flex-grow" style={{ minHeight: '238px' }}></div>

                                        <Button
                                            onClick={() => setFormSubmitted(false)}
                                            variant="outline"
                                            fullWidth
                                        >
                                            Enviar otro mensaje
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Nombre completo
                                                </label>
                                                <input
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
                                                <input
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
                                            <input
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
                                            <textarea
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

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            fullWidth
                                            icon={isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                        >
                                            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default Contact;