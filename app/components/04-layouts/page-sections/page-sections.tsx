import type { IHomepage } from '~/services/get-homepage.ts';
import type { IPage } from '~/services/get-page.ts';

import { Fragment } from 'react/jsx-runtime';

import {
	Divider,
	DividerWithText,
} from '~/components/01-atoms/divider/divider.tsx';
import { AuthorCard } from '~/components/02-molecules/author-card/author-card.tsx';
import {
	Banner,
	BannerSmall,
} from '~/components/02-molecules/banner/banner.tsx';
import { Comments } from '~/components/02-molecules/comments/comments.tsx';
import { Content } from '~/components/02-molecules/content/content.tsx';
import { Features } from '~/components/02-molecules/feature/feature.tsx';
import { Hero } from '~/components/02-molecules/hero/hero.tsx';
import { LogoCloud } from '~/components/02-molecules/logo-cloud/logo-cloud.tsx';
import { Statistics } from '~/components/02-molecules/statistics/statistics.tsx';
import { ArticleCards } from '~/components/03-organisms/article-cards/article-cards.tsx';
import { CardList } from '~/components/03-organisms/card-list/card-list.tsx';
import { RelatedArticles } from '~/components/03-organisms/related-articles/related-articles.tsx';

export const PageSections: React.FC<{
	page: IPage | IHomepage;
	formKey?: string;
}> = ({ page, formKey }) => (
	<>
		{page.sections.map((section, index) => (
			<Fragment key={`${section.__typename}-${index}`}>
				{/* Render hero section */}
				{section.__typename === 'Hero' ? (
					<Hero {...section} contentId={page.id} />
				) : null}
				{/* Render feature section */}
				{section.__typename === 'FeatureBlock' ? (
					<Features {...section} contentId={page.id} />
				) : null}
				{/* Render statistics section */}
				{section.__typename === 'Statistics' ? (
					<Statistics {...section} contentId={page.id} />
				) : null}
				{/* Render banner section */}
				{section.__typename === 'Banner' ? (
					section.bannerImage ? (
						<BannerSmall {...section} contentId={page.id} />
					) : (
						<Banner {...section} contentId={page.id} />
					)
				) : null}
				{section.__typename === 'LogoCloud' ? (
					<LogoCloud {...section} contentId={page.id} />
				) : null}
				{section.__typename === 'Content' ? (
					<Content
						{...section}
						page={page}
						contentId={page.id}
						categories={(page as IPage).categories}
					/>
				) : null}
				{section.__typename === 'ArticleCards' ? (
					<ArticleCards {...section} contentId={page.id} />
				) : null}
				{section.__typename === 'AuthorCard' && section.author ? (
					<>
						<Divider noSpacing={true} />
						<AuthorCard {...section} contentId={page.id} />
					</>
				) : null}
				{section.__typename === 'CardList' ? (
					<CardList {...section} contentId={page.id} />
				) : null}
				{section.__typename === 'Divider' ? (
					section.text ? (
						<DividerWithText {...section} contentId={page.id} />
					) : (
						<Divider />
					)
				) : null}
				{section.__typename === 'RelatedArticles' ? (
					<>
						<Divider noSpacing={true} />
						<RelatedArticles {...section} contentId={page.id} />
					</>
				) : null}
			</Fragment>
		))}
		{page.comments && page.enableComments && formKey ? (
			<Comments
				comments={page.comments}
				pageId={page.id}
				formKey={formKey}
			/>
		) : null}
	</>
);
