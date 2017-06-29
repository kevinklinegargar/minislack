var router = require('express').Router();
var mongoose = require('mongoose');
var multer = require('multer');
var crypto = require('crypto');
var path = require('path');
var storage = multer.diskStorage({
  destination: __dirname + '/../../client/uploads/',
  filename: function (req, file, cb) {
	crypto.pseudoRandomBytes(16, function (err, raw) {
	  if (err) return cb(err)

	  cb(null, raw.toString('hex') + path.extname(file.originalname))
	})
  }
})

var upload = multer({ 
				storage: storage,
				fileFilter: function (req, file, callback) {
								var ext = path.extname(file.originalname);
							
								if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
									callback("invalid_format", false);
								}else{
									callback(null, true);
								}
								
							}

			}).single('file');


router.post('/file',(req,res) => {
	upload(req, res, function (err) {
		if (err) {
			if(err == "invalid_format"){
				res.send("invalid_format");
				
			}
		}else{
			res.send(req.file);
		}
	});
	
});


module.exports = router;