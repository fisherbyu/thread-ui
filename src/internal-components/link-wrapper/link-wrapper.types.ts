import { ComponentPropsWithRef } from 'react';

export type LinkWrapperProps = Omit<ComponentPropsWithRef<'a'>, 'href'> & {
	link: string | React.ReactNode;
	children: React.ReactNode;
};
