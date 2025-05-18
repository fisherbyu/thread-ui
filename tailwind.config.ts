/** @type {import('tailwindcss').Config} */
export default {
	prefix: 'thread-',
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					light: 'var(--primary-light)',
					DEFAULT: 'var(--primary-main)',
					dark: 'var(--primary-dark)',
				},
				secondary: {
					light: 'var(--secondary-light)',
					DEFAULT: 'var(--secondary-main)',
					dark: 'var(--secondary-dark)',
				},
				tertiary: {
					light: 'var(--tertiary-light)',
					DEFAULT: 'var(--tertiary-main)',
					dark: 'var(--tertiary-dark)',
				},
				white: 'var(--white)',
				black: 'var(--black)',
				gray: {
					light: 'var(--gray-light)',
					DEFAULT: 'var(--gray-main)',
					dark: 'var(--gray-dark)',
				},
				success: {
					light: 'var(--success-light)',
					DEFAULT: 'var(--success-main)',
					dark: 'var(--success-dark)',
				},
				warning: {
					light: 'var(--warning-light)',
					DEFAULT: 'var(--warning-main)',
					dark: 'var(--warning-dark)',
				},
				error: {
					light: 'var(--error-light)',
					DEFAULT: 'var(--error-main)',
					dark: 'var(--error-dark)',
				},
				info: {
					light: 'var(--info-light)',
					DEFAULT: 'var(--info-main)',
					dark: 'var(--info-dark)',
				},
				background: 'var(--background)',
				surface: 'var(--surface)',
				elevated: 'var(--elevated)',
			},
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
	},
	plugins: [],
};

// },
