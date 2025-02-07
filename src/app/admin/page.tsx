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
  const { token } = useSelector((state: RootState) => state.userSlice);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
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
