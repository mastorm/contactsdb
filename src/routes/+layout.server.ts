import { authCookieKey, payloadOfToken } from '$lib/app';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const userToken = cookies.get(authCookieKey);

	return {
		userIdentity: userToken ? payloadOfToken(userToken) : undefined
	};
};
