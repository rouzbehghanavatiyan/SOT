export type UploadStatus =
  | "IDLE"
  | "DRAFT_CREATING"
  | "UPLOADING_DRAFT"
  | "DRAFT_UPLOADED"
  | "FAILED"
  | "CANCELED";

export interface UseVideoHandlerReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  coverImage: string;
  videoFile: File | null;
  showEditMovie: boolean;
  allFormData: any;
  setShowEditMovie: (show: boolean) => void;
  setAllFormData: (data: any) => void;
  handleVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerVideoUpload: () => void;
  videoError: string | null;
  uploadId: string | null;
  uploadProgress: number;
  uploadStatus: UploadStatus;
  cancelDraftUpload: () => void;
}
