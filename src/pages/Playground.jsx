import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";
import Version from "../components/Version";
import { Widget } from "../components/Widget";
import styles from "../styles/pages/Playground.module.css";
import Select from "../components/Select";

function Playground() {
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  if (!window.location.href.includes("localhost")) {
    return navigate("/");
  }
  return (
    <div className={styles.container}>
      <div className="statusbar"></div>
      <BackButton path="/" />
      <div className={styles.header}>
        <h4 className={styles.petName}>Playground</h4>
      </div>
      <div className={styles.content}>
        <p>Valor Selecionado: {value}</p>
        <Select
          label="As Opções"
          options={[
            { key: "Valor 1", value: "1" },
            { key: "Valor 2", value: "2" },
            { key: "Valor 3", value: "3" },
          ]}
          required
          // disabled
          setSelectedOption={setValue}
          value={value}
        />
      </div>
      <Version />
      <Widget />
    </div>
  );
}

export default Playground;
