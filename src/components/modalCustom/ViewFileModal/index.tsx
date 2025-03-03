import { Modal } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";
import { modalCustomProps } from "../types";
import ViewFile from "@/components/ViewFile";

type viewFileModalProps = {
  modalCustom: modalCustomProps;
  file: {
    fileData: string;
  };
};

export const ViewFileModal = ({ modalCustom, file }: viewFileModalProps) => {
  const { fileData } = file ?? {};
  const [isPdf, setIsPdf] = useState(false);

  useEffect(() => {
    if (fileData) {
      if (fileData.includes("application/pdf")) {
        setIsPdf(true);
      } else setIsPdf(false);
    }
  }, [fileData]);

  const handleCloseModal = () => {
    modalCustom.handleClose();
  };

  return (
    <Modal
      open={modalCustom.open}
      onCancel={handleCloseModal}
      closable
      className={isPdf ? "modal-view-pdf" : "modal-view-img"}
      footer={null}
      destroyOnClose
    >
      <ViewFile fileData={fileData} />
    </Modal>
  );
};

export default ViewFileModal;
