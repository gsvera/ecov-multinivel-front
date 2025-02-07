import { BsBoxArrowRight } from "react-icons/bs";
import "./index.scss";
import { Tooltip } from "antd";
import LogoutModal from "../LogoutModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiUser from "@/api/servicesEcov/apiUser";
import { ResponseAPi } from "@/api/responseApi";
import { useDispatch } from "react-redux";
import { setToken } from "@/store-redux/slide/userSlide";
import { useNotification } from "@/hooks/UseNotification";

export const MenuHeader = () => {
  const { openErrorNotification } = useNotification();
  const dispatch = useDispatch();
  const [openModal, setOpenMolda] = useState(false);

  const { mutate: logout } = useMutation({
    mutationFn: () => apiUser.logout(),
    onSuccess: (data: ResponseAPi) => handleSuccessLogout(data),
    onError: () => handleErrorLogout(),
  });

  const handleSuccessLogout = (data: ResponseAPi) => {
    if (!data.data.error) {
      dispatch(setToken(null));
      setOpenMolda(false);
    }
  };

  const handleErrorLogout = () => {
    openErrorNotification();
    // console.log(err);
  };

  const handleLogout = () => {
    setOpenMolda(true);
  };
  const handleCloseModal = () => {
    setOpenMolda(false);
  };
  const handleCloseSession = () => {
    logout();
  };
  return (
    <div className="menu-header">
      <div className="mr-2">nombre de usuario</div>
      <div className="d-flex">
        <Tooltip title="Cerrar sesión" placement="left">
          <BsBoxArrowRight
            onClick={() => handleLogout()}
            className="icon-menu pointer"
          />
        </Tooltip>
      </div>
      <LogoutModal
        open={openModal}
        handleClose={handleCloseModal}
        handleConfirm={handleCloseSession}
      />
    </div>
  );
};

export default MenuHeader;
