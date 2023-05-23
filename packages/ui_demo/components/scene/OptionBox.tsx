import { useEffect, useState } from "react";
import styles from "./OptionBox.module.css";
import { cls } from "../../util/cls";
import { Question } from "../../pages";

export function OptionBox({
  onNext,
  question,
  stepTitle,
}: {
  onNext: (optionId: number, index: number) => void;
  question: Question;
  stepTitle?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  useEffect(() => {
    setSelectedIndex(-1);
  }, [question]);

  return (
    <div className={styles.modalBox}>
      <div className={styles.infoBox}>
        {stepTitle && <div className={styles.infoBoxStep}>{stepTitle}</div>}
        <div className={styles.infoBoxTitle}>
          {question.title}
          {/* You preferred works style is... */}
        </div>

        <div className={styles.options}>
          {question.options.map((title, index) => {
            return (
              <div
                key={index}
                className={cls(
                  styles.actionButton,
                  styles.optionsItem,
                  index === selectedIndex ? styles.itemSelected : ""
                )}
                onClick={() => setSelectedIndex(index)}
              >
                {title}
              </div>
            );
          })}
        </div>
        <div className="flexRow">
          <div className="flex1"></div>
          <div
            className={cls(styles.actionButton)}
            onClick={() => {
              if (selectedIndex === -1) return;
              onNext(question.id, selectedIndex);
            }}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
