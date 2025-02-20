import React, { useLayoutEffect, useMemo, useState } from "react";
import { Button, InputNumber, Select, Typography } from "antd";
import {
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./index.scss";

const { Option } = Select;
const { Text } = Typography;
const CUSTOM_OPTIONS = [10, 20, 30, 40, 50, 100];

export type Pagination = {
  size: number;
  page: number;
};

type Props = {
  total?: number;
  isLastPage?: boolean;
  onChangePagination: (pagination: Pagination) => void;
  options?: number[];
  text: string;
  showText?: boolean;
  disabled?: boolean;
  className?: string;
} & Pagination;

/**
 * ✅
 * @param {*} param0
 * @returns
 */
export const CustomPaginated = ({
  total = 0,
  isLastPage = undefined,
  size = 10,
  page = 1,
  onChangePagination,
  options = CUSTOM_OPTIONS,
  text,
  showText = true,
  disabled = false,
  className = "",
}: Props) => {
  const [localePageValue, setLocalePageValue] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  /* FUNCTIONS */
  const onChangePage = useMemo(
    () => ({
      next: () => onChangePagination({ size, page: page + 1 }),
      prev: () => onChangePagination({ size, page: page - 1 }),
    }),
    [onChangePagination, page, size]
  );

  const onChangeSize = (op: number) => {
    onChangePagination({ size: op, page: 1 });
  };

  const numberOfPages = useMemo(() => Math.ceil(total / size), [total, size]);

  /** El isLastPage es una alternativa al total, se usa uno u otro pero no los dos juntos */
  const prevPageBtnDisabled = useMemo(
    () =>
      (isLastPage === undefined ? page === 1 || total === 0 : page === 1) ||
      disabled,
    [isLastPage, page, disabled, total]
  );
  /** El isLastPage es una alternativa al total, se usa uno u otro pero no los dos juntos */
  const nextPageBtnDisabled = useMemo(
    () =>
      (isLastPage === undefined
        ? page === numberOfPages || numberOfPages === 0 || total === 0
        : isLastPage) || disabled,
    [isLastPage, page, numberOfPages, disabled, total]
  );

  const onChangeManualPaginate = (value: number | null) => {
    if (value == null || value <= 0) {
      return;
    }
    const pageValue = value > numberOfPages ? numberOfPages : value;
    setLocalePageValue(pageValue);
  };

  useLayoutEffect(() => {
    let handlerTime: ReturnType<typeof setTimeout>;
    if (localePageValue) {
      handlerTime = setTimeout(
        () => onChangePagination({ size, page: localePageValue }),
        1000
      );
    }
    return () => clearTimeout(handlerTime);
  }, [localePageValue]);

  const handleIconClick = () => {
    setOpen((prev) => !prev);
  };

  // Sincroniza el estado cuando el usuario interactúa normalmente
  const handleDropdownVisibleChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <div className={`custom-paginated ${className}`}>
      {showText && <Text className="text">{text}</Text>}
      <div className={"number"}>
        <Select
          data-testid="select-pagination"
          value={size}
          onChange={onChangeSize}
          suffixIcon={
            <CaretDownOutlined
              onClick={handleIconClick}
              style={{ color: !disabled ? "black" : "#C8C8C8" }}
            />
          }
          disabled={disabled}
          open={open}
          onDropdownVisibleChange={handleDropdownVisibleChange}
        >
          {options.map((options, index) => (
            <Option key={index} value={options}>
              {options}
            </Option>
          ))}
        </Select>
      </div>
      <div className={"actions"}>
        <Button
          className={`left ${prevPageBtnDisabled ? "disabled" : ""}`}
          disabled={prevPageBtnDisabled}
          onClick={() => onChangePage?.prev()}
        >
          <LeftOutlined />
        </Button>
        <div className={"page"}>
          <InputNumber
            data-testid="value-page"
            value={page}
            onChange={onChangeManualPaginate}
            readOnly={isLastPage !== undefined}
          />{" "}
        </div>
        <Button
          className={`rigth ${nextPageBtnDisabled ? "disabled" : ""}`}
          disabled={nextPageBtnDisabled}
          onClick={() => onChangePage?.next()}
        >
          <RightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default CustomPaginated;
