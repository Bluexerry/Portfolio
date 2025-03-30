export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    // Modo oscuro desactivado ya que usamos un tema oscuro fijo
    darkMode: false, // cambiar de 'class' a false
    theme: {
        extend: {
            colors: {
                // Opcional: definir colores personalizados para un tema oscuro coherente
                gray: {
                    750: '#263040', // Variante entre gray-700 y gray-800
                    850: '#162030', // Variante entre gray-800 y gray-900
                }
            },
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