import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SceneMainGame.module.css";
import { cls } from "../../util/cls";
import { MainQuestion } from "./types";
import iconInventory from "../../images/scene-5/inventory.png";
import iconQuest from "../../images/scene-5/Quest.png";
import iconSetting from "../../images/scene-5/settings.png";

const mockConversation = `The creature raises its gaze, and you can see a depth of pain in its eyes that belies its alien form. It takes a moment to compose itself, its voice trembling slightly as it begins to recount its tale.

"I... I am Sylpherion, a cryptomancer," it starts, its voice hoarse. "My life, my existence, is tied to the blockchain, the pulsating heart of Etheria. I wove tokens, created memories, and made Crypts. But... something went wrong."

Sylpherion takes a shaky breath, its sorrow echoing in its tone. "I crafted a Crypt, a beautiful memory of a joyous event. A celebration of unity, a moment where Etheria stood as one. But the token... it never appeared on the blockchain. Instead, it turned against me, a rogue Crypt, a backlash of unrealized potential. It sapped my energy, my vitality... my very existence."

Its large eyes shimmer with tears that pool and trickle down its leathery cheeks. "I'm fading, slowly, with each passing cycle of the blockchain. Unless the rogue Crypt can be returned, reconciled with the chain, I fear... I may not exist much longer. I lack the strength to face it myself. But you... you could help."

The creature falls silent, its plea hanging in the still air. Despite its sorrow, you sense a flicker of hope behind those tear-filled eyes. It's a daunting request, a quest that may be perilous, but it's clear that Sylpherion's existence depends on the resolution of this task.`;

type Conversation = {
  context?: string;
  from: string;
  text: string;
};
export function SceneMainGame({
  bg,
  question,
  onSubmit,
  explorerName = "Eve the Explorer",
}: {
  bg: string;
  question: MainQuestion;
  onSubmit: (
    question: MainQuestion,
    result: { selectedIndex: number; text: string }
  ) => void;
  explorerName?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [text, setText] = useState("");
  useEffect(() => {
    setSelectedIndex(-1);
    setText("");
  }, [question]);
  const [answering, setAnswering] = useState(false);
  const [typing, setTyping] = useState(false);

  const [conversations, setConversations] = useState<
    Array<{ type: "context" | "text"; text: string; from?: string }>
  >([]);

  useEffect(() => {
    if (!typing) return;
    const fullText = mockConversation;
    let index = 0;
    let interval = setInterval(() => {
      const random = Math.floor(Math.random() * 5);
      index += random;
      if (index < fullText.length) {
        setConversations((list) => {
          const l = [...list];
          const item = l.at(-1);
          if (item) {
            item.text = fullText.slice(0, index);
          }
          return l;
        });
      } else {
        setTyping(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [typing]);

  const onSend = () => {
    if (typing) return;
    if (conversations.length) {
      onSubmit(question, { text, selectedIndex });
      setConversations([]);
      setAnswering(false);
      return;
    }
    setConversations([
      {
        from: explorerName,
        text: text || "\n" + question.options[selectedIndex].text + "\n\n",
        type: "text",
      },
      { from: "", text: "", type: "text" },
    ]);
    setTyping(true);
    setAnswering(true);
  };

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
          <div
            className={cls("mostly-customized-scrollbar", styles.contentBox)}
            style={{
              height: "calc(100vh - 40px)",
              overflowY: "auto",
              paddingBottom: "60px",
            }}
          >
            <div className={styles.questionTitle}>{question.title}</div>
            <div className={styles.questionHint}>{question.hint}</div>
            {conversations.length > 0 &&
              conversations.map((item, index) => {
                return (
                  <div key={index} style={{ paddingTop: "20px" }}>
                    {item.from && (
                      <div className={styles.questionHint}>
                        {item.from}: {item.text}
                      </div>
                    )}
                    {item.from === "" && (
                      <div
                        className={styles.questionHint}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {item.text}
                      </div>
                    )}
                  </div>
                );
              })}
            {!answering && (
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
            )}
            {!typing && (
              <div className="flexRow">
                <div className="flex1"></div>
                <div
                  className={cls(styles.actionButton)}
                  onClick={() => {
                    if (selectedIndex === -1 && text === "") return;
                    // onSubmit(question, { selectedIndex, text });
                    onSend();
                  }}
                >
                  {answering ? "Next" : "Send"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
