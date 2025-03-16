import PropTypes from 'prop-types';

const Container = ({ children, className = '', as: Element = 'div', ...props }) => {
    return (
        <Element
            className={`container mx-auto px-4 ${className}`}
            {...props}
        >
            {children}
        </Element>
    );
};

Container.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    as: PropTypes.string,
};

export default Container;