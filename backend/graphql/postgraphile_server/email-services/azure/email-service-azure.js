const sgMail = require('@sendgrid/mail');
const CFG = require('../../cfg');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(toAddresses, subject, bodyText, bodyHtml) {
    const msg = {
        to: toAddresses,
        from: CFG.SOURCE_EMAIL,
        subject: subject,
        text: bodyText,
        html: bodyHtml,
    };

    sgMail.send(msg);
}

module.exports = {
    sendEmail,
};