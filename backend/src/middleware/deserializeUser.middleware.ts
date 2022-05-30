import { NextFunction, Request, Response } from 'express';
import { jwtUtil } from '@src/utils';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
	const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '');
	if (!accessToken) return next();

	// decode token
	const decoded = jwtUtil.verifyJwt(accessToken, 'accessTokenPublicKey');

	// attach user to res.locals
	if (decoded) {
		res.locals.user = decoded;
	}

	return next();
};

export default deserializeUser;
