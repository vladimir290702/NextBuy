import "./ImageLoader.css";

import React, { useState, useRef, useEffect } from "react";

const ImageLoader = ({ onImageUpload }) => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    onImageUpload(images);
  }, [images]);

  const handleDrop = (event) => {
    event.preventDefault();
    const dt = event.dataTransfer;

    if (dt.files && dt.files.length > 0) {
      Array.from(dt.files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target.result;
            if (!images.includes(result)) {
              setImages((prev) => [...prev, result]);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    } else if (dt.items && dt.items.length > 0) {
      // Handle URL drops (dragged from a web browser)
      for (const item of dt.items) {
        if (item.kind === "string" && item.type === "text/uri-list") {
          item.getAsString((url) => {
            if (!images.includes(url)) {
              setImages((prev) => [...prev, url]);
            }
          });
          break;
        }
      }
    }
  };

  const deleteImage = (id) => {
    setImages(images.filter((image) => image !== id));
  };

  return (
    <div>
      <div
        id="image-uploader-input-container"
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("drag-hover");
        }}
        onDragLeave={(e) => e.currentTarget.classList.remove("drag-hover")}
        onDrop={(e) => {
          e.currentTarget.classList.remove("drag-hover");
          handleDrop(e);
        }}
      >
        <p>Drag & Drop images here or Click to Upload</p>
      </div>
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
export default ImageLoader;
