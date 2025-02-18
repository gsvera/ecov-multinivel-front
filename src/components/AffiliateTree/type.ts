import { Edge, Node } from "@xyflow/react";

export type affiliate = {
    id: string;
    firstName: string;
    nivel: number;
  };
  export type affiliateHerarchy = {
    id: string;
    firstName: string;
    lastName?: string | null | undefined;
    createdDate?: string| null | undefined;
    nivel: number;
    child: affiliateHerarchy[];
  };

  export type affiliateTreeProps = {
    nodesAffiliate: Node[];
    edgesAffiliate: Edge[];
  };