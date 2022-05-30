import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';
import { log } from '@src/utils';

const validateReqSchema =
	(schema: Yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			return next();
		} catch (error) {
			log.error(error, 'Schema validation error!');
			return next(error);
		}
	};

export default validateReqSchema;
