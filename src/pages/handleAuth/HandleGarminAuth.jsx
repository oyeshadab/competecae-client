import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "react-loading-screen";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HandleGarminAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("_auth_state") || "{}");

  const oath_verifier = searchParams.get("oauth_verifier");
  useEffect(() => {
    // axios
    //   .get(
    //     `${process.env.REACT_APP_API_URL}/users/getAccessToken?userId=${userData.user_id}`
    //   )
    //   .then((res) => {
    //     setIsLoading(false);
    //     toast(res.data.message);
    //     navigate("/");
    //   });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/getAccessToken?userId=${userData.user_id}`,
        {
          verifier: oath_verifier,
        }
      )
      .then((res) => {
        setIsLoading(false);
        console.log(res)
        // toast(res.data.message);
        navigate("/");
      })
      .catch((err) => console.error(err));
  }, [navigate,oath_verifier,userData.user_id]);
  return (
    <>
      {isLoading ? (
        <LoadingScreen
          loading={isLoading}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          text="Verifing Garmin"
        />
      ) : (
        <>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default HandleGarminAuth;
