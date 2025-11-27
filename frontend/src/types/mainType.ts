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

export interface ShowWatchState {
  pagination: Pagination;
  data: Video[];
}

export interface Pagination {
  skip: number;
  take: number;
  hasMore: boolean;
}

export interface DropdownItem {
  label?: string;
  icon?: any;
  onClick?: () => void;
  divider?: boolean;
}

export interface DropdownConfig {
  sender: string;
  userProfile: any;
  userNameSender: string;
}
