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
    const baseStyles = "font-medium rounded-lg transition-all duration-300 flex items-center justify-center";

    // Variantes de botones
    const variants = {
        primary: "bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-600 dark:to-teal-600 text-white shadow-md hover:shadow-lg border-0",
        secondary: "border-2 border-purple-600 dark:border-blue-500 text-purple-600 dark:text-blue-400 hover:bg-purple-50 dark:hover:bg-gray-800/50",
        outline: "border border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-blue-400 text-gray-800 dark:text-gray-200",
        text: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-purple-600 dark:text-blue-400",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg",
    };

    // Tamaños de botones
    const sizes = {
        xs: "text-xs px-2 py-1",
        sm: "text-sm px-3 py-1.5",
        md: "px-5 py-2.5",
        lg: "text-lg px-6 py-3",
        xl: "text-xl px-8 py-4",
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
                <span className="mr-2">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
                <span className="ml-2">{icon}</span>
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
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'danger']),
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