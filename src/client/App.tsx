import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { MainPage, FileDownloadPage, FolderDownloadPage } from "@/client/pages";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/download-file/:file" element={<FileDownloadPage />} />
          <Route path="/download-folder/:folder" element={<FolderDownloadPage />} />
        </Routes>
      </BrowserRouter>
      
      <ToastContainer
        newestOnTop
        closeOnClick
        autoClose={1000}
        position="top-center"
        transition={Bounce}
      />
    </>
  );
};

export default App;
