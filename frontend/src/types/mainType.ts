export interface Video {
  id: string;
  attachmentInserted?: {
    attachmentId: string;
    // سایر مشخصات attachmentInserted
  };
  attachmentMatched?: {
    attachmentId: string;
    // سایر مشخصات attachmentMatched
  };
  likes: {
    [movieId: string]: {
      isLiked: boolean;
      count: number;
    };
  };
  // سایر فیلدهای مورد نیاز
}
