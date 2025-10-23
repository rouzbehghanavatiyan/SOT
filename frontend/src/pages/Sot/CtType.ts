export interface Mode {
  id: string | number;
  name: string;
  icon?: any;
  label?: string;
}

export interface FormData {
  imageCover: File;
  video: File;
}
