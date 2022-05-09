import { feedbackTypes } from "..";
import styles from "../../../styles/components/WidgetForm.module.css";
import { CloseButton } from "../../CloseButton";

export function FeedbackTypeStep({ onFeedbackTypeChanged }) {
  return (
    <>
      <header>
        <span className={styles.headerTitle}>Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className={styles.content}>
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className={styles.optionButton}
              onClick={() => onFeedbackTypeChanged(key)}
              type="button"
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
