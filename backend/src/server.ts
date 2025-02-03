import express from "express";
import bodyParser from "body-parser";
import videoRoutes from "./infrastructure/routes/videoRoutes";
import messageRoutes from "./infrastructure/routes/messageRoutes";
import userRoutes from "./infrastructure/routes/userRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/videos", videoRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
