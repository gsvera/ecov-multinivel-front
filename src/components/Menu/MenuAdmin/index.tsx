import { ApartmentOutlined, ShoppingOutlined } from "@ant-design/icons";
import { BsBookmarkStar, BsCashCoin, BsFolder2Open } from "react-icons/bs";
import { MODULES_ADMIN } from "@/config/constants";
import { menuProps } from "../types";

export const MenuAdmin = ({ handleMenuModule }: menuProps) => {
  const handleClick = (moduleSelected: string) => {
    handleMenuModule(moduleSelected);
  };
  return (
    <>
      <div
        className="element-menu"
        onClick={() => handleClick(MODULES_ADMIN.MODULE_AFFILIATES)}
      >
        <ApartmentOutlined className="icon-menu-principal" /> Afiliados
      </div>
      <div
        className="element-menu"
        onClick={() => handleClick(MODULES_ADMIN.MODULE_BUYS)}
      >
        <ShoppingOutlined className="icon-menu-principal" /> Compras
      </div>
      <div
        className="element-menu"
        onClick={() => handleClick(MODULES_ADMIN.MODULE_COMMISSIONS)}
      >
        <BsBookmarkStar className="icon-menu-principal" /> Comisiones
      </div>
      <div
        className="element-menu"
        onClick={() => handleClick(MODULES_ADMIN.MODULE_PAYS)}
      >
        <BsCashCoin className="icon-menu-principal" /> Pagos
      </div>
      <div
        className="element-menu"
        onClick={() => handleClick(MODULES_ADMIN.MODULE_DOCUMENTS)}
      >
        <BsFolder2Open className="icon-menu-principal" /> Documentos
      </div>
    </>
  );
};

export default MenuAdmin;
