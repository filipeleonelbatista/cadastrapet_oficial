import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import styles from "../styles/pages/Pitch.module.css";

export default function Pitch() {
  return (
    <div className={styles.container}>
      <Worker workerUrl="./js/pdf.worker.min.js">
        <Viewer fileUrl="./images/pitch/Pitch.pdf" />
      </Worker>
    </div>
  );
}
