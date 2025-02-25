import { useMemo, useState } from "react";
import CardArticle, { cardArticleProps } from "./CardArticle/index.";
import ModalConfirmBuy from "./ModalConfirmBuy";
import { useQuery } from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { apiProduct } from "@/api/servicesEcov/apiProduct";
import { ResponseApi } from "@/api/responseApi";
import ButtonCustom from "@/components/ButtonCustom";
import FrequentlyAskedQuestions from "@/components/modalCustom/FrequentlyAskedQuestions";
import SchemaPayModal from "@/components/modalCustom/SchemaPayModal";
import TableArticleShop from "./TableArticleShop";

type quotaPayType = {
  numberPay: number;
  amount: number;
};
export const Shop = () => {
  const [idProduct, setIdProduct] = useState<null | number>(null);
  const [openModalConfirmBuy, setOpenModalConfirmBuy] = useState(false);
  const [openModalFaq, setOpenModalFaq] = useState(false);
  const [openModalSchemaPay, setOpenModalSchemaPay] = useState(false);

  const { data: dataArticle = [] } = useQuery({
    queryKey: [REACT_QUERY_KEYS.product.getAll("shop")],
    queryFn: () => apiProduct.getAll(),
    ...{
      select: (data: ResponseApi) => data.data.items as [],
    },
  });

  const { data: dataQuota } = useQuery({
    queryKey: [REACT_QUERY_KEYS.product.detailQuota(idProduct)],
    queryFn: () => apiProduct.getQuotaDetailByProduct(idProduct),
    ...{
      select: (data: ResponseApi) => data.data,
      enabled: !!idProduct,
    },
  });

  const listQuotas = useMemo(() => {
    const arrListQuota: quotaPayType[] = [];
    if (Array.isArray(dataQuota?.items) && dataQuota.items.length > 0) {
      dataQuota.items.forEach((item) => {
        console.log(item);
        for (let i = item.firstPay; i < item.lastPay + 1; i++) {
          arrListQuota.push({ numberPay: i, amount: item.amount });
        }
      });
    }
    return arrListQuota;
  }, [dataQuota]);

  const amountToCharge = useMemo(() => {
    if (listQuotas.length > 0) return listQuotas[0].amount;
    else return 0;
  }, [listQuotas]);

  const handleShowConfirmBuy = (id: number) => {
    setIdProduct(id);
    setOpenModalConfirmBuy(true);
  };

  const handleCloseConfirmBuy = () => {
    setIdProduct(null);
    setOpenModalConfirmBuy(false);
  };

  const handleShowFaqs = () => {
    setOpenModalFaq((v) => !v);
  };

  const handleShowSchemaPay = () => {
    setIdProduct(null);
    setOpenModalSchemaPay((v) => !v);
  };

  const handleSchemaPay = (id: number) => {
    setIdProduct(id);
    setOpenModalSchemaPay((v) => !v);
  };

  return (
    <>
      <div>
        <div
          style={{ display: "flex", justifyContent: "end", paddingRight: 20 }}
        >
          <ButtonCustom
            text="Preguntas frecuentes"
            classNameButton="btn-info"
            onClick={handleShowFaqs}
          />
        </div>
        <div>
          {dataArticle?.map((item: cardArticleProps) => (
            <CardArticle
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              // price={item.price}
              onClickBtnBuy={handleShowConfirmBuy}
              onClickBtnSchemaPay={handleSchemaPay}
            />
          ))}
        </div>
        <div>
          <TableArticleShop />
        </div>
      </div>
      <ModalConfirmBuy
        open={openModalConfirmBuy}
        handleClose={handleCloseConfirmBuy}
        idProduct={idProduct}
        amountToCharge={amountToCharge}
      />
      {openModalFaq && (
        <FrequentlyAskedQuestions
          open={openModalFaq}
          handleClose={handleShowFaqs}
        />
      )}
      {openModalSchemaPay && (
        <SchemaPayModal
          modalCustom={{
            open: openModalSchemaPay,
            handleClose: handleShowSchemaPay,
          }}
          listPay={listQuotas as []}
        />
      )}
    </>
  );
};

export default Shop;
