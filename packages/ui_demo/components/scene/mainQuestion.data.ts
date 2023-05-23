import { MainQuestion } from "./types";
import bg1 from "../../images/scene-5/Scene5-bg-1.jpg";
import bg2 from "../../images/scene-5/Scene5-bg-2.jpg";
import bg3 from "../../images/scene-5/Scene5-bg-3.jpg";
import bg4 from "../../images/scene-5/Scene5-bg-4.jpg";

export const mainQuestionList: MainQuestion[] = [
  {
    id: "0",
    title: `The creature on the corner is a pitiful sight, hunched over and clearly in distress. It looks at you with big, tear-filled eyes.`,
    hint: `CREATURE: "Who are you? Why are you here? Can you help me?"`,
    sceneBg: bg1.src,
    options: [
      { text: "What happened to you?", withInput: true },
      { text: "What do you need help with?" },
      { text: "Peek into its mind", tag: "Intuition" },
    ],
  },
  {
    id: "1",
    title: `The creature on the corner is a pitiful sight, hunched over and clearly in distress. It looks at you with big, tear-filled eyes.`,
    hint: `CREATURE: "Who are you? Why are you here? Can you help me?"`,
    sceneBg: bg2.src,
    options: [
      { text: "What happened to you?", withInput: true },
      { text: "What do you need help with?" },
      { text: "Peek into its mind", tag: "Intuition" },
    ],
  },
  {
    id: "2",
    title: `The creature on the corner is a pitiful sight, hunched over and clearly in distress. It looks at you with big, tear-filled eyes.`,
    hint: `CREATURE: "Who are you? Why are you here? Can you help me?"`,
    sceneBg: bg3.src,
    options: [
      { text: "What happened to you?", withInput: true },
      { text: "What do you need help with?" },
      { text: "Peek into its mind", tag: "Intuition" },
    ],
  },
  {
    id: "3",
    title: `The creature on the corner is a pitiful sight, hunched over and clearly in distress. It looks at you with big, tear-filled eyes.`,
    hint: `CREATURE: "Who are you? Why are you here? Can you help me?"`,
    sceneBg: bg4.src,
    options: [
      { text: "What happened to you?", withInput: true },
      { text: "What do you need help with?" },
      { text: "Peek into its mind", tag: "Intuition" },
    ],
  },
];
