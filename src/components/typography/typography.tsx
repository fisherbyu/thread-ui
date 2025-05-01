import { CSSProperties, ReactNode } from 'react';

export type TypographyProps = {
	children: ReactNode;
};

export type TitleProps = TypographyProps & {
	align?: 'left' | 'center';
	inline?: boolean;
};
export const Title = ({ children, align = 'left', inline = false }: TitleProps) => {
	const styles: CSSProperties = {
		fontSize: '3rem',
		fontWeight: 700,
		lineHeight: 1.3,
		marginBottom: inline ? 0 : '40px',
		textAlign: align,
	};
	return <h1 style={styles}>{children}</h1>;
};

export const H1 = ({ children }: TypographyProps) => {
	const styles: CSSProperties = {
		fontSize: '2rem',
		fontWeight: 600,
		lineHeight: 1.3,
		marginBottom: '32px',
	};
	return <h1 style={styles}>{children}</h1>;
};

export const H2 = ({ children }: TypographyProps) => {
	const styles: CSSProperties = {
		fontSize: '1.5rem',
		fontWeight: 600,
		lineHeight: 1.3,
		marginBottom: '24px',
	};
	return <h2 style={styles}>{children}</h2>;
};

export const H3 = ({ children }: TypographyProps) => {
	const styles: CSSProperties = {
		fontSize: '1.25rem',
		fontWeight: 600,
		lineHeight: 1.3,
		marginBottom: '16px',
	};
	return <h3 style={styles}>{children}</h3>;
};

export type TextProps = TypographyProps & {
	inline?: boolean;
};

export const Text = ({ children, inline = false }: TextProps) => {
	const Component = inline ? 'span' : 'p';
	const styles: CSSProperties = {
		fontSize: '1rem',
		fontWeight: 350,
		lineHeight: 1.5,
	};
	return <Component style={styles}>{children}</Component>;
};

export const Subtitle = ({ children }: TypographyProps) => {
	const styles: CSSProperties = {
		display: 'block',
		fontSize: 'clamp(0.875rem, 0.75em, 1.5rem)',
		color: '#878787',
		marginTop: '0.2em',
	};
	return <span style={styles}>{children}</span>;
};
