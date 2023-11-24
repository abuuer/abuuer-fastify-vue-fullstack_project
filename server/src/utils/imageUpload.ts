import fs from "fs";
import path from "path";
import sharp from "sharp";

export const uploadImage = async (
  data: Buffer | undefined,
  fileName: string,
  maxWidth: number = 320,
  maxHeight: number = 320
) => {
  if (data) {
    const uploadPath = "./uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    const filename = Date.now() + path.extname(fileName);
    const fileDir = `${uploadPath}/${filename}`;

    // Resize the image using sharp
    const resizedData = await sharp(data)
      .resize({
        width: maxWidth,
        height: maxHeight,
      })
      .toBuffer();

    fs.writeFileSync(fileDir, resizedData, "binary");
    return filename;
  } else {
    throw new Error("No file provided");
  }
};

export const deleteImage = async (filename: string): Promise<void> => {
  const filePath = `./uploads/${filename}`;

  // Check if the file exists before attempting to delete
  if (fs.existsSync(filePath)) {
    // Delete the file
    fs.unlinkSync(filePath);
  } else {
    throw new Error(`File not found: ${filename}`);
  }
};
