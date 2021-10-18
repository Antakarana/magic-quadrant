import React, { ChangeEvent } from "react";

interface Props {
  placeHolder: string;
  type: React.HTMLInputTypeAttribute | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

const Input: React.FC<Props> = (props: Props) => {
  const { placeHolder, type, onChange, value } = props;

  return (
    <input
      onChange={onChange}
      placeholder={placeHolder}
      type={type}
      value={value}
    />
  );
};

export { Input };
