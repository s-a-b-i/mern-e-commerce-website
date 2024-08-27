import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { FaUpload, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ImagePreview from '../components/ImagePreview.jsx';

const UploadImage = ({ onImagesUpload, initialImages = [] }) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setImages(initialImages);
    setPreviews(initialImages);
  }, [initialImages]);

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...files]);
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  }, []);

  const handleImagesUpload = useCallback(async () => {
    if (images.length === 0) return;

    setLoading(true);
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadedUrls = [];

    try {
      for (const image of images) {
        if (typeof image === "string") {
          uploadedUrls.push(image);
        } else {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "e-c-products");

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          );

          if (response.data && response.data.secure_url) {
            uploadedUrls.push(response.data.secure_url);
          } else {
            console.error("Unexpected response format:", response);
            toast.error("Unexpected response format from Cloudinary");
          }
        }
      }

      setImages(uploadedUrls);
      setPreviews(uploadedUrls);
      onImagesUpload(uploadedUrls);
      toast.success("Images uploaded successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    } finally {
      setLoading(false);
    }
  }, [images, onImagesUpload]);

  const handleRemoveImage = useCallback((index, e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  }, []);

  const openPreview = useCallback((preview) => {
    setPreviewImage(preview);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewImage(null);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg cursor-pointer transition duration-300 group-hover:opacity-75"
              onClick={() => openPreview(preview)}
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
              onClick={(e) => handleRemoveImage(index, e)}
            >
              <FaTimes size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <label
          htmlFor="image-upload"
          className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors duration-200"
        >
          <FaUpload className="mr-2" />
          Choose Images
          <input
            type="file"
            id="image-upload"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
            multiple
          />
        </label>

        <button
          type="button"
          onClick={handleImagesUpload}
          disabled={loading || images.length === 0}
          className={`flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 ${loading || images.length === 0 ? 'bg-green-300 cursor-not-allowed' : ''}`}
        >
          {loading ? "Uploading..." : "Upload Images"}
        </button>
      </div>

      {previewImage && (
        <ImagePreview imageUrl={previewImage} onClose={closePreview} />
      )}
    </div>
  );
};

export default UploadImage;
