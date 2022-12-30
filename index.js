require("./config/db.config").connectDB();
const express = require("express");
const welcomeRouter = require("./routes/welcome.routes");
const studentRouter = require("./routes/public/student.routes");
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
