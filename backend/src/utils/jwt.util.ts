import * as jwt from 'jsonwebtoken';
import { baseConfig } from '@src/config';
import log from './logger.util';

// useed to sign both access and refresh token
function signJwt(
	payload: any,
	keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
	options?: jwt.SignOptions | undefined
) {
	// get sign key
	const signingKey = Buffer.from(baseConfig[keyName], 'base64').toString('ascii');

	// return signed payload
	return jwt.sign(payload, signingKey, {
		...(options && options),
		algorithm: 'RS256',
	});
}

function verifyJwt<T>(
	token: string,
	keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null {
	const publicKey = Buffer.from(baseConfig[keyName], 'base64').toString('ascii');

	try {
		const decoded = jwt.verify(token, publicKey) as T;
		return decoded;
	} catch (error) {
		log.error(error, 'jwtUtil.verifyJwt Error');
		return null;
	}
}

export default { signJwt, verifyJwt };
