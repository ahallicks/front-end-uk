import type { IStatistics } from '~/components/molecules/statistics/statistics-types.ts';
import type { RichTextProps } from '@graphcms/rich-text-react-renderer';
import type { TNavLink } from '~/types/global-types.ts';

export interface IBanner {
	__typename: 'Banner';
	title: string;
	content: {
		html: string;
		raw: RichTextProps['content'];
	};
	links: TNavLink[];
	bannerStats: IStatistics;
}
