/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Modal } from "antd";
import { modalCustomProps } from "../types";
import ViewFile from "@/components/ViewFile";
import ButtonCustom from "@/components/ButtonCustom";
import "./index.scss";
import { useMemo, useState } from "react";
import { useNotification } from "@/hooks/UseNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiPayment from "@/api/servicesEcov/apiPayment";
import { ObjectResponse, ResponseApi } from "@/api/responseApi";
import { payToApprovedProps } from "@/config/general-type";

type approvedPayModalProps = {
  modalCustom: modalCustomProps;
  payToApproved: payToApprovedProps;
  queryToInvalidate: string;
};

export const ApprovedPayModal = ({
  modalCustom,
  payToApproved,
  queryToInvalidate,
}: approvedPayModalProps) => {
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");

  const { mutate: confirmPay, isPending: isPendingConfirmPay } = useMutation({
    mutationFn: (data: any) => apiPayment.confirmPayByBuy(data),
    onSuccess: (data: ResponseApi) => handleSuccessConfirmPay(data.data),
    onError: (error) => openErrorNotification(error.message),
  });

  const { mutate: rejectPay, isPending: isPendingRejectPay } = useMutation({
    mutationFn: (data: any) => apiPayment.rejectPay(data),
    onSuccess: (data: ResponseApi) => handleSuccessRejectPay(data.data),
    onError: (err) => openErrorNotification(err.message),
  });

  const disabledBtn = useMemo(
    () => isPendingConfirmPay || isPendingRejectPay,
    [isPendingConfirmPay, isPendingRejectPay]
  );

  const handleSuccessConfirmPay = (data: ObjectResponse) => {
    if (data.error) return openErrorNotification(data.message);
    refreshDataAfterSuccessMutate("Se aprovo el pago con éxito");
  };

  const handleSuccessRejectPay = (data: ObjectResponse) => {
    if (data.error) return openErrorNotification(data.message);
    refreshDataAfterSuccessMutate("Se denego el pago con éxito");
  };

  const refreshDataAfterSuccessMutate = (msn: string) => {
    openSuccessNotification(msn);
    queryClient.invalidateQueries({
      queryKey: [queryToInvalidate],
    });
    handleOnClose();
  };

  const handleOnClose = () => {
    modalCustom.handleClose();
  };

  const handleBtnConfirm = () => {
    confirmPay({ idBuy: payToApproved.idBuy, idPay: payToApproved.idPay });
  };

  const handleBtnReject = () => {
    if (!reason) {
      return openErrorNotification(
        "Para denegar el pago es obligatorio agregar un comentario"
      );
    }
    rejectPay({ idPay: payToApproved.idPay, observation: reason });
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
        <ViewFile fileData={payToApproved.file || ""} />
      </div>
      <div className="mt-1 mb-3">
        <label>Observaciones</label>
        <Input.TextArea
          maxLength={500}
          showCount
          rows={2}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="d-flex jus-between">
        <ButtonCustom
          text="Denegar"
          onClick={handleBtnReject}
          classNameButton="btn-lg-cancel"
          disabled={disabledBtn}
        />
        <ButtonCustom
          text="Confirmar pago"
          onClick={handleBtnConfirm}
          classNameButton="btn-lg-submit"
          disabled={disabledBtn}
        />
      </div>
    </Modal>
  );
};

export default ApprovedPayModal;
