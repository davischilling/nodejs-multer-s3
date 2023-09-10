import sharp from 'sharp';
import crypto from 'crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from './aws-config';

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const awsUpload = async (file: Express.Multer.File): Promise<{imgName: string}> => {
    const buffer = await sharp(file.buffer).resize({ height: 1920, width: 1080, fit: 'contain' }).toBuffer()
    const imgName = `${randomImageName()}.${file.mimetype.split('/')[1]}`.toLowerCase()
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: imgName,
      Body: buffer,
      ContentType: file.mimetype,
    })
    await s3.send(command)
    return {
      imgName
    }
}