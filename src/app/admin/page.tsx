"use client";
import { useSelector } from "react-redux";
import "./index.scss";
import { useRouter } from "next/navigation";

import { RootState } from "@/store-redux/store";
import { useEffect } from "react";
import LoaderPage from "@/components/LoaderPage";
import { Menu } from "@/components/Menu";
import { MenuHeader } from "@/components/MenuHeader";

export default function Admin() {
  const { token, userDTO } = useSelector((state: RootState) => state.userSlice);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
    if (userDTO.workgroupId !== 1) {
      // AQUI RETORNAREMOS A LA VISTA CLIENTE por si tratan de forzar la entrada
    }
  }, [token, router]);

  if (!token) {
    return <LoaderPage />;
  }

  return (
    <div className="d-flex">
      <Menu />
      <div className="content-right">
        <MenuHeader />
        <div></div>
      </div>
    </div>
  );
}
