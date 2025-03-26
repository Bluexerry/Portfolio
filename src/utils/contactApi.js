/**
 * Servicio para enviar mensajes del formulario de contacto
 */

// Usar la variable de entorno para la URL de la API en producción
const API_URL = import.meta.env.MAILER_URL;

export const sendContactForm = async (formData) => {
    try {
        console.log('Enviando formulario:', formData); // Log para depuración

        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('Respuesta del servidor:', response.status); // Log para depuración

        const data = await response.json();

        if (!response.ok) {
            console.error('Error del servidor:', data); // Log para depuración
            throw new Error(data.error || 'Error al enviar el mensaje');
        }

        return data;
    } catch (error) {
        console.error('Error en solicitud:', error.message); // Log para depuración
        throw error;
    }
};