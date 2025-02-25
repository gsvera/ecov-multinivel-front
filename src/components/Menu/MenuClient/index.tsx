import { ApartmentOutlined, ShoppingOutlined } from "@ant-design/icons";
import { menuProps } from "../types";
import { MODULES_AFFILIATE } from "@/config/constants";

export const MenuClient = ({ handleMenuModule, moduleSelected }: menuProps) => {
  const handleClick = (moduleSelected: string) => {
    handleMenuModule(moduleSelected);
  };
  return (
    <>
      <div
        className={`element-menu ${
          moduleSelected === MODULES_AFFILIATE.MODULE_HERARCHY_AFFILIATE &&
          "element-menu-selected"
        }`}
        onClick={() => handleClick(MODULES_AFFILIATE.MODULE_HERARCHY_AFFILIATE)}
      >
        <ApartmentOutlined className="icon-menu-principal" /> Mi red
      </div>
      <div
        className={`element-menu ${
          moduleSelected === MODULES_AFFILIATE.MODULE_SHOP &&
          "element-menu-selected"
        }`}
        onClick={() => handleClick(MODULES_AFFILIATE.MODULE_SHOP)}
      >
        <ShoppingOutlined className="icon-menu-principal" /> Tienda
      </div>
    </>
  );
};

export default MenuClient;
