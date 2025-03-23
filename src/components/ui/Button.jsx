import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { buttonAnimation } from '../../utils/animation';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    href,
    onClick,
    fullWidth = false,
    disabled = false,
    type = 'button',
    icon,
    iconPosition = 'left',
    animate = true,
    ...props
}) => {
    // Estilos base para todos los botones
    const baseStyles = "relative font-medium rounded-lg transition-all duration-300 flex items-center justify-center";

    // Variantes mejoradas de botones con mejor contraste y efectos visuales
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-violet-600 text-white shadow-md hover:shadow-lg hover:translate-y-[-1px] border-0",
        secondary: "border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-sm",
        outline: "border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
        text: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg",
        // Nueva variante para el botón de cierre del modal que no se camufla con el fondo
        close: "border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow",
    };

    // Tamaños de botones con mejor espaciado para los iconos
    const sizes = {
        xs: "text-xs px-2.5 py-1.5 gap-1.5",
        sm: "text-sm px-3.5 py-1.5 gap-2",
        md: "px-5 py-2.5 gap-2",
        lg: "text-lg px-6 py-3 gap-2.5",
        xl: "text-xl px-8 py-4 gap-3",
    };

    // Estilos para los estados disabled
    const disabledStyles = "opacity-60 cursor-not-allowed";

    // Unimos todas las clases
    const buttonClasses = clsx(
        baseStyles,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && "w-full",
        disabled && disabledStyles,
        className
    );

    // Propiedades para la animación
    const motionProps = animate && !disabled ? {
        whileHover: buttonAnimation.hover,
        whileTap: buttonAnimation.tap,
    } : {};

    // Renderizado del contenido (con o sin icono)
    const content = (
        <>
            {icon && iconPosition === 'left' && (
                <span className="flex items-center">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
                <span className="flex items-center">{icon}</span>
            )}
        </>
    );

    // Si es un enlace, renderizamos un <a>
    if (href && !disabled) {
        return (
            <motion.a
                href={href}
                className={buttonClasses}
                {...motionProps}
                {...props}
            >
                {content}
            </motion.a>
        );
    }

    // De lo contrario, renderizamos un <button>
    return (
        <motion.button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...motionProps}
            {...props}
        >
            {content}
        </motion.button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'danger', 'close']),
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    className: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    animate: PropTypes.bool
};

export default Button;