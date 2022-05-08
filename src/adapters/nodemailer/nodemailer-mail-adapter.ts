import { MailAdapter, SendMailData } from './../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: '323ed64383059b',
		pass: '518b71a8f09bba',
	},
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body }: SendMailData) {
		transport.sendMail({
			from: 'Equipe Feedget <oi@feedget.com>',
			to: 'Simão Freire <simaofreire@live.com>',
			subject,
			html: body,
		});
	}
}
