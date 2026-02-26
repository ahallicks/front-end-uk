import type { TImage } from '~/types/global-types.ts';

export interface IFeatureBlock {
	__typename: 'FeatureBlock';
	title: string;
	pretitle: string;
	content: {
		html: string;
		raw: any;
	};
	image: TImage;
	features: IFeature[];
};

export interface IFeature {
	__typename: 'Feature';
	title: string;
	headline: string;
	description: string;
	icon: string;
}
