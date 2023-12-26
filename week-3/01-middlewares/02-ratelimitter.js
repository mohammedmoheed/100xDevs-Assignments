import request from "supertest";
import assert from "assert";
import express from "express";
const app = express();
app.use(express.json());
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second
let requestCount = {};
setInterval(() => {
  requestCount;
}, 1000);

function rateLimiter(req, res, next) {
  // const { ip } = req;
  // const userId = ip;
  const userId = req.headers["user-id"];
  console.log(requestCount);

  if (!requestCount[userId]) {
    requestCount[userId] = 1;
  } else {
    requestCount[userId]++;
  }

  if (requestCount[userId] > 5) {
    return res
      .status(429)
      .send("Too many requests from this ID, please try again later");
  }

  next();
}
console.log(requestCount);

app.use(rateLimiter);

app.get("/user", function (req, res) {
  res.status(200).json({ name: "moheed" });
});

app.get("/request", function (req, res) {
  res.status(200).json(requestCount);
});
app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.listen(3000, () => {
  console.log("listening on 3000");
});

export default app;
