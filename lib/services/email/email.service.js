const nodemailer = require('nodemailer');
const { EMAIL } = require('../../config');
const templates = require('./templates');

const transporter = nodemailer.createTransport({
    host: EMAIL.HOST,
    port: EMAIL.PORT,
    auth: {
        user: EMAIL.USER,
        pass: EMAIL.PASS,
    },
});

transporter.verify(async function (error) {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    } else {
        // eslint-disable-next-line no-console
        console.log('Server is ready to take our messages');
    }
});

class Email {
    static get templates() {
        return Object.freeze({
            REGISTER: 'register',
            RESET_PASSWORD: 'resetPassword',
        });
    }

    constructor(email, type, data = {}) {
        this.email = email;
        this.type = type;
        this.data = data;

        this.template = templates[this.type](this.data);
        this.html = templates.genericContainer(this.template);
    }

    async send() {
        const message = {
            from: 'sofy@sofy.ai',
            to: this.email,
            subject: this.template.subject,
            // text: 'Plaintext version of the message',
            html: this.html,
        };

        try {
            await transporter.sendMail(message);
        } catch (error) {
            throw Error('Could not send email');
        }
    }
}

module.exports = Email;
