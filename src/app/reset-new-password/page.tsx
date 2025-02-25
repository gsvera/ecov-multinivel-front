"use client";
import apiUser from "@/api/servicesEcov/apiUser";
import ButtonCustom from "@/components/ButtonCustom";
import LoaderPage from "@/components/LoaderPage";
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input, Form } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { REGEX } from "@/config/constants";
import { useNotification } from "@/hooks/UseNotification";
import { parsePasswordEncrypt } from "@/utils";
import { useRouter } from "next/navigation";
import { ResponseApi } from "@/api/responseApi";

export default function ResetNewPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const { openErrorNotification, openInfoNotification } = useNotification();
  const [isClient, setIsClient] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: dataToken, isPending: pendigLoadToken } = useQuery({
    queryKey: [REACT_QUERY_KEYS.user.validExpiredTokenPassword(token ?? "")],
    queryFn: () => apiUser.validExpiredTokenRecoveryPassword(token),
    ...{
      select: (data: ResponseApi) => data.data,
      enabled: !!token,
    },
  });

  const { mutate: sendNewPassword, isPending: isPendingUpdatePassword } =
    useMutation({
      mutationFn: (data: unknown) => apiUser.saveNewPassword(data),
      onSuccess: (data: ResponseApi) => handleSuccessSendNewPassword(data),
      onError: (err) => handleErrorSendNewPassword(err),
    });

  const handleSuccessSendNewPassword = (data: ResponseApi) => {
    if (data.data.error) {
      openErrorNotification("El token de recuperación ha expirado");
      return;
    }
    openInfoNotification("Se ha actualizado la contraseña con éxito");
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const handleErrorSendNewPassword = (err: unknown) => {
    console.log(err);
  };

  const handleSendNewPassword = async () => {
    try {
      await form.validateFields();
      const newPassword = parsePasswordEncrypt(
        form.getFieldValue("newPassword")
      );
      sendNewPassword({ newPassword, token });
    } catch (err) {
      console.log("🚀 ~ handleSendNewPassword ~ err:", err);
    }
  };

  if (!isClient && pendigLoadToken) {
    return <LoaderPage />;
  }

  return (
    <div className="bg-login">
      <div className="reset-password">
        {dataToken?.error ? (
          <div>
            <div className="mt-1 f-bold">
              <p>El token de recuperación ha expirado</p>
              <div className="t-disabled mt-2">
                <Link href={"/"}>Volver</Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="d-flex"
              style={{
                width: "300px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <img src="/ecov-energy-verde.png" style={{ width: "100%" }} />
            </div>
            <Form form={form}>
              <div className="mt-2">
                <Form.Item
                  className="form-item-column"
                  label="Ingrese su nueva contraseña"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Campo obligatorio",
                    },
                    {
                      pattern: REGEX.PASSWORD,
                      message:
                        "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  className="form-item-column"
                  label="Confirmar nueva contraseña"
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    { required: true, message: "Campo obligatorio" },
                    {
                      pattern: REGEX.PASSWORD,
                      message:
                        "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Las contraseñas no coinciden")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>
              <div className="mt-1">
                <ButtonCustom
                  text={
                    isPendingUpdatePassword ? (
                      <LoadingOutlined
                        style={{ fontSize: "1.5em", color: "black" }}
                      />
                    ) : (
                      "Enviar"
                    )
                  }
                  classNameButton="btn-lg-submit"
                  disabledClass="btn-lg-disabled"
                  onClick={() => handleSendNewPassword()}
                  disabled={isPendingUpdatePassword ? true : false}
                />
              </div>
              <div className="mt-1 t-disabled f-bold">
                <Link href={"/"}>Volver</Link>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
