export interface User {
  id: number;
  userName: string;
  // other user properties
}

export interface VideoAttachment {
  attachmentId: string;
  // other attachment properties
}

export interface VideoItem {
  id: string;
  userInserted?: User;
  userMatched?: User;
  profileInserted?: string;
  profileMatched?: string;
  attachmentInserted?: VideoAttachment;
  attachmentMatched?: VideoAttachment;
  likes?: Record<string, { isLiked: boolean; count: number }>;
  follows?: Record<string, { isFollowed: boolean }>;
  // other video properties
}

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  disabled?: boolean;
}

export interface VideoSectionProps {
  video?: any;
  showLiked?: boolean;
  isPlaying?: boolean;
  onVideoPlay?: (videoId: string) => void;
  onLikeClick?: (video: any) => void;
  onFollowClick?: (video: any, positionVideo: number) => void;
  toggleDropdown: (index: string) => void;
  dropdownItems: (data: any) => any[];
  openDropdowns: Record<string, boolean>;
  baseURL?: string;
  positionVideo: number;
  setOpenDropdowns?: any;
  countLiked?: number;
  showCommentsIcon?: boolean;
  showComments?: boolean;
  setShowComments?: React.Dispatch<React.SetStateAction<boolean>>;
  result?: any;
  score?: number;
  endTime?: number | boolean;
  isLiked?: any;
  isFollowed?: any;
}
