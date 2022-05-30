import * as Yup from 'yup';
const createSessionSchema = Yup.object({
	body: Yup.object({
		email: Yup.string().required('Email required.').email('Email not valid.'),
		password: Yup.string()
			.required('Password required.')
			.min(6, 'Password too short.')
			.max(28, 'Password too long.'),
	}),
});

export default { createSessionSchema };
