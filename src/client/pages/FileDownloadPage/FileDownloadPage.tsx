import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { downloadFile } from "@/client/utils/api";

const FileDownloadPage = () => {
  const { file } = useParams();

  useEffect(() => {
    if (file) {
      downloadFile(file);
    }
  }, [file]);

  return (
    <></>
  )
}

export default FileDownloadPage;
