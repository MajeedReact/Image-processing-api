import supertest from 'supertest';
import app from '../index';
import resizing from '../routes/utilities/resizeImage';
import path from 'path';
import checkImage from '../routes/utilities/checkImage';

const request = supertest(app);

//Input values used
const height: number = 810;
const width: number = 320;
const minusHeight = -810;
const character = 'a' as unknown as number;

const imageName: string = 'Jeddah';
const inputPath = path.resolve(
  __dirname + `../../../images/full/${imageName}.jpg`
);
const outputPath = path.resolve(
  __dirname + `../../../images/thumb/${imageName}${height}x${width}.jpg`
);

describe('Endpoint responses', () => {
  it('Gets the server status to check if it is connected or not', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('Should reject request and display input file missing', async () => {
    const response = await request.get('/api/image');
    expect(response.status).toBe(400);
  });

  it('Request accepted and image is either resized or loading the cached image', async () => {
    const response = await request.get(
      '/api/image?filename=fjord&height=300&width=300'
    );
    expect(response.status).toBe(200);
  });

  it('Should reject request and display Invalid height or width.', async () => {
    const response = await request.get(
      '/api/image?filename=fjord&height=300&width=-300'
    );
    expect(response.text).toBe(
      `Invalid height or width. height:${300}, width:${-300}`
    );
  });

  it('Request is rejected and display Expected to recieve a number for height and width but instead recieved a character', async () => {
    const response = await request.get(
      '/api/image?filename=fjord&height=abc&width=300'
    );
    expect(response.text).toBe(
      `Expected to recieve a number for height and width but instead recieved a character, height:NaN width:300`
    );
  });
});

describe('\nTesting Image processing', () => {
  it('It should create an image with the random values', async () => {
    expect(await resizing(inputPath, outputPath, height, width))
      .toHaveBeenCalled;
  });

  it('It should reject any height or width that is not positive or equal to zero', () => {
    expect(checkImage.isPositive(minusHeight, width)).toBeFalse();
  });

  it('It should reject any character that is not a number in height or width', () => {
    expect(checkImage.isNumber(height, character)).toBeFalse();
  });
});
