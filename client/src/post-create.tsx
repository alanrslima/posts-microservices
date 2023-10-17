import axios from "axios";
import { useState } from "react";

export function PostCreate(): JSX.Element {
  const [title, setTitle] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await axios.post("http://posts.com/posts/create", {
      title,
    });
    setTitle("");
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
            name="title"
            id="title"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
