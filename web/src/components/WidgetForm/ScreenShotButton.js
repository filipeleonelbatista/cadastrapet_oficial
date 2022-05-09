import { Camera, Trash } from "phosphor-react";
import styles from "../../styles/components/WidgetForm.module.css";

import html2canvas from "html2canvas";
import { Loading } from "../Loading";
import { useState } from "react";

export function ScreenShotButton({ screenshot, onScreenshotTook }) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector("html"));
    const base64Image = canvas.toDataURL("image/png");
    onScreenshotTook(base64Image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTook(null)}
        className={styles.imageLoadedButton}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className={styles.imageButton}
    >
      {isTakingScreenshot ? <Loading /> : <Camera />}
    </button>
  );
}
