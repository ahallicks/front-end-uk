import type { RichTextProps } from '@graphcms/rich-text-react-renderer';
import type { TButtonLink } from '~/components/01-atoms/button/button.tsx';
import type { IStatistics } from '~/components/02-molecules/statistics/statistics-types.ts';

export interface IBanner {
	__typename: 'Banner';
	id: string;
	contentId: string;
	title: string;
	content: {
		raw: RichTextProps['content'];
	};
	bannerImage?: {
		width: number;
		height: number;
		url: string;
	};
	flipped: boolean | null;
	links: TButtonLink[];
	bannerStats: IStatistics;
}
