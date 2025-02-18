import React, { useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { affiliateTreeProps } from "./type";
import "./index.scss";
import CustomNode from "./AffiliateTreeHeader";

export const AffiliateTree = ({
  nodesAffiliate,
  edgesAffiliate,
}: affiliateTreeProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesAffiliate);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesAffiliate);

  useEffect(() => {
    if (nodesAffiliate.length > 0 && edgesAffiliate.length > 0) {
      setNodes(nodesAffiliate);
      setEdges(edgesAffiliate);
    }
  }, [nodesAffiliate, edgesAffiliate]);

  // const onConnect = useCallback(
  //   (params: Connection) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div className="affiliate-tree">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default AffiliateTree;
