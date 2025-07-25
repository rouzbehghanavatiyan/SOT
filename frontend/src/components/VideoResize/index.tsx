import React, { useState, useRef } from "react";

const VideoResize = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [resizedVideo, setResizedVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const objectURL = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = objectURL;
      }
    }
  };

  const handleResize = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // تغییر ابعاد ویدیو
      const targetWidth = 640;
      const targetHeight = 360;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      context?.drawImage(videoRef.current, 0, 0, targetWidth, targetHeight);

      const resizedVideoURL = canvas.toDataURL("video/mp4");
      setResizedVideo(resizedVideoURL);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      <video ref={videoRef} controls style={{ maxWidth: "100%" }} />
      <button onClick={handleResize}>Resize Video</button>
      {resizedVideo && (
        <div>
          <p>Resized Video:</p>
          <video src={resizedVideo} controls style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default VideoResize;
