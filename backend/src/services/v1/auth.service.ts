import { DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import { privateFields, User } from '@src/models/v1/user.model';
import { jwtUtil } from '@src/utils';
import SessionModel from '@src/models/v1/session.model';

class AuthService {
	// create session
	private static async createSession({ userId }: { userId: string }) {
		return SessionModel.create({ user: userId });
	}
	// sign refresh key and create session
	public static async signRefreshTokenAndCreateSessions(userId: string) {
		const session = await AuthService.createSession({ userId });
		const refreshToken = jwtUtil.signJwt({ session: session._id }, 'refreshTokenPrivateKey', {
			expiresIn: '3m',
		});
		return refreshToken;
	}
	// sign access token
	public static signAccessToken(user: DocumentType<User>) {
		const payload = omit(user.toJSON(), privateFields);
		const accessToken = jwtUtil.signJwt(payload, 'accessTokenPrivateKey', {
			expiresIn: '15m',
		});
		return accessToken;
	}

	public static async findBySessionId(sessionId: string) {
		return SessionModel.findById(sessionId);
	}
}
export default AuthService;
