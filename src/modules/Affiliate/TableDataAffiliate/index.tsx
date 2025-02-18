import { ResponseApi } from "@/api/responseApi";
import apiAffiliate from "@/api/servicesEcov/apiAffiliate";
import { CustomTable } from "@/components/CustomTable";
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import "./index.scss";

type ColumnType = {
  index: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (_: any, row: any) => React.ReactNode;
};

export const TableDataAffiliate = () => {
  const { data: dataAffiliate } = useQuery({
    queryKey: [
      REACT_QUERY_KEYS.affiliate.getDataAffiliate("table-data-affiliate"),
    ],
    queryFn: () => apiAffiliate.getDataAffiliate(),
    ...{
      select: (data: ResponseApi) => data.data,
    },
  });

  const dataTable = useMemo(
    () => (!dataAffiliate?.items ? [] : (dataAffiliate.items as [])),
    [dataAffiliate?.items]
  );

  const dataColumn: ColumnType[] = [
    {
      index: "",
      label: "Nombre",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, row: any) => {
        return (
          <div>
            {row.firstName} {row.lastName}
          </div>
        );
      },
    },
    {
      index: "email",
      label: "Email",
      render: (row: string) => <div>{row}</div>,
    },
    {
      index: "phoneNumber",
      label: "Telefono",
      render: (row) => <div>{row}</div>,
    },
    {
      index: "active",
      label: "Estatus",
      render: (row) => <div>{row ? "Activo" : "Inactivo"}</div>,
    },
  ];

  return (
    <div>
      <CustomTable
        dataHead={dataColumn as []}
        dataBody={dataTable}
        tableClass="table-affiliate"
      />
    </div>
  );
};

export default TableDataAffiliate;
