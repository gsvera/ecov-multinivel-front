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
    <div className="affiliate" style={{ paddingLeft: 15, paddingRight: 15 }}>
      <h3 className=" mt-1 t-subtitle">Afiliados Eco-v</h3>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Affiliate;
