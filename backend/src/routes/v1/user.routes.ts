import { Router } from 'express';
import { UserCtrl } from '@src/controllers/v1';
import { validateReqSchema } from '@src/middleware';
import { UserValidator } from '@src/validators/v1';

const router = Router();

router.route('/users').post(validateReqSchema(UserValidator.createUserSchema), UserCtrl.create);
router
	.route('/users/:id/verify/:verificationCode')
	.post(validateReqSchema(UserValidator.verifyUserSchema), UserCtrl.verify);
router
	.route('/users/forgotPassword')
	.post(validateReqSchema(UserValidator.forgotPasswordSchema), UserCtrl.sendResetPasswordCode);
router
	.route('/users/:id/resetPassword/:resetPasswordCode')
	.post(validateReqSchema(UserValidator.resetPasswordSchema), UserCtrl.resetPassword);
router.param('id', UserCtrl.findById);

export default router;
