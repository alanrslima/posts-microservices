import axios from "axios";
import bodyParser from "body-parser";

import cors from "cors";
import { randomUUID } from "crypto";
import express, { Request, Response } from "express";
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts: { [key: string]: { id: string; title: string } } = {};

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post("/posts/create", async (req: Request, res: Response) => {
  const id = randomUUID();
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "post-created",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req: Request, res: Response) => {
  console.log("Received event", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("v1000");
  console.log("Listening on 4000");
});
