import styles from "../styles/components/Widget.module.css";
import { ChatTeardropDots } from "phosphor-react";
import { Popover } from "@headlessui/react";
import { WidgetForm } from "./WidgetForm";

export const Widget = () => <></>;
export const WidgetComponent = () => {
  return (
    <Popover className={styles.container}>
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>
      <Popover.Button className={styles.button}>
        <ChatTeardropDots />
        <span className={styles.title}>
          <span className={styles.titlePadding}></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
};
