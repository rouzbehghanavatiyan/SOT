export const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const extractVideoThumbnail = (
  videoElement: HTMLVideoElement,
  callback: (thumbnailDataUrl: string, thumbnailFile: File) => void
): void => {
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    const blob = dataURLtoBlob(dataURL);
    const coverImageFile = new File([blob], "cover.png", { type: "image/png" });
    callback(dataURL, coverImageFile);
  }
};
