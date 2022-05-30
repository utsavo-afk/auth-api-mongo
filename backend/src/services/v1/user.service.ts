import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';
import { nanoid } from 'nanoid';
import { UserModel } from '@src/models/v1';
import { User } from '@src/models/v1/user.model';
import { log } from '@src/utils';
import { CreateUserInput } from '@src/typings/v1';

class UserService {
	collection: ReturnModelType<typeof User, BeAnObject>;

	constructor() {
		this.collection = UserModel;
	}

	public async create(data: CreateUserInput) {
		try {
			const result = await this.collection.create(data);
			return result;
		} catch (error) {
			log.error(error, 'UserService.create Error');
			throw error;
		}
	}

	public async findById(id: string) {
		try {
			const result = await this.collection.findById(id);
			return result;
		} catch (error) {
			log.error(error, 'UserService.findById error');
			throw error;
		}
	}

	public async verify(user: DocumentType<User>) {
		try {
			await user.updateOne({ $set: { verified: true } });
		} catch (error) {
			log.error(error, 'UserService.verify error');
			throw error;
		}
	}

	public async findByEmail(email: string) {
		try {
			const result = await this.collection.findOne({ email });
			return result;
		} catch (error) {
			log.error(error, 'UserService.findByEmail error');
			throw error;
		}
	}

	public async generateResetPasswordCode(user: DocumentType<User>) {
		const code = nanoid();
		try {
			const result = await this.collection.findOneAndUpdate(
				{ id: user.id },
				{ resetPasswordCode: code },
				{ returnDocument: 'after' }
			);
			return result;
		} catch (error) {
			log.error(error, 'UserService.generateResetPasswordCode error');
			throw error;
		}
	}

	public async save(user: DocumentType<User>) {
		try {
			await user.save();
		} catch (error) {
			log.error(error, 'UserService.saveUser error');
			throw error;
		}
	}
}

export default new UserService();
