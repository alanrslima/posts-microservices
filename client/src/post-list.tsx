import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { PostProps } from "./types/post";

export function PostList(): JSX.Element {
  const [posts, setPosts] = useState<{
    [key: string]: PostProps;
  }>({});

  async function fetchPosts() {
    const { data } = await axios.get("http://posts.com/posts");
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <Post
      comments={post.comments}
      key={post.id}
      id={post.id}
      title={post.title}
    />
  ));

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}
