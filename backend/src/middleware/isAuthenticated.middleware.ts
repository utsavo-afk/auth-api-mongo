import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user;
	if (!user) {
		return res
			.status(StatusCodes.FORBIDDEN)
			.send({ message: 'Signin to your account.', success: false });
	}
	return next();
};

export default isAuthenticated;
