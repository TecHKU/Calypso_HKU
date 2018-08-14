var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();
var path = require('path');
var CONFIG = require('../config');

router.post('/', function (request, response, next) {
    AWS.config.loadFromPath(path.resolve(__dirname, "../aws_config.json"));
    console.log(AWS.config);
    const s3 = new AWS.S3({
        signatureVersion: "v4",
        region: CONFIG.AWS_REGION
    });

    const S3Params = {
        Bucket: CONFIG.AWS_BUCKET,
        Key: request.body.filename,
        ACL: 'public-read'
    };

    const signedRequest = s3.getSignedUrl('putObject', S3Params);
    const url =  `https://s3-${CONFIG.AWS_REGION}.amazonaws.com/${CONFIG.AWS_BUCKET}/${S3Params.Key}`;
    const res = {
        signedRequest,
        url
    };
    response.send(res);
});

module.exports = router;