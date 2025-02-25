import { ResponseApi } from "@/api/responseApi";
import apiProduct from "@/api/servicesEcov/apiProduct";
import CustomTable from "@/components/CustomTable";
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { RootState } from "@/store-redux/store";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import ViewFileModal from "@/components/modalCustom/ViewFileModal";
import { PAY_METHOD } from "@/config/constants";

export const TableArticleShop = () => {
  const { userDTO } = useSelector((state: RootState) => state.userSlice);
  const [fileView, setFileView] = useState({ fileData: "" });
  const [openModalViewFile, setOpenModalViewFile] = useState(false);

  const { data: listArticle = [] } = useQuery({
    queryKey: [REACT_QUERY_KEYS.product.getByUser(userDTO.id)],
    queryFn: () => apiProduct.getProductByUser(userDTO.id),
    ...{
      select: (data: ResponseApi) => data.data.items as [],
      enabled: !!userDTO.id,
    },
  });

  if (listArticle.length === 0) return <></>;

  const tableHead = [
    {
      index: "id",
      label: <div className="t-center">Numero de orden</div>,
      render: (row: number) => <div className="t-center">{row}</div>,
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
      label: <div className="t-center">Archivo</div>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  ];

  const handleViewFile = (file: string) => {
    setFileView({ fileData: file });
    setOpenModalViewFile(true);
  };

  const handleCloseViewFile = () => {
    setOpenModalViewFile(false);
    setFileView({ fileData: "" });
  };

  return (
    <div className="table-data-custom mt-2">
      <CustomTable
        dataHead={tableHead as []}
        dataBody={listArticle}
        tableClass={"table-custom"}
      />
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

export default TableArticleShop;
