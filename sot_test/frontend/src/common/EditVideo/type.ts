export interface AddMovieType {
  userId?: number | null;
  name?: string;
  description?: string;
  title?: string;
  categoryId?: number;
}

export interface MovieDataType {
  parentId: null;
  userId: number | null;
  movieId: number | null;
  status: number | null;
  inviteId?: any;
  desc?: string;
  title?: string;
  rate?: number;
}

export interface EditVideoProps {
  showEditMovie: boolean;
  setShowEditMovie: React.Dispatch<React.SetStateAction<boolean>>;
  coverImage?: string;
  allFormData?: {
    imageCover?: File;
    video?: File;
  };
  mode?: { typeMode?: number };
}

export interface AddMovieType {
  userId: number | null;
  cropData?: any;
  description?: string;
  title?: string;
  subSubCategoryId: number;
  modeId: number | undefined;
}
