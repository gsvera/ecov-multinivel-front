import CryptoJS from "crypto-js";

const secretKeyPass = process.env.NEXT_PUBLIC_SECRET_KEY;

export const parsePasswordEncrypt = (text) => {
  const key = CryptoJS.enc.Utf8.parse(secretKeyPass);

  // Cifrar el texto
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};

export const transformDataToFlow = (
  data,
  parentId,
  x = 0,
  y = 1,
  level = 1
) => {
  let nodes = [];
  let edges = [];
  const nodeSpacingX = 200; // Espaciado horizontal
  const nodeSpacingY = 40; // Espaciado vertical

  // Calcular el ancho total requerido para los hijos de cada nodo
  const getTotalWidth = (node) => {
    if (node.child.length === 0) return nodeSpacingX; // Espacio mínimo
    return node.child.reduce((sum, child) => sum + getTotalWidth(child), 0);
  };

  let currentX = x;

  data?.forEach((user) => {
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
        onClick: (name) => console.log(`Hola ${name}`),
      },
      position: { x: posX, y: posY },
    });

    if (parentId) {
      edges.push({
        id: `${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
      });
    } else {
      // se agrega un edge generico para que se vea al menos el nodo principal
      edges.push({
        id: `${parentId}-${nodeId}`,
        source: 1,
        target: 1,
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

export const convertCurrency = (n) => {
  let currencyLocal = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return currencyLocal.format(n);
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

/**
 * Funcion para generar un url para pdf para iframe desde un string de base64
 * @param {String} strBs64
 */
export const makePdfBase64 = (strBs64) => {
  const byteCharacters = atob(
    strBs64.split("base64,")[1]?.replace(/[^A-Za-z0-9+/=]/g, "") || ""
  );
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};
