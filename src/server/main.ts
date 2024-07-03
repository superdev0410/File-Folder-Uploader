import express from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";

import fileRouter from "@/server/routes/file";

const app = express();
app.use(bodyParser.json());
app.use("/api/file", fileRouter);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
