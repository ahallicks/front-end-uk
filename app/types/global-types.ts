export type TImage = {
	url: string;
	width: number;
	height: number;
};

export type TNavLink = {
	linkText: string;
	linkUrl: string;
	variation?: 'primary' | 'secondary' | 'tertiary';
};
