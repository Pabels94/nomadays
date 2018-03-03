const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename(req, file, callback) {
    console.log(file);
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/upload', (req, res, next) => {
  const upload = multer({
    storage,
  }).single('userFile');
  upload(req, res, (err) => {
    res.end('File is uploaded');
  });
});


module.exports = router;
