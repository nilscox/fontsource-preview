/* eslint-env node, es6 */

import { exec } from 'child_process';
import path from 'path';

import express from 'express';
import multer from 'multer';

const { HOST: host = '0.0.0.0', PORT: port = '3000' } = process.env;
const { UPLOAD_DIR: uploadDir, PUBLIC_DIR: publicDir } = process.env;

console.log(`starting server`);

const app = express();
const upload = multer({ dest: uploadDir });

app.post('/', upload.single('file'), (req, res) => {
  res.status(204).end();
  processUploadedFile(req.file);
});

const execAsync = async (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

const processUploadedFile = async (file) => {
  const uploadedFile = `${path.resolve(uploadDir, file.filename)}`;

  try {
    console.log(`removing all files in ${publicDir}`);
    await execAsync(`rm -rf ${publicDir}/@fontsource ${publicDir}/fonts.json`);

    console.log(`extracting ${uploadedFile} into ${publicDir}`);
    console.log(await execAsync(`tar xvf ${uploadedFile} -C ${publicDir}`));
    console.log('done');

    console.log(`deleting ${uploadedFile}`);
    await execAsync(`rm -f ${uploadedFile}`);
  } catch (error) {
    console.error(error);
  }
};

const server = app.listen(Number(port), host, () => {
  console.log(`server listening on ${host}:${port}`);
});

const shutdown = () => {
  console.log('closing server');
  server.close(() => {
    console.log('server closed');
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
