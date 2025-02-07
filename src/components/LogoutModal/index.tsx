import { Modal } from "antd";
import "./index.scss";
import ButtonCustom from "../ButtonCustom";

type logoutModalProps = {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

const LogoutModal = ({
  open,
  handleClose,
  handleConfirm,
}: logoutModalProps) => {
  return (
    <Modal
      className="logout-modal"
      open={open}
      closable
      onCancel={handleClose}
      footer={null}
    >
      <div className="content-modal">
        <p className="t-m">¿Deseas cerrar la sesión?</p>
      </div>
      <div className="footer-btns">
        <div className="content-btn">
          <ButtonCustom
            text="No, cancelar"
            classNameButton="btn-footer btn-cancel"
            onClick={handleClose}
          />
        </div>
        <div className="content-btn">
          <ButtonCustom
            text="Si, salir"
            classNameButton="btn-footer btn-confirm"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
