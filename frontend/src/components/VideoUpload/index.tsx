import React, { useState } from "react";

const VideoUpload = () => {
 const [videoFile, setVideoFile] = useState<string | null>(null);

 const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
 const file = event.target.files?.[0];
 if (file) {
 const objectURL = URL.createObjectURL(file);
 setVideoFile(objectURL); // ذخیره URL ویدیو برای نمایش
 }
 };

 return (
 <div>
 <div className="upload-container">
   {/* آپلود فایل */}
   <input type="file" accept="video/*" onChange={handleVideoUpload} />
 </div>

 {/* نمایش ویدیو در کادر مشخص */}
 <div className="video-preview-container">
   {videoFile ? (
     <video
       src={videoFile}
       controls
       className="video-preview"
     />
   ) : (
     <p className="placeholder">Upload a video to preview</p>
   )}
 </div>
 </div>
 );
};

export default VideoUpload;