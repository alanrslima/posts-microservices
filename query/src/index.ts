import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { Post } from "./types/post";
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts: Post = {};

const handleEvent = (type: string, data: any) => {
  if (type === "post-created") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "comment-created") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "comment-updated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    if (comment) {
      comment.status = status;
      comment.content = content;
    }
  }
};

app.get("/posts", (_: Request, res: Response) => {
  res.send(posts);
});

app.post("/events", (req: Request, res: Response) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  try {
    const { data } = await axios.get("http://event-bus-srv:4005/events");
    for (let event of data) {
      console.log("Processing event:", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error: any) {
    console.log(error.message);
  }
});
