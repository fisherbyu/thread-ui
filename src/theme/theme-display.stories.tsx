import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DefaultThreadTheme } from './default-theme';
import { SurfaceLayerMap } from './theme-surface-system';
import { H1, List, Text } from '../components/typography';

type DesignSystemArgs = Record<string, never>;

const meta: Meta<DesignSystemArgs> = {
	title: 'Design System',
	// tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: "Thread UI's default theme configuration",
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

// ── Helpers ──────────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
	padding: '48px 32px',
	maxWidth: '1100px',
	margin: '0 auto',
};

const sectionTitleStyle: React.CSSProperties = {
	fontSize: '1.5rem',
	fontWeight: 700,
	color: 'var(--thread-text-standard)',
	marginBottom: '4px',
};

const sectionCaptionStyle: React.CSSProperties = {
	fontSize: '0.875rem',
	color: 'var(--thread-text-secondary)',
	marginBottom: '32px',
	maxWidth: '640px',
	lineHeight: 1.5,
};

const gridStyle: React.CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
	gap: '16px',
};

const wideGridStyle: React.CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
	gap: '16px',
};

const Swatch = ({
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
					? '1px solid var(--thread-structure-default)'
					: '1px solid transparent',
			}}
		/>
		<span
			style={{
				fontSize: '0.75rem',
				fontWeight: 600,
				color: 'var(--thread-text-standard)',
			}}
		>
			{label}
		</span>
		<span
			style={{
				fontSize: '0.6875rem',
				color: 'var(--thread-text-secondary)',
				fontFamily: 'monospace',
			}}
		>
			{cssVar}
		</span>
	</div>
);

const ShadeGroup = ({
	name,
	shades,
}: {
	name: string;
	shades: { light: string; main: string; dark: string };
}) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
		<span
			style={{
				fontSize: '0.75rem',
				fontWeight: 600,
				color: 'var(--thread-text-standard)',
				marginBottom: '4px',
				textTransform: 'capitalize',
			}}
		>
			{name}
		</span>
		<div style={{ display: 'flex', gap: '4px', height: '48px' }}>
			{(['light', 'main', 'dark'] as const).map((shade) => (
				<div
					key={shade}
					style={{
						flex: 1,
						backgroundColor: `var(--thread-${name}-${shade})`,
						borderRadius:
							shade === 'light'
								? '6px 0 0 6px'
								: shade === 'dark'
									? '0 6px 6px 0'
									: '0',
					}}
				/>
			))}
		</div>
		<div style={{ display: 'flex', gap: '4px' }}>
			{(['light', 'main', 'dark'] as const).map((shade) => (
				<span
					key={shade}
					style={{
						flex: 1,
						fontSize: '0.625rem',
						color: 'var(--thread-text-secondary)',
						fontFamily: 'monospace',
					}}
				>
					{shade}
				</span>
			))}
		</div>
	</div>
);

const LayerCard = ({
	layer,
	description,
	config,
}: {
	layer: string;
	description: string;
	config: { bg: string; shadow: string; structure: string; zIndex: string };
}) => (
	<div
		style={{
			backgroundColor: `var(--thread-${layer})`,
			borderRadius: '8px',
			padding: '20px',
			border:
				config.structure !== 'none'
					? `1px solid var(--thread-structure-${config.structure})`
					: '1px solid transparent',
			boxShadow: config.shadow !== 'none' ? `var(--thread-shadow-${config.shadow})` : 'none',
			display: 'flex',
			flexDirection: 'column',
			gap: '8px',
			minHeight: '120px',
		}}
	>
		<span
			style={{
				fontSize: '0.875rem',
				fontWeight: 700,
				color: 'var(--thread-text-standard)',
				textTransform: 'capitalize',
			}}
		>
			{layer}
		</span>
		<span
			style={{
				fontSize: '0.75rem',
				color: 'var(--thread-text-secondary)',
				lineHeight: 1.4,
			}}
		>
			{description}
		</span>
		<div style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
			{config.shadow !== 'none' && (
				<span
					style={{
						fontSize: '0.625rem',
						fontFamily: 'monospace',
						color: 'var(--thread-text-disabled)',
						backgroundColor: 'var(--thread-inset)',
						padding: '2px 6px',
						borderRadius: '4px',
					}}
				>
					shadow: {config.shadow}
				</span>
			)}
			{config.structure !== 'none' && (
				<span
					style={{
						fontSize: '0.625rem',
						fontFamily: 'monospace',
						color: 'var(--thread-text-disabled)',
						backgroundColor: 'var(--thread-inset)',
						padding: '2px 6px',
						borderRadius: '4px',
					}}
				>
					border: {config.structure}
				</span>
			)}
			{config.zIndex !== 'none' && (
				<span
					style={{
						fontSize: '0.625rem',
						fontFamily: 'monospace',
						color: 'var(--thread-text-disabled)',
						backgroundColor: 'var(--thread-inset)',
						padding: '2px 6px',
						borderRadius: '4px',
					}}
				>
					z: {config.zIndex}
				</span>
			)}
		</div>
	</div>
);

