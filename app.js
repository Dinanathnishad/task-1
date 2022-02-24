require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
require("./db/db_conn");
const userRouter = require("./routes/user");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
// const port = 9000;
const app = express();

app.use(express.json());
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
