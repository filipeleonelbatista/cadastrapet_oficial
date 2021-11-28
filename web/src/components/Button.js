import styles from '../styles/components/Button.module.css'

function Button({id, children, transparent=false, onClick, ...rest}){
  return (
    <button 
      className={transparent ? styles.buttonTransparent : styles.button }
      id={id} 
      onClick={onClick} 
      {...rest}
      >
        {children}
      </button>
  );
}

export default Button;