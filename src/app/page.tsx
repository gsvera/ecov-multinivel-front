"use client";

import ButtonCustom from "@/components/ButtonCustom";
import { Col, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.scss";
import { useMutation } from "@tanstack/react-query";
import apiUser from "@/api/servicesEcov/apiUser";
import { ResponseAPi } from "@/api/responseApi";
import { useEffect, useState } from "react";
import { useNotification } from "@/hooks/UseNotification";
import LoaderPage from "@/components/LoaderPage";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataUser,
  setToken,
  userStateProps,
} from "@/store-redux/slide/userSlide";
import { useRouter } from "next/navigation";
import { parsePasswordEncrypt } from "@/utils";
import { RootState } from "@/store-redux/store";
import Link from "next/link";

export default function Login() {
  const [form] = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { openErrorNotification } = useNotification();
  const { token } = useSelector((state: RootState) => state.userSlice);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (token) {
      router.push("/admin");
    }
  }, [token]);

  const { mutate: loginUser } = useMutation({
    mutationFn: (data) => apiUser.login(data),
    onSuccess: (data: ResponseAPi) => handleSuccessLogin(data),
    onError: (err) => handleErrorLogin(err),
  });

  const handleSuccessLogin = (data: ResponseAPi) => {
    setLoading(false);
    if (!data.data.error) {
      const session: userStateProps = data?.data.items as userStateProps;
      dispatch(setToken(session.token));
      dispatch(setDataUser(session.userDTO));
      router.push("/admin");
    } else {
      openErrorNotification(data.data.message);
    }
  };

  const handleErrorLogin = (err: unknown) => {
    setLoading(false);
    openErrorNotification();
    console.log(err);
  };

  const onLogin = async () => {
    try {
      await form.validateFields();
      const passEncrypt = parsePasswordEncrypt(form.getFieldValue("password"));
      loginUser({ ...form.getFieldsValue(), password: passEncrypt });
      setLoading(true);
    } catch (err) {
      console.log(err);
      openErrorNotification();
      setLoading(false);
    }
  };
  if (!isClient) {
    <LoaderPage />;
  }
  return (
    <div className="bg-login">
      <div className="container-login">
        <div className="center-text-title-login">
          <img src="/ecov-energy-verde.png" style={{ width: "90%" }} />
        </div>
        <div className="line-vertical"></div>
        <div className="content-form-login">
          <Form form={form} style={{ height: "100%" }}>
            <div className="center-form-login">
              <div>
                <div>
                  <h1>Inicio de sesión</h1>
                </div>
                <Col>
                  <Form.Item label="Usuario" name="email">
                    <Input className="inp-login" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Contraseña" name="password">
                    <Input.Password className="inp-login" />
                  </Form.Item>
                </Col>
                <ButtonCustom
                  classNameButton="btn-login"
                  text={
                    loading ? (
                      <LoadingOutlined
                        style={{ fontSize: "1.5em", color: "black" }}
                      />
                    ) : (
                      "Iniciar sesion"
                    )
                  }
                  onClick={onLogin}
                />
                <div className="t-center mt-2 t-disabled f-bold">
                  <Link href={"/recovery-password"}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
