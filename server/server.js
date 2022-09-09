const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path")

const server = express();

const uploadFiles = require("./multer-config.js");

server.use(cors());
server.use("/images",express.static(path.join(__dirname, "public/images"))); // Static
server.use("/videos",express.static(path.join(__dirname, "public/videos"))); // Static

const PORT = 5000;

server.post('/upload', uploadFiles.fields([{name: 'image'}, {name: 'video'}]), (req, res, next)=> {

    const {image} = req.files;
    const {video} = req.files;
    const title = req.body;
    console.log(image, video, title)

});

server.listen(PORT, ()=> {
    console.log(`Server is running on localhost:${PORT}.`)
});