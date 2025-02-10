"use client";
import { Input } from "antd";
import ButtonCustom from "@/components/ButtonCustom";
import Link from "next/link";
import { useState } from "react";
import { REGEX } from "@/config/constants";
import { useNotification } from "@/hooks/UseNotification";
import { useMutation } from "@tanstack/react-query";
import apiUser from "@/api/servicesEcov/apiUser";
import { ResponseAPi } from "@/api/responseApi";
import { LoadingOutlined } from "@ant-design/icons";

const RecoveryPassword = () => {
  const [email, setEmail] = useState("");
  const {
    openErrorNotification,
    openInfoNotification,
    openSuccessNotification,
  } = useNotification();

  const { mutate: sendRecoveryPassword, isPending } = useMutation({
    mutationFn: (data: string) => apiUser.sendRecoveryPassword(data),
    onSuccess: (data: ResponseAPi) => handleSuccessSendRecoveryPassword(data),
    onError: () => handleErrorSendRecoveryPassword(),
  });

  const handleSuccessSendRecoveryPassword = (data: ResponseAPi) => {
    if (!data.data.error) {
      openSuccessNotification(
        "Se ha enviado un correo a su cuenta para restablecer la contraseña, favor de revisar su bandeja de entrada."
      );
    } else {
      openInfoNotification("Ingrese un correo valido");
    }
  };

  const handleErrorSendRecoveryPassword = () => {
    openErrorNotification();
  };

  const handleSendRecovery = () => {
    console.log(REGEX.EMAIL.test(email));
    if (!REGEX.EMAIL.test(email)) {
      openErrorNotification("Ingrese un correo valido");
      return;
    }
    sendRecoveryPassword(email);
  };
  return (
    <div className="bg-login">
      <div className="recovery-password">
        <div style={{ width: "300px" }}>
          <img src="/ecov-energy-verde.png" style={{ width: "100%" }} />
        </div>
        <div>
          <p className="t-l">¿Olvidaste tu contraseña?</p>
          <p className="t-m mt-2">
            Ingresa el email con el que te registraste para recuperar tu
            contraseña
          </p>
          <div className="mt-2">
            <label>Correo electronico</label>
            <Input
              className="mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-1">
              <ButtonCustom
                text={
                  isPending ? (
                    <LoadingOutlined
                      style={{ fontSize: "1.5em", color: "black" }}
                    />
                  ) : (
                    "Enviar"
                  )
                }
                classNameButton="btn-lg-sumbit"
                disabledClass="btn-lg-disabled"
                onClick={() => handleSendRecovery()}
                disabled={isPending ? true : false}
              />
            </div>
            <div className="mt-1 t-disabled f-bold">
              <Link href={"/"}>Volver</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPassword;
