import { ArrowLeft } from "phosphor-react";
import { useState } from "react";
import { feedbackTypes } from "..";
import { useAuth } from "../../../hooks/useAuth";
import styles from "../../../styles/components/WidgetForm.module.css";
import { CloseButton } from "../../CloseButton";
import { ScreenShotButton } from "../ScreenShotButton";

export function FeedbackContentStep({
  feedbackType,
  ondFeedbackRestartRequested,
  onFeedbackSent,
}) {
  const { props, functions } = useAuth();

  const { user } = props;
  const { createFeedback } = functions;
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [screenshot, setScreenshot] = useState(null);
  const [comment, setComment] = useState("");

  async function handleSubmitFeedback(e) {
    e.preventDefault();

    const data = {
      screenshot,
      comment,
      user: user.uid,
      created_at: Date.now(),
    };
    if (!(await createFeedback(data)))
      return alert("Erro ao adicionar feedback");

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <span className={styles.headerTitle}>
          <button
            type="button"
            onClick={ondFeedbackRestartRequested}
            style={{
              position: "absolute",
              top: "2rem",
              left: "2rem",
              display: " flex",
              alignItems: "center",
              backgroundColor: "transparent",
              border: "transparent",
            }}
          >
            <ArrowLeft
              weight="bold"
              style={{
                width: "1.6rem",
                heigth: "1.6rem",
              }}
            />
          </button>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder="Conte em detalhes o que está acontecendo..."
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <footer className={styles.formFooter}>
          <ScreenShotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment.length === 0}
            className={styles.submitButton}
          >
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  );
}
