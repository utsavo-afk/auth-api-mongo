import logger from 'pino';
import dayjs from 'dayjs';
import { baseConfig } from '@src/config';

const log = logger({
	transport: {
		target: 'pino-pretty',
	},
	level: baseConfig.LOG_LEVEL,
	base: {
		pid: false,
	},
	timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
