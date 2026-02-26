import type { RichTextProps } from '@graphcms/rich-text-react-renderer';
import type { TButtonLink } from '~/components/atoms/button/button.tsx';

export interface IHero {
	__typename: 'Hero';
	keyline?: {
		html: string;
		raw: any;
	};
	title: string;
	content?: {
		html: string;
		raw: RichTextProps['content'];
	};
	links: TButtonLink[];
};
