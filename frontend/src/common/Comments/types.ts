export interface User {
  id: string;
  userName: string;
  // ... other user properties
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  profile: string;
  score: number;
  desc: string;
  parentId: string | null;
  replies: Comment[];
  // ... other comment properties
}

export interface MovieInfo {
  attachmentInserted?: {
    attachmentId: string;
    // ... other properties
  };
  attachmentMatched?: {
    attachmentId: string;
    // ... other properties
  };
  userInserted?: User;
  userMatched?: User;
  profileInserted?: string;
  profileMatched?: string;
  // ... other movie properties
}
