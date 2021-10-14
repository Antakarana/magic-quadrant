import React, { ChangeEvent } from "react";

interface Props {
  placeHolder: string;
  type: React.HTMLInputTypeAttribute | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = (props: Props) => {
  const { placeHolder, type, onChange } = props;

  return <input onChange={onChange} placeholder={placeHolder} type={type} />;
};

export { Input };
