export type CommentProps = {
  id: string;
  content: string;
  status: CommentStatusProps;
};

export type CommentStatusProps = "pending" | "approved" | "rejected";
