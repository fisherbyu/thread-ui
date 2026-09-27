import { IconButtonProps } from '@/components';

export type OptionalIconButtonProps = Omit<IconButtonProps, 'name'> & {
	name?: IconButtonProps['name'];
};
