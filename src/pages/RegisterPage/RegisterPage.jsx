import s from "./LoginPage.module.css";
import { RegistrationForm } from "../../components";

const RegisterPage = () => {
  return (
    <>
      <div className={s.bg}>
        <RegistrationForm />
      </div>
    </>
  );
};

export default RegisterPage;
