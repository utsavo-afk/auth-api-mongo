import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DocumentType } from '@typegoose/typegoose';
import { get } from 'lodash';
import { AuthService, UserService } from '@src/services/v1';
import { User } from '@src/models/v1/user.model';
import { jwtUtil } from '@src/utils';

// handle all auth logic here eg: oauth, google auth, facebook atuh etc
class AuthController {
	public static async login(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;
		try {
			const _user = (await UserService.findByEmail(email)) as DocumentType<User>;

			if (!(await _user?.validatePassword(password))) {
				return res.status(StatusCodes.UNAUTHORIZED).send({
					message: 'Email or password incorrect.',
					success: false,
				});
			}

			// check if user is verified
			if (!_user.verified) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.send({ message: 'Verify email.', success: false });
			}
			// sign access token
			const accessToken = AuthService.signAccessToken(_user);
			// sign refresh token
			const refreshToken = await AuthService.signRefreshTokenAndCreateSessions(_user._id);

			// send tokens
			return res
				.status(StatusCodes.OK)
				.send({ message: 'Login success.', refreshToken, accessToken, success: true });
		} catch (error) {
			next(error);
		}
	}

	public static async whoami(req: Request, res: Response, next: NextFunction) {
		try {
			if (res.locals.user) {
				return res.status(StatusCodes.OK).send({ user: res.locals.user, success: true });
			}
			return res.status(StatusCodes.BAD_REQUEST).send({ message: 'No user.', success: false });
		} catch (error) {
			next(error);
		}
	}

	public static async refreshAccessToken(req: Request, res: Response) {
		const refreshToken = get(req, 'headers.x-refresh');

		const decoded = jwtUtil.verifyJwt<{ session: string }>(refreshToken, 'refreshTokenPublicKey');

		if (!decoded)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send({ message: 'Could not refresh access token.', success: false });

		const session = await AuthService.findBySessionId(decoded.session);

		if (!session || !session.valid)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send({ message: 'Could not refresh access token.', success: false });

		// cast id to string
		const user = await UserService.findById(String(session.user));

		if (!user) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.send({ message: 'Could not refresh access token.', success: false });
		}

		const accessToken = AuthService.signAccessToken(user);

		return res.status(StatusCodes.ACCEPTED).send({ accessToken, success: true });
	}
}

export default AuthController;
