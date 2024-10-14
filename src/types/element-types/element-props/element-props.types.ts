import { ElementBackgroundProps } from './element-background-props.types';
import { ElementBorderProps } from './element-border-props.types';
import { ElementDisplayProps } from './element-display-props.types';
import { ElementFlexboxItemProps } from './element-flexbox-item-props.types';
import { ElementPositioningProps } from './element-positioning-props.types';
import { ElementSizeProps } from './element-size-props.types';
import { ElementSpacingProps } from './element-spacing-props.types';

export type BaseElementProps = ElementDisplayProps &
	ElementFlexboxItemProps &
	ElementPositioningProps &
	ElementSizeProps &
	ElementSpacingProps;

export type StyledElementProps = ElementBackgroundProps & ElementBorderProps;
