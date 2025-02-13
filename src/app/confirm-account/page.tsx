"use client";

import { ResponseApi } from "@/api/responseApi";
import apiUser from "@/api/servicesEcov/apiUser";
import { CircleCheck } from "@/components/icons";
import LoaderPage from "@/components/LoaderPage";
import { useNotification } from "@/hooks/UseNotification";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmAccount() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openErrorNotification } = useNotification();
  const [response, setResponse] = useState(false);
  const tokenConfirm = searchParams.get("token");

  const { mutate: confirmAccount } = useMutation({
    mutationFn: (token: string) => apiUser.accountConfirm(token),
    onSuccess: (data: ResponseApi) => handleSuccesConfirmAccount(data),
    onError: (err) => openErrorNotification(err.message),
  });

  const handleSuccesConfirmAccount = (data: ResponseApi) => {
    if (data.data.error) openErrorNotification();
    else setResponse(true);
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  useEffect(() => {
    if (tokenConfirm) confirmAccount(tokenConfirm);
  }, [tokenConfirm]);

  if (!response) {
    return <LoaderPage />;
  }

  return (
    <div className="bg-login">
      <div className="register-component">
        <div>
          <CircleCheck width={80} />
          <div>Su cuenta ha sido confirmado con éxito</div>
        </div>
      </div>
    </div>
  );
}
