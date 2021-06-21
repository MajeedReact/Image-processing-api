import express from "express";
const fs = require("fs");

//this function checks if the image exists in the directory of the output path or not if it exists returns true
const fileExistsSync = (outputPath: string) => {
  try {
    fs.accessSync(outputPath);
    return true;
  } catch (err) {
    return false;
  }
};

export default {
  fileExistsSync,
};
