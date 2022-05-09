import styles from "../../../styles/components/WidgetForm.module.css";
import { CloseButton } from "../../CloseButton";
import successImage from "../../../assets/Success.png";

export function FeedbackSuccessStep({ ondFeedbackRestartRequested }) {
  return (
    <>
      <header>
        <CloseButton />
      </header>
      <div className={styles.successContainer}>
        <img src={successImage} alt="Checkbox verde marcado com sucesso" />
        <span>Agradecemos seu Feedback!</span>
        <button type="button" onClick={ondFeedbackRestartRequested}>
          Quero enviar outro
        </button>
      </div>
    </>
  );
}
