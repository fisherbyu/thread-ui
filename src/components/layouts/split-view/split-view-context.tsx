'use client';
import { createContext, useContext } from 'react';
import { createComponentContext } from '@/utils';
import { SplitViewColumn, SplitViewState } from './split-view.types';

export const [SplitViewProvider, useSplitView] =
	createComponentContext<SplitViewState>('SplitView');

const SplitViewColumnContext = createContext<SplitViewColumn | undefined>(undefined);
SplitViewColumnContext.displayName = 'SplitViewColumn';

/** The column a descendant renders in, so items and headers can style themselves for it. */
export const SplitViewColumnProvider = SplitViewColumnContext.Provider;

/** Column the caller renders in, or `undefined` outside a column. */
export const useSplitViewColumn = () => useContext(SplitViewColumnContext);
