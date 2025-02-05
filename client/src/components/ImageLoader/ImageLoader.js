import "./ImageLoader.css";
import React, { useState, useRef, useEffect } from "react";

const ImageDropZone = ({ onImageUpload }) => {
  const [images, setImages] = useState([]); // Stores all image URLs
  const fileInputRef = useRef(null); // Reference for hidden file input

  useEffect(() => {
    onImageUpload(images);
  }, [images]);

  // Handle Drag & Drop from Web
  const handleDrop = (event) => {
    event.preventDefault();

    for (const item of event.dataTransfer.items) {
      if (item.kind === "string" && item.type === "text/uri-list") {
        item.getAsString((url) => {
          console.log("Dragged Image URL:", url);
          setImages((prev) => [...prev, url]);
        });
      }
    }
  };

  const deleteImage = (id) => {
    setImages(images.filter((image) => image !== id));
  };

  return (
    <div>
      {/* Drop & Upload Area */}
      <div
        id="image-uploader-input-container"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()} // Trigger file input on click
      >
        <p>Drag & Drop images here or Click to Upload</p>
      </div>

      {/* Display Uploaded Images */}
      <div className="image-uploader-images-container ">
        {images.map((file) => (
          <div key={file} style={{ margin: "10px", position: "relative" }}>
            <img className="image-uploader-image" src={file} alt="uploaded" />
            <button
              className="image-uploader-image-delete-button"
              onClick={() => deleteImage(file)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDropZone;
