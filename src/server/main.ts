import express from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";

import fileRouter from "@/server/routes/file";
import folderRouter from "@/server/routes/folder";

const app = express();
app.use(bodyParser.json());
app.use("/api/file", fileRouter);
app.use("/api/folder", folderRouter);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
