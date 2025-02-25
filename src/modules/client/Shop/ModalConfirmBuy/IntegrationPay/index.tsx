import { ResponseApi } from "@/api/responseApi";
import apiProduct from "@/api/servicesEcov/apiProduct";
import ButtonCustom from "@/components/ButtonCustom";
import { useNotification } from "@/hooks/UseNotification";
import { RootState } from "@/store-redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { optionPayProps, payloadPayType } from "..";
import { PAY_METHOD, STATUS_PAY } from "@/config/constants";
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";

export const IntegrationPay = ({
  idProduct,
  amountToCharge,
  handleClose,
}: optionPayProps) => {
  const { userDTO } = useSelector((state: RootState) => state.userSlice);
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const queryClient = useQueryClient();

  const { mutate: confirmBuyProduct } = useMutation({
    mutationFn: (data: payloadPayType) => apiProduct.confirmBuyProduct(data),
    onSuccess: (data: ResponseApi) => handleSuccessConfirmBuy(data),
    onError: (err) => openErrorNotification(err.message),
  });

  const handleSuccessConfirmBuy = (data: ResponseApi) => {
    if (data.data.error) {
      openErrorNotification(data.data.message);
      return;
    }
    openSuccessNotification("Se realizo la comprar correctamente,");
    queryClient.invalidateQueries({
      queryKey: [REACT_QUERY_KEYS.product.getByUser(userDTO.id)],
    });
    handleClose();
  };

  const handleIntegrationPay = () => {
    confirmBuyProduct({
      idUser: userDTO.id,
      idProduct: idProduct,
      amountToCharge,
      statusPay: STATUS_PAY.PAY,
      payMethod: PAY_METHOD.ON_LINE,
      paymentFile: "FOLIO-XXXX",
    });
  };

  return (
    <>
      <div className="mb-2">Aqui se debe agregar la integracion online</div>
      <ButtonCustom
        text="Ejecutar pago"
        onClick={handleIntegrationPay}
        classNameButton="btn-submit"
        disabled // SE DESHABILITA HASTA QUE SE RALIZE LA INEGRACION
      />
    </>
  );
};

export default IntegrationPay;
