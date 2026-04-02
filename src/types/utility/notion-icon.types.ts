export type NotionIcon =
	| { type: 'emoji'; emoji: string }
	| { type: 'external'; external: { url: string } }
	| { type: 'icon'; icon: { name: string; color: string } };
