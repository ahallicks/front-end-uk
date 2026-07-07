import type { TButtonLink } from '~/components/01-atoms/button/button.tsx';
import type { TImage } from '~/types/global-types.ts';

export interface IHeader {
	siteName: string;
	logo: TImage;
	navigationLinks: TButtonLink[];
}
