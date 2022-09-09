import React, {useState} from "react";
import axios from "axios";

import "./uploadFile.css";

const UploadFile = () => {

    const [title, setTitle] = useState();
    const [image, setImage] = useState();
    const [video, setVideo] = useState();
    const [imagePreview, setImagePreview] = useState();
    const [videoPreview, setVideoPreview] = useState();

    const send = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", title);
        data.append("image", image);
        data.append("video", video);

        await axios.post("http://localhost:5000/upload", data)
            .then((result) => console.log(result))
            .catch((err)=> console.log(err))

    }

    return (

        <div className="upload-file">
            <div className="upload-file-wrapper">

                <h1 className="upload-file-text">File Upload</h1>

                <form action="#">

                    <input
                        className="upload-file-input"
                        type="text"
                        name="title"
                        id=""
                        onChange={(event) => {
                            const title = event.target.value;
                            setTitle(title)
                        }}
                        placeholder="Video Title" 
                    />

                    <input
                        className="upload-file-input"
                        type="file"
                        name="image"
                        id=""
                        accept= ".jpg, .jpeg"
                        onChange={(event) => {
                            const image = event.target.files[0]
                            setImage(image)
                            setImagePreview(URL.createObjectURL(event.target.files[0]))
                        }}
                        placeholder="File" 
                    />

                    <img src={imagePreview} alt="Uploaded file" className="uploaded-img"></img>    

                    <input
                        className="upload-file-input"
                        type="file"
                        name="video"
                        id=""
                        accept= ".mp4"
                        onChange={(event) => {
                            const video = event.target.files[0];
                            setVideo(video);
                            setVideoPreview(URL.createObjectURL(event.target.files[0]))
                        }} 
                    />

                    <iframe src={videoPreview} frameborder="0" className="uploaded-video"></iframe>

                </form>

                <button onClick={(e) => send(e)} className="upload-file-button">Upload</button>
            
            </div>
        </div>

    )
}

export default UploadFile;