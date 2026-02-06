import { Theme } from '@/types';
import { wrapVariables } from './theme-helper-utils';
import { ThemeBaseCssNames, THREAD_CSS_VARIABLE_PREFIX } from './theme-css-names';

/**
 * Access object to connect to active CSS Theme variables
 */
export const ThreadTheme: Theme = wrapVariables(ThemeBaseCssNames, THREAD_CSS_VARIABLE_PREFIX);
