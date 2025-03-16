import { Toaster } from 'sonner';
import PropTypes from 'prop-types';

const Toast = ({ position = 'bottom-right', richColors = true, closeButton = true }) => {
    return (
        <Toaster
            position={position}
            richColors={richColors}
            closeButton={closeButton}
            toastOptions={{
                duration: 4000,
                className: 'font-sans',
            }}
        />
    );
};

Toast.propTypes = {
    position: PropTypes.oneOf([
        'top-left',
        'top-right',
        'top-center',
        'bottom-left',
        'bottom-right',
        'bottom-center'
    ]),
    richColors: PropTypes.bool,
    closeButton: PropTypes.bool,
};

export default Toast;