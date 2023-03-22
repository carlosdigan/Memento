export type Comment = {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  author: CommentAuthor;
  saved: boolean
};

type CommentAuthor = {
  username: string;
  id: string;
};
