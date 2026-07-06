import { CardFragment } from '~/components/02-molecules/card/card-fragment.ts';

export const CardListFragment = `
... on CardList {
	__typename
	id
	cardListTitle
	cardListContent {
		json
		references {
		__typename
			... on Asset {
				width
				height
				url
			}
		}
	}
	cards {
		${CardFragment}
	}
}
`;
