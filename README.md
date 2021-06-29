# Image-processing-api
This is an Image processing API project that was assigned to me through Udacity, this API resize the images based on the query parameter given in the url, it also include Jasmine unit test and supertest.

**At the momment it works with JPG extension images only!**

## How it works:
1. Place your original image in (full) folder
2. run `npm run start`
3. type the url with the specified query parameters for example: `localhost:3000/api/image?filename=fjord&height=300&width=200`
   - Where as fjord is the image name and height is 300 and width 200
   
3. If the image is being processed for the first time then it will resize it and save it in ( thumb ) folder 
4. Cache image is loaded if the image is requested with the same height and width exisits in thumbs folder

*Note: It uses sharp node package manager to resize and reduce image quality by 10% (for less size) but it is changeable to how you please.*
