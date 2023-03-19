import LoginForm from "../molecules/LoginForm";
import { Navbar } from "../molecules/Navbar";

const Login = () => {
  return (
    <>
      <Navbar currentPage="login" />
      <div className="bg-gray-200">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
