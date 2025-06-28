import React, { forwardRef } from "react";
import ErrorIcon from "@mui/icons-material/Error";

interface InputProps {
  name?: string;
  onChange: any;
  label?: string;
  type?: string;
  required?: boolean;
  helper?: string;
  placeholder?: string;
  Icon?: React.ComponentType<{}>;
  guidMessage?: string;
  rules?: Record<string, object | string | boolean | undefined>;
  errors?: any;
  maxLength?: number;
  handleOnChange?: (value: string | undefined | number) => void;
  hasNumberSeparator?: boolean;
  disabled?: boolean;
  value?: any;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      value,
      label,
      className,
      type = "text",
      Icon,
      placeholder,
      rules,
      errors,
      onChange,
      guidMessage,
      maxLength,
      disabled = false,
      handleOnChange = () => {},
      hasNumberSeparator = false,
      required,
    },
    ref
  ) => {
    const removeSeparators = (value: string): string => {
      return value.replace(/,/g, "");
    };

    const changeHandler = (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (value: React.FormEvent<HTMLInputElement> | string) => void
    ): void => {
      const { value } = e.target;
      let rawValue;
      if (value.startsWith("0") && value.length > 1) {
        rawValue = removeSeparators(value.replace(/^0+/, ""));
      } else {
        rawValue = removeSeparators(value);
      }
      console.log(rawValue, "row");
      if (hasNumberSeparator) {
        handleOnChange(rawValue);
        onChange(rawValue);
      } else {
        handleOnChange(value);
        onChange(e);
      }
    };

    const formatValue = (val: string) => {
      if (!val) return "";
      const parts = val.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    };

    return (
      <div>
        <label
          htmlFor={name}
          className="input-label input-label-sm lg:input-label-base"
        >
          {label}
        </label>
        <div className="input-container">
          <input
            disabled={disabled}
            maxLength={maxLength}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={hasNumberSeparator ? formatValue(value) : value}
            ref={ref} // Now ref is properly forwarded to the input element
            className={`${className} input input-sm lg:input-base data-[state=failed]:input-failed data-[state=success]:input-success truncate disabled:cursor-pointer disabled:!border-none disabled:bg-gray-100 disabled:text-[#777777] disabled:!shadow-none data-[state=disabled]:disabled:!px-1 data-[state=disabled]:disabled:!py-2`}
            data-state={
              disabled && !Icon
                ? "disabled"
                : errors
                  ? "failed"
                  : !!value && !errors
                    ? "success"
                    : ""
            }
          />
          {!!Icon && (
            <div className="input-icon">
              <Icon />
            </div>
          )}
          {errors && (
            <div className="input-icon-error">
              <ErrorIcon />
            </div>
          )}
        </div>
        {errors && (
          <span className="input-message-error">{errors?.message}</span>
        )}
        {guidMessage && (
          <span className="input-message-guid">{guidMessage}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
