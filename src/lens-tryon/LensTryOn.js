import React, { useRef, useState } from "react";
import axios from "axios";
import "./LensTryOn.css";
import { lenses } from "./data/lens_images";

export default function LensTryOn() {
  const fileInputRef = useRef(null);
  const [faceImg, setFaceImg] = useState(null);
  const [faceImgOriginal, setFaceImgOriginal] = useState(null);
  const [faceLandmarks, setFaceLandmarks] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setFaceImg(URL.createObjectURL(file));
    setFaceImgOriginal(file);

    const formData = new FormData();
    formData.append("image", file, "face_image");
    await axios
      .post("http://127.0.0.1:8000/api/lens/facemesh", formData)
      .then((response) => {
        console.log(response);
        setFaceLandmarks(response.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  async function tryLens(lens_id) {
    const formData = new FormData();
    formData.append("image", faceImgOriginal, "face_image");
    formData.append(
      "data",
      JSON.stringify({
        lens_id: lens_id,
        face_landmarks: faceLandmarks,
      })
    );
    await axios
      .post("http://127.0.0.1:8000/api/lens/try-lens", formData)
      .then((response) => {
        console.log(response);
        // Handle the response
        const res_image = response.data;

        // Decode base64 string to image
        const imgData = `data:image/png;base64,${res_image.image}`;

        // Set the image state to the decoded image
        setFaceImg(imgData);
      })
      .catch((error) => console.error("Error:", error));
  }

  const removeLens = () => {
    setFaceImg(URL.createObjectURL(faceImgOriginal));
  };

  return (
    <div className="LensTryOn">
      {/* Header */}
      <div className="lens-header">
        <div className="title">Virtual Lens Try-On</div>
        <div className="sub-title">by - Armaan Agrawal</div>
      </div>

      {/* Body */}
      <div className="lens-body">
        <div className="left-face">
          <div className="desc">
            Upload an image that contains face.
            <br />
            (Make sure face is still upright)
          </div>
          <div className="image-box">
            {faceImg && <img src={faceImg} alt="" />}
          </div>
          <div>
            <div className="file-upload-btn" onClick={handleButtonClick}>
              Upload Image
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              accept=".jpg, .jpeg, .png"
            />
          </div>
          <div className="clear-btn" onClick={removeLens}>
            Remove Lens
          </div>
        </div>
        <div className="right-lenses">
          <div className="desc">See Your Style Come to Life</div>
          <div className="lenses-box">
            {lenses.map((item, idx) => (
              <div
                key={idx}
                className="lens-img"
                onClick={() => {
                  tryLens(idx);
                }}
              >
                <img src={item.image_url} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
