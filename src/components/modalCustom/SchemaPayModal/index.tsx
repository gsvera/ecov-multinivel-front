import { Modal } from "antd";
import { modalCustomProps } from "../types";
import CustomTable from "@/components/CustomTable";
import { convertCurrency } from "@/utils";
import "./index.scss";

type schemaPayModalProps = {
  modalCustom: modalCustomProps;
  listPay: [];
};

export const SchemaPayModal = ({
  modalCustom,
  listPay,
}: schemaPayModalProps) => {
  const dataTableHead = [
    {
      index: "numberPay",
      label: "Semana",
      render: (row: number) => <div>{row}</div>,
    },
    {
      index: "amount",
      label: "Monto",
      render: (row: number) => <div>{convertCurrency(row)}</div>,
    },
  ];

  const handleCloseModal = () => {
    modalCustom.handleClose();
  };

  return (
    <Modal
      className="schema-pay-modal"
      open={modalCustom.open}
      closable
      onCancel={handleCloseModal}
      title="Esquema de pagos"
      footer={null}
    >
      <CustomTable
        dataHead={dataTableHead as []}
        dataBody={listPay}
        tableClass={"table-pays"}
      />
    </Modal>
  );
};

export default SchemaPayModal;
