const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');
const AWS = require('aws-sdk');
const CFG = require('./cfg');

AWS.config.update({
    region: CFG.AWS_REGION,
});

function associateLogGroupAndStream() {
    winston.add(new WinstonCloudWatch({
        cloudWatchLogs: new AWS.CloudWatchLogs(),
        logGroupName: 'simple-ecommerce',
        logStreamName: 'backend-service'
    }));
}

function sendLog(message, level='info') {
    winston[level](message);
}

associateLogGroupAndStream();

module.exports = {
    sendLog,
};