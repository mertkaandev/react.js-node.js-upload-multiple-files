## React.js and Node.js - Upload Multiple Files

This little React.js-Node.js app shows how files sent from the client are captured, parsed and saved on the server side. If you want to process multipart form data you should use FormData() on client side and you can use Multer to process these files on server side.

![server](https://user-images.githubusercontent.com/101933251/189360628-efff27fb-984b-4e91-900f-a17c25b035a7.png)

## 1. Client (React.js)

React.js is used in the client part. App.js renders the `UploadFile.jsx` component and the processing takes place in the "UploadFile" component. The "UploadFile" component uses `axios` to send requests to the server route. 

```
import React, {useState} from "react";
import axios from "axios";
```

3 pieces of information with the name `title`, `image` and `video` will be sent to the server, so `states` are created for them.

```
const [title, setTitle] = useState();
const [image, setImage] = useState();
const [video, setVideo] = useState();
const [imagePreview, setImagePreview] = useState();
const [videoPreview, setVideoPreview] = useState();
```

Again, this component has an asynchronous function called `send`, which makes a request to the server. The `send` function takes the React synthetic event (called e or event) as a parameter. The default action is blocked in the first line with the event (e.preventDefault()). This is to prevent the form submission process without filling in the form data. After all that here we see that the variable named "data" is given the format "FormData". When submitting multi-part form data in Javascript, FormData is used and we append the multi-part form data we want to send with "append" in FormData. This is a special form of file data transmission and for saving binary data such as images. We see it again, "title", "image" and "video" information has been added to the FormData variable named data. Title is a text but image and video are in file format. We get these 3 information from inputs.

```
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
```

![uploadfile](https://user-images.githubusercontent.com/101933251/189372148-b269eb5e-516b-42e1-b949-b272cdde98d8.JPG)

Now we need to write three "input" in a form and keep the inputs as state information. The first input will be of type text, but the other two have file type. That's why we use `event.target.value` when retrieving the first input value, but we should use `event.target.files[0]` for the other two. Finally, we have a button which, when clicked on it, executes the `send` function. The send function, on the other hand, will `post` the data information by sending a request to our server address if the form data is full.

![form](https://user-images.githubusercontent.com/101933251/189373423-301511da-2a6c-43ae-92b6-59342e24178c.JPG)

Such a frontend with CSS codes awaits us:

![client](https://user-images.githubusercontent.com/101933251/189373883-cc5adf32-15a8-45f6-bd45-82d2c678ed87.jpg)

---

## 2. Server (Node.js)

On the server side, we have a Node.js project with `express`, `multer`, `cors` and `path` packages installed. Express.js is used to set up a server in a simpler way. Multer is a middleware and is used to process multipart form data. Multer allows us to process the multipart form data for us and gives us access to the request body. It also gives us access to the file. When you use Multer with HTML, you must specify enctype="multipart/data-form". Otherwise it will be rendered as JSON and cannot be used correctly. To upload a file, you need an input format of type fyle.

**server.js:** On the server side, `server.js` is our main file. In it, the installation of server and the installation of the packages have been carried out. The paths of static files are related to `express.static()` and a `/upload` route is written. Multer function named "uploadFiles" works in this route. Thanks to the "fields" feature, it allows importing various files. It takes 2 files with the names "image" and "video" sent from the client. Then a function with parameters "req" and "res" runs. This function prints the information of the incoming files to the console.

![server](https://user-images.githubusercontent.com/101933251/189379727-c9de4024-edaf-4af7-8d33-96fcf6931b86.JPG)

When we send the data by the client, we see the information of the data in the console because the function was written above for this.

![console](https://user-images.githubusercontent.com/101933251/189379912-6656fc2d-0e38-4192-837b-ae01ecabb8b9.JPG)

We see that there are information such as "fieldname" and "mimetype" in the incoming file information. These are the information that identifies the file. Multer processes the files using this information. Now it's all in Multer. The special Multer configuration function named "uploadFiles" will receive incoming files, process them according to file extensions and other information, and save them to the specified path.

![multer](https://user-images.githubusercontent.com/101933251/189380801-cb954d5f-dbf9-43e0-8e25-dc0f0583a038.JPG)

![multer 1](https://user-images.githubusercontent.com/101933251/189380826-5db8e6f2-1bf3-4704-81fc-0df219212d53.JPG)

---

## Final 

I will send the files from the client and the files will be saved to the path I specified on the server side. Let's see!

![client](https://user-images.githubusercontent.com/101933251/189381645-40c1bd52-2158-4346-828f-ed8dcb5cf2be.JPG)

And the files are exactly where I want them:

![public](https://user-images.githubusercontent.com/101933251/189382088-4885956c-29df-4320-96fd-9c5fcca9d932.JPG)
