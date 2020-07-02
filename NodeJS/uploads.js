var moment = require('moment');
var multer = require('multer');
var jwt = require('jwt-simple');

var uploadFile = multer({dest: "uploads/"}).any();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, req.user._id + '_' + moment().format('MMDDYY[_]HHmm') + '.txt')
    }
});

exports.uploads = multer({storage:storage}).any();