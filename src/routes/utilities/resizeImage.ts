import sharp from 'sharp';

const resizing = async (
  imagePath: string,
  outputPath: string,
  height: number,
  width: number
): Promise<void> => {
  await sharp(imagePath)
    .resize(height, width)
    .jpeg({
      quality: 90
    })
    .toFile(outputPath);
};

export default resizing;
