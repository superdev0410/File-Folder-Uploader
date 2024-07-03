import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { downloadFolder } from "@/client/utils/api";

const FolderDownloadPage = () => {
  const { folder } = useParams();

  useEffect(() => {
    if (folder) {
      downloadFolder(folder);
    }
  }, [folder]);

  return (
    <></>
  );
}

export default FolderDownloadPage;
