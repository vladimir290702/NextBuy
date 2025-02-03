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
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>

      {/* Preview Section */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {images.map((file) => (
          <div key={file.id} style={{ margin: "10px", position: "relative" }}>
            <img
              src={file.preview}
              alt="uploaded"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <button
              onClick={() => deleteImage(file.id)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
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
