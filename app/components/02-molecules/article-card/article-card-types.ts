import type { IAuthorCard } from '~/components/02-molecules/author-card/author-card-types.tsx';
import type { TAuthor, TCategory } from '~/types/global-types.ts';

export interface IArticleCard {
	id: string;
	slug: string;
	pageName: string;
	introduction?: string;
	published?: string;
	created: string;
	updated?: string;
	createdBy: TAuthor;
	parentPage?: {
		id: string;
		slug: string;
	};
	sections?: IAuthorCard[];
	categories?: TCategory[];
}
