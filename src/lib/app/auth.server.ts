import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export const authCookieKey = 'identity';

export interface CookiePayload {
	userId: string;
}

export function userToken({ userId }: CookiePayload) {
	// is is safe to return an unencrypted cookie here?
	// TODO: research
	return jwt.sign({ userId: userId }, JWT_SECRET);
}

export function payloadOfToken(token: string): CookiePayload {
	const payload = jwt.verify(token, JWT_SECRET);
	return JSON.stringify(payload) as unknown as CookiePayload;
}
