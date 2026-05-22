'use client';
import { createComponentContext } from '@/utils';
import { TabViewProps } from './tab-view.types';

export const [TabViewProvider, useTabViewContext] =
	createComponentContext<TabViewProps>('Tab View');
