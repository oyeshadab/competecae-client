import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "react-loading-screen";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HandleAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("_auth_state") || "{}");
 
  const code = searchParams.get("code");
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/users/setWithingsCode?code=${code}&userId=${userData.user_id}`
      )
      .then((res) => {
        setIsLoading(false);
        toast(res.data.message);
        navigate("/");
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingScreen
          loading={isLoading}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          text="Verifing Withing"
        />
      ) : (
        <>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default HandleAuth;
