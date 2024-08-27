const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const uploadFile = (fileName, fileContent) => {
    const params = {
        Bucket: 'myy-unique-bucket-name-2024',
        Key: fileName,
        Body: fileContent,
    };

    return s3.upload(params).promise();
};

module.exports = { uploadFile };
