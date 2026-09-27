import { getResolvedTypographyValues, getTextColorStyles } from '@/utils';
import { CodeProps } from './code.types';
import { css, cx } from '@/styled-system/css';
import { getTypographyStyles } from '../shared-utils/get-typography-styles';
import { getPresentationStyles } from '../shared-utils/get-presentation-styles';

const styles = css({
	paddingY: '2px',
	paddingX: '3px',
	backgroundColor: 'structure.subtle',
	borderRadius: 'xs',
	borderWidth: 'sm',
	borderColor: 'structure.default',
	letterSpacing: 'wide',
});

/**
 * Inline code. Renders as `code`.
 *
 * @example
 * <Text>Run <Code>npm install</Code> to get started.</Text>
 * @example
 * <Code plain>npm install</Code>
 */
export const Code = ({ children, size = 'sm', truncate = false, plain }: CodeProps) => {
	const resolved = getResolvedTypographyValues({
		role: 'code',
		fontSize: `body.${size}` as const,
	});

	const className = cx(
		!plain && styles,
		getTypographyStyles(resolved),
		getPresentationStyles({
			truncate: truncate || undefined,
			display: truncate ? 'inline-block' : undefined,
		}),
		getTextColorStyles('standard')
	);

	return <code className={className}>{children}</code>;
};
