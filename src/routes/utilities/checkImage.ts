const fs = require('fs');

//this function checks if the image exists in the directory of the output path or not if it exists returns true
const fileExistsSync = (path: string): boolean => {
  try {
    fs.accessSync(path);
    return true;
  } catch (err) {
    return false;
  }
};

//check if height or width not a number
const isNumber = (height: number, width: number): boolean => {
  if (isNaN(height)) {
    return false;
  } else if (isNaN(width)) {
    return false;
  } else {
    return true;
  }
};

//check if height or width is a positive number or not
const isPositive = (height: number, width: number): boolean => {
  if (height <= 0) {
    return false;
  } else if (width <= 0) {
    return false;
  } else {
    return true;
  }
};

export default {
  fileExistsSync,
  isNumber,
  isPositive
};
