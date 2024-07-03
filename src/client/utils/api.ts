import axios from "axios";

import { saveFile } from "@/client/utils/helper";

export const uploadFiles = async (files: FileList) => {
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    data.append("files", files[i]);
  }
  await axios.post("/api/file/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export const downloadFile = async (name: string) => {
  const res = await axios.get(`/api/file/download/${name}`, { responseType: "blob" });
  saveFile(name, new Blob([res.data]));
}

export const uploadFolder = async (files: FileList) => {
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    data.append("files", files[i]);
    data.append("paths", files[i].webkitRelativePath);
  }
  await axios.post("/api/folder/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export const downloadFolder = async (folder: string) => {
  const res = await axios.get(`/api/folder/download/${folder}`);
  console.log(res.data);
  const dataArray = new Uint8Array(res.data.data);
  saveFile(`${folder}.zip`, new Blob([dataArray]));
}
