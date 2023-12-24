import { forwardRef } from "react";

const FormRow = forwardRef(
  ({ type, name, value, handleChange, labelText }, ref) => {
    return (
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className="form-input"
          ref={ref}
        />
      </div>
    );
  }
);

export default FormRow;
