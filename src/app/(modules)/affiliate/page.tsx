"use client";
import LoaderPage from "@/components/LoaderPage";
import Menu from "@/components/Menu";
import MenuHeader from "@/components/MenuHeader";
import { RootState } from "@/store-redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WORKGROUP } from "@/config/constants";

export default function Affiliate() {
  const { token, userDTO } = useSelector((state: RootState) => state.userSlice);
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    if (!token) return router.push("/");
    if (userDTO.workgroupId !== WORKGROUP.CLIENT) return router.push("/admin");
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
