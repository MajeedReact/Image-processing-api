import express from "express";
import sharpResize from "../utilities/middlewareSharp";

const path = require("path");
const image = express.Router();

image.get("/", sharpResize, async (req, res) => {
  try {
    res.sendFile(
      path.resolve(
        __dirname +
          `../../../../images/thumb/${req.query.filename}${req.query.height}x${req.query.width}.jpg`
      )
    );
  } catch (err) {
    res.send("an error occured :/" + err);
  }
});

export default image;
