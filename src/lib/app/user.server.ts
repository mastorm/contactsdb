import { db } from './prisma.server';

export async function isEmailAlreadyInUse(email: string) {
	const emailAlreadyInUse = await db.user.findFirst({
		where: {
			email: {
				equals: email
			}
		},
		select: {
			id: true
		}
	});
	return emailAlreadyInUse?.id;
}
