var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/', function (request, response, next) {
    console.log(AWS.config);
    const s3 = new AWS.S3({
        signatureVersion: "v4",
        region: process.env.AWS_REGION
    });

    const S3Params = {
        Bucket: process.env.AWS_BUCKET,
        Key: request.body.filename,
        ACL: 'public-read'
    };

    const signedRequest = s3.getSignedUrl('putObject', S3Params);
    const url =  `https://s3-${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET}/${S3Params.Key}`;
    const res = {
        signedRequest,
        url
    };
    response.send(res);
});

module.exports = router;