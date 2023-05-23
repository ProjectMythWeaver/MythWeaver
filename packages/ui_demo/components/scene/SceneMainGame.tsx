import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SceneMainGame.module.css";
import { cls } from "../../util/cls";
import { MainQuestion } from "./types";
import iconInventory from "../../images/scene-5/inventory.png";
import iconQuest from "../../images/scene-5/Quest.png";
import iconSetting from "../../images/scene-5/settings.png";

export function SceneMainGame({
  bg,
  question,
  onSubmit,
}: {
  bg: string;
  question: MainQuestion;
  onSubmit: (
    question: MainQuestion,
    result: { selectedIndex: number; text: string }
  ) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [text, setText] = useState("");
  useEffect(() => {
    setSelectedIndex(-1);
    setText("");
  }, [question]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${question.sceneBg ?? bg})`,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div className={cls(styles.questionPanel, "flexCol")}>
        <div className="flex1 flexCol">
          <div className={cls("flexRow", styles.iconBar)}>
            <Image src={iconInventory} />
            <Image src={iconQuest} />
            <Image src={iconSetting} />
          </div>
          <div className={styles.contentBox}>
            <div className={styles.questionTitle}>{question.title}</div>
            <div className={styles.questionHint}>{question.hint}</div>
            <div className={styles.options}>
              {question.options.map((opt, index) => {
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
                    {opt.tag && (
                      <span
                        className="tag"
                        style={{ color: "#CA9BF9", marginRight: "10px" }}
                      >
                        [{opt.tag}]
                      </span>
                    )}
                    {opt.text}
                  </div>
                );
              })}
              <div
                className={cls(
                  styles.inputBox,
                  !!text ? styles.itemSelected : ""
                )}
              >
                <textarea
                  className={styles.inputElem}
                  value={text}
                  placeholder="Input and ask your question"
                  onInput={(ev) => {
                    setSelectedIndex(-1);
                    setText(ev.currentTarget.value);
                  }}
                  onKeyDownCapture={(ev) => {}}
                />
              </div>
            </div>
            <div className="flexRow">
              <div className="flex1"></div>
              <div
                className={cls(styles.actionButton)}
                onClick={() => {
                  if (selectedIndex === -1 && text === "") return;
                  onSubmit(question, { selectedIndex, text });
                }}
              >
                Next
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
