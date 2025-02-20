import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { useQuery } from "@tanstack/react-query";
import { apiAffiliate } from "@/api/servicesEcov/apiAffiliate";
import { ResponseApi } from "@/api/responseApi";
import { AffiliateTree } from "@/components/AffiliateTree";
import { useEffect, useState } from "react";
import { Edge, Node } from "@xyflow/react";
import { transformDataToFlow } from "@/utils";

export const TreeDataAffiliate = () => {
  const [nodesAffiliate, setNodesAffiliate] = useState<Node[]>([]);
  const [edgesAffiliate, setEdgesAffiliate] = useState<Edge[]>([]);
  const { data: affiliateHerarchy } = useQuery({
    queryKey: [REACT_QUERY_KEYS.affiliate.getHerarchy("admin")],
    queryFn: () => apiAffiliate.getHerarchyAffiliate(),
    ...{
      select: (data: ResponseApi) => data.data,
    },
  });

  useEffect(() => {
    if (!affiliateHerarchy?.error) {
      const arrAffiliates = affiliateHerarchy?.items;
      const { nodes, edges } = transformDataToFlow(arrAffiliates);
      setNodesAffiliate(nodes);
      setEdgesAffiliate(edges);
    }
  }, [affiliateHerarchy]);

  return (
    <div>
      <AffiliateTree
        nodesAffiliate={nodesAffiliate}
        edgesAffiliate={edgesAffiliate}
      />
    </div>
  );
};

export default TreeDataAffiliate;
