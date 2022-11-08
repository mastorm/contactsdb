import type { ZodSchema } from 'zod';

function unpackFormData(formData: FormData): Record<string, any> {
	const formValues: Record<string, any> = {};

	for (const [key, value] of formData.entries()) {
		const knownKeys = Object.keys(formValues);

		if (knownKeys.includes(key)) {
			if (Array.isArray(formValues[key])) {
				formValues[key] = [...formValues[key], value];
			} else {
				formValues[key] = [formValues[key], value];
			}
		} else {
			formValues[key] = value;
		}
	}

	return formValues;
}

interface ValidateProps<T> {
	formData: FormData;
	schema: ZodSchema<T>;
}

export async function validateAction<T>({ formData, schema }: ValidateProps<T>) {
	const payload = unpackFormData(formData);

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
