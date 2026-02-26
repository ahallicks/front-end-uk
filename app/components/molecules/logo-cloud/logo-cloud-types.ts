import type { TImage } from "~/types/global-types.ts";

export interface ILogoCloud {
	__typename: 'LogoCloud';
	logoTitle: string;
	logos: TImage[];
}
