export const socialLinks = [
    {
        name: "GitHub",
        url: "https://github.com/Bluexerry?tab=repositories",
        icon: "github"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/jes%C3%BAs-manuel-v%C3%A1zquez-herrera-8191462a3/",
        icon: "linkedin"
    },
    {
        name: "Email",
        url: "mailto:jesusma33va@gmail.com",
        icon: "mail"
    }
];

// Helper para obtener un enlace específico por nombre
export const getSocialLink = (name) => {
    const link = socialLinks.find(link => link.name.toLowerCase() === name.toLowerCase());
    return link ? link.url : '#';
};

// Información de contacto adicional
export const contactInfo = {
    email: "jesusma33va@gmail.com",
    location: "Sevilla, España 41019",
    phone: "+34 --- --- ---"
};