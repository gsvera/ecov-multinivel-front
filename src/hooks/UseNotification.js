import {
  CheckOutlined,
  WarningOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Modal, notification, Row, Typography } from "antd";
import { CircleCheck, CircleFailed } from "@/components/icons";

const { Text } = Typography;

const defaultNotificationProps = {
  duration: 3,
  placement: "topRight",
  style: { borderRadius: "10px", width: "255px", zIndex: "999" },
  closeIcon: <CloseOutlined width="10" height="10" />,
};

const useNotification = () => {
  const openErrorNotification = (
    message = "Ha ocurrido un error con el servicio, intentelo más tarde"
  ) => {
    notification.error({
      ...defaultNotificationProps,
      message: <Text style={{ color: "white" }}>{message}</Text>,
      style: { color: "#ffff", backgroundColor: "#FF4D4D" },
      icon: <WarningOutlined style={{ color: "white" }} />,
    });
  };

  const openSuccessNotification = (message = "Exito") => {
    notification.success({
      ...defaultNotificationProps,
      message: <Text style={{ color: "white" }}>{message}</Text>,
      style: { color: "white", backgroundColor: "#02BF80" },
      icon: <CheckOutlined style={{ color: "white" }} />,
    });
  };

  const openInfoNotification = (message = "Info") => {
    notification.info({
      ...defaultNotificationProps,
      message: <Text style={{ color: "white" }}>{message}</Text>,
      style: { color: "white", backgroundColor: "#3867FC" },
      icon: <WarningOutlined style={{ color: "white" }} />,
    });
  };

  const destroyAllNotification = () => {
    notification.destroy();
  };

  const destroyNotification = (key) => {
    notification.destroy(key);
  };

  const OpenSuccessModal = ({
    title,
    message,
    open,
    onCloseModal,
    closable,
    ...props
  }) => {
    const handleCancel = () => {
      if (closable) onCloseModal?.();
    };
    return (
      <Modal
        open={open}
        closable={closable}
        onCancel={handleCancel}
        footer={false}
        title={title}
        {...props}
      >
        <Row style={{ justifyContent: "center" }}>
          <CircleCheck />
        </Row>
        <Row style={{ marginTop: 15 }}>
          <p style={{ textAlign: "justify" }}>{message}</p>
        </Row>
      </Modal>
    );
  };

  return {
    openErrorNotification,
    openSuccessNotification,
    destroyAllNotification,
    destroyNotification,
    openInfoNotification,
    OpenSuccessModal,
  };
};

export { useNotification };
