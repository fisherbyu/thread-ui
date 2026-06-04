'use client';
import { createStatefulComponentContext } from '@/utils';
import { TabViewState } from './tab-view.types';

export const [TabViewProvider, useTabViewContext] =
	createStatefulComponentContext<TabViewState>('Tab View');
