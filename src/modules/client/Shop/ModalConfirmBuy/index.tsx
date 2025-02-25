import { Modal, Tabs } from "antd";
import BankDeposit from "./BankDeposit";
import IntegrationPay from "./IntegrationPay";
import { PAY_METHOD } from "@/config/constants";

type modalConfirmBuyProps = {
  open: boolean;
  idProduct: number | null;
  amountToCharge: number;
  handleClose: () => void;
};

export type optionPayProps = {
  idProduct: number | null;
  amountToCharge: number;
  handleClose: () => void;
};

export type payloadPayType = {
  idUser: string | null;
  idProduct: number | null;
  amountToCharge: number;
  statusPay: number;
  payMethod: PAY_METHOD;
  paymentFile?: string | null;
};

export const ModalConfirmBuy = ({
  open,
  handleClose,
  idProduct,
  amountToCharge,
}: modalConfirmBuyProps) => {
  const items = [
    {
      key: "1",
      label: "Deposito bancario",
      children: (
        <BankDeposit
          idProduct={idProduct}
          handleClose={handleClose}
          amountToCharge={amountToCharge}
        />
      ),
    },
    {
      key: "2",
      label: "Pago en linea",
      children: (
        <IntegrationPay
          idProduct={idProduct}
          handleClose={handleClose}
          amountToCharge={amountToCharge}
        />
      ),
    },
  ];

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      closable
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <Tabs defaultActiveKey="1" items={items} />
    </Modal>
  );
};

export default ModalConfirmBuy;
