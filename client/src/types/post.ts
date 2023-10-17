import { CommentProps } from "./comment";

export type PostProps = {
  id: string;
  title: string;
  comments: CommentProps[];
};
