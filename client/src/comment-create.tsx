import axios from "axios";
import { useState } from "react";

export function CommentCreate(props: { postId: string }): JSX.Element {
  const [content, setContent] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${props.postId}/comments`, {
      content,
    });
    setContent("");
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">New comment</label>
          <input
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
