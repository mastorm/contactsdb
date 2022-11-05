import bcrypt from 'bcrypt';

const saltRounds = 11;

export const passwords = {
	hash: (secret: string): Promise<string> => {
		return bcrypt.hash(secret, saltRounds);
	},
	compare: (plain: string, hash: string): Promise<boolean> => {
		return bcrypt.compare(plain, hash);
	}
};
