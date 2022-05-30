import mongoose from 'mongoose';
import { baseConfig } from '@src/config';
import log from '../logger.util';

async function connectToDb() {
	const dbUri = baseConfig.DB_CONNECTION_STRING;
	try {
		await mongoose.connect(dbUri);
		log.info('Connected to Db...');
	} catch (error) {
		log.error(error, '\nError connecting to Db!');
		process.exit(1);
	}
}

async function disconnectFromDb() {
	try {
		await mongoose.disconnect();
		log.info('Disconnected from Db...');
	} catch (error) {
		log.error(error, '\nError disconnecting from Db!');
		process.exit(1);
	}
}

export default { connectToDb, disconnectFromDb };
