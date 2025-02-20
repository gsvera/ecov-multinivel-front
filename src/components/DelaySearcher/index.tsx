import { Input, Tooltip } from "antd";
import { AlertIcon } from "@/components/icons/AlertIcon";
import { useEffect, useState } from "react";

type delaySearcherProps = {
  infoText: string;
  onChangeHandler: (value: string) => void;
  timeDelay?: number;
  loadingSearch?: boolean;
  valueText?: string;
  cleanValueText?: boolean;
};

export const DelaySearcher = ({
  infoText,
  onChangeHandler,
  timeDelay = 1000,
  loadingSearch,
  valueText = "",
  cleanValueText,
}: delaySearcherProps) => {
  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    if (cleanValueText && !valueText) setLocalValue(valueText);
  }, [cleanValueText, valueText]);

  useEffect(() => {
    const delay = setTimeout(() => onChangeHandler?.(localValue), timeDelay);
    return () => clearTimeout(delay);
  }, [timeDelay, localValue]);

  return (
    <Input.Search
      loading={loadingSearch}
      addonBefore={
        infoText && (
          <Tooltip title={infoText}>
            <AlertIcon fill={"var(--color-primary)"} />
          </Tooltip>
        )
      }
      onChange={(e) => {
        setLocalValue(e.target.value);
        e.persist();
      }}
      value={localValue}
    />
  );
};

export default DelaySearcher;
