"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "@/store-redux/store";
import { useEffect, useState } from "react";
import LoaderPage from "@/components/LoaderPage";
import { Menu } from "@/components/Menu";
import { MenuHeader } from "@/components/MenuHeader";
import { MODULES_ADMIN, WORKGROUP } from "@/config/constants";
import Affiliate from "@/modules/admin/Affiliate";
import Buys from "@/modules/admin/buys";

export default function Admin() {
  const { token, userDTO } = useSelector((state: RootState) => state.userSlice);
  const [loadPage, setLoadPage] = useState(false);
  const [component, setComponent] = useState<string>(
    MODULES_ADMIN.MODULE_AFFILIATES
  );
  const router = useRouter();

  useEffect(() => {
    if (!token || userDTO.workgroupId !== WORKGROUP.ADMIN)
      return router.push("/");

    setLoadPage(true);
  }, [token, userDTO.workgroupId]);

  if (!token || !loadPage) return <LoaderPage />;

  return (
    <div className="d-flex">
      <Menu changeModule={setComponent} />
      <div className="body-right-content">
        <div style={{ height: "10%" }}>
          <MenuHeader />
        </div>
        <div style={{ height: "90%" }}>
          {component === MODULES_ADMIN.MODULE_AFFILIATES && <Affiliate />}
          {component === MODULES_ADMIN.MODULE_BUYS && <Buys />}
        </div>
      </div>
    </div>
  );
}
