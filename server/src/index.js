const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(todoRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
