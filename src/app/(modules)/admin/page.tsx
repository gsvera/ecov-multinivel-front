"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "@/store-redux/store";
import { useEffect, useState } from "react";
import LoaderPage from "@/components/LoaderPage";
import { Menu } from "@/components/Menu";
import { MenuHeader } from "@/components/MenuHeader";
import { WORKGROUP } from "@/config/constants";

export default function Admin() {
  const { token, userDTO } = useSelector((state: RootState) => state.userSlice);
  const [loadPage, setLoadPage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) return router.push("/");
    if (userDTO.workgroupId !== WORKGROUP.ADMIN)
      return router.push("/affiliate");

    setLoadPage(true);
  }, [token, userDTO.workgroupId]);

  if (!token || !loadPage) return <LoaderPage />;

  return (
    <div className="d-flex">
      <Menu />
      <div className="body-right-content">
        <MenuHeader />
        <div></div>
      </div>
    </div>
  );
}
