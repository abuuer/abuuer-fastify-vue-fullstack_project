import multer from "multer";
import fs from "fs";
import path from "path";
import fastify, { FastifyRequest } from "fastify";
import util from "util";
import { pipeline } from "stream";
import { MultipartFile } from "@fastify/multipart";

const pump = util.promisify(pipeline);

export const uploadImage = async (
  data: Buffer | undefined,
  fileName: string
) => {
  if (data) {
    const uploadPath = "./uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    const filename = Date.now() + path.extname(fileName);
    const fileDir = `${uploadPath}/${filename}`;
    fs.writeFileSync(fileDir, data, "binary");
    const fullPath = path.resolve(fileDir);
    return fullPath;
  } else {
    throw new Error("No file provided");
  }
};
