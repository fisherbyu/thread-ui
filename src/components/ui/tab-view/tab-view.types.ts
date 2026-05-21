import { ReactNode } from 'react';
import { IconNames } from '../icon';

export type TabItem = {
	name: string;
	icon?: IconNames;
	title: string;
	content: ReactNode;
};

export type TabViewProps = {
	items: TabItem[];
	defaultValue: string;
};
