import React, { useState } from "react";
import { uploadVideo } from "../../services/nest";

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setStatusMessage("لطفاً ابتدا یک ویدیو انتخاب کنید.");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      setStatusMessage("در حال آپلود و پردازش ویدیو...");

      const res = await uploadVideo();
      const { code, data, message }: any = res;
      console.log(data);

      if (code === 0) {
        setStatusMessage(`موفق: ${data.message}`);
        console.log("مسیر ویدیوی ریسایز شده:", data.resizedPath);
      } else {
        setStatusMessage(`خطا: ${data.message || "مشکلی پیش آمد"}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatusMessage("خطا در ارتباط با سرور.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>آپلود ویدیو</h2>

      <input type="file" accept="video/*" onChange={handleFileChange} />

      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        ارسال به سرور
      </button>

      <p>{statusMessage}</p>
    </div>
  );
};

export default VideoUpload;
