import { WarningOutlined, SearchOutlined } from "@ant-design/icons";
import { Empty } from "antd";
import "./index.scss";

export type emptyTypeProps = "error" | "search" | "default";

export type customAntEmptyProps = {
  typeShow?: string;
  msg?: string;
};

export const CustomAntEmpty = ({
  typeShow = "search",
  msg = "No se encontraron registros para visualizar",
}: customAntEmptyProps) => {
  const typesEmpty: Record<emptyTypeProps, React.ReactNode> = {
    error: <WarningOutlined className="emptyIcon" />,
    search: <SearchOutlined className="emptyIcon" />,
    default: <WarningOutlined className="emptyIcon" />,
  };

  return (
    <Empty
      className="custom-empty"
      image={typesEmpty[typeShow as emptyTypeProps]}
      description={msg}
    />
  );
};

export default CustomAntEmpty;
