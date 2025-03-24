import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './themeContext';

export function ThemeProvider({ children }) {
    // Verificar si hay tema guardado en localStorage, sino usar preferencia del sistema
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light'; // Valor por defecto en SSR
    });

    // Aplicar tema al DOM
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        // Guardar preferencia
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Escuchar cambios en las preferencias del sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (!localStorage.getItem('theme')) { // Solo cambiar si no hay preferencia guardada
                setTheme(mediaQuery.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Añadir validación de PropTypes
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};