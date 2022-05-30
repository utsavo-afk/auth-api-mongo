import { createServer } from 'http';
import { app } from './app';
import { baseConfig } from './config';
import { dbHelper, log } from './utils';

function main() {
	try {
		const httpServer = createServer(app);
		httpServer.listen(baseConfig.PORT, () => {
			dbHelper.connectToDb();
			log.info(`Server is running @ http://${baseConfig.HOSTNAME}:${baseConfig.PORT}`);
		});
	} catch (error) {
		log.error(error, '\nError starting server!');
		dbHelper.disconnectFromDb();
		return;
	}
}

main();
