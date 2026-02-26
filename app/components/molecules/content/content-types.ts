import type { TImage } from "~/types/global-types.ts";
import type { IFeature } from "../feature/feature-types.ts";
import type { RichTextProps } from "@graphcms/rich-text-react-renderer";

export interface IContent {
	__typename: 'Content';
	title?: string;
	pretitle?: string;
	introduction?: string;
	contentImage?: TImage;
	article?: {
		__typename: 'Article' | 'FeatureBlock';
		content?: {
			raw?: RichTextProps['content'];
		};
		features?: IFeature[];
	}[];
}
