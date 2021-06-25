import express from 'express';
import checker from './checkImage';
import file from './paths';
import resizing from './resizeImage';

//this function rezise the image and gets the file input and sends it to the output directory
const sharpResize = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  try {
    const filePath: string = await file.getFileName(req, res);
    const outputPath: string = await file.getOutputFile(req, res);

    //converting height and width from string to a number
    const height = Number(req.query.height) as number;
    const width = Number(req.query.width) as number;

    //if file exists in thumb with same height and width then load the cached image
    if (checker.fileExistsSync(outputPath)) {
      console.log('Cached image loaded');
      next();
    } else if (!checker.fileExistsSync(filePath)) {
      res.status(400).send(`Input file is missing`);
      next();
    } else if (!checker.isPositive(height, width)) {
      res
        .status(400)
        .send(`Invalid height or width. height:${height}, width:${width}`);
      next();
    } else if (!checker.isNumber(height, width)) {
      res
        .status(400)
        .send(
          `Expected to recieve a number for height and width but instead recieved a character, height:${height} width:${width}`
        );
      next();
    } else {
      console.log('Resizing the orginal image with sharp');
      await resizing(filePath, outputPath, height, width);
      next();
    }
  } catch (err) {
    res.send('An Error occured processing your image :/ \n' + err);
  }
};

export default sharpResize;
