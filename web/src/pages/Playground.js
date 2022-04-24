import InputUpload from "../components/InputUpload";
import styles from "../styles/pages/Playground.module.css";

function Playground() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <InputUpload
          id={"teste-upload"}
          label={"Enviar Documentos"}
          onChange={(e) => console.log("Fora do componente", e)}
        />
      </div>
    </div>
  );
}

export default Playground;
