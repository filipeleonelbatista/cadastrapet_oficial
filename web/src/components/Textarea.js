import styles from '../styles/components/Textarea.module.css'

function Textarea({id, label, placeholder, onChange, value, ...rest}){
  return (
    <div className={styles.container}>
      { label && <label htmlFor={id}>{label}</label>}
      <textarea 
        id={id} 
        onChange={onChange} 
        placeholder={placeholder}
        {...rest} 
        >
          {value}
        </textarea>
    </div>
  );
}

export default Textarea;