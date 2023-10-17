import cors from "cors";
import { randomUUID } from "crypto";

import axios from "axios";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId: {
  [key: string]: { id: string; content: string; status: "pending" }[];
} = {};

app.get("/posts/:id/comments", (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req: Request, res: Response) => {
  const commentId = randomUUID();
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "comment-created",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req: Request, res: Response) => {
  console.log("Received event", req.body.type);
  const { type, data } = req.body;
  if (type === "comment-moderated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    if (comment) {
      comment.status = status;
    }
    await axios.post("http://event-bus-srv:4005/events", {
      type: "comment-updated",
      data: { id, status, postId, content },
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
