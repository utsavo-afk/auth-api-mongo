import { getModelForClass, ModelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { User } from './user.model';

@ModelOptions({
	schemaOptions: {
		timestamps: true,
	},
	options: {
		allowMixed: Severity.ALLOW,
	},
})
class Session {
	@prop({ ref: () => User })
	user: Ref<User>;

	@prop({ default: true })
	valid!: boolean;
}

const SessionModel = getModelForClass(Session);

export default SessionModel;
