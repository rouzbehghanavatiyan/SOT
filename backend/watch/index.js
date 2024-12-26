const express = require("express");
const app = express();
const cors = require("cors");
const watch = require("./src/routes/watch");

app.use(cors());

app.use("/api", watch);

const startServer = () => {
  try {
    return app.listen(4005, () =>
      console.log("server is running on port", 4005)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();