/* eslint-disable @typescript-eslint/no-explicit-any */
import { ItemsResponse, ObjectResponse, ResponseApi } from "@/api/responseApi";
import apiProduct from "@/api/servicesEcov/apiProduct";
import CustomPaginated, { Pagination } from "@/components/CustomPaginated";
import CustomTable from "@/components/CustomTable";
import DelaySearcher from "@/components/DelaySearcher";
import { defaultPageParams, PAY_METHOD, STATUS_PAY } from "@/config/constants";
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "antd";
import { useEffect, useMemo, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import ViewFileModal from "@/components/modalCustom/ViewFileModal";
import ButtonCustom from "@/components/ButtonCustom";
import { ApprovedPayModal } from "@/components/modalCustom/ApprovedPayModal";
import { buyType, payToApprovedProps } from "@/config/general-type";
import { useNotification } from "@/hooks/UseNotification";
import apiPayment from "@/api/servicesEcov/apiPayment";

export const Buys = () => {
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const [pageParams, setPageParams] = useState({
    ...defaultPageParams,
    word: "",
  });
  const [fileView, setFileView] = useState({ fileData: "" });
  const [openModalViewFile, setOpenModalViewFile] = useState(false);
  const [openApprovedModal, setOpenApprovedModal] = useState(false);
  const [payToApproved, setPayToApproved] = useState<payToApprovedProps>({
    idBuy: null,
    idPay: null,
    file: null,
  });
  const queryClient = useQueryClient();

  const { data: dataList, isPending: isPendingDataList } = useQuery({
    queryKey: [REACT_QUERY_KEYS.product.getPurchased("list-purchased")],
    queryFn: () => apiProduct.getPurchasedProductByFilter(pageParams),
    ...{
      select: (data: ResponseApi) => data.data,
    },
  });

  const { mutate: confirmBuy, isPending: isPendingConfirmPay } = useMutation({
    mutationFn: (data: any) => apiPayment.confirmPayByBuy(data),
    onSuccess: (data: ResponseApi) => handleSuccessConfirmBuy(data.data),
    onError: (err) => openErrorNotification(err.message),
  });

  const handleSuccessConfirmBuy = (data: ObjectResponse) => {
    if (data.error) {
      return openErrorNotification(data.message);
    }
    openSuccessNotification("Se ha confirmado la compra");
    queryClient.invalidateQueries({
      queryKey: [REACT_QUERY_KEYS.product.getPurchased("list-purchased")],
    });
    setOpenApprovedModal(false);
  };

  const tableHead = [
    {
      index: "id",
      label: <div className="t-center">Numero de orden</div>,
      render: (row: number) => <div className="t-center">{row}</div>,
    },
    {
      index: "nameAffiliate",
      label: "Nombre del afiliado",
      render: (row: string) => <div>{row}</div>,
    },
    {
      index: "nameProduct",
      label: "Articulo",
      render: (row: string) => <div>{row}</div>,
    },
    {
      index: "statusBuy",
      label: "Estatus",
      render: (row: string) => <div>{row}</div>,
    },
    {
      index: "dateBuy",
      label: "Fecha de compra",
      render: (row: string) => <div>{dayjs(row).format("DD/MM/YYYY")}</div>,
    },
    {
      index: "paymentFile",
      label: <div className="t-center">Comprobante de pago</div>,
      render: (row: string, data: any) => {
        return (
          <div className="t-center">
            {data.payMethod === PAY_METHOD.ON_LINE ? (
              row
            ) : (
              <Tooltip title="Ver archivo">
                <EyeOutlined
                  className="click"
                  onClick={() => handleViewFile(row)}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      index: "",
      label: <div>Acción</div>,
      render: (_: string, data: buyType) => {
        if (data.statusPayAffiliate === STATUS_PAY.PENDIENT)
          return (
            <ButtonCustom
              text="Aprobar"
              onClick={() => handleShowApprovedPay(data)}
              classNameButton="btn-info"
            />
          );
        else <></>;
      },
    },
  ];

  const handleShowApprovedPay = (objBuy: buyType) => {
    setOpenApprovedModal(true);
    setPayToApproved({
      idBuy: objBuy.id,
      idPay: objBuy.idPayAffiliate,
      file: objBuy.paymentFile,
    });
  };
  const dataListResult = useMemo(() => {
    return (dataList?.items as ItemsResponse) ?? { result: [] };
  }, [dataList?.items]);

  const dataTable = useMemo(
    () => dataListResult.result ?? [],
    [dataListResult]
  );

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [REACT_QUERY_KEYS.product.getPurchased("list-purchased")],
    });
  }, [pageParams]);

  const handleSearch = (value: string) => {
    const newPageparams = { ...pageParams, word: value };
    setPageParams(newPageparams);
  };
  const handlePagination = (data: Pagination) => {
    const newPageparams = {
      ...pageParams,
      page: data.page - 1,
      size: data.size,
    };
    setPageParams(newPageparams);
  };

  const handleViewFile = (file: string) => {
    setFileView({ fileData: file });
    setOpenModalViewFile(true);
  };

  const handleCloseViewFile = () => {
    setOpenModalViewFile(false);
    setFileView({ fileData: "" });
  };
  const handleCloseApprovedModal = () => {
    setOpenApprovedModal(false);
  };

  const handleConfirmApprovedPay = () => {
    confirmBuy({ idBuy: payToApproved.idBuy, idPay: payToApproved.idPay });
  };

  return (
    <div className="table-data-affiliate p-body">
      <h3 className="mt-1 t-subtitle">Compra de fotovoltaicos</h3>
      <div className="content-filter">
        <div className="input-delay">
          <DelaySearcher
            onChangeHandler={handleSearch}
            infoText="Se busca por: nombre de afiliado"
            loadingSearch={isPendingDataList}
            cleanValueText
          />
        </div>
      </div>
      <div style={{ height: 350, overflowY: "auto" }}>
        <CustomTable
          dataHead={tableHead as []}
          dataBody={dataTable as []}
          tableClass="table-affiliate"
        />
      </div>
      <div style={{ justifyContent: "end", display: "flex", marginTop: 10 }}>
        <CustomPaginated
          text="Filas por pagina"
          onChangePagination={handlePagination}
          isLastPage={dataListResult?.isLastPage}
          page={pageParams.page + 1}
          size={pageParams.size}
        />
      </div>
      <ViewFileModal
        modalCustom={{
          open: openModalViewFile,
          handleClose: handleCloseViewFile,
        }}
        file={fileView}
      />
      <ApprovedPayModal
        modalCustom={{
          open: openApprovedModal,
          handleClose: handleCloseApprovedModal,
        }}
        file={payToApproved.file}
        btnDisabled={isPendingConfirmPay}
        onSuccess={handleConfirmApprovedPay}
      />
    </div>
  );
};

export default Buys;
