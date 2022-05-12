import styles from "../styles/components/Input.module.css";

function Input({ id, label, placeholder, onChange, value, required, ...rest }) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id}>
          {label}
          {required && "*"}
        </label>
      )}
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        {...rest}
      />
    </div>
  );
}

export default Input;
