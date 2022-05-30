import { DocumentType } from '@typegoose/typegoose';
import { Request } from 'express';
import { User } from '@src/models/v1/user.model';

export type CreateUserInput = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	fullName: string;
};

// extend request from express
export interface RequestWithUserInfo extends Request {
	_user?: DocumentType<User>;
}
