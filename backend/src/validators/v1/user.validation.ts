import * as Yup from 'yup';

const createUserSchema = Yup.object({
	body: Yup.object({
		username: Yup.string()
			.required('Username is required.')
			.min(6, 'Username too short.')
			.max(28, 'Username too long.'),
		email: Yup.string().required('Email is required.').email('Email not valid.'),
		password: Yup.string()
			.required('Password is required.')
			.min(6, 'Password too short.')
			.max(28, 'Password too long.'),
		confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match."),
	}).required('Request body empty.'),
});

const verifyUserSchema = Yup.object({
	params: Yup.object({
		id: Yup.string().required('Id param is required.'),
		verificationCode: Yup.string().required('Verification code param is required.'),
	}).required('Request params missing.'),
});

const forgotPasswordSchema = Yup.object({
	body: Yup.object({
		email: Yup.string().required('Email is required.').email('Email not valid.'),
	}).required('Request body empty.'),
});

const resetPasswordSchema = Yup.object({
	body: Yup.object({
		password: Yup.string()
			.required('Password is required.')
			.min(6, 'Password too short.')
			.max(28, 'Password too long.'),
		confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match."),
	}).required('Request body empty.'),
	params: Yup.object({
		resetPasswordCode: Yup.string().required('Reset password code param is missing.'),
	}).required('Request params missing.'),
});

export default {
	createUserSchema,
	verifyUserSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
};
