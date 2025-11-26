import express from "express";
import router from "./routes/users.js";
const app = express();

app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
  //   res.render('index')
});

app.get("/movies", (req, res) => {
  console.log("Here");
  res.send("Movies");
});

app.use("/users", router);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(3000);
