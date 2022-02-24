import { ComponentMeta, ComponentStory } from "@storybook/react";
import Quiz from "../features/quiz/Quiz";
import { Provider } from "react-redux";
import { store } from "../app/store";

export default {
  title: "Quiz",
  component: Quiz,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Quiz>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Quiz> = (args) => (
  <Provider store={store}>
    <Quiz {...args} />
  </Provider>
);

export const Main = Template.bind({});

Main.args = {
  /*👇 The args you need here will depend on your component */
};
