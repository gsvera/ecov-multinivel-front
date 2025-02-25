/* eslint-disable @typescript-eslint/no-explicit-any */
import { copyToClipboard } from "@/utils";
import { Button, message, Upload } from "antd";
import { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { UploadOutlined } from "@ant-design/icons";
import ButtonCustom from "@/components/ButtonCustom";
import { optionPayProps, payloadPayType } from "..";
import { useNotification } from "@/hooks/UseNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiProduct from "@/api/servicesEcov/apiProduct";
import { ResponseApi } from "@/api/responseApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store-redux/store";
import { PAY_METHOD, STATUS_PAY } from "@/config/constants";
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";

export const BankDeposit = ({
  idProduct,
  amountToCharge,
  handleClose,
}: optionPayProps) => {
  const { userDTO } = useSelector((state: RootState) => state.userSlice);
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const queryClient = useQueryClient();
  // const [valueAccount, setValuAccount] = useState("123 456 7890");
  const valueAccount = "123 456 7890"; // ESTO SE DEBE PASAR POR CONFIG AJUSTAR MAS ADELTANE
  // const [valueAccountKey, setValueAccountKey] = useState("123 456 123456789 0");
  const valueAccountKey = "123 456 123456789 0"; // ESTO SE DEBE PASAR POR CONFIG AJUSTAR MAS ADELTANE
  const [payFile, setPayFile] = useState<string | null>();
  const [fileList, setFileList] = useState<any[]>([]);

  const { mutate: savePay } = useMutation({
    mutationFn: (data: payloadPayType) => apiProduct.confirmBuyByDeposit(data),
    onSuccess: (data: ResponseApi) => handleSuccessSavePay(data),
    onError: (err) => openErrorNotification(err.message),
  });

  const handleSuccessSavePay = (data: ResponseApi) => {
    if (data.data.error) {
      return openErrorNotification(data.data.message);
    }
    openSuccessNotification(
      "Su pago se aguardado con éxito y se procedera a validar"
    );
    queryClient.invalidateQueries({
      queryKey: [REACT_QUERY_KEYS.product.getByUser(userDTO.id)],
    });
    handleClose();
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "application/pdf";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      setTimeout(() => {
        handleRemoveFile();
      }, 1000);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      setTimeout(() => {
        handleRemoveFile();
      }, 1000);
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChangeUploadFile = (info: any) => {
    setFileList(info.fileList);
    if (info.file.status === "uploading") {
      // setLoading(true);
      // return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url: any) => {
        setPayFile(url);
        // setLoading(false);
        // setImageUrl(url);
      });
    }
  };

  const handleRemoveFile = () => {
    setPayFile(null);
    setFileList([]);
  };

  const handleSavePay = () => {
    savePay({
      idUser: userDTO.id,
      idProduct: idProduct,
      amountToCharge,
      statusPay: STATUS_PAY.PAY,
      payMethod: PAY_METHOD.DEPOSIT,
      paymentFile: payFile,
    });
  };

  return (
    <>
      <p>
        Al realizar su deposito o transferencia debe cargar su comprobante en la
        opción de abajo:
      </p>
      <hr className="my-2" />
      <h4>Datos bancarios:</h4>
      <div className="t-bold">Cuenta</div>
      <div className="d-flex">
        <div>{valueAccount}</div>
        <div className="ml-2">
          <BsCopy
            onClick={() => copyToClipboard(valueAccount)}
            className="pointer click"
          />
        </div>
      </div>
      <div className="t-bold">Cuenta CLABE</div>
      <div className="d-flex">
        <div>{valueAccountKey}</div>
        <div className="ml-2">
          <BsCopy
            onClick={() => copyToClipboard(valueAccountKey)}
            className="pointer click"
          />
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <Upload
          beforeUpload={beforeUpload}
          onChange={handleChangeUploadFile}
          maxCount={1}
          onRemove={handleRemoveFile}
          fileList={fileList}
        >
          <Button
            className="btn-file"
            icon={<UploadOutlined />}
            // disabled={!dataContract}
          >
            Subir comprobante de pago
          </Button>
        </Upload>
      </div>
      <div className="mt-2">
        <ButtonCustom
          text="Guardar pago"
          onClick={handleSavePay}
          classNameButton="btn-lg-submit"
          disabled={!payFile}
        />
      </div>
    </>
  );
};

export default BankDeposit;
