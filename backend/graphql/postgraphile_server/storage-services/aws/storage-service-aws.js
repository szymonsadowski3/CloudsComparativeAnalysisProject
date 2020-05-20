const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const v4 = require('uuid');
const FileType = require('file-type');
const multiparty = require('multiparty');

AWS.config.setPromisesDependency(bluebird);

function upload(request, response) {
    const s3 = new AWS.S3(CREDS);

    function uploadFile(buffer, key, type) {
        const params = type ? {
            Body: buffer,
            Bucket: "praca-mgr-code-img-bucket",
            ContentType: type.mime,
            Key: key
        } : {
            Body: buffer,
            Bucket: "praca-mgr-code-img-bucket",
            Key: key
        };
        return s3.upload(params).promise();
    }

    let form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);

        const filesList = files["files[]"];

        try {
            const uploadedFilesArray = [];

            for (var i = 0; i < filesList.length; i++) {
                const path = filesList[i].path;
                const buffer = fs.readFileSync(path);
                const type = await FileType.fromBuffer(buffer);

                const keyToSaveUnder = (type && ('ext' in type)) ? `${v4()}.${type.ext}` : v4();

                const data = await uploadFile(buffer, keyToSaveUnder, type);
                uploadedFilesArray.push(data);
            }

            return response.status(200).send(uploadedFilesArray);
        } catch (error) {
            return response.status(400).send(error);
        }
    });
}

module.exports = {
    upload,
};