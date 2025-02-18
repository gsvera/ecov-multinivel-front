"use client";
import ButtonCustom from "@/components/ButtonCustom";
import { REGEX } from "@/config/constants";
import { Checkbox, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import apiUser from "@/api/servicesEcov/apiUser";
import { ResponseApi } from "@/api/responseApi";
import { useNotification } from "@/hooks/UseNotification";
import { useDispatch } from "react-redux";
import {
  setDataUser,
  setToken,
  userStateProps,
} from "@/store-redux/slide/userSlide";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parsePasswordEncrypt } from "@/utils";
import TermsAndConditions from "@/components/modalCustom/TermsAndConditions";

export default function Register() {
  const [form] = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const { openErrorNotification, OpenSuccessModal } = useNotification();
  const searchParams = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const [openTermsConditions, setOpenTermsConditions] = useState(false);
  const reference = searchParams.get("reference");

  const { mutate: saveNewAffiliate, isPending: isPendingNewAffiliate } =
    useMutation({
      mutationFn: (data) => apiUser.saveNewAffiliate(data),
      onSuccess: (data: ResponseApi) => handleSuccessNewAffiliate(data),
      onError: () => openErrorNotification(),
    });

  const handleSuccessNewAffiliate = (data: ResponseApi) => {
    if (data.data.error) {
      return openErrorNotification(data.data.message);
    }
    const session: userStateProps = data?.data.items as userStateProps;
    dispatch(setToken(session.token));
    dispatch(setDataUser(session.userDTO));
    setOpenModal(true);
    setTimeout(() => {
      router.push("/affiliate");
    }, 10000);
  };

  useEffect(() => {
    if (reference) form.setFieldValue("reference", reference);
  }, [reference]);

  const handleModalTermsConditions = () => {
    setOpenTermsConditions((v) => !v);
  };

  const handleSendNewAffiliate = async () => {
    try {
      await form.validateFields();
      const passEncrypt = parsePasswordEncrypt(form.getFieldValue("password"));
      saveNewAffiliate({ ...form.getFieldsValue(), password: passEncrypt });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-login">
      <div className="register-component" style={{ width: 600 }}>
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
        <p>
          ¡Bienvenido al Programa de Referidos de Eco V Energy! Al recomendar
          nuestros productos y servicios, ayudas a más personas a disfrutar de
          energía limpia y recibes recompensas exclusivas por cada nuevo
          cliente. ¡Gracias por ser parte de nuestro compromiso con un futuro
          sostenible! 🌿
        </p>
        <Form className="mt-2" form={form} style={{ width: "80%" }}>
          <div className="d-flex two-inputs">
            <div className="form-div">
              <Form.Item
                className="form-item-column"
                label="Nombre(s)"
                name="firstName"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="form-div">
              <Form.Item
                className="form-item-column"
                label="Apellido(s)"
                name="lastName"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="d-flex two-inputs">
            <div className="form-div">
              <Form.Item
                className="form-item-column"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Campo obligatorio",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="form-div">
              <Form.Item
                className="form-item-column"
                label="Teléfono"
                name="phoneNumber"
                rules={[
                  {
                    pattern: REGEX.NUMBER,
                    message: "Solo debe agregar numeros",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="d-flex two-inputs">
            <div className="form-div">
              <Form.Item
                className="form-item-column"
                label="Contraseña"
                name="password"
                rules={[
                  { required: true, message: "Campo obligatorio" },
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
            <div className="form-div">
              <Form.Item
                className="form-item-column"
                label="Código de referencia"
                name="reference"
                rules={[
                  {
                    required: true,
                    message: "Campo obligatorio",
                  },
                ]}
              >
                <Input disabled={!!reference} />
              </Form.Item>
            </div>
          </div>
          <div>
            <Form.Item
              name="termsAndConditions"
              className="t-aling-s"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <div className="d-flex t-aling-s">
                <Checkbox />{" "}
                <p
                  className="ml-1 pointer"
                  onClick={handleModalTermsConditions}
                >
                  Terminos y condiciones
                </p>
              </div>
            </Form.Item>
          </div>
          <div className="mt-1">
            <ButtonCustom
              text={
                isPendingNewAffiliate ? (
                  <LoadingOutlined
                    style={{ fontSize: "1.5em", color: "black" }}
                  />
                ) : (
                  "Enviar"
                )
              }
              classNameButton="btn-lg-sumbit"
              disabledClass="btn-lg-disabled"
              onClick={() => handleSendNewAffiliate()}
              disabled={isPendingNewAffiliate ? true : false}
            />
          </div>
          <div className="mt-1 t-disabled f-bold">
            <Link href={"/"}>Volver</Link>
          </div>
        </Form>
      </div>
      <OpenSuccessModal
        open={openModal}
        width={400}
        closable={false}
        onCloseModal={{}}
        title={""}
        message={
          "¡Registro exitoso! Hemos enviado un correo de confirmación a tu dirección de email. Por favor, revisa tu bandeja de entrada (y la carpeta de spam si no lo ves) y haz clic en el enlace de verificación para activar tu cuenta, es importante ya que si no su cuenta podra ser deshabilitada y posteriormente eliminada."
        }
      />
      <TermsAndConditions
        open={openTermsConditions}
        handleClose={handleModalTermsConditions}
      />
    </div>
  );
}
