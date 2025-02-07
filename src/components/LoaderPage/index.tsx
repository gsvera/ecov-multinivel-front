import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.scss";

const LoaderPage = () => {
  return (
    <div className="white-space-load">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
};

export default LoaderPage;
