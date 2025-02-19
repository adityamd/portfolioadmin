const aws = require('aws-sdk');
const crypto = require('crypto');
const { promisify } = require('util');
const dotenv = require('dotenv')

dotenv.config('./env')

const  randomBytes = promisify(crypto.randomBytes)
const region = 'eu-north-1';
const bucketName = 'adityasportfolio';
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKey,
    secretAccessKey,
    signatureVersion: 'v4'
})

const generateUploadURL = async (imageName) => {
    console.log(imageName)
    // const rawBytes = await randomBytes(16);
    // const imageName = rawBytes.toString('hex')
    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    console.log(region, accessKey, secretAccessKey, bucketName, imageName)

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL;
}

const generateFetchURL = async (imageName) => {
    console.log(imageName)
    // const rawBytes = await randomBytes(16);
    // const imageName = rawBytes.toString('hex')
    const fetchURL = "https://d2vtmu10ymf87d.cloudfront.net/"+imageName;
    return fetchURL;
}

module.exports = { generateUploadURL, generateFetchURL }