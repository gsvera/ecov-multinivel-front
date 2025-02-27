/* eslint-disable @typescript-eslint/no-explicit-any */
import { ItemsResponse, ResponseApi } from "@/api/responseApi";
import apiProduct from "@/api/servicesEcov/apiProduct";
import CustomPaginated, { Pagination } from "@/components/CustomPaginated";
import CustomTable from "@/components/CustomTable";
import DelaySearcher from "@/components/DelaySearcher";
import { defaultPageParams, PAY_METHOD, STATUS_PAY } from "@/config/constants";
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "antd";
import { useEffect, useMemo, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import ViewFileModal from "@/components/modalCustom/ViewFileModal";
import ButtonCustom from "@/components/ButtonCustom";

export const Buys = () => {
  const [pageParams, setPageParams] = useState({
    ...defaultPageParams,
    word: "",
  });
  const [fileView, setFileView] = useState({ fileData: "" });
  const [openModalViewFile, setOpenModalViewFile] = useState(false);
  const queryClient = useQueryClient();

  const { data: dataList, isPending: isPendingDataList } = useQuery({
    queryKey: [REACT_QUERY_KEYS.product.getPurchased("list-purchased")],
    queryFn: () => apiProduct.getPurchasedProductByFilter(pageParams),
    ...{
      select: (data: ResponseApi) => data.data,
    },
  });

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
      render: (_: string, data: any) => {
        if (data.statusPayAffiliate === STATUS_PAY.PENDIENT)
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

  const handleApprovedPay = (idPay: number) => {
    console.log(idPay);
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

  return (
    <div
      className="table-data-affiliate"
      style={{ paddingLeft: 15, paddingRight: 15 }}
    >
      <h3 className="mt-1 t-subtitle">Compra de fotovoltaicos</h3>
      <div className="content-filter">
        <div className="input-delay">
          <DelaySearcher
            onChangeHandler={handleSearch}
            infoText="Se busca por: nombre y email"
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
    </div>
  );
};

export default Buys;
