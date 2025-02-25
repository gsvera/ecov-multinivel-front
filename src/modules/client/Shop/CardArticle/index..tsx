import ButtonCustom from "@/components/ButtonCustom";
import "./index.scss";
// import { convertCurrency } from "../../../../utils";

export type cardArticleProps = {
  id: number;
  image: string;
  name: string;
  // price: number;
  onClickBtnBuy: (id: number) => void;
  onClickBtnSchemaPay: (id: number) => void;
};

export const CardArticle = ({
  id,
  image,
  name,
  // price,
  onClickBtnBuy,
  onClickBtnSchemaPay,
}: cardArticleProps) => {
  const handleClickBtn = () => {
    onClickBtnBuy(id);
  };
  const showSchemaPay = () => {
    onClickBtnSchemaPay(id);
  };
  return (
    <>
      <div className="card-article">
        <div className="content-card-img">
          <h3>{name}</h3>
          <img className="card-img" src={image} />
          {/* <p className="price">{convertCurrency(price)}</p> */}
        </div>
        <div
          className="d-flex"
          style={{ justifyContent: "space-between", width: "90%" }}
        >
          <ButtonCustom
            classNameButton="btn-info"
            text="Esquema de pagos"
            onClick={showSchemaPay}
          />
          <ButtonCustom
            classNameButton="btn-submit"
            text="Comprar"
            onClick={handleClickBtn}
          />
        </div>
      </div>
    </>
  );
};

export default CardArticle;
