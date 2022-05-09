import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";
import styles from "../styles/components/CloseButton.module.css";

export const CloseButton = () => {
  return (
    <Popover.Button
      title="Fechar Formulario de Feedback"
      className={styles.container}
    >
      <X weight="bold" className={styles.icon} />
    </Popover.Button>
  );
};
