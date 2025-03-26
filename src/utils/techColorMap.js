export const techColorMap = {
    // Frontend - Gradientes vibrantes
    'React': 'bg-gradient-to-r from-blue-500 to-blue-400',
    'Vue.js': 'bg-gradient-to-r from-emerald-500 to-green-400',
    'JavaScript': 'bg-gradient-to-r from-amber-500 to-yellow-400',
    'TypeScript': 'bg-gradient-to-r from-blue-600 to-indigo-500',
    'Tailwind CSS': 'bg-gradient-to-r from-cyan-500 to-teal-400',
    'CSS': 'bg-gradient-to-r from-sky-500 to-blue-400',
    'HTML': 'bg-gradient-to-r from-orange-600 to-orange-500',
    'Redux': 'bg-gradient-to-r from-purple-600 to-violet-500',
    'Framer Motion': 'bg-gradient-to-r from-fuchsia-600 to-purple-500',
    'Bootstrap': 'bg-gradient-to-r from-indigo-600 to-purple-500',

    // Backend - Tonos más profesionales
    'Node.js': 'bg-gradient-to-r from-green-600 to-emerald-500',
    'Express': 'bg-gradient-to-r from-gray-700 to-gray-600',
    'PHP': 'bg-gradient-to-r from-indigo-600 to-purple-500',
    'Laravel': 'bg-gradient-to-r from-red-600 to-rose-500',
    'C#': 'bg-gradient-to-r from-violet-700 to-purple-600',
    '.NET': 'bg-gradient-to-r from-blue-700 to-indigo-600',
    'Java': 'bg-gradient-to-r from-red-700 to-red-600',

    // Bases de datos - Tonos profundos
    'MongoDB': 'bg-gradient-to-r from-green-700 to-green-600',
    'MySQL': 'bg-gradient-to-r from-blue-800 to-blue-700',
    'Firebase': 'bg-gradient-to-r from-amber-600 to-orange-500',
    'PostgreSQL': 'bg-gradient-to-r from-blue-700 to-cyan-600',

    // APIs y comunicación - Tonos tecnológicos
    'API': 'bg-gradient-to-r from-violet-600 to-indigo-500',
    'API REST': 'bg-gradient-to-r from-indigo-600 to-blue-500',
    'WebSockets': 'bg-gradient-to-r from-fuchsia-600 to-purple-500',
    'Swagger': 'bg-gradient-to-r from-emerald-600 to-green-500',
    'GraphQL': 'bg-gradient-to-r from-pink-600 to-rose-500',

    // Mobile y específicos - Tonos modernos
    'React Native': 'bg-gradient-to-r from-blue-600 to-cyan-500',
    'Mobile': 'bg-gradient-to-r from-sky-600 to-blue-500',
    'Flutter': 'bg-gradient-to-r from-cyan-600 to-blue-500',
    'Swift': 'bg-gradient-to-r from-orange-600 to-red-500',

    // Testing y automatización - Tonos confiables
    'Selenium': 'bg-gradient-to-r from-green-700 to-emerald-600',
    'TestNG': 'bg-gradient-to-r from-amber-600 to-yellow-500',
    'Maven': 'bg-gradient-to-r from-red-700 to-red-600',
    'Jest': 'bg-gradient-to-r from-red-600 to-rose-500',
    'Cypress': 'bg-gradient-to-r from-green-600 to-emerald-500',

    // Otros - Diversidad de tonos
    'MVC': 'bg-gradient-to-r from-slate-700 to-gray-600',
    'Backend': 'bg-gradient-to-r from-slate-800 to-gray-700',
    'IoT': 'bg-gradient-to-r from-cyan-600 to-blue-500',
    'Arduino': 'bg-gradient-to-r from-teal-600 to-emerald-500',
    'Sensores': 'bg-gradient-to-r from-amber-600 to-yellow-500',
    'Vuex': 'bg-gradient-to-r from-emerald-600 to-green-500',
    'DevOps': 'bg-gradient-to-r from-orange-600 to-red-500',
    'AWS': 'bg-gradient-to-r from-orange-600 to-yellow-500',
    'Docker': 'bg-gradient-to-r from-sky-600 to-blue-500',
    'Kubernetes': 'bg-gradient-to-r from-blue-600 to-sky-500',
    'Next.js': 'bg-gradient-to-r from-slate-900 to-gray-800',
};

// Función para convertir colores de fondo a colores de borde
export const getBorderColor = (tag) => {
    const bgColor = techColorMap[tag] || 'bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600';

    // Extraer el primer color del gradiente para el borde
    const fromColorMatch = bgColor.match(/from-([a-z]+-[0-9]+)/);
    if (fromColorMatch && fromColorMatch[1]) {
        return `border-${fromColorMatch[1]}`;
    }

    return 'border-gray-300 dark:border-gray-600';
};