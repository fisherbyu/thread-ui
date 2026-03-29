'use client';
import { Icon } from '@/components';
import { DynamicIconProps } from './dynamic-icon.types';

const emoji = (code: string) => {
	return String.fromCodePoint(parseInt(code.replace('U+', ''), 16));
};

export const DynamicIcon = ({ icon, size = 24 }: DynamicIconProps) => {
	if (!icon) return;

	if (typeof icon === 'string') {
		return <Icon name={icon} size={size} />;
	} else {
		if (icon.type === 'emoji') {
			return (
				<span role="image" style={{ height: size, width: size }}>
					{emoji(icon.emoji)}
				</span>
			);
		}
		if (icon.type === 'external') {
			return (
				<img
					height={size}
					width={size}
					src={icon.external.url}
					onError={(e) => {
						e.currentTarget.style.display = 'none';
					}}
				/>
			);
		}
		if (icon.type === 'icon') return;
	}
};
