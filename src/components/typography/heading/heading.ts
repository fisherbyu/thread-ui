import { HeadingProps } from './heading.types';
import { renderHeading } from './render-heading';

/**
 * Display-level heading. Renders as `h1`
 *
 * @example
 * <Title align="center">Welcome</Title>
 * <Title subtitle="Last updated March 2025">Welcome</Title>
 */
export const Title = (props: HeadingProps) => renderHeading('title', 'h1', props);

/**
 * Primary heading
 *
 * @example
 * <H1>Page Title</H1>
 */
export const H1 = (props: HeadingProps) => renderHeading('h1', 'h1', props);

/**
 * Secondary heading
 *
 * @example
 * <H2>Section Title</H2>
 */
export const H2 = (props: HeadingProps) => renderHeading('h2', 'h2', props);

/**
 * Tertiary heading
 *
 * @example
 * <H3>Subsection Title</H3>
 */
export const H3 = (props: HeadingProps) => renderHeading('h3', 'h3', props);
