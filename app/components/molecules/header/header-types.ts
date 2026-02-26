import type { TImage } from '~/types/global-types.ts';

export interface IHeader {
	siteName: string;
	logo: TImage;
	navigationLinks: {
		name: string;
		href: string;
	}[];
};
