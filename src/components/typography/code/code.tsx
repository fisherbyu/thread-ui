import { getResolvedTypographyValues, getTextColorStyles } from '@/utils';
import { CodeProps } from './code.types';
import { css, cx } from '@/styled-system/css';
import { getTypographyStyles } from '../shared-utils/get-typography-styles';
import { getPresentationStyles } from '../shared-utils/get-presentation-styles';

export const Code = ({ children, size = 'sm', truncate = false }: CodeProps) => {
	const resolved = getResolvedTypographyValues({
		role: 'code',
		fontSize: `body.${size}` as const,
	});

	const className = cx(
		css({
			paddingY: '2px',
			paddingX: '3px',
			backgroundColor: 'structure.subtle',
			borderRadius: 'xs',
			borderWidth: 'sm',
			borderColor: 'structure.default',
			letterSpacing: 'wide',
		}),
		getTypographyStyles(resolved),
		getPresentationStyles({ truncate: truncate || undefined }),
		getTextColorStyles('standard')
	);

	return <code className={className}>{children}</code>;
};
