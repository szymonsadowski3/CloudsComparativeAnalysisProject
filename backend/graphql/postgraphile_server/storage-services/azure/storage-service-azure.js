const multiparty = require('multiparty');
const fs = require('fs');

const { BlobServiceClient } = require('@azure/storage-blob');

async function uploadBuffer(buffer, blobName) {
    const blobServiceClient = await BlobServiceClient.fromConnectionString(
        "DefaultEndpointsProtocol=https;AccountName=pracamgr;" +
        "AccountKey=<ACCOUNT_KEY>;" +
        "EndpointSuffix=core.windows.net"
    );
    const containerName = 'praca-mgr-img';
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(buffer, buffer.byteLength);
    console.log("Upload finished with following response: " + uploadBlobResponse);

    return name;
}

function upload(request, response) {
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

                const publicUrl = await uploadBuffer(buffer, originalFilename);
                uploadedFilesArray.push(publicUrl);
            }

            return response.status(200).send(uploadedFilesArray);
        } catch (error) {
            return response.status(200).send(error);
        }
    });
}

module.exports = {
    upload,
};