const ShadowCard = ({ size, value }: { size: string; value: string }) => (
	<div
		style={{
			backgroundColor: 'var(--thread-surface)',
			borderRadius: '8px',
			padding: '24px',
			boxShadow: `var(--thread-shadow-${size})`,
			display: 'flex',
			flexDirection: 'column',
			gap: '4px',
		}}
	>
		<span
			style={{
				fontSize: '0.875rem',
				fontWeight: 700,
				color: 'var(--thread-text-standard)',
			}}
		>
			{size}
		</span>
		<span
			style={{
				fontSize: '0.6875rem',
				fontFamily: 'monospace',
				color: 'var(--thread-text-secondary)',
				lineHeight: 1.4,
			}}
		>
			{value}
		</span>
	</div>
);

// ── Story ────────────────────────────────────────────────────

export const Theme: Story = {
	render: () => {
		const layerDescriptions: Record<string, string> = {
			canvas: 'Page background. The base everything sits on.',
			inset: 'Recessed containers: inputs, wells. Visually below the canvas.',
			surface: 'Cards, panels, content regions. Pops against canvas.',
			elevated: 'Sticky nav, toolbars. Differentiated by shadow.',
			overlay: 'Modals, dropdowns, popovers. Highest elevation.',
		};

		return (
			<div style={{ backgroundColor: 'var(--thread-canvas)', minHeight: '100vh' }}>
				{/* ── Header ── */}
				<div
					style={{
						padding: '64px 32px 48px',
						maxWidth: '1100px',
						margin: '0 auto',
					}}
				>
					<div style={{ maxWidth: '640px' }}>
						<H1>Thread UI Design System</H1>
						<Text>
							The Thread-UI theme system defines the design language across the
							library, including layering, spacing and coloration.Each component sits
							on a named layer that determines its background, shadow, border, and
							stacking order. The theme palette includes primary, secondary, and
							tertiary colors, as well as definitions for common interactions, texts,
							and neutrals.
							<br /> <br />
							Each element of this theme can be configured and customized by consumers
							of the library
						</Text>
					</div>
				</div>

				{/* ── Surface Layers ── */}
				<div style={sectionStyle}>
					<div style={sectionTitleStyle}>Surface Layers</div>
					<div style={sectionCaptionStyle}>
						Five elevation layers from page background to overlay. Each layer resolves
						its own background color, shadow depth, border weight, and z-index.
					</div>

					{/* Nested layer demo */}
					<div
						style={{
							backgroundColor: 'var(--thread-canvas)',
							borderRadius: '12px',
							padding: '24px',
							border: '1px dashed var(--thread-structure-default)',
							marginBottom: '32px',
						}}
					>
						<span
							style={{
								fontSize: '0.6875rem',
								fontFamily: 'monospace',
								color: 'var(--thread-text-disabled)',
								marginBottom: '16px',
								display: 'block',
							}}
						>
							canvas
						</span>
						<div
							style={{
								backgroundColor: 'var(--thread-inset)',
								borderRadius: '8px',
								padding: '16px',
								border: '1px solid var(--thread-structure-default)',
								marginBottom: '16px',
							}}
						>
							<span
								style={{
									fontSize: '0.6875rem',
									fontFamily: 'monospace',
									color: 'var(--thread-text-disabled)',
								}}
							>
								inset — recessed below canvas
							</span>
						</div>
						<div
							style={{
								backgroundColor: 'var(--thread-surface)',
								borderRadius: '8px',
								padding: '20px',
								border: '1px solid var(--thread-structure-subtle)',
								boxShadow: 'var(--thread-shadow-sm)',
							}}
						>
							<span
								style={{
									fontSize: '0.6875rem',
									fontFamily: 'monospace',
									color: 'var(--thread-text-disabled)',
									marginBottom: '12px',
									display: 'block',
								}}
							>
								surface — cards sit here
							</span>
							<div
								style={{
									backgroundColor: 'var(--thread-elevated)',
									borderRadius: '6px',
									padding: '14px',
									border: '1px solid var(--thread-structure-subtle)',
									boxShadow: 'var(--thread-shadow-md)',
									marginBottom: '12px',
								}}
							>
								<span
									style={{
										fontSize: '0.6875rem',
										fontFamily: 'monospace',
										color: 'var(--thread-text-disabled)',
									}}
								>
									elevated — sticky nav, toolbars
								</span>
							</div>
							<div
								style={{
									backgroundColor: 'var(--thread-overlay)',
									borderRadius: '6px',
									padding: '14px',
									boxShadow: 'var(--thread-shadow-lg)',
								}}
							>
								<span
									style={{
										fontSize: '0.6875rem',
										fontFamily: 'monospace',
										color: 'var(--thread-text-disabled)',
									}}
								>
									overlay — modals, dropdowns
								</span>
							</div>
						</div>
					</div>

					{/* Individual layer cards */}
					<div style={wideGridStyle}>
						{(Object.keys(SurfaceLayerMap) as Array<keyof typeof SurfaceLayerMap>).map(
							(layer) => (
								<LayerCard
									key={layer}
									layer={layer}
									description={layerDescriptions[layer]}
									config={SurfaceLayerMap[layer]}
								/>
							)
						)}
					</div>
				</div>

				{/* ── Interactive States ── */}
				<div style={sectionStyle}>
					<div style={sectionTitleStyle}>Interactive States</div>
					<div style={sectionCaptionStyle}>
						Hover and active states applied on top of any surface. These are interaction
						cues, not layers.
					</div>
					<div style={{ display: 'flex', gap: '16px' }}>
						<Swatch label="Hover" cssVar="--thread-hover" border />
						<Swatch label="Active" cssVar="--thread-active" border />
					</div>
				</div>

				{/* ── Shadows ── */}
				<div style={sectionStyle}>
					<div style={sectionTitleStyle}>Shadow Scale</div>
					<div style={sectionCaptionStyle}>
						Compound shadows with a tight edge layer and a diffused ambient layer.
						Mode-independent — in dark mode, surface color lightness carries elevation
						instead.
					</div>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3, 1fr)',
							gap: '24px',
						}}
					>
						{(
							Object.keys(DefaultThreadTheme.shadow) as Array<
								keyof typeof DefaultThreadTheme.shadow
							>
						).map((size) => (
							<ShadowCard
								key={size.toString()}
								size={size}
								value={DefaultThreadTheme.shadow[size]}
							/>
						))}
					</div>
				</div>

				{/* ── Structure Colors ── */}
				<div style={sectionStyle}>
					<div style={sectionTitleStyle}>Structure Colors</div>
					<div style={sectionCaptionStyle}>
						Three tiers of border and divider colors. Subtle for card edges, default for
						inputs and dividers, strong for emphasis and active states. Input focus uses
						the primary color, not a structure tier.
					</div>
					<div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
						{(['subtle', 'default', 'strong'] as const).map((tier) => (
							<div
								key={tier}
								style={{
									flex: 1,
									backgroundColor: 'var(--thread-surface)',
									borderRadius: '8px',
									padding: '20px',
									border: `2px solid var(--thread-structure-${tier})`,
									display: 'flex',
									flexDirection: 'column',
									gap: '4px',
								}}
							>
								<span
									style={{
										fontSize: '0.875rem',
										fontWeight: 700,
										color: 'var(--thread-text-standard)',
										textTransform: 'capitalize',
									}}
								>
									{tier}
								</span>
								<span
									style={{
										fontSize: '0.6875rem',
										fontFamily: 'monospace',
										color: 'var(--thread-text-secondary)',
									}}
								>
									--thread-structure-{tier}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* ── Brand Palette ── */}
				<div style={sectionStyle}>
					<div style={sectionTitleStyle}>Brand Palette</div>
					<div style={sectionCaptionStyle}>
						Three-step color scales for primary, secondary, and tertiary brand colors.
						Each has light, main, and dark variants.
					</div>
					<div style={gridStyle}>
						<ShadeGroup name="primary" shades={DefaultThreadTheme.primary} />
						<ShadeGroup name="secondary" shades={DefaultThreadTheme.secondary} />
						<ShadeGroup name="tertiary" shades={DefaultThreadTheme.tertiary} />
					</div>
				</div>

				{/* ── Status Colors ── */}
				<div style={sectionStyle}>
					<div style={sectionTitleStyle}>Status Colors</div>
					<div style={sectionCaptionStyle}>
						Semantic colors for feedback and alerts. These intentionally break the
						neutral surface system to draw attention.
					</div>
					<div style={gridStyle}>
						<ShadeGroup name="success" shades={DefaultThreadTheme.success} />
						<ShadeGroup name="warning" shades={DefaultThreadTheme.warning} />
						<ShadeGroup name="error" shades={DefaultThreadTheme.error} />
						<ShadeGroup name="info" shades={DefaultThreadTheme.info} />
					</div>
				</div>

				{/* ── Neutral Colors ── */}
				<div style={sectionStyle}>
					<div style={sectionTitleStyle}>Neutrals</div>
					<div style={sectionCaptionStyle}>
						Base neutral palette. White, black, and a three-step gray scale.
					</div>
					<div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
						<Swatch label="White" cssVar="--thread-white" border />
						<Swatch label="Black" cssVar="--thread-black" />
					</div>
					<div style={gridStyle}>
						<ShadeGroup name="gray" shades={DefaultThreadTheme.gray} />
					</div>
				</div>

				{/* ── Text Colors ── */}
				<div style={sectionStyle}>
					<div style={sectionTitleStyle}>Text Colors</div>
					<div style={sectionCaptionStyle}>
						Semantic text roles. Standard for body copy, secondary for supporting text,
						disabled for inactive elements, accent for brand-colored text, inverted for
						text on non-standard backgrounds.
					</div>
					<div
						style={{
							backgroundColor: 'var(--thread-surface)',
							borderRadius: '8px',
							padding: '24px',
							border: '1px solid var(--thread-structure-subtle)',
							display: 'flex',
							flexDirection: 'column',
							gap: '12px',
						}}
					>
						{(
							[
								['standard', 'The primary text color for body content.'],
								['secondary', 'Supporting text, captions, and labels.'],
								['disabled', 'Inactive or unavailable content.'],
								['accent', 'Brand-colored text for emphasis.'],
							] as const
						).map(([role, sample]) => (
							<div
								key={role}
								style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}
							>
								<span
									style={{
										fontSize: '0.6875rem',
										fontFamily: 'monospace',
										color: 'var(--thread-text-disabled)',
										width: '80px',
										flexShrink: 0,
									}}
								>
									{role}
								</span>
								<span
									style={{
										fontSize: '1rem',
										color: `var(--thread-text-${role})`,
									}}
								>
									{sample}
								</span>
							</div>
						))}
						<div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
							<span
								style={{
									fontSize: '0.6875rem',
									fontFamily: 'monospace',
									color: 'var(--thread-text-disabled)',
									width: '80px',
									flexShrink: 0,
								}}
							>
								inverted
							</span>
							<span
								style={{
									fontSize: '1rem',
									color: 'var(--thread-text-inverted)',
									backgroundColor: 'var(--thread-black)',
									padding: '4px 12px',
									borderRadius: '4px',
								}}
							>
								Text on non-standard backgrounds.
							</span>
						</div>
					</div>
				</div>

				{/* ── Z-Index ── */}
				<div style={sectionStyle}>
					<div style={sectionTitleStyle}>Z-Index Scale</div>
					<div style={sectionCaptionStyle}>
						Stacking order for components. Gaps of 100 allow slotting elements between
						layers without renumbering.
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '4px',
							maxWidth: '480px',
						}}
					>
						{(
							[
								['system', '400', 'Toasts, global banners'],
								['modal', '300', 'Modal dialogs + scrim'],
								['overlay', '200', 'Dropdowns, popovers'],
								['sticky', '100', 'Nav, sticky controls'],
								['base', '0', 'Normal document flow'],
							] as const
						).map(([name, value, desc]) => (
							<div
								key={name}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '12px',
									padding: '10px 16px',
									backgroundColor: 'var(--thread-surface)',
									borderRadius: '6px',
									border: '1px solid var(--thread-structure-subtle)',
								}}
							>
								<span
									style={{
										fontSize: '0.75rem',
										fontWeight: 700,
										color: 'var(--thread-text-standard)',
										width: '60px',
									}}
								>
									{name}
								</span>
								<span
									style={{
										fontSize: '0.6875rem',
										fontFamily: 'monospace',
										color: 'var(--thread-text-disabled)',
										width: '32px',
									}}
								>
									{value}
								</span>
								<span
									style={{
										fontSize: '0.75rem',
										color: 'var(--thread-text-secondary)',
									}}
								>
									{desc}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* ── Sizing ── */}
				<div style={{ ...sectionStyle, paddingBottom: '96px' }}>
					<div style={sectionTitleStyle}>Border Sizing</div>
					<div style={sectionCaptionStyle}>Radius and width tokens at three scales.</div>
					<div style={{ display: 'flex', gap: '32px' }}>
						<div>
							<span
								style={{
									fontSize: '0.75rem',
									fontWeight: 600,
									color: 'var(--thread-text-standard)',
									display: 'block',
									marginBottom: '12px',
								}}
							>
								Border Radius
							</span>
							<div style={{ display: 'flex', gap: '16px' }}>
								{(['sm', 'md', 'lg'] as const).map((size) => (
									<div
										key={size}
										style={{
											width: '64px',
											height: '64px',
											backgroundColor: 'var(--thread-surface)',
											border: '2px solid var(--thread-structure-default)',
											borderRadius: `var(--thread-border-radius-${size})`,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: '0.6875rem',
											fontFamily: 'monospace',
											color: 'var(--thread-text-secondary)',
										}}
									>
										{size}
									</div>
								))}
							</div>
						</div>
						<div>
							<span
								style={{
									fontSize: '0.75rem',
									fontWeight: 600,
									color: 'var(--thread-text-standard)',
									display: 'block',
									marginBottom: '12px',
								}}
							>
								Border Width
							</span>
							<div style={{ display: 'flex', gap: '16px' }}>
								{(['sm', 'md', 'lg'] as const).map((size) => (
									<div
										key={size}
										style={{
											width: '64px',
											height: '64px',
											backgroundColor: 'var(--thread-surface)',
											border: `var(--thread-border-size-${size}) solid var(--thread-structure-default)`,
											borderRadius: 'var(--thread-border-radius-md)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: '0.6875rem',
											fontFamily: 'monospace',
											color: 'var(--thread-text-secondary)',
										}}
									>
										{size}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
};
