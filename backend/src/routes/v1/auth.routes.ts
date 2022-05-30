import { Router } from 'express';
import { AuthCtrl } from '@src/controllers/v1';
import { isAuthenticated, validateReqSchema } from '@src/middleware';
import { AuthValidator } from '@src/validators/v1';

const router = Router();

router
	.route('/auth')
	.post(validateReqSchema(AuthValidator.createSessionSchema), AuthCtrl.login)
	.get(isAuthenticated, AuthCtrl.whoami);

export default router;
