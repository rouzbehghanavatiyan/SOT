import { useEffect, useRef, useState } from "react";
import { extractVideoThumbnail } from "../utils/helpers/videoUtils";
import { UploadStatus, UseVideoHandlerReturn } from "./type";
import {
  // uploadFileChunk,
  completeDraftUpload,
  deleteDraftUpload,
  uploadStartFileDraft,
} from "../services/nest";

export const useVideoHandler = (): UseVideoHandlerReturn => {
  const CHUNK_SIZE = 8 * 1024 * 1024;
  const videoRef = useRef<HTMLVideoElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [coverImage, setCoverImage] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [showEditMovie, setShowEditMovie] = useState<boolean>(false);
  const [allFormData, setAllFormData] = useState<any>();
  const [videoError, setVideoError] = useState<string | null>(null);

  const [uploadId, setUploadId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("IDLE");

  const createDraft = async (
    file: File,
    signal: AbortSignal,
  ): Promise<string> => {
    setUploadStatus("DRAFT_CREATING");

    const postData = {
      fileName: file.name,
      size: file.size,
      mimeType: file.type,
    };

    const res = await uploadStartFileDraft(postData, { signal });
    const { code, data }: any = res?.data || {};
    if (code === 0) {
      return data?.uploadId || data?.id || data?.draftId;
    }

    throw new Error("Create draft failed");
  };

  // const uploadChunks = async (
  //   file: File,
  //   id: string,
  //   signal: AbortSignal,
  // ): Promise<void> => {
  //   setUploadStatus("UPLOADING_DRAFT");

  //   const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  //   for (let i = 0; i < totalChunks; i++) {
  //     const start = i * CHUNK_SIZE;
  //     const end = Math.min(file.size, start + CHUNK_SIZE);
  //     const chunk = file.slice(start, end);

  //     const form = new FormData();
  //     form.append("chunk", chunk);
  //     form.append("uploadId", id);
  //     form.append("chunkIndex", String(i));
  //     form.append("totalChunks", String(totalChunks));
  //     form.append("fileName", file.name);

  //     const res = await uploadFileChunk(form, { signal });
  //     const { code }: any = res?.data || {};

  //     if (code !== 0) {
  //       throw new Error(`Chunk upload failed at index ${i}`);
  //     }

  //     const pct = Math.round(((i + 1) / totalChunks) * 100);
  //     setUploadProgress(pct);

  //     setAllFormData((prev: any) => ({
  //       ...(prev ?? {}),
  //       uploadId: id,
  //       uploadProgress: pct,
  //       uploadStatus: "UPLOADING_DRAFT",
  //     }));
  //   }
  // };

  const completeDraft = async (
    id: string,
    signal: AbortSignal,
  ): Promise<void> => {
    const res = await completeDraftUpload({ uploadId: id }, { signal });

    const { code }: any = res?.data || {};

    if (code !== 0) {
      throw new Error("Complete draft failed");
    }

    setUploadStatus("DRAFT_UPLOADED");

    setAllFormData((prev: any) => ({
      ...(prev ?? {}),
      uploadId: id,
      uploadProgress: 100,
      uploadStatus: "DRAFT_UPLOADED",
    }));
  };

  const cancelDraftUpload = async () => {
    abortRef.current?.abort();

    if (uploadId) {
      try {
        await deleteDraftUpload(uploadId);
      } catch (error) {
        console.log("delete draft failed", error);
      }
    }

    setUploadStatus("CANCELED");
  };

  const startDraftUpload = async (file: File) => {
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setUploadProgress(0);
      setUploadStatus("DRAFT_CREATING");

      const id = await createDraft(file, controller.signal);

      if (!id) {
        throw new Error("uploadId is empty");
      }

      setUploadId(id);

      setAllFormData((prev: any) => ({
        ...(prev ?? {}),
        uploadId: id,
        uploadProgress: 0,
        uploadStatus: "DRAFT_CREATING",
      }));

      // await uploadChunks(file, id, controller.signal);
      await completeDraft(id, controller.signal);
    } catch (err: any) {
      if (err?.name === "CanceledError" || err?.name === "AbortError") {
        setUploadStatus("CANCELED");
        return;
      }

      console.log("startDraftUpload error", err);
      setUploadStatus("FAILED");
      setVideoError("Upload failed. Please try again.");
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    setVideoError(null);

    if (!file) return;

    setVideoFile(file);
    startDraftUpload(file);

    const url = URL.createObjectURL(file);
    const videoElement = videoRef.current;

    if (!videoElement) {
      setVideoError("Video element is not mounted");
      URL.revokeObjectURL(url);
      return;
    }

    videoElement.volume = 0;
    videoElement.muted = true;
    videoElement.src = url;
    videoElement.load();

    videoElement.play().catch(() => {});

    videoElement.onloadedmetadata = () => {
      const duration = videoElement.duration;
      const maxDuration = 120;

      if (duration > maxDuration) {
        setVideoError("Dear user, your video should not exceed 2 minute");
        URL.revokeObjectURL(url);
        videoElement.src = "";
        cancelDraftUpload();
        return;
      }

      const midpoint = videoElement.duration / 2;
      videoElement.currentTime = midpoint;
    };

    videoElement.onseeked = () => {
      if (videoElement.duration <= 60) {
        extractVideoThumbnail(
          videoElement,
          (thumbnailDataUrl, thumbnailFile) => {
            setCoverImage(thumbnailDataUrl);
            setShowEditMovie(true);

            setAllFormData((prev: any) => ({
              ...(prev ?? {}),
              imageCover: thumbnailFile,
              video: file,
            }));
          },
        );
      }
    };

    videoElement.onerror = () => {
      setVideoError(
        "Error loading video file, Dear user, your video should not exceed 1 minute",
      );
      URL.revokeObjectURL(url);
      cancelDraftUpload();
    };
  };

  const triggerVideoUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => handleVideoUpload(e as any);
    input.click();
  };

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return {
    videoRef,
    coverImage,
    videoFile,
    showEditMovie,
    allFormData,
    setShowEditMovie,
    setAllFormData,
    handleVideoUpload,
    triggerVideoUpload,
    videoError,
    uploadId,
    uploadProgress,
    uploadStatus,
    cancelDraftUpload,
  };
};
