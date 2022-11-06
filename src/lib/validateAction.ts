import type { ZodSchema } from 'zod';

interface ValidateProps<T> {
	formData: FormData;
	schema: ZodSchema<T>;
}

export async function validateAction<T>({ formData, schema }: ValidateProps<T>) {
	const payload = Object.fromEntries(formData);

	const parsed = await schema.safeParseAsync(payload);

	if (parsed.success) {
		return parsed;
	} else {
		return {
			success: parsed.success,
			apiResponse: {
				status: 400,
				errors: parsed.error.format(),
				model: payload
			}
		};
	}
}
