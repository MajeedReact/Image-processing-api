import express, { json } from "express";
import sharp from "sharp";
import checker from "./checkImage";
import file from "./paths";

//this function rezise the image and gets the file input and sends it to the output directory
const sharpResize = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  try {
    const filePath = await file.getFileName(req, res);
    const outputPath = await file.getOutputFile(req, res);

    //converting height and width from string to a number
    const height = Number(req.query.height) as number;
    const width = Number(req.query.width) as number;

    const check = async () => {
      const test = checker.fileExistsSync(outputPath);
      return test;
    };

    //if file exists in thumb with same height and width then load the cached image
    if (await check()) {
      console.log("Cached image loaded");
      next();
    } else if ((await checker.fileExistsSync(filePath)) == false) {
      res.status(400).send(`Input file is missing`);
      next();
    } else if (height <= 0 || width <= 0) {
      res
        .status(400)
        .send(`Invalid height or width. height:${height}, width:${width}`);
      next();
    } else if (isNaN(height) || isNaN(width)) {
      res
        .status(400)
        .send(
          `Expected to recieve a number for height and width but instead recieved a character, height:${height} width:${width}`
        );
      next();
    } else {
      console.log("Resizing the orginal image with sharp");
      await sharp(filePath)
        .resize(height, width)
        .jpeg({
          quality: 90,
        })
        .toFile(outputPath);
      next();
    }
  } catch (err) {
    res.send("An Error occured processing your image :/ \n" + err);
  }
};

export default sharpResize;
