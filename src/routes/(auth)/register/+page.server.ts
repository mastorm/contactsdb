import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { passwords } from '$lib/utils/passwords.server';
import { db } from '$lib/app/prisma.server';
import { validateAction } from '$lib/utils/validateAction';
import { authCookieKey, isEmailAlreadyInUse, userToken } from '$lib/app';

const loginSchema = z.object({
	email: z.string().email('Needs to be a valid e-mail'),
	password: z.string().min(8)
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const result = await validateAction({ formData, schema: loginSchema });
		if (!result.success) {
			return result.apiResponse;
		}

		const email = result.data.email;

		if (await isEmailAlreadyInUse(email)) {
			return {
				status: 400,
				apiResponse: {
					message: 'This e-mail is already in use! Please try to reset your password'
				}
			};
		}
		const passwordHash = await passwords.hash(result.data.password);

		const createdUser = await db.user.create({
			data: {
				email,
				passwordHash: passwordHash
			}
		});

		const token = userToken({ userId: createdUser.id });

		cookies.set(authCookieKey, token);

		return {
			status: 201
		};
	}
};
