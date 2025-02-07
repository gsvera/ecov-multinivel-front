import { useMemo } from "react";
import { Tooltip } from "antd";

type buttonCustomProps = {
  disabledClass?: string;
  tooltip?: string;
  disabled?: boolean;
  classNameButton: string;
  styleButton?: object;
  text: string | React.ReactNode;
  onClick: () => void;
};

const ButtonCustom = (props: buttonCustomProps) => {
  const disabledClass = useMemo(
    () => (props?.disabledClass ? props?.disabledClass : "disabled-button"),
    [props?.disabledClass]
  );
  return (
    <Tooltip title={props?.tooltip}>
      <button
        type="button"
        onClick={props?.onClick}
        className={`pointer click ${
          props?.disabled ? disabledClass : props?.classNameButton
        } click`}
        disabled={props?.disabled}
        style={props?.styleButton}
      >
        {props?.text}
      </button>
    </Tooltip>
  );
};

export default ButtonCustom;
