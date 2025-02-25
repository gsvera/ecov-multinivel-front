import { Modal } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";
import { makePdfBase64 } from "@/utils";
import { modalCustomProps } from "../types";

type viewFileModalProps = {
  modalCustom: modalCustomProps;
  file: {
    fileData: string;
  };
};

export const ViewFileModal = ({ modalCustom, file }: viewFileModalProps) => {
  const { fileData } = file ?? {};
  const [filePdf, setFilePdf] = useState<string | null>(null);
  const [fileImage, setFileImage] = useState<string | null>();

  useEffect(() => {
    if (fileData) {
      if (fileData.includes("application/pdf")) {
        const url = makePdfBase64(fileData);
        setFilePdf(url);
        return () => URL.revokeObjectURL(url);
      }
      setFileImage(fileData);
    }
  }, [fileData]);

  const handleCloseModal = () => {
    setFilePdf(null);
    setFileImage(null);
    modalCustom.handleClose();
  };
  return (
    <Modal
      open={modalCustom.open}
      onCancel={handleCloseModal}
      closable
      className={filePdf ? "modal-view-pdf" : "modal-view-img"}
      footer={null}
    >
      {filePdf && (
        <iframe src={filePdf} style={{ width: "100%", height: "80vh" }} />
      )}
      {fileImage && (
        <img src={fileImage} style={{ width: "100%", height: "100%" }} />
      )}
    </Modal>
  );
};

export default ViewFileModal;
