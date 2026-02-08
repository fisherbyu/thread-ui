import { ColoredTextOptions } from '@/types';
import { ExpandedUtilitySizes } from '@/types/theme/theme.types';
import { getColoredTextColor } from '@/utils';
import { CSSProperties, ReactNode } from 'react';

export type TypographyProps = {
	children: ReactNode;
	align?: 'left' | 'center';
	color?: ColoredTextOptions;
	inline?: boolean;
};

export const Title = ({
	children,
	align = 'left',
	inline = false,
	color = 'standard',
}: TypographyProps) => {
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

export const H1 = ({
	children,
	align = 'left',
	color = 'standard',
	inline = false,
}: TypographyProps) => {
	const styles: CSSProperties = {
		fontSize: '2rem',
		fontWeight: 600,
		lineHeight: 1.3,
		marginBottom: inline ? 0 : '32px',
		textAlign: align,
		color: getColoredTextColor(color),
	};
	return <h1 style={styles}>{children}</h1>;
};

export const H2 = ({
	children,
	align = 'left',
	color = 'standard',
	inline = false,
}: TypographyProps) => {
	const styles: CSSProperties = {
		fontSize: '1.5rem',
		fontWeight: 600,
		lineHeight: 1.3,
		marginBottom: inline ? 0 : '24px',
		textAlign: align,
		color: getColoredTextColor(color),
	};
	return <h2 style={styles}>{children}</h2>;
};

export const H3 = ({
	children,
	align = 'left',
	color = 'standard',
	inline = false,
}: TypographyProps) => {
	const styles: CSSProperties = {
		fontSize: '1.25rem',
		fontWeight: 600,
		lineHeight: 1.3,
		marginBottom: inline ? 0 : '16px',
		textAlign: align,
		color: getColoredTextColor(color),
	};
	return <h3 style={styles}>{children}</h3>;
};

export type TextProps = TypographyProps & {
	bold?: boolean;
	size?: keyof Pick<ExpandedUtilitySizes, 'xxs' | 'xs' | 'sm' | 'md'>;
};

const TEXT_SIZES = {
	xxs: '0.625rem',
	xs: '0.75rem',
	sm: '0.875rem',
	md: '1rem',
} as const;

export const Text = ({
	children,
	align = 'left',
	inline = false,
	color = 'standard',
	bold = false,
	size = 'md',
}: TextProps) => {
	const Component = inline ? 'span' : 'p';
	const styles: CSSProperties = {
		fontSize: TEXT_SIZES[size],
		fontWeight: bold ? 600 : 350,
		lineHeight: 1.5,
		textAlign: align,
		color: getColoredTextColor(color),
	};

	return <Component style={styles}>{children}</Component>;
};

export const Subtitle = ({
	children,
	align = 'left',
	color = 'text-secondary',
}: TypographyProps) => {
	const styles: CSSProperties = {
		display: 'block',
		fontSize: 'clamp(0.875rem, 0.75em, 1.5rem)',
		marginTop: '0.2em',
		textAlign: align,
		color: getColoredTextColor(color),
	};
	return <span style={styles}>{children}</span>;
};

export type ListProps = Omit<TextProps, 'bold' | 'children' | 'inline'> & {
	items: Array<string | ReactNode>;
	decoration?: 'disc' | 'circle' | 'square' | 'blank' | 'none';
};

export const List = ({
	align = 'left',
	color = 'standard',
	size = 'md',
	items,
	decoration = 'disc',
}: ListProps) => {
	const styles: CSSProperties = {
		fontSize: TEXT_SIZES[size],
		lineHeight: 1.5,
		textAlign: align,
		color: getColoredTextColor(color),
		listStyleType: decoration === 'blank' ? 'none' : decoration,
		marginLeft: decoration !== 'none' ? '1.5em' : undefined,
	};

	return (
		<ul style={{ padding: 0 }}>
			{items.map((item, index) => (
				<li key={index} style={styles}>
					{item}
				</li>
			))}
		</ul>
	);
};

export type OrderedListProps = Omit<ListProps, 'decoration'>;

export const OrderedList = ({
	align = 'left',
	color = 'standard',
	size = 'md',
	items,
}: OrderedListProps) => {
	const styles: CSSProperties = {
		fontSize: TEXT_SIZES[size],
		lineHeight: 1.5,
		textAlign: align,
		color: getColoredTextColor(color),
	};

	return (
		<ol style={{ padding: 0 }}>
			{items.map((item, index) => (
				<li key={index} style={styles}>
					{item}
				</li>
			))}
		</ol>
	);
};
