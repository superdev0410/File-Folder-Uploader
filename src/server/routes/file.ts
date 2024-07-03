import { Router, Request, Response } from "express";
import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("./files", { recursive: true });
    cb(null, "./files");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const fileRouter = Router();

fileRouter.post("/upload", upload.array("files"), async (req: Request, res: Response) => {
  res.sendStatus(200);
});

fileRouter.get("/download/:file", async (req: Request, res: Response) => {
  const { file } = req.params;
  res.download(`./files/${file}`);
});

export default fileRouter;
