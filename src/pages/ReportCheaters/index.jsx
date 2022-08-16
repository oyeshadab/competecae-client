import React, { useState, useEffect } from "react";
import SplashImage from "../../assets/images/forgot_password.svg";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cheaters.css";
import { Oval } from "react-loader-spinner";

import Logo from "../../assets/images/undraw_account_re_o7id 1.svg";
const ForgotPassword = () => {
  const [subCategoryOptions, setSubCategoryOptions] = useState([
    // { value: -1, label: "Competition" },
  ]);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({});
  const [userId, setUserId] = useState("");
  const [ChallengeId, setChallengeId] = useState("");
  const [description, setDescription] = useState();

  useEffect(() => {
    getUser();
    getCompetitions();
  }, []);

  const getUser = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/users`
        // , {
        //   verification_code: e.target.code.value,
        // }
      )
      .then((res) => {
        var newRes = res.data.map((item, index) => {
          item.label = item.user_name;
          item.value = index;
          return item;
        });
        setUsers(newRes);
      })
      .catch((err) => {
        // switch(err.response.status) {
        // case 403:
        //     toast.error("Confirmation code not found!");
        //     break;
        // case 406:
        //     toast.error("Something went wrong :(")
        //     break;
        // default:
        //     break;
        // }
      });
  };

  const getCompetitions = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/challenges/latest`
        // , {
        //   verification_code: e.target.code.value,
        // }
      )
      .then((res) => {
        var newRes = res.data.map((item, index) => {
          item.label = item.name;
          item.value = index;
          return item;
        });
        setSubCategoryOptions(newRes);
      })
      .catch((err) => {
        // switch(err.response.status) {
        // case 403:
        //     toast.error("Confirmation code not found!");
        //     break;
        // case 406:
        //     toast.error("Something went wrong :(")
        //     break;
        // default:
        //     break;
        // }
      });
  };

  const uploadFile = (e) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 88 ~ uploadFile ~ e",
      e.target.files[0].name
    );
    setLoading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("fileName", e.target.files[0].name);
    // console.log("🚀 ~ file: index.jsx ~ line 94 ~ uploadFile ~ formData", formData)
    // return
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, formData)
      .then((response) => {
        // console.log(
        //   "🚀 ~ file: index.jsx ~ line 99 ~ ).then ~ response",
        //   response
        // );
        setUploadedFile(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("🚀 ~ file: index.jsx ~ line 101 ~ ).then ~ err", err);
      });
  };

  const selectUsers = (e) => {
    setUserId(e._id);
  };

  const submit = () => {
    if (!userId) {
      alert("Please select an user.");
    } else if (!ChallengeId) {
      alert("Please select a challenge.");
    } else {

      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/v1/reports`,
        headers: {}, 
        data:{
          challengeId: userId,
          userId: ChallengeId,
          description: description,
          proof:uploadedFile.url
        }
      }).then((response)=>{
        alert('Report submitted.')
      // console.log("🚀 ~ file: index.jsx ~ line 146 ~ submit ~ response", response.data)
        
      })
      // axios
      //   .post(`${process.env.REACT_APP_API_URL}/api/v1/reports`, {
      //     challengeId: userId,
      //     userId: ChallengeId,
      //     description: description,
      //     proof:uploadedFile.url
      //   })
      //   .then((response) => {
      //     console.log("🚀 ~ file: index.jsx ~ line 142 ~ .then ~ response", response)
      //     // console.log(
      //     //   "🚀 ~ file: index.jsx ~ line 99 ~ ).then ~ response",
      //     //   response
      //     // );
      //     // setUploadedFile(response.data);
      //     // setLoading(false);
      //   })
      //   .catch((err) => {
      //     // setLoading(false);
      //     console.log("🚀 ~ file: index.jsx ~ line 101 ~ ).then ~ err", err);
      //   });
    }
  };

  const handleClick = (event) => {
    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 44 ~ ForgotPassword ~ event",
    //   hiddenFileInput
    // );
    hiddenFileInput.current.click();
  };

  return (
    <>
      <div className="container">
        <div className="card" style={{ marginBottom: 20 }}>
          <div class="container">
            <div class="row" style={{ marginTop: 20 }}>
              <div class="col-md-3" style={{ marginLeft: 50 }}>
                <div className="report_head">Report Cheaters</div>
                <div className="report_details_text">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div style={{ marginTop: 30, marginBottom: 60 }}>
                  <img className="header__logo-image" src={Logo} alt="logo" />
                </div>
              </div>
              <div
                class="col-md-8"
                style={{ alignItems: "center", marginLeft: 10 }}
              >
                {/* <Oval
    height = {30}
    width = {30}
    // radius = "9"
    color = '#DAB876'  
  /> */}

                <div class="row">
                  <div class="col-md-6">
                    <form onSubmit={() => {}}>
                      <div class="row" style={{}}>
                        <div class="col-md-7">
                          <Select
                            options={users}
                            placeholder="Please select an user."
                            onChange={(e) => setUserId(e._id)}
                          />
                        </div>
                        <div class="col-md-5">
                          <Button
                            text="Search"
                            type="primary"
                            style={{ marginLeft: 10 }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-6">
                    <div style={{ width: 200, right: 30 }}>
                      <Select
                        options={subCategoryOptions}
                        placeholder="Select an option"
                        //   value={selectedSubCategory}
                        onChange={(e) => setChallengeId(e._id)}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <div className="more_info_head">More information</div>
                  <div style={{}}>
                    <textarea
                      rows="5"
                      onChange={(w) => setDescription(w.target.value)}
                    ></textarea>
                  </div>
                  <div
                    onClick={handleClick}
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      marginBottom: 20,
                      marginTop: 20,
                      padding: 5,
                      borderColor: "#725095",
                    }}
                  >
                    <div className="internal_border">
                      {loading ? (
                        <div className="loading">
                          <Oval color="green" height={30} width={30} />
                        </div>
                      ) : uploadedFile && uploadedFile.hasOwnProperty("url") ? (
                        <img
                          className="uploadedImage"
                          src={uploadedFile.url}
                          alt="logo"
                        />
                      ) : (
                        <div>
                          <div className="alignText">
                            <div className="drag_drop_title">
                              Drag and drop or browse
                            </div>
                            <div className="type_title">.PNG, .JPG, .PDF</div>
                          </div>
                          <input
                            type="file"
                            accept="image/gif, image/jpeg,application/pdf"
                            ref={hiddenFileInput}
                            style={{
                              backgroundColor: "white",
                              width: "100%",
                              height: 150,
                              visibility: "hidden",
                            }}
                            onChange={uploadFile}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                textAlign: "right",
                paddingBottom: 50,
                paddingRight: 50,
              }}
            >
              <Button
                text="Submit"
                type="primary"
                style={{ marginLeft: 10 }}
                fn={() => submit()}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
