import cn from "classnames";
import React from "react";

const Input = props => {
  const { label, error, name, type, onChange, defaultValue } = props;
  let className = "form-control";
  if (type === "file") {
    className += "-file";
  }
  if (error !== undefined) {
    className += " is-invalid";
  }
  return (
    <div className="mb-3">
      <label htmlFor="inputEmail" className="w-full block">
        {label}
      </label>
      <input
        type={type}
        className={cn(
          "border w-full outline-none p-2 rounded-[3px] mt-2",
          error && "valid:border-red-500"
        )}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      {/* <div className="form-text">We'll never share your email with anyone else.</div> */}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};
export default Input;
