import { useSelector } from "react-redux";
import "./index.scss";
import { RootState } from "@/store-redux/store";
import { WORKGROUP } from "@/config/constants";
import { MenuAdmin } from "./MenuAdmin";
import { MenuClient } from "./MenuClient";

type menuProps = {
  changeModule: (module: string) => void;
};

export const Menu = ({ changeModule }: menuProps) => {
  const { userDTO } = useSelector((state: RootState) => state.userSlice);

  const handleMenuModule = (module: string) => {
    changeModule(module);
  };
  const ShowMenu =
    userDTO.workgroupId === WORKGROUP.ADMIN ? (
      <MenuAdmin handleMenuModule={handleMenuModule} />
    ) : (
      <MenuClient handleMenuModule={handleMenuModule} />
    );
  return (
    <div className="menu">
      <div className="content-menu-logo">
        <img src="/ecov-energy-verde.png" className="img-menu-logo" />
      </div>
      <div className="content-menu">{ShowMenu}</div>
    </div>
  );
};

export default Menu;
