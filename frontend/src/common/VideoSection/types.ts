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
