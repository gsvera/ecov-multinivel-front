import { ResponseApi } from "@/api/responseApi";
import apiAffiliate from "@/api/servicesEcov/apiAffiliate";
import AffiliateTree from "@/components/AffiliateTree";
import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { RootState } from "@/store-redux/store";
import { transformDataToFlow } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Edge, Node } from "@xyflow/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const TreeHerarchy = () => {
  const { userDTO } = useSelector((state: RootState) => state.userSlice);
  const [nodesAffiliate, setNodesAffiliate] = useState<Node[]>([]);
  const [edgesAffiliate, setEdgesAffiliate] = useState<Edge[]>([]);

  const { data: dataAffiliate } = useQuery({
    queryKey: [REACT_QUERY_KEYS.affiliate.getDataAffiliateByUser(userDTO.id)],
    queryFn: () => apiAffiliate.getDataAffiliateByUser(userDTO.id),
    ...{
      select: (data: ResponseApi) => data.data,
      enabled: !!userDTO.id,
    },
  });

  useEffect(() => {
    if (!dataAffiliate?.error) {
      const arrAffiliates = dataAffiliate?.items;
      const { nodes, edges } = transformDataToFlow(arrAffiliates);
      setNodesAffiliate(nodes);
      setEdgesAffiliate(edges);
    }
  }, [dataAffiliate]);
  return (
    <>
      <div>
        Desendencia
        <AffiliateTree
          nodesAffiliate={nodesAffiliate}
          edgesAffiliate={edgesAffiliate}
        />
      </div>
    </>
  );
};

export default TreeHerarchy;
