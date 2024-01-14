import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log('Original Filename:', file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
