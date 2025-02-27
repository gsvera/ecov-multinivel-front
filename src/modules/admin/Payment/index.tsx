/* eslint-disable @typescript-eslint/no-explicit-any */
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiPayment } from "@/api/servicesEcov/apiPayment";
import { ItemsResponse, ResponseApi } from "@/api/responseApi";
import { useEffect, useMemo, useState } from "react";
import { defaultPageParams, PAY_METHOD, STATUS_PAY } from "@/config/constants";
import CustomPaginated, { Pagination } from "@/components/CustomPaginated";
import DelaySearcher from "@/components/DelaySearcher";
import CustomTable from "@/components/CustomTable";
import ViewFileModal from "@/components/modalCustom/ViewFileModal";
import { convertCurrency } from "@/utils";
import { Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ButtonCustom from "@/components/ButtonCustom";

export const Payment = () => {
  const [pageParams, setPageParams] = useState({
    ...defaultPageParams,
    word: "",
  });
  const [fileView, setFileView] = useState({ fileData: "" });
  const [openModalViewFile, setOpenModalViewFile] = useState(false);
  const queryClient = useQueryClient();

  const { data: dataListPayment, isPending: isPendingListPayment } = useQuery({
    queryKey: [REACT_QUERY_KEYS.payment.getFilterData("list-payment")],
    queryFn: () => apiPayment.getByFilterData(pageParams),
    ...{
      select: (data: ResponseApi) => data.data,
    },
  });

  const tableHead = [
    {
      index: "id",
      label: "Id Pago",
      render: (row: number) => <div>{row}</div>,
    },
    {
      index: "nameAffiliate",
      label: "Nombre del afiliado",
      render: (row: string) => <div>{row}</div>,
    },
    {
      index: "emailAffiliate",
      label: "Email",
      render: (row: string) => <div>{row}</div>,
    },
    {
      index: "phoneNumber",
      label: "Telefono",
      render: (row: string) => <div>{row}</div>,
    },
    {
      index: "amount",
      label: "Monto",
      render: (row: number) => <div>{convertCurrency(row)}</div>,
    },
    {
      index: "payMethod",
      label: "Método de pago",
      render: (row: string) => <div>{row}</div>,
    },
    {
      index: "description",
      label: "Descripción",
      render: (row: string) => <div>{row}</div>,
    },
    {
      index: "paymentFile",
      label: "Comprobante de pago",
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
      render: (_: string, data: any) => {
        if (data.statusPay === STATUS_PAY.PENDIENT)
          return (
            <ButtonCustom
              text="Aprobar"
              onClick={() => handleApprovedPay(data.id)}
              classNameButton="btn-submit"
            />
          );
        else <></>;
      },
    },
  ];

  const handleApprovedPay = (id: number) => {};

  const dataListResultPayment = useMemo(() => {
    return (dataListPayment?.items as ItemsResponse) ?? { result: [] };
  }, [dataListPayment?.items]);

  const dataTable = useMemo(
    () => dataListResultPayment.result ?? [],
    [dataListResultPayment]
  );

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [REACT_QUERY_KEYS.payment.getFilterData("list-payment")],
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
  return (
    <div
      className="table-data-affiliate"
      style={{ paddingLeft: 15, paddingRight: 15 }}
    >
      <h3 className="mt-1 t-subtitle">Pagos de afiliados</h3>
      <div className="content-filter">
        <div className="input-delay">
          <DelaySearcher
            onChangeHandler={handleSearch}
            infoText="Se busca por: nombre y email"
            loadingSearch={isPendingListPayment}
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
          isLastPage={dataListResultPayment?.isLastPage}
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
    </div>
  );
};

export default Payment;
