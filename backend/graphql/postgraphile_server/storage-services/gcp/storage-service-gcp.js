const multiparty = require('multiparty');
const fs = require('fs');
const Cloud = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, './primeval-aspect-274221-<ID>.json');

const { Storage } = Cloud;
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'My First Project',
});
let bucketName = 'praca-mgr-img';
let bucket = storage.bucket(bucketName);

const uploadImage = (originalFilename, buffer) => new Promise((resolve, reject) => {
    const blob = bucket.file(originalFilename.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
    })
        .on('error', () => {
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer);
});

function upload(response, request) {
    let form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);

        const filesList = files["files[]"];

        try {
            const uploadedFilesArray = [];

            for (let i = 0; i < filesList.length; i++) {
                const file = filesList[i];
                const path = filesList[i].path;
                const buffer = fs.readFileSync(path);
                const originalFilename = file.originalFilename;

                const publicUrl = await uploadImage(originalFilename, buffer);
                uploadedFilesArray.push(publicUrl);
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