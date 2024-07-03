import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import JSZip from "jszip";

import { addFolderToZip } from "@/server/utils/helper";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const folderRouter = Router();

folderRouter.post("/upload", upload.array("files"), async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const paths = req.body.paths;

  for (let i = 0; i < files.length; i++) {
    const uploadPath = `./folder/${paths[i]}`;
    fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
    fs.writeFileSync(uploadPath, files[i].buffer);
  }

  res.sendStatus(200);
});

folderRouter.get("/download/:folder", async (req: Request, res: Response) => {
  const { folder } = req.params;
  const zip = new JSZip();

  addFolderToZip(zip, `./folder/${folder}`, "./folder");
  const zipped = zip.generateNodeStream({ type: "nodebuffer" });
  res.json(zipped);
});

export default folderRouter;
