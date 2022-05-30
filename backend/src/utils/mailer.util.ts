import { createTransport, getTestMessageUrl, SendMailOptions } from 'nodemailer';
import { baseConfig } from '@src/config';
import log from './logger.util';

// this function creates dev credentials for email server config
// async function createTestCreds() {
// 	const credentials = await createTestAccount();
// 	log.info(credentials, 'createTestCreds email');
// }
// createTestCreds();

const smtpConfig = baseConfig.SMTP;

const transporter = createTransport({
	...smtpConfig,
	auth: {
		user: smtpConfig.user,
		pass: smtpConfig.pass,
	},
});

async function sendEmail(payload: SendMailOptions) {
	transporter.sendMail(payload, (err, info) => {
		if (err) {
			log.error(err, 'sendMail error');
			return;
		}
		log.info(getTestMessageUrl(info), 'Preview url');
	});
}

export default { sendEmail };
