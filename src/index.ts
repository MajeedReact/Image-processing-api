import express from "express";
import index from "./routes/index";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("server working as intended");
});

app.use("/api", index);

//filename, height, width
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});

export default app;
