import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Version from "../components/Version";
import { Widget } from "../components/Widget";
import styles from "../styles/pages/Playground.module.css";

function Playground() {
  const navigate = useNavigate();

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
      <div className={styles.content}></div>
      <Version />
      <Widget />
    </div>
  );
}

export default Playground;
