import { Modal } from "antd";
import { modalCustomProps } from "../types";

export const TermsAndConditions = ({ open, handleClose }: modalCustomProps) => {
  const handleCloseModal = () => {
    handleClose();
  };
  return (
    <Modal
      title="Terminos y condiciones"
      open={open}
      closable
      onCancel={handleCloseModal}
      footer={null}
      style={{ top: "30px" }}
    >
      <div>
        {/* ESTO DEBE CAMBIARSE POR LOS TEXTO REALES */}
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex id odit
          doloribus rem, delectus ea voluptatibus quibusdam adipisci
          accusantium? Optio voluptas voluptatem libero minus explicabo rem
          accusamus suscipit dolorem quaerat.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex id odit
          doloribus rem, delectus ea voluptatibus quibusdam adipisci
          accusantium? Optio voluptas voluptatem libero minus explicabo rem
          accusamus suscipit dolorem quaerat.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex id odit
          doloribus rem, delectus ea voluptatibus quibusdam adipisci
          accusantium? Optio voluptas voluptatem libero minus explicabo rem
          accusamus suscipit dolorem quaerat.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex id odit
          doloribus rem, delectus ea voluptatibus quibusdam adipisci
          accusantium? Optio voluptas voluptatem libero minus explicabo rem
          accusamus suscipit dolorem quaerat.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex id odit
          doloribus rem, delectus ea voluptatibus quibusdam adipisci
          accusantium? Optio voluptas voluptatem libero minus explicabo rem
          accusamus suscipit dolorem quaerat.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex id odit
          doloribus rem, delectus ea voluptatibus quibusdam adipisci
          accusantium? Optio voluptas voluptatem libero minus explicabo rem
          accusamus suscipit dolorem quaerat.
        </p>
      </div>
    </Modal>
  );
};

export default TermsAndConditions;
