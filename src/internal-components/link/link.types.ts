export type LinkProps = {
	href: string;
	children: React.ReactNode;
	[key: string]: any; // Allow passing other props like className
};
