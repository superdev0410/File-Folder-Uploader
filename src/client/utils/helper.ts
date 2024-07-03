import { FileWithPath } from "react-dropzone";

export const saveFile = async (name: string, blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export const getFolderName = (file: FileWithPath) => {
  return file.path?.slice(1).split("/")[0] ?? file.webkitRelativePath.split("/")[0];
}
