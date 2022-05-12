import styles from "../styles/components/Select.module.css";

function Select({
  id,
  label,
  placeholder,
  setSelectedOption,
  options,
  value,
  required,
  ...rest
}) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id}>
          {label}
          {required && "*"}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => setSelectedOption(e.target.value)}
        placeholder={placeholder}
        {...rest}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.key}>
            {opt.value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
