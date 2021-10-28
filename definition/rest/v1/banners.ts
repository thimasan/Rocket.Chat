import { BannerPlatform, IBanner } from '../../IBanner';

export type BannersEndpoints = {
	'/v1/banners.getNew': {
		GET: (params: { platform: BannerPlatform; bid: IBanner['_id'] }) => {
			banners: IBanner[];
		};
	};
	'/v1/banners/:id': {
		GET: (params: { platform: BannerPlatform }) => {
			banners: IBanner[];
		};
	};
	'/v1/banners': {
		GET: (params: { platform: BannerPlatform }) => {
			banners: IBanner[];
		};
	};
	'/v1/banners.dismiss': {
		POST: (params: { bannerId: IBanner['_id'] }) => {};
	};
};
