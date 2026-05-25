import { ThreadTheme } from '../thread-theme';

export const Swatch = ({
	label,
	cssVar,
	border,
	textDark = true,
}: {
	label: string;
	cssVar: string;
	border?: boolean;
	textDark?: boolean;
}) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
		<div
			style={{
				width: '100%',
				height: '64px',
				borderRadius: '6px',
				backgroundColor: `var(${cssVar})`,
				border: border
					? `1px solid ${ThreadTheme.structure.default}`
					: '1px solid transparent',
			}}
		/>
		<span
			style={{
				fontSize: ThreadTheme.typography.fontSizes.body.xxs,
				fontWeight: ThreadTheme.typography.fontWeights.semibold,
				color: ThreadTheme.text.standard,
			}}
		>
			{label}
		</span>
		<span
			style={{
				fontSize: ThreadTheme.typography.fontSizes.body.xxs,
				color: ThreadTheme.text.secondary,
				fontFamily: ThreadTheme.typography.fontFamilies.mono,
			}}
		>
			{cssVar}
		</span>
	</div>
);
