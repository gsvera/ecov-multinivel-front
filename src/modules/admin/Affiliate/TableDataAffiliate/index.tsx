import { ItemsResponse, ResponseApi } from "@/api/responseApi";
import apiAffiliate from "@/api/servicesEcov/apiAffiliate";
import { CustomTable } from "@/components/CustomTable";
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import "./index.scss";
import DelaySearcher from "@/components/DelaySearcher";
import CustomPaginated, { Pagination } from "@/components/CustomPaginated";

type ColumnType = {
  index: string;
  label: string | React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (_: any, row: any) => React.ReactNode;
};

const defaultPageParams = {
  page: 0,
  size: 10,
};

export const TableDataAffiliate = () => {
  const queryClient = useQueryClient();
  const [pageParams, setPageParams] = useState({
    ...defaultPageParams,
    word: "",
  });

  const { data: dataAffiliate, isPending: isPendigDataAffiliate } = useQuery({
    queryKey: [
      REACT_QUERY_KEYS.affiliate.getDataAffiliate("table-data-affiliate"),
    ],
    queryFn: () => apiAffiliate.getDataAffiliate(pageParams),
    ...{
      select: (data: ResponseApi) => data.data,
    },
  });

  const dataAffiliateResult = useMemo(() => {
    return (dataAffiliate?.items as ItemsResponse) ?? { result: [] };
  }, [dataAffiliate?.items]);

  const dataTable = useMemo(
    () => dataAffiliateResult.result ?? [],
    [dataAffiliateResult]
  );

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [
        REACT_QUERY_KEYS.affiliate.getDataAffiliate("table-data-affiliate"),
      ],
    });
  }, [pageParams]);

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
      label: <div className="t-center">Estatus</div>,
      render: (row) => (
        <div className="t-center">
          {row ? (
            <span className="bdg-success">Activo</span>
          ) : (
            <span className="bdg-danger">Inactivo</span>
          )}
        </div>
      ),
    },
  ];

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

  return (
    <div
      className="table-data-affiliate"
      style={{ paddingLeft: 15, paddingRight: 15 }}
    >
      <div className="content-filter">
        <div className="input-delay">
          <DelaySearcher
            onChangeHandler={handleSearch}
            infoText="Se busca por: nombre y email"
            loadingSearch={isPendigDataAffiliate}
            cleanValueText
          />
        </div>
      </div>
      <div style={{ height: 350, overflowY: "auto" }}>
        <CustomTable
          dataHead={dataColumn as []}
          dataBody={dataTable as []}
          tableClass="table-affiliate"
        />
      </div>
      <div style={{ justifyContent: "end", display: "flex", marginTop: 10 }}>
        <CustomPaginated
          text="Filas por pagina"
          onChangePagination={handlePagination}
          isLastPage={dataAffiliateResult?.isLastPage}
          page={pageParams.page + 1}
          size={pageParams.size}
        />
      </div>
    </div>
  );
};

export default TableDataAffiliate;
