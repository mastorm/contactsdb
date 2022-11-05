import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { passwords } from '$lib/passwords.server';
import { db } from '$lib/prisma.server';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const formPayload = {
			email: form.get('email'),
			password: form.get('password')
		};

		const schema = z.object({
			email: z.string().email('Needs to be a valid e-mail'),
			password: z.string().min(8)
		});

		const result = await schema.safeParseAsync(formPayload);
		if (!result.success) {
			return result.error.format();
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
