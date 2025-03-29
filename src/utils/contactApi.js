/**
 * Servicio para enviar mensajes del formulario de contacto
 */

const API_URL = import.meta.env.VITE_MAILER_URL || 'http://localhost:3000';

export const sendContactForm = async (formData) => {
    try {
        console.log('Usando API URL:', API_URL);
        console.log('Enviando formulario:', formData);

        // Usar directamente la ruta de la nueva función
        const response = await fetch(`${API_URL}/.netlify/functions/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('Respuesta del servidor:', response.status);

        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');

        let data;
        if (isJson) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.warn('Respuesta no JSON:', text);
            data = { message: text };
        }

        if (!response.ok) {
            console.error('Error del servidor:', data);
            throw new Error(data.error || 'Error al enviar el mensaje');
        }

        return data;
    } catch (error) {
        console.error('Error en solicitud:', error.message);
        throw error;
    }
};