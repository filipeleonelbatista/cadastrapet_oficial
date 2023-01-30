import React from "react";
import styles from "../styles/pages/Pitch.module.css";

export default function Pitch() {
  return (
    <object
      aria-label="pdf"
      className={styles.container}
      type="application/pdf"
      data="./images/pitch/Pitch.pdf"
    ></object>
  );
}
