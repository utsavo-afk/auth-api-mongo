import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { log } from '@src/utils';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	log.error(error, 'Error handler');

	if (error.name === 'MongoServerError') {
		return res.status(StatusCodes.BAD_REQUEST).send({ message: error.message, success: false });
	}
	if (error.name === 'ValidationError') {
		return res.status(StatusCodes.BAD_REQUEST).send({ message: error.message, success: false });
	}
	if (error.name === 'CastError') {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ message: 'Resource not found', success: false });
	}
	return next(error);
};

export default errorHandler;
