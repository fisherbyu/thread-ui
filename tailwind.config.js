/** @type {import('tailwindcss').Config} */
export default {
    prefix: "thread-",
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
    },
    plugins: [],
};
