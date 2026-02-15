export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';

export interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
  completedAt: string | null;
  authorId: string;
  author: User;
  _count: {
    votes: number;
    comments: number;
  };
}

export interface Vote {
  id: string;
  userId: string;
  featureRequestId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  featureRequestId: string;
  createdAt: string;
  user: User;
}
