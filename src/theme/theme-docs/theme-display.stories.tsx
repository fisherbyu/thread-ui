import React, { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DefaultThreadTheme } from '../default-theme';
import { SurfaceLayerMap } from '../theme-surface-system';
import { Code, H1, H2, List, Text, Title } from '../../components/typography';
import { Container } from '../../components/layouts/container';
import { ThreadTheme } from '../../theme/thread-theme';
import { Swatch } from './misc-elements';
import { TabView } from '../../components';

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

const contentWrapperStyles: React.CSSProperties = {
	maxWidth: '640px',
};

const codeTextStyles: React.CSSProperties = {
	fontFamily: ThreadTheme.typography.fontFamilies.mono,
	fontSize: ThreadTheme.typography.fontSizes.body.xs,
	color: ThreadTheme.text.secondary,
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

const doubleGridStyles: React.CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
	gap: '16px',
};

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
		{/* <span
			style={{
				fontSize: '0.6875rem',
				fontFamily: 'monospace',
				color: 'var(--thread-text-secondary)',
				lineHeight: 1.4,
			}}
		>
			{value}
		</span> */}
	</div>
);

// ── Blocks ───────────────────────────────────────────────────

// ── Story ────────────────────────────────────────────────────

export const Theme: Story = {
	render: () => {
		const layerDescriptions: Record<string, string> = {
			canvas: 'Page background. The foundation everything sits on.',
			inset: 'Recessed containers: inputs, wells. Visually below the canvas.',
			surface: 'Cards, panels, content regions. Pops against canvas.',
			elevated: 'Sticky nav, toolbars. Differentiated by shadow.',
			overlay: 'Modals, dropdowns, popovers. Highest elevation.',
		};

		return (
			<div style={{ backgroundColor: 'var(--thread-canvas)', minHeight: '100vh' }}>
				{/* ── Intro ── */}
				<Container>
					<div style={contentWrapperStyles}>
						<Title>Thread UI Design System</Title>
						<Text>
							The Thread-UI theme system defines the design language across the
							library, including layering, spacing and coloring. Each component sits
							on a named layer that determines its background, shadow, border, and
							stacking order. The theme palette includes primary, secondary, and
							tertiary brand colors, as well as definitions for interactions, text,
							and neutrals.
							<br /> <br />
							Each element of this theme can be configured and customized by consumers
							of the library.
						</Text>
					</div>
				</Container>

				{/* ── Surface Layers ── */}
				<Container>
					<div style={contentWrapperStyles}>
						<H1>Surface Layers</H1>
						<Text>
							Five elevation layers from page background to overlay. Each layer
							carries its own background color, shadow depth, border weight, and
							z-index.
						</Text>
					</div>

					{/* Nested layer demo */}
					<div
						style={{
							backgroundColor: 'var(--thread-canvas)',
							borderRadius: '12px',
							padding: '24px',
							border: '1px dashed var(--thread-structure-default)',
							marginBottom: '32px',
							display: 'flex',
							flexDirection: 'column',
							gap: '16px',
						}}
					>
						<p style={codeTextStyles}>canvas - global background</p>
						<div
							style={{
								backgroundColor: 'var(--thread-inset)',
								borderRadius: '8px',
								padding: '16px',
								border: '1px solid var(--thread-structure-default)',
							}}
						>
							<p style={codeTextStyles}>inset — recessed below canvas</p>
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
							<p style={{ ...codeTextStyles, marginBottom: '12px' }}>
								surface — cards sit here
							</p>
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
								<p style={codeTextStyles}>elevated — sticky nav, toolbars</p>
							</div>
							<div
								style={{
									backgroundColor: 'var(--thread-overlay)',
									borderRadius: '6px',
									padding: '14px',
									boxShadow: 'var(--thread-shadow-lg)',
								}}
							>
								<p style={codeTextStyles}>overlay — modals, dropdowns</p>
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
				</Container>
				<div style={{ height: '36px' }} />
				{/* ── Layer Construction ── */}
				<div style={{ height: '400px' }}>
					<Container>
						<TabView
							title={<H2>Layer Construction & Interactivity</H2>}
							cardStyles="none"
							items={[
								{
									title: 'Structure Colors',
									content: (
										<>
											<div style={contentWrapperStyles}>
												<Text>
													Three tiers of border and divider colors. Subtle
													for card edges, default for inputs and dividers,
													strong for emphasis and active states. Input
													focus uses the primary color, not a structure
													tier.
												</Text>
											</div>
											<div
												style={{
													display: 'flex',
													gap: '16px',
													marginBottom: '24px',
												}}
											>
												{(['subtle', 'default', 'strong'] as const).map(
													(tier) => (
														<div
															key={tier}
															style={{
																flex: 1,
																backgroundColor:
																	'var(--thread-surface)',
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
															{/* <span
																style={{
																	fontSize: '0.6875rem',
																	fontFamily: 'monospace',
																	color: 'var(--thread-text-secondary)',
																}}
															>
																--thread-structure-{tier}
															</span> */}
														</div>
													)
												)}
											</div>
										</>
									),
								},
								{
									title: 'Shadow Scale',
									content: (
										<>
											<div style={contentWrapperStyles}>
												<Text>
													Compound shadows with a tight edge layer and a
													diffused ambient layer. Shadows define elevation
													in light mode, while in dark mode, surface
													colors create elevation.
												</Text>
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
														size={size as string}
														value={DefaultThreadTheme.shadow[size]}
													/>
												))}
											</div>
										</>
									),
								},
								{
									title: 'Interactive States',
									content: (
										<>
											<div style={contentWrapperStyles}>
												<Text>
													Hover and active states applied on top of any
													surface. These are interaction cues, not layers.
												</Text>
											</div>
											<div style={{ display: 'flex', gap: '16px' }}>
												<Swatch
													label="Hover"
													cssVar="--thread-hover"
													border
												/>
												<Swatch
													label="Active"
													cssVar="--thread-active"
													border
												/>
											</div>
										</>
									),
								},
								{
									title: 'Z-Index Scale',
									content: (
										<>
											<div style={contentWrapperStyles}>
												<Text>
													Stacking order for components. Gaps of 100 allow
													slotting elements between layers without
													renumbering.
												</Text>
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
															backgroundColor:
																'var(--thread-surface)',
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
										</>
									),
								},
							]}
						/>
					</Container>
				</div>
				<div style={{ height: '24px' }} />
				{/* ── Brand Palette ── */}
				<div style={{ height: '450px' }}>
					<Container>
						<TabView
							title={<H1>Theme Color Scheme</H1>}
							cardStyles="none"
							items={[
								{
									title: 'Brand Palette',
									content: (
										<>
											<div style={contentWrapperStyles}>
												<Text>
													Brand Identity is defined with primary,
													secondary, and tertiary brand colors. Each color
													has light, main and dark variants
												</Text>
											</div>
											<div style={gridStyle}>
												<ShadeGroup
													name="primary"
													shades={DefaultThreadTheme.primary}
												/>
												<ShadeGroup
													name="secondary"
													shades={DefaultThreadTheme.secondary}
												/>
												<ShadeGroup
													name="tertiary"
													shades={DefaultThreadTheme.tertiary}
												/>
											</div>
										</>
									),
								},
								{
									title: 'Status Colors',
									content: (
										<>
											<div style={contentWrapperStyles}>
												<Text>
													Semantic colors for feedback and alerts. These
													intentionally step outside the neutral palette
													to draw attention.
												</Text>
											</div>
											<div style={doubleGridStyles}>
												<ShadeGroup
													name="success"
													shades={DefaultThreadTheme.success}
												/>
												<ShadeGroup
													name="info"
													shades={DefaultThreadTheme.info}
												/>
												<ShadeGroup
													name="warning"
													shades={DefaultThreadTheme.warning}
												/>
												<ShadeGroup
													name="error"
													shades={DefaultThreadTheme.error}
												/>
											</div>
										</>
									),
								},
								{
									title: 'Neutrals',
									content: (
										<>
											<div style={contentWrapperStyles}>
												<Text>
													Base neutral palette. White, black, and a
													three-step gray scale.
												</Text>
											</div>
											<div
												style={{
													display: 'flex',
													gap: '16px',
													marginBottom: '16px',
												}}
											>
												<Swatch
													label="White"
													cssVar="--thread-white"
													border
												/>
												<Swatch label="Black" cssVar="--thread-black" />
											</div>
											<div style={gridStyle}>
												<ShadeGroup
													name="gray"
													shades={DefaultThreadTheme.gray}
												/>
											</div>
										</>
									),
								},
								{
									title: 'Text Colors',
									content: (
										<>
											<div style={contentWrapperStyles}>
												<Text>
													Semantic text roles. Standard for body copy,
													secondary for supporting text, disabled for
													inactive elements, accent for brand-colored
													text, inverted for text on non-standard
													backgrounds.
												</Text>
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
														[
															'standard',
															'The primary text color for body content.',
														],
														[
															'secondary',
															'Supporting text, captions, and labels.',
														],
														[
															'tertiary',
															'Lower-emphasis text below secondary.',
														],
														[
															'disabled',
															'Inactive or unavailable content.',
														],
														[
															'accent',
															'Brand-colored text for emphasis.',
														],
													] as const
												).map(([role, sample]) => (
													<div
														key={role}
														style={{
															display: 'flex',
															alignItems: 'baseline',
															gap: '16px',
														}}
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
												<div
													style={{
														display: 'flex',
														alignItems: 'baseline',
														gap: '16px',
													}}
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
														inverted
													</span>
													<span
														style={{
															fontSize: '1rem',
															color: 'var(--thread-text-inverted)',
															backgroundColor:
																'var(--thread-text-standard)',
															padding: '4px 12px',
															borderRadius: '4px',
														}}
													>
														Text on non-standard backgrounds.
													</span>
												</div>
											</div>
										</>
									),
								},
							]}
						/>
					</Container>
				</div>
				<div style={{ height: '24px' }} />
				{/* ── Sizing ── */}
				<Container>
					<div style={contentWrapperStyles}>
						<H2>Border</H2>
						<Text>Radius and width tokens at three scales.</Text>
					</div>
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
				</Container>
				<div style={{ height: '36px' }} />
			</div>
		);
	},
};
