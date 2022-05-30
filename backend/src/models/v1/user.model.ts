import {
	DocumentType,
	getModelForClass,
	ModelOptions,
	pre,
	prop,
	Severity,
} from '@typegoose/typegoose';
import { hash, verify } from 'argon2';
import { nanoid } from 'nanoid';
import { log } from '@src/utils';

export const privateFields = [
	'__v',
	'password',
	'verificationCode',
	'passwordResetCode',
	'verified',
];

@pre<User>('save', async function () {
	if (!this.isModified('password')) {
		return;
	}
	const _hash = await hash(this.password);
	this.password = _hash;
	return;
})
@ModelOptions({
	schemaOptions: {
		timestamps: true,
	},
	options: {
		allowMixed: Severity.ALLOW,
	},
})
export class User {
	@prop({ lowercase: true, required: true, unique: true })
	email!: string;

	@prop({ required: true, minlength: 6, maxlength: 28 })
	username!: string;

	@prop({ required: true, minlength: 3, maxlength: 28 })
	fullName!: string;

	@prop({ required: true, minlength: 6, maxlength: 28 })
	password!: string;

	@prop({ required: true, default: () => nanoid() })
	verificationCode!: string | null;

	@prop()
	resetPasswordCode!: string | null;

	@prop({ default: false })
	verified: boolean | undefined;

	async validatePassword(this: DocumentType<User>, candidatePassword: string) {
		try {
			const result = await verify(this.password, candidatePassword);
			return result;
		} catch (error) {
			log.error(error, 'Error validatePassword user!');
			return false;
		}
	}

	validateVerificationCode(this: DocumentType<User>, candidateVerificationCode: string) {
		try {
			if (candidateVerificationCode === this.verificationCode) return true;
		} catch (error) {
			log.error(error, 'Errror validateVerificationCode user!');
			return false;
		}
	}

	validateResetPasswordCode(this: DocumentType<User>, candidateResetPasswordCode: string) {
		try {
			if (candidateResetPasswordCode === this.resetPasswordCode) return true;
		} catch (error) {
			log.error(error, 'Errror validateVerificationCode user!');
			return false;
		}
	}
}

const UserModel = getModelForClass(User);

export default UserModel;
