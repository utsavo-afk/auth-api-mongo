import { config } from 'dotenv-safe';

config();

export const baseConfig = {
	PORT: process.env.PORT || 3001,
	HOSTNAME: process.env.HOSTNAME || '127.0.0.1',
	DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || 'DB_CONNECTION_STRING',
	LOG_LEVEL: process.env.LOG_LEVEL || 'info',
	refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY || '',
	refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY || '',
	accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY || '',
	accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY || '',
	SMTP: {
		user: 'ch4eay5m6po2ytuh@ethereal.email',
		pass: 'a5yTqjv951jzxr2Mg8',
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
	},
};
