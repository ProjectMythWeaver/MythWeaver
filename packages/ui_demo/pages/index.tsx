import Image from "next/image";
import Layout from "../components/layout";
// images
import bgImg from "../images/scene1-bg.jpg";
import logo from "../images/scene1-logo.png";
import imgTitle from "../images/scene1-title-MythWeaver.png";
import bgImgScene2 from "../images/scene2-bg.png";
import bgImgScene3 from "../images/scene3-bg.png";
import bgImgScene4 from "../images/scene4-bg.png";

import { useEffect, useRef, useState } from "react";
import { useFullscreen, useKeyPress } from "react-use";
import styles from "./index.module.css";
import { cls } from "../util/cls";
import { StepOfSceneBuilding } from "../components/scene/StepOfSceneBuilding";
import { OptionBox } from "../components/scene/OptionBox";
import { SceneMainGame } from "../components/scene/SceneMainGame";
import { MainQuestion } from "../components/scene/types";
import { mainQuestionList } from "../components/scene/mainQuestion.data";
import { useConnectWallet } from "../hooks/useAccount";

const VIEWBOX_SIZE = { width: 1920, height: 1080 };
export type Question = {
  id: number;
  title: string;
  options: string[];
  answer?: number;
};
const questions: Question[] = [
  {
    id: 0,
    title: "Your preferred work style is...",
    options: [
      "A) Making a list and following it step-by-step",
      "B) Going with the flow and handling tasks as they come up",
    ],
  },
  // {
  //   id: 1,
  //   title: "Q2: Your preferred work style is...",
  //   options: [
  //     "A) Making a list and following it step-by-step",
  //     "B) Going with the flow and handling tasks as they come up",
  //   ],
  // },
];

export default function IndexPage() {
  const { address, connect, disconnect } = useConnectWallet();
  const [step, setStep] = useState(0);

  const globalBoxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [enterFullScreen, setEnterFullScreen] = useState(false);
  useFullscreen(globalBoxRef, enterFullScreen, {
    onClose: () => {
      console.log("full screen on close");
    },
  });

  const lastClickRef = useRef(0);
  useKeyPress((event) => {
    if (
      (event.metaKey || event.ctrlKey) &&
      event.key.toLowerCase() === "enter"
    ) {
      setEnterFullScreen((b) => !b);
    }
    if (event.code.toLowerCase() === "space") {
      if (Date.now() - lastClickRef.current < 500) return false;

      if (step === 2) {
        setStep(3);
        lastClickRef.current = Date.now();
        return true;
      }
      if (step === 3) {
        setStep(4);
        lastClickRef.current = Date.now();
        return true;
      }
      if (step === 4) {
        setStep(5);
        lastClickRef.current = Date.now();
        return true;
      }
    }
    return true;
  });

  useEffect(() => {
    const onResize = () => {
      const width = globalBoxRef.current?.clientWidth;
      const height = globalBoxRef.current?.clientHeight;

      if (width && height) {
        const scaleRatio = Math.min(
          width / VIEWBOX_SIZE.width,
          height / VIEWBOX_SIZE.height
        );
        // console.log("resized", { width, height, scaleRatio });
        setScale(scaleRatio);
      }
    };
    window.addEventListener("resize", onResize);
    // full screen
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const [questionIndex, setQuestionIndex] = useState(0);
  const stepTitle = `Question ${questionIndex + 1} of ${questions.length}`;
  const question = questions[questionIndex];

  // game
  // mainQuestionList
  const [gqIndex, setGQIndx] = useState(0);
  const mainQuestion = mainQuestionList[gqIndex];

  return (
    <Layout>
      <div
        ref={globalBoxRef}
        className="global"
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "black",
        }}
      >
        <div
          style={{
            ...VIEWBOX_SIZE,
            aspectRatio: `${VIEWBOX_SIZE.height} / ${VIEWBOX_SIZE.width}`,
            transform: `scale(${scale})`,
            backgroundImage: `url(${bgImg.src})`,
            backgroundSize: "cover",
            display: "flex",
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {step === 0 && (
            <>
              {/* center */}
              <div
                className="center"
                style={{ display: "flex", flexDirection: "column", width: 774 }}
              >
                <Image src={logo} width={774} height={774} />
                <Image src={imgTitle} width={673} height={126} />
              </div>

              <div
                className={cls("top-right", styles.walletConnection)}
                style={{ position: "absolute", top: "50px", right: "50px" }}
              >
                {address && (
                  <div className="address" onClick={() => disconnect()}>
                    Wallet Connected
                    <div className="tiny" style={{ fontSize: 13 }}>
                      {address}
                    </div>
                  </div>
                )}
              </div>

              {/* right-bottom actions */}
              <div className={styles.actions}>
                <div className={cls(styles.btnBase, styles.btnStart)}>
                  <span
                    className={styles.btnText}
                    onClick={() => {
                      // connect wallet
                      if (!address) {
                        connect();
                        return;
                      }

                      setStep(1);
                    }}
                  >
                    START
                  </span>
                </div>
                <div
                  className={cls(
                    styles.btnBase,
                    styles.btnQuit,
                    styles.btnStart
                  )}
                >
                  <span
                    className={styles.btnText}
                    onClick={() => window.close()}
                  >
                    QUIT
                  </span>
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <OptionBox
              stepTitle={stepTitle}
              question={question}
              onNext={(id, answerIndex) => {
                const qIndex = questions.findIndex((i) => i.id === id);
                const nextQIndex = qIndex + 1;
                if (nextQIndex === questions.length) {
                  // go next step
                  setStep(2);
                  return;
                }
                setQuestionIndex(qIndex + 1);
              }}
            />
          )}

          {step === 2 && (
            <StepOfSceneBuilding
              loading={false}
              loadingTitle="Enter the portal to begin your journey"
              bg={bgImgScene2.src}
            />
          )}
          {step === 3 && (
            <StepOfSceneBuilding
              loading={true}
              loadingTitle="Creating your character"
              bg={bgImgScene3.src}
              showIChingLogo={true}
              onGoNext={() => {
                setStep(4);
              }}
            />
          )}
          {step === 4 && (
            <StepOfSceneBuilding
              loading={true}
              loadingTitle="Divining your stroke of destiny"
              bg={bgImgScene4.src}
              showIChingLogo={true}
              onGoNext={() => {
                setStep(5);
              }}
            />
          )}

          {/* main game */}
          {step === 5 && (
            <SceneMainGame
              bg={bgImgScene4.src}
              question={mainQuestion}
              onSubmit={() => {
                const nextIndex = gqIndex + 1;
                if (nextIndex >= mainQuestionList.length) return;
                // collection answers
                setGQIndx((s) => s + 1);
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
