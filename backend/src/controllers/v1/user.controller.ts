import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { emailHelper } from '@src/utils';
import { UserService } from '@src/services/v1';
import { RequestWithUserInfo } from '@src/typings/v1';

class UserController {
	public static async create(req: Request, res: Response, next: NextFunction) {
		const data = req.body;
		try {
			const _user = await UserService.create(data);
			await emailHelper.sendEmail({
				from: 'test@example.com',
				to: _user.email,
				text: `Verification Code: ${_user.verificationCode}\nUser ID: ${_user.id}`,
			});
			return res.status(StatusCodes.CREATED).send({
				message: 'Verification code sent to registered email.',
				success: true,
			});
		} catch (error) {
			return next(error);
		}
	}

	public static async findById(
		req: RequestWithUserInfo,
		res: Response,
		next: NextFunction,
		id: string
	) {
		try {
			const _user = await UserService.findById(id);
			if (_user) {
				req._user = _user;
				return next();
			}
		} catch (error) {
			next(error);
		}
	}

	public static async verify(req: RequestWithUserInfo, res: Response, next: NextFunction) {
		const { verificationCode } = req.params;
		const _user = req._user;
		try {
			if (!_user) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.send({ message: 'User not verified.', success: false });
			}
			if (_user.verified) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.send({ message: 'User is verified.', success: false });
			}
			if (!_user.validateVerificationCode(verificationCode)) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.send({ message: 'Verification code incorrect.', success: false });
			}
			await UserService.verify(_user);
			return res
				.status(StatusCodes.ACCEPTED)
				.send({ message: 'User verified successfully.', success: true });
		} catch (error) {
			next(error);
		}
	}

	public static async sendResetPasswordCode(req: Request, res: Response, next: NextFunction) {
		const { email } = req.body;
		try {
			let _user = await UserService.findByEmail(email);
			if (!_user) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.send({ message: 'Email is incorrect.', success: false });
			}
			if (_user.resetPasswordCode) {
				return res.status(StatusCodes.CONFLICT).send({
					message: 'Check your email for reset password code.',
					success: false,
				});
			}
			_user = await UserService.generateResetPasswordCode(_user);
			await emailHelper.sendEmail({
				from: 'test@example.com',
				to: _user?.email,
				text: `Password reset code: ${_user?.resetPasswordCode}\nUser ID: ${_user?.id}`,
			});
			return res.status(StatusCodes.OK).send({
				message: 'Reset password code sent to registered email.',
				success: true,
			});
		} catch (error) {
			next(error);
		}
	}

	public static async resetPassword(req: RequestWithUserInfo, res: Response, next: NextFunction) {
		const { password } = req.body;
		const { resetPasswordCode } = req.params;
		const _user = req._user;
		try {
			if (!_user?.validateResetPasswordCode(resetPasswordCode)) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.send({ message: 'Reset password code incorrect.', success: false });
			}
			_user.password = password;
			_user.resetPasswordCode = null;
			await UserService.save(_user);
			return res.status(StatusCodes.OK).send({ message: 'Password is reset.', success: true });
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;
