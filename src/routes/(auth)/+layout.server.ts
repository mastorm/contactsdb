import { authCookieKey } from '$lib/app';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	// FIXME: it would be nicer to await parent() and check if the user is authenticated
	// sadly, layout groups dont get to use the root layout data apparently (yet) :(
	const token = cookies.get(authCookieKey);

	if (token) {
		throw redirect(307, '/');
	}

	return {};
};
