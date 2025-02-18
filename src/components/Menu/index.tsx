import "./index.scss";
import { ApartmentOutlined, ShoppingOutlined } from "@ant-design/icons";
import { BsBookmarkStar, BsCashCoin, BsFolder2Open } from "react-icons/bs";
import { MODULES } from "@/config/constants";

type menuProps = {
  changeModule: (module: string) => void;
};

export const Menu = ({ changeModule }: menuProps) => {
  const handleMenuModule = (module: string) => {
    changeModule(module);
  };
  return (
    <div className="menu">
      <div className="content-menu-logo">
        <img src="/ecov-energy-verde.png" className="img-menu-logo" />
      </div>
      <div className="content-menu">
        <div
          className="element-menu"
          onClick={() => handleMenuModule(MODULES.MODULE_AFFILIATES)}
        >
          <ApartmentOutlined className="icon-menu-principal" /> Afiliados
        </div>
        <div
          className="element-menu"
          onClick={() => handleMenuModule(MODULES.MODULE_BUYS)}
        >
          <ShoppingOutlined className="icon-menu-principal" /> Compras
        </div>
        <div
          className="element-menu"
          onClick={() => handleMenuModule(MODULES.MODULE_COMMISSIONS)}
        >
          <BsBookmarkStar className="icon-menu-principal" /> Comisiones
        </div>
        <div
          className="element-menu"
          onClick={() => handleMenuModule(MODULES.MODULE_PAYS)}
        >
          <BsCashCoin className="icon-menu-principal" /> Pagos
        </div>
        <div
          className="element-menu"
          onClick={() => handleMenuModule(MODULES.MODULE_DOCUMENTS)}
        >
          <BsFolder2Open className="icon-menu-principal" /> Documentos
        </div>
      </div>
    </div>
  );
};

export default Menu;
