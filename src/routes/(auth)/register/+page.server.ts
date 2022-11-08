import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { passwords } from '$lib/utils/passwords.server';
import { db } from '$lib/app/prisma.server';
import { validateAction } from '$lib/utils/validateAction';

const loginSchema = z.object({
	email: z.string().email('Needs to be a valid e-mail'),
	password: z.string().min(8)
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const result = await validateAction({ formData, schema: loginSchema });
		if (!result.success) {
			return result.apiResponse;
		}

		const passwordHash = await passwords.hash(result.data.password);

		await db.user.create({
			data: {
				email: result.data.email,
				passwordHash: passwordHash
			}
		});

		return {
			status: 201
		};
	}
};
