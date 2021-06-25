import express from 'express';
import path from 'path';

//this gets the filename of the query
const getFileName = async (
  req: express.Request,
  res: express.Response
): Promise<string> => {
  const queryFileName = path.resolve(
    __dirname + `../../../../images/full/${req.query.filename}.jpg`
  );
  return queryFileName;
};

//this gets the output filename for checking cached images
const getOutputFile = async (
  req: express.Request,
  res: express.Response
): Promise<string> => {
  const outputPath = path.resolve(
    __dirname +
      `../../../../images/thumb/${req.query.filename}${req.query.height}x${req.query.width}.jpg`
  );
  return outputPath;
};
export default {
  getFileName,
  getOutputFile
};
