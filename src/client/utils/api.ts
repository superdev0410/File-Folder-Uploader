import axios from "axios";

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
  const blob = new Blob([res.data]);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
