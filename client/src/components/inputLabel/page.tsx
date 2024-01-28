import React from "react";
type InputType = {
  classInput?: string;
  classLabel?: string;
  required?: boolean;
  value?: string | null;
  type:
  | "button"
  | "text"
  | "checkbox"
  | "radio"
  | "password"
  | "color"
  | "file";
  complete?: "true" | "false";
  id?: string;
  name: string;
  label?: string;
};
export default function InputLabel({
  classInput,
  classLabel,
  required,
  type,
  id,
  name,
  label,
  complete,
  value,
}: InputType) {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className={classLabel ? classLabel : "text-gray-200"}
        >
          {label}
        </label>
      )}
      <input
        aria-label="d" aria-hidden="true"
        defaultValue={value ? value : ""}
        autoComplete={complete ? complete : "off"}
        required={required ? required : false}
        type={type}
        name={name}
        id={id}
        className={
          classInput
            ? classInput
            : "block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
        }
      />
    </>
  );
}
