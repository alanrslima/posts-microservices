import axios from "axios";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === "comment-created") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://event-bus-srv:4005/events", {
      type: "comment-moderated",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
