/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    // Usar 'media' para que el modo oscuro solo se active mediante CSS
    // y no la clase 'dark' que estamos previniendo explícitamente
    darkMode: 'media',
    theme: {
        extend: {
            animation: {
                fadeInUp: "fadeInUp 0.7s ease-out forwards",
                'shimmer': 'shimmer 2s infinite',
                'shimmer-fast': 'shimmer 1.5s infinite',
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                shimmer: {
                    '0%, 100%': { transform: 'translateX(-100%)' },
                    '50%': { transform: 'translateX(100%)' }
                },
            },
        },
    },
    plugins: [],
};