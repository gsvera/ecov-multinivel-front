import { REACT_QUERY_KEYS } from "@/config/react-query-keys";
import { useQuery } from "@tanstack/react-query";
import { apiAffiliate } from "@/api/servicesEcov/apiAffiliate";
import { ResponseApi } from "@/api/responseApi";
import { AffiliateTree } from "@/components/AffiliateTree";
import { useEffect, useState } from "react";
import { affiliateHerarchy } from "@/components/AffiliateTree/type";
import { Edge, Node } from "@xyflow/react";

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
      const arrAffiliates: affiliateHerarchy[] =
        affiliateHerarchy?.items as affiliateHerarchy[];
      const { nodes, edges } = transformDataToFlow(arrAffiliates);
      setNodesAffiliate(nodes);
      setEdgesAffiliate(edges);
    }
  }, [affiliateHerarchy]);

  // Función para transformar los datos en nodos y conexiones
  const transformDataToFlow = (
    data: affiliateHerarchy[],
    parentId: string | null | undefined = null,
    x = 0,
    y = 1,
    level = 1
  ) => {
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    const nodeSpacingX = 200; // Espaciado horizontal
    const nodeSpacingY = 40; // Espaciado vertical

    // Calcular el ancho total requerido para los hijos de cada nodo
    const getTotalWidth = (node: affiliateHerarchy): number => {
      if (node.child.length === 0) return nodeSpacingX; // Espacio mínimo
      return node.child.reduce((sum, child) => sum + getTotalWidth(child), 0);
    };

    let currentX = x;

    data?.forEach((user: affiliateHerarchy) => {
      const nodeId = user.id;
      const totalWidth = getTotalWidth(user);
      const posX = currentX + totalWidth / 2 - nodeSpacingX / 2;
      const posY = y + level * nodeSpacingY; // Espaciado vertical

      nodes.push({
        id: nodeId,
        type: "custom",
        draggable: false,
        connectable: false,
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          createdDate: user.createdDate,
          idUser: user.id,
          onClick: (name: string) => console.log(`Hola ${name}`),
        },
        position: { x: posX, y: posY },
      });

      if (parentId) {
        edges.push({
          id: `${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
        });
      }

      if (user.child.length > 0) {
        const { nodes: childNodes, edges: childEdges } = transformDataToFlow(
          user.child,
          nodeId,
          currentX,
          posY,
          level + 1
        );
        nodes = [...nodes, ...childNodes];
        edges = [...edges, ...childEdges];
      }
      currentX += totalWidth;
    });

    return { nodes, edges };
  };
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
