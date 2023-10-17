import { CommentCreate } from "./comment-create";
import { CommentList } from "./comment-list";
import { PostProps } from "./types/post";

export function Post(props: PostProps): JSX.Element {
  return (
    <div className="card" style={{ width: "30%", marginBottom: "20px" }}>
      <div className="card-body">
        <h3>{props.title}</h3>
        <CommentList comments={props.comments} />
        <CommentCreate postId={props.id} />
      </div>
    </div>
  );
}
