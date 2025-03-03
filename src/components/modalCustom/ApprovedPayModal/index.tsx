import { Modal } from "antd";
import { modalCustomProps } from "../types";
import ViewFile from "@/components/ViewFile";
import ButtonCustom from "@/components/ButtonCustom";
import "./index.scss";

type approvedPayModalProps = {
  modalCustom: modalCustomProps;
  file: string | null;
  btnDisabled: boolean;
  onSuccess: () => void;
};

export const ApprovedPayModal = ({
  modalCustom,
  file,
  btnDisabled,
  onSuccess,
}: approvedPayModalProps) => {
  const handleOnClose = () => {
    modalCustom.handleClose();
  };
  const handleClickBtn = () => {
    onSuccess();
  };
  return (
    <Modal
      open={modalCustom.open}
      closable
      onCancel={handleOnClose}
      footer={null}
      className="approved-pay-modal"
      destroyOnClose
    >
      <div className="content-media">
        <ViewFile fileData={file || ""} />
      </div>
      <div className="mt-2">
        <ButtonCustom
          text="Confirmar pago"
          onClick={handleClickBtn}
          classNameButton="btn-lg-submit"
          disabled={btnDisabled}
        />
      </div>
    </Modal>
  );
};

export default ApprovedPayModal;
