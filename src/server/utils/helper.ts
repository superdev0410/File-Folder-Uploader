import fs from "fs";
import JSZip from "jszip";

export const addFolderToZip = (zip: JSZip, folderPath: string, basePath: string) => {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = `${folderPath}/${file}`;
    const fileStatus = fs.statSync(filePath);

    if (fileStatus.isFile()) {
      const fileContent = fs.readFileSync(filePath);
      const relativePath = filePath.replace(basePath, '');

      zip.file(relativePath, fileContent);
    } else if (fileStatus.isDirectory()) {
      addFolderToZip(zip, filePath, basePath);
    }
  })
}
