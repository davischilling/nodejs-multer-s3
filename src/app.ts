import express from 'express';
import { awsGetImg, awsUpload, awsDeleteImg } from './aws';
import { upload } from './multer';

export const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

let awsImgName = '';

app.post('/posts', upload.single('avatar'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please provide a file' });
  } else {
    const { imgName } = await awsUpload(req.file);
    // store the image name in the database
    console.log(imgName);
    awsImgName = imgName;
    
    res.status(201).json({ message: 'File uploaded successfully!' });
  }
});

app.get('/posts', async (req, res) => {
  const url = await awsGetImg(awsImgName);
  res.json({ url })
});

app.delete('/posts', async (req, res) => {
  // delete the image from the database
  // delete the image from S3
  // awsDeleteImg(awsImgName);
  await awsDeleteImg(awsImgName);
  res.json({ message: 'Image deleted successfully!' });
});