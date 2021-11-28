import styles from '../styles/components/Input.module.css'

function Input({id, label, placeholder, onChange, value, ...rest}){
  return (
    <div className={styles.container}>
      { label && <label htmlFor={id}>{label}</label>}
      <input 
        id={id} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        {...rest} 
        />
    </div>
  );
}

export default Input;