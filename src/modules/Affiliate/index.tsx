import { Tabs } from "antd";
import "./index.scss";
import TreeDataAffiliate from "./TreeDataAffiliate";
import TableDataAffiliate from "./TableDataAffiliate";

export const Affiliate = () => {
  const items = [
    {
      key: "1",
      label: "Afiliados",
      children: <TableDataAffiliate />,
    },
    {
      key: "2",
      label: "Red de afiliados",
      children: <TreeDataAffiliate />,
    },
  ];
  return (
    <div className="affiliate">
      <div className="t-center mt-1">Afiliados Eco-v</div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Affiliate;
