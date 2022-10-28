import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_URL } from "../../config";
import { LOGIN } from "./services/mutations";
import CustomerAuth from "../../services/auth";
import "./styles.css";
import LoginPassword from "./loginPassword";
import { useRecoilState } from "recoil";
import { UserPermissionsAtom } from "../../states/permissionsStates";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [userPermissions, setUserPermissions] =
    useRecoilState(UserPermissionsAtom);

  const [userLogin, { data }] = useMutation(LOGIN);

  useEffect(() => {
    if (data) {
      const { accessToken, refreshToken, user } = data.passwordLogin;
      CustomerAuth.setTokens({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      setUserPermissions(user?.permissions);
      navigate("/home/users");
    }
  }, [data]);

  const onSubmitForm = (data: any) => {
    userLogin({
      variables: {
        input: data,
      },
    });
  };

  return (
    <div className="login-page">
      <div className="left">
        <img src={LOGIN_URL} alt="login image" id="login-image" />
      </div>
      <div className="input-container">
        <LoginPassword onSubmitForm={onSubmitForm} />
      </div>
    </div>
  );
};

export default Login;
