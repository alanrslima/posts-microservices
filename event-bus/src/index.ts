import axios from "axios";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import "express-async-errors";

const app = express();
app.use(bodyParser.json());

const events: any[] = [];

app.post("/events", (req: Request, res: Response) => {
  const event = req.body;
  events.push(event);
  axios
    .post("http://posts-clusterip-srv:4000/events", event)
    .catch(console.log);
  axios.post("http://comments-srv:4001/events", event).catch(console.log);
  axios.post("http://query-srv:4002/events", event).catch(console.log);
  axios.post("http://moderation-srv:4003/events", event).catch(console.log);
  res.send({});
});

app.get("/events", (req: Request, res: Response) => {
  res.send(events);
});

app.use((err: Error, req: Request, res: Response) => {
  console.log("ERROR HANDLER", err);
  res.send({});
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
