import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCommission } from "@/api/servicesEcov/apiCommission";
import { ItemsResponse, ResponseApi } from "@/api/responseApi";
import { useEffect, useMemo, useState } from "react";
import { defaultPageParams, STATUS_PAY, STATUS_PAY_COMMISSION } from "@/config/constants";
import CustomPaginated, { Pagination } from "@/components/CustomPaginated";
import DelaySearcher from "@/components/DelaySearcher";
import CustomTable from "@/components/CustomTable";
import { convertCurrency } from "@/utils";
import {
  affiliateType,
  commissionType,
  payAffiliateType,
} from "@/config/general-type";
import dayjs from "dayjs";
import ButtonCustom from "@/components/ButtonCustom";

export const Commissions = () => {
  const queryClient = useQueryClient();
  const [pageParams, setPageParams] = useState({
    ...defaultPageParams,
    word: "",
  });

  const { data: dataListCommissions, isPending: isPendingListCommission } =
    useQuery({
      queryKey: [
        REACT_QUERY_KEYS.commission.getByFilterDada("table-commission"),
      ],
      queryFn: () => apiCommission.getByFilterData(pageParams),
      ...{
        select: (data: ResponseApi) => data.data,
      },
    });

  const tableHeadCommission = [
    {
      index: "id",
      label: "Id Comision",
      render: (row: number) => <div>{row}</div>,
    },
    {
      index: "amountCommission",
      label: "Comision",
      render: (row: number) => <div>{convertCurrency(row)}</div>,
    },
    {
      index: "userDTO",
      label: "Pago a",
      render: (row: affiliateType) => (
        <div>
          {row.firstName} {row.lastName}
        </div>
      ),
    },
    {
      index: "payAffiliateDTO",
      label: "Descripción",
      render: (row: payAffiliateType) => <div>{row.description}</div>,
    },
    {
      index: "payAffiliateDTO",
      label: "Fecha",
      render: (row: payAffiliateType) => (
        <div>{dayjs(row.createdDate).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      index: "statusPay",
      label: "Estatus de pago",
      render: (row: number) => {
        switch (row) {
          case STATUS_PAY_COMMISSION.VALIDATE_PAYMENT:
            return <div>Pendiente validación de pago</div>;
          case STATUS_PAY.PENDIENT:
            return <div>Pendiente a pagar</div>;
          case STATUS_PAY.PAY:
            return <div>Pagado</div>;
        }
      },
    },
    {
      index: "",
      label: "Acción",
      render: (row: number, obj: commissionType) => (
        <div>
          {obj.statusPay === STATUS_PAY.PENDIENT && (
            <ButtonCustom
              text="Ejecutar pago"
              onClick={() => handleExecutePay(obj)}
              classNameButton="btn-submit"
            />
          )}
        </div>
      ),
    },
  ];

  const dataListCommissionResult = useMemo(() => {
    return (dataListCommissions?.items as ItemsResponse) ?? { result: [] };
  }, [dataListCommissions?.items]);

  const dataTableCommission = useMemo(
    () => dataListCommissionResult.result ?? [],
    [dataListCommissionResult]
  );

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [
        REACT_QUERY_KEYS.commission.getByFilterDada("table-commission"),
      ],
    });
  }, [pageParams]);

  const handleExecutePay = (obj: commissionType) => {
    console.log(obj);
  };

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
    <div className="table-data-custom p-body">
      <h3 className="mt-1 t-subtitle">Comissiones</h3>
      <div className="content-filter">
        <div className="input-delay">
          <DelaySearcher
            onChangeHandler={handleSearch}
            infoText="Se busca por: pago a"
            loadingSearch={isPendingListCommission}
            cleanValueText
          />
        </div>
      </div>
      <div style={{ height: 350, overflowY: "auto" }}>
        <CustomTable
          dataHead={tableHeadCommission as []}
          dataBody={dataTableCommission as []}
          tableClass="table-custom"
        />
      </div>
      <div style={{ justifyContent: "end", display: "flex", marginTop: 10 }}>
        <CustomPaginated
          text="Filas por pagina"
          onChangePagination={handlePagination}
          isLastPage={dataListCommissionResult?.isLastPage}
          page={pageParams.page + 1}
          size={pageParams.size}
        />
      </div>
    </div>
  );
};
