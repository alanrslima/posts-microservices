import { Comment } from "./comment";

export type Post = {
  [key: string]: {
    id: string;
    title: string;
    comments: Comment[];
  };
};
