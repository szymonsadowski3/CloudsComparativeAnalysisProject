const AWS = require('aws-sdk');
const CFG = require('../../cfg');

AWS.config.update({region: CFG.AWS_REGION});

function sendEmail(toAddresses, subject, bodyText, bodyHtml) {
    const params = {
        Destination: {
            ToAddresses: toAddresses
        },
        Message: {
            Body: {},
            Subject: {Charset: 'UTF-8', Data: subject}
        },
        Source: CFG.SOURCE_EMAIL,
        ReplyToAddresses: [CFG.SOURCE_EMAIL],
    };

    function setBodyInField(fieldName, body) {
        params.Message.Body[fieldName] = {};
        params.Message.Body[fieldName].Charset = "UTF-8";
        params.Message.Body[fieldName].Data = body;
    }

    if(bodyHtml)
        setBodyInField('Html', bodyHtml);

    if(bodyText)
        setBodyInField('Text', bodyText);

    return new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
}

module.exports = {
    sendEmail,
};



