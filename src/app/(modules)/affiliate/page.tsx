"use client";
import LoaderPage from "@/components/LoaderPage";
import Menu from "@/components/Menu";
import MenuHeader from "@/components/MenuHeader";
import { RootState } from "@/store-redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MODULES_AFFILIATE, WORKGROUP } from "@/config/constants";
import TreeHerarchy from "@/modules/client/TreeHerarchy";
import Shop from "@/modules/client/Shop";

export default function Affiliate() {
  const { token, userDTO } = useSelector((state: RootState) => state.userSlice);
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);
  const [component, setComponent] = useState<string>(
    MODULES_AFFILIATE.MODULE_HERARCHY_AFFILIATE
  );

  useEffect(() => {
    if (!token || userDTO.workgroupId !== WORKGROUP.CLIENT)
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
          {component === MODULES_AFFILIATE.MODULE_HERARCHY_AFFILIATE && (
            <TreeHerarchy />
          )}
          {component === MODULES_AFFILIATE.MODULE_SHOP && <Shop />}
        </div>
      </div>
    </div>
  );
}
