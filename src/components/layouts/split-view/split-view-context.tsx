'use client';
import { createComponentContext } from '@/utils';
import { SplitViewColumn, SplitViewState } from './split-view.types';

export const [SplitViewProvider, useSplitView] =
	createComponentContext<SplitViewState>('SplitView');

/** The column a descendant renders in, so items and headers can style themselves for it. */
export const [SplitViewColumnProvider, useSplitViewColumn] =
	createComponentContext<SplitViewColumn>('SplitViewColumn');
