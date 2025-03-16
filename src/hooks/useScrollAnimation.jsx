import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = (options = {}) => {
    const defaultOptions = {
        triggerOnce: true,
        threshold: 0.1,
        ...options
    };

    const [ref, inView] = useInView(defaultOptions);

    const fadeInVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    const slideInLeftVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    };

    const slideInRightVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    };

    const scaleVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    return {
        ref,
        inView,
        variants: {
            fadeIn: fadeInVariants,
            slideInLeft: slideInLeftVariants,
            slideInRight: slideInRightVariants,
            scale: scaleVariants
        },
        transition: {
            duration: 0.5
        }
    };
};