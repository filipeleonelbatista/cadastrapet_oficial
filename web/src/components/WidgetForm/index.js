import { useState } from "react";
import { Link } from "react-router-dom";
import bugImageUrl from "../../assets/Bug.png";
import ideaImageUrl from "../../assets/Idea.png";
import thoughtImageUrl from "../../assets/Thought.png";
import styles from "../../styles/components/WidgetForm.module.css";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedBack() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className={styles.container}>
      {feedbackSent ? (
        <FeedbackSuccessStep
          ondFeedbackRestartRequested={handleRestartFeedBack}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              onFeedbackSent={() => setFeedbackSent(true)}
              feedbackType={feedbackType}
              ondFeedbackRestartRequested={handleRestartFeedBack}
            />
          )}
        </>
      )}
      <footer className={styles.footer}>
        Feito com ❤️ para <Link to="/">CadastraPet</Link>
      </footer>
    </div>
  );
};
