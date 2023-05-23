export type MainQuestionOption = {
  text: string;
  tag?: string;
  withInput?: boolean;
};

export type MainQuestion = {
  id: string;
  title: string;
  hint: string;
  sceneBg?: string;
  options: MainQuestionOption[];
};
