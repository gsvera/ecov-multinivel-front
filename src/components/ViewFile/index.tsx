import { makePdfBase64 } from "@/utils";
import { useEffect, useState } from "react";

type viewFileProps = {
  fileData: string;
};

export const ViewFile = ({ fileData }: viewFileProps) => {
  const [filePdf, setFilePdf] = useState<string | null>(null);
  const [fileImage, setFileImage] = useState<string | null>();

  useEffect(() => {
    if (fileData) {
      if (fileData.includes("application/pdf")) {
        const url = makePdfBase64(fileData);
        setFilePdf(url);
        return () => URL.revokeObjectURL(url);
      }
      setFileImage(fileData);
    }
  }, [fileData]);
  return (
    <>
      {filePdf && (
        <iframe src={filePdf} style={{ width: "100%", height: "100%" }} />
      )}
      {fileImage && <img src={fileImage} style={{ width: "100%" }} />}
    </>
  );
};

export default ViewFile;
