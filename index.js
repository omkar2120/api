import connectDB from "./config/db.config.js";
import express from "express";
import welcomeRouter from "./routes/welcome.routes.js";
import studentRouter from "./routes/public/student.routes.js";

connectDB();

const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", welcomeRouter);
app.use("/public", studentRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const hello = () => console.log(`Example app listening on port ${port}`);
app.listen(port, hello());
