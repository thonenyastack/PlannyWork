import FormRow from "./FormRow";

const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={labelText} className="form-label">
        {labelText || name}
      </label>
      <select
        className="form-select"
        name={name}
        value={value}
        onChange={handleChange}
      >
        {list.map((typeOptions, index) => {
          return (
            <option key={index} value={typeOptions}>
              {typeOptions}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
