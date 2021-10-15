import React, { ChangeEvent } from "react";

interface Props {
  placeHolder: string;
  type: React.HTMLInputTypeAttribute | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  value: string | number;
}

const Input: React.FC<Props> = (props: Props) => {
  const { placeHolder, type, onChange, isDisabled, value } = props;

  return (
    <input
      onChange={onChange}
      placeholder={placeHolder}
      type={type}
      disabled={isDisabled}
      value={value}
      style={{ opacity: isDisabled ? 0.6 : 1 }}
    />
  );
};

export { Input };
