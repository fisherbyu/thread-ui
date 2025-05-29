'use client';
import { ColoredTextOptions } from '@/types';
import { getColoredTextColor } from '@/utils';
import { CSSProperties, ReactNode } from 'react';

export type TypographyProps = {
	children: ReactNode;
	align?: 'left' | 'center';
	color?: ColoredTextOptions;
};

export type TitleProps = TypographyProps & {
	inline?: boolean;
};
export const Title = ({ children, align = 'left', inline = false, color = 'standard' }: TitleProps) => {
	const styles: CSSProperties = {
		fontSize: '3rem',
		fontWeight: 700,
		lineHeight: 1.3,
		marginBottom: inline ? 0 : '40px',
		textAlign: align,
		color: getColoredTextColor(color),
	};
	return <h1 style={styles}>{children}</h1>;
};

export const H1 = ({ children, align = 'left', color = 'standard' }: TypographyProps) => {
	const styles: CSSProperties = {
		fontSize: '2rem',
		fontWeight: 600,
		lineHeight: 1.3,
		marginBottom: '32px',
		textAlign: align,
		color: getColoredTextColor(color),
	};
	return <h1 style={styles}>{children}</h1>;
};

export const H2 = ({ children, align = 'left', color = 'standard' }: TypographyProps) => {
	const styles: CSSProperties = {
		fontSize: '1.5rem',
		fontWeight: 600,
		lineHeight: 1.3,
		marginBottom: '24px',
		textAlign: align,
		color: getColoredTextColor(color),
	};
	return <h2 style={styles}>{children}</h2>;
};

export const H3 = ({ children, align = 'left', color = 'standard' }: TypographyProps) => {
	const styles: CSSProperties = {
		fontSize: '1.25rem',
		fontWeight: 600,
		lineHeight: 1.3,
		marginBottom: '16px',
		textAlign: align,
		color: getColoredTextColor(color),
	};
	return <h3 style={styles}>{children}</h3>;
};

export type TextProps = TypographyProps & {
	inline?: boolean;
};

export const Text = ({ children, align = 'left', inline = false, color = 'standard' }: TextProps) => {
	const Component = inline ? 'span' : 'p';
	const styles: CSSProperties = {
		fontSize: '1rem',
		fontWeight: 350,
		lineHeight: 1.5,
		textAlign: align,
		color: getColoredTextColor(color),
	};
	return <Component style={styles}>{children}</Component>;
};

export const Subtitle = ({ children, align = 'left', color = 'text-secondary' }: TypographyProps) => {
	const styles: CSSProperties = {
		display: 'block',
		fontSize: 'clamp(0.875rem, 0.75em, 1.5rem)',
		marginTop: '0.2em',
		textAlign: align,
		color: getColoredTextColor(color),
	};
	return <span style={styles}>{children}</span>;
};
