import styles from "../styles/components/Input.module.css";
import { FaCalendar } from "react-icons/fa";
import Button from "./Button";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { dateToString, stringToDate } from "../utils/string";

function Input({
  id,
  label,
  placeholder,
  onChange,
  value,
  required,
  type,
  disabled,
  ...rest
}) {
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    if (startDate) {
      const brDate = dateToString(startDate);
      const event = {
        target: {
          value: brDate,
        },
      };
      onChange(event);
    }
  }, [startDate]);

  useEffect(() => {
    if (value) {
      if (stringToDate(value) !== "NAD") {
        setStartDate(stringToDate(value));
      }
    }
  }, [value]);

  if (type === "date") {
    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={id}>
            {label}
            {required && "*"}
          </label>
        )}
        <div style={{ display: "flex", flexDirection: "row", gap: " 0.4rem" }}>
          <ReactDatePicker
            id={id + "-calendar"}
            placeholderText={`${
              placeholder && required ? placeholder + "*" : ""
            }`}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            disabled={disabled}
          />
          <Button
            disabled={disabled}
            id={id + "action-date-selector"}
            onClick={() => {
              document.getElementById(`${id}-calendar`).click();
            }}
          >
            <FaCalendar />
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id}>
          {label}
          {required && "*"}
        </label>
      )}
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={`${placeholder && required ? placeholder + "*" : ""}`}
        type={type}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
}

export default Input;
