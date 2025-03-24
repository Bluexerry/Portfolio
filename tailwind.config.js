export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: 'class', // Asegúrate de que esta línea exista
    theme: {
        extend: {
            animation: {
                fadeInUp: "fadeInUp 0.7s ease-out forwards",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};