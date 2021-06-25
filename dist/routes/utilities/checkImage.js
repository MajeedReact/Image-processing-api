"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
//this function checks if the image exists in the directory of the output path or not if it exists returns true
var fileExistsSync = function (path) {
    try {
        fs.accessSync(path);
        return true;
    }
    catch (err) {
        return false;
    }
};
//check if height or width not a number
var isNumber = function (height, width) {
    if (isNaN(height)) {
        return false;
    }
    else if (isNaN(width)) {
        return false;
    }
    else {
        return true;
    }
};
//check if height or width is a positive number or not
var isPositive = function (height, width) {
    if (height <= 0) {
        return false;
    }
    else if (width <= 0) {
        return false;
    }
    else {
        return true;
    }
};
exports.default = {
    fileExistsSync: fileExistsSync,
    isNumber: isNumber,
    isPositive: isPositive
};
