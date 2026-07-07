import type { ICardList } from './card-list-types.ts';

import { RichText } from '@graphcms/rich-text-react-renderer';

import { Card } from '~/components/02-molecules/card/card.tsx';

export const CardList: React.FC<ICardList> = ({
	id,
	cardListTitle,
	cardListContent,
	cards,
	contentId,
}) => (
	<section className="segment bg-white px-6 lg:px-0 dark:bg-gray-900">
		<div className="mx-auto flex max-w-2xl flex-col gap-y-16 lg:max-w-7xl lg:items-start lg:gap-y-10 lg:px-8">
			<div className="lg:max-w-lg">
				{cardListTitle ? (
					<h2
						className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-gray-300"
						data-hygraph-entry-id={contentId}
						data-hygraph-field-api-id="cardListTitle"
						data-hygraph-component-chain={`[{"fieldApiId":"sections","instanceId":"${id}"},{"fieldApiId":"CardList","instanceId":"${id}"}]`}
					>
						{cardListTitle}
					</h2>
				) : null}
				{cardListContent?.json ? (
					<div
						className="prose mt-6 text-xl/8 text-gray-700 dark:text-gray-400"
						data-hygraph-entry-id={contentId}
						data-hygraph-field-api-id="cardListContent"
						data-hygraph-component-chain={`[{"fieldApiId":"sections","instanceId":"${id}"},{"fieldApiId":"CardList","instanceId":"${id}"}]`}
					>
						<RichText content={cardListContent.json} />
					</div>
				) : null}
			</div>
			{cards?.length ? (
				<ul className="grid grid-cols-1 gap-8 border-t border-gray-200 pt-10 sm:pt-16 md:grid-cols-2 lg:mx-0 lg:grid-cols-3 dark:border-gray-700">
					{cards.map((card) => (
						<li key={card.id} className="flex w-full gap-6">
							<Card
								{...card}
								cardListId={id}
								contentId={contentId}
							/>
						</li>
					))}
				</ul>
			) : null}
		</div>
	</section>
);
