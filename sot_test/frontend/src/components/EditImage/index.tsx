import React, { useState, useEffect, useRef } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface EditImageProps {
  src: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
  circularCrop?: boolean;
}

const EditImage: React.FC<EditImageProps> = ({
  src,
  onCropComplete,
  onCancel,
  circularCrop = true,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 180,
    height: 180,
    x: 50,
    y: 50,
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [containerSize, setContainerSize] = useState({
    width: 300,
    height: 300,
  });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const size = Math.min(
          window.innerWidth - 40,
          window.innerHeight - 200,
          400
        );
        setContainerSize({ width: size, height: size });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getCroppedImg = () => {
    if (!imageRef.current || !crop.width || !crop.height) {
      console.error("Image not loaded or crop not defined");
      return;
    }

    const image = imageRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = 100;
    canvas.height = 100;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (circularCrop) {
      ctx.beginPath();
      ctx.arc(50, 50, 50, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      100,
      100
    );

    const base64Image = canvas.toDataURL("image/jpeg", 0.9);
    onCropComplete(base64Image);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold p-4">Edit Profile Picture</h2>
        <div
          ref={containerRef}
          className="overflow-hidden relative bg-gray-100 flex items-center justify-center"
          style={{
            width: `${containerSize.width}px`,
            height: `${containerSize.height}px`,
            margin: "0 auto",
          }}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p>Loading image...</p>
            </div>
          )}
          <ReactCrop
            src={src}
            onImageLoaded={() => setImageLoaded(true)}
            crop={crop}
            onChange={(newCrop) => {
              if (newCrop.width && newCrop.height) {
                setCrop({
                  unit: "px",
                  width: 180,
                  height: 180,
                  x: newCrop.x || 0,
                  y: newCrop.y || 0,
                });
              }
            }}
            circularCrop={circularCrop}
            locked
            style={{
              display: imageLoaded ? "block" : "none",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            imageStyle={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          >
            <img
              ref={imageRef} // اضافه کردن ref به تصویر
              src={src}
              alt="Crop me"
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                const container = containerRef.current;
                if (container) {
                  const ratio = Math.min(
                    container.clientWidth / img.naturalWidth,
                    container.clientHeight / img.naturalHeight
                  );
                  img.style.width = `${img.naturalWidth * ratio}px`;
                  img.style.height = `${img.naturalHeight * ratio}px`;
                }
                setImageLoaded(true);
              }}
            />
          </ReactCrop>
        </div>
        <div className="flex justify-end gap-2 p-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            onClick={getCroppedImg}
            className="px-4 py-2 bg-blue-500 text-dark rounded-md text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditImage;
