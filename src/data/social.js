export const socialLinks = [
    {
        name: "GitHub",
        url: "https://github.com/yourusername",
        icon: "github"
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/yourprofile",
        icon: "linkedin"
    },
    {
        name: "Twitter",
        url: "https://twitter.com/yourhandle",
        icon: "twitter"
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