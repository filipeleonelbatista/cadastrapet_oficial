import styles from '../styles/components/Button.module.css'

function Button({id, children, transparent=false, disabled=false, onClick, ...rest}){
  return (
    <button 
      className={ disabled ? styles.buttonDisabled : transparent ? styles.buttonTransparent : styles.button }
      id={id} 
      onClick={onClick} 
      {...rest}
      >
        {children}
      </button>
  );
}

export default Button;