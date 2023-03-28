import { SubmitHandler } from "react-hook-form";
import LoginForm, { LoginFormValues } from "../molecules/LoginForm";
import { Navbar } from "../molecules/Navbar";

export type LoginProps = {
  onSubmit: SubmitHandler<LoginFormValues>;
};

const Login = (props: LoginProps) => {
  return (
    <>
      <Navbar />
      <div className="bg-purple-200">
        <LoginForm onSubmit={props.onSubmit} />
      </div>
    </>
  );
};

export default Login;
