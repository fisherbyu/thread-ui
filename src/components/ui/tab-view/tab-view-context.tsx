'use client';
import { createComponentContext } from '@/utils';
import { TabViewProps, TabViewState } from './tab-view.types';

export const [TabViewProvider, useTabViewContext] =
	createComponentContext<TabViewState>('Tab View');
