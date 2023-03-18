import { PrimaryButton, SecondaryButton } from "./Button";

export default {
  title: "Atoms/Buttons",
  component: PrimaryButton,
};

export const Primary = () => <PrimaryButton>Primary</PrimaryButton>;
export const Secondary = () => <SecondaryButton>Secondary</SecondaryButton>;
