"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
//this function checks if the image exists in the directory of the output path or not if it exists returns true
var fileExistsSync = function (outputPath) {
    try {
        fs.accessSync(outputPath);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.default = {
    fileExistsSync: fileExistsSync,
};
