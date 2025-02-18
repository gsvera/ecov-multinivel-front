import React from "react";
import { Handle, Position } from "@xyflow/react";
import { BsEye } from "react-icons/bs";
import "./index.scss";
import dayjs from "dayjs";

type customNodeProps = {
  data: {
    idUser: string;
    firstName: string;
    lastName: string;
    createdDate: string;
    onClick: (id: string) => void;
  };
};

const CustomNode = ({ data }: customNodeProps) => {
  const createdDate = dayjs(data.createdDate).format("DD/MM/YYYY");
  return (
    <div className="custom-node-tree">
      {/* Encabezado del nodo con botón */}
      <div className="node-header">
        <div className="node-title">
          {data.firstName} {data.lastName}
        </div>
        <div style={{ marginLeft: 10, alignItems: "center", display: "flex" }}>
          <BsEye onClick={() => data.onClick(data.idUser)} />
        </div>
      </div>
      <div className="t-s t-secondary mt-1">{createdDate}</div>

      {/* Conectores para las aristas */}
      <Handle type="target" isConnectable={false} position={Position.Top} />
      <Handle type="source" isConnectable={false} position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
