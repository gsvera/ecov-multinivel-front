import { BsBoxArrowRight } from "react-icons/bs";
import "./index.scss";
import { Tooltip } from "antd";
import LogoutModal from "../LogoutModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiUser from "@/api/servicesEcov/apiUser";
import { ResponseApi } from "@/api/responseApi";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/store-redux/slide/userSlide";
import { useNotification } from "@/hooks/UseNotification";
import { RootState } from "@/store-redux/store";
import { useRouter } from "next/navigation";

export const MenuHeader = () => {
  const router = useRouter();
  const { userDTO } = useSelector((state: RootState) => state.userSlice);
  const { openErrorNotification } = useNotification();
  const dispatch = useDispatch();
  const [openModal, setOpenMolda] = useState(false);

  const { mutate: logout } = useMutation({
    mutationFn: () => apiUser.logout(),
    onSuccess: (data: ResponseApi) => handleSuccessLogout(data),
    onError: () => handleErrorLogout(),
  });

  const handleSuccessLogout = (data: ResponseApi) => {
    if (!data.data.error) {
      dispatch(setToken(null));
      setOpenMolda(false);
      router.push("/");
    }
  };

  const handleErrorLogout = () => {
    openErrorNotification();
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
      <div className="mr-2">
        {userDTO.firstName} {userDTO.lastName}
      </div>
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
