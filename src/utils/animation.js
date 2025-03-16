import { AnimatePresence } from 'framer-motion';

/**
 * Configuración para animaciones escalonadas de elementos hijos
 */
export const staggerChildren = (staggerTime = 0.1) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: staggerTime
        }
    }
});

/**
 * Animación reveladora desde abajo
 */
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 15,
            stiffness: 100
        }
    }
};

/**
 * Animación reveladora desde la izquierda
 */
export const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    }
};

/**
 * Animación reveladora desde la derecha
 */
export const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    }
};

/**
 * Animación de desvanecimiento simple
 */
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6
        }
    }
};

/**
 * Animación para Cartas/Tarjetas
 */
export const cardAnimation = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            damping: 15,
            stiffness: 100,
            duration: 0.5
        }
    },
    hover: {
        y: -5,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    },
    tap: { scale: 0.98 }
};

/**
 * Animación para botones
 */
export const buttonAnimation = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
};

/**
 * Animación para títulos
 */
export const headingAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    }
};

/**
 * Animación para transiciones de página
 */
export const pageTransition = {
    in: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    out: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

/**
 * Animación tipo escritura
 */
export const textRevealAnimation = {
    hidden: { width: "0%" },
    visible: {
        width: "100%",
        transition: { duration: 0.5, ease: "easeInOut" }
    }
};

/**
 * Helper para animar componentes basados en scroll
 */
export const scrollRevealConfig = {
    opacity: 0,
    y: 50,
    transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
    }
};

export { AnimatePresence };