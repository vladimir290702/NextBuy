import "./ImageLoader.css";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ onImageUpload }) => {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: Math.random(),
      })
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const deleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  // Pass image URLs to parent whenever the images change
  useEffect(() => {
    onImageUpload(images);
  }, [images]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div>
      {/* Dropzone Area */}
      <div id="image-uploader-input-container" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>

      {/* Preview Section */}
      <div className="image-uploader-images-container ">
        {images.map((file) => (
          <div key={file.id} style={{ margin: "10px", position: "relative" }}>
            <img
              className="image-uploader-image"
              src={file.preview}
              alt="uploaded"
            />
            <button
              className="image-uploader-image-delete-button"
              onClick={() => deleteImage(file.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
