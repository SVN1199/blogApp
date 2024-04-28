const nodemailer = require('nodemailer')

const sendMail = async options => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "9a18cccd3c48f5",
            pass: "03214e219bdedb"
        }
    });

    const message = {
        from: 'Spark <noreply@spark.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transport.sendMail(message)
}

module.exports = sendMail