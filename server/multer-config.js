const multer = require("multer");
const path = require("path");

/* "storage" specifies where to load the file. It contains two properties named "destination" and "filename". 
These properties have "req, file, callback" parameters. */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.fieldname === "image"){
            const rootDir = path.dirname(require.main.filename);
            cb(null, path.join(rootDir, "public/images"));
        }
        if(file.fieldname === "video"){
            const rootDir = path.dirname(require.main.filename);
            cb(null, path.join(rootDir, "public/videos"));
        }
    },

    filename: function(req, file, cb){

        if (file.fieldname === "image"){
            const extension = file.mimetype.split("/")[1];
            req.savedUploadFile = "image_" + Date.now() + "." + extension;
            cb(null, req.savedUploadFile);
        }
        if (file.fieldname === "video"){
            const videoextension = file.mimetype.split("/")[1];
            req.savedUploadVideo = "video_" + Date.now() + "." + videoextension;
            cb(null, req.savedUploadVideo);
        }
      
    }
});

/* "fileFilter" specifies which types of files can be uploaded. */
const fileFilter = (req, file, cb) => {
 
    if(file.fieldname === "image") {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ) { 
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    }

    if(file.fieldname === "video") {
        if (file.mimetype === 'video/mp4') { 
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    }

};

/* These are exported thanks to the "multer({})" method. */
const uploadFiles = multer({storage, fileFilter});

module.exports = uploadFiles;