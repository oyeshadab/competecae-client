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
  const [showList, setShowList] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [paramValue, setparamValue] = useState('');
  useEffect(() => {
    // getUser();
    getUserSearch('')
    getCompetitions("?userId=");
  }, []);

  // const getUser = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/users`)
  //     .then((res) => {
  //       var newRes = res.data.map((item, index) => {
  //         item.label = item.user_name;
  //         item.value = index;
  //         return item;
  //       });
  //       setUsers(newRes);
  //     })
  //     .catch((err) => {});
  // };

  const getUserSearch = (search) => {
    var param = 'user_name=';
    let result = search.includes("@")
    if(result) {
      param = 'email='; 
      setparamValue('email')
    }
    let isnum = /^\d+$/.test(search);
    if(isnum) {
    param = 'phone=';
    setparamValue('phone')
    }
    // console.log("🚀 ~ file: index.jsx ~ line 50 ~ getUserSearch ~ result", isnum)
    
    setSearchValue(search)
    axios
      .get(`${process.env.REACT_APP_API_URL}/users?`+param+search)
      .then((res) => {
        var newRes = res.data.map((item, index) => {
          item.label = `${item.user_name} ${paramValue? "- " + item[paramValue] : ''}`
          item.value = index;
          return item;
        });
        setUsers(newRes);
      })
      .catch((err) => {});
  };

  const getCompetitions = (data) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/challenges/latest` + data)
      .then((res) => {
        // console.log("🚀 ~ file: index.jsx ~ line 56 ~ .then ~ res", res.data)
        var newRes = res.data.map((item, index) => {
          item.label = item.name;
          item.value = index;
          return item;
        });
        setSubCategoryOptions(newRes);
      })
      .catch((err) => {});
  };

  const uploadFile = (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("fileName", e.target.files[0].name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, formData)
      .then((response) => {
        setUploadedFile(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const selectUsers = (e) => {
    setUserId(e._id);
  };

  const submit = async () => {
    if (!userId) {
      alert("Please select an user.");
    } else if (!ChallengeId) {
      alert("Please select a challenge.");
    } else {
      const userData = await JSON.parse(localStorage.getItem("_auth_state"));
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/v1/reports`,
        headers: {},
        data: {
          challengeId: ChallengeId,
          userId: userId,
          submittedBy: userData.user_id,
          description: description,
          proof: uploadedFile.url,
        },
      }).then((response) => {
        alert("Report submitted.");
        window.location.reload();
      });
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const updateUser = (userId) => {
  // console.log("🚀 ~ file: index.jsx ~ line 141 ~ updateUser ~ userId", userId)
    setSearchValue(userId.user_name)
    setUserId(userId._id);
    getCompetitions("?user=" + userId);
  };

  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
                <div class="row">
                  <div class="col-md-6">
                    <form onSubmit={() => {}}>
                      <div class="row" style={{}}>
                        <div class="col-md-7">
                          {/* <Select
                            options={users}
                            placeholder="Please select an user."
                            // onChange={(e) => setUserId(e._id)}
                            onChange={(e) => updateUser(e._id)}
                          /> */}

                          <input
                            // id={`id${id}`}
                            // value={value}
                            // type={type}
                            // min={min}
                            // className="bg-yellow-100 border-primary-700 border border-opacity-25 text-primary-700 placeholder:text-primary-700 placeholder:text-opacity-40 rounded-full py-2 px-5 font-semibold text-5xl w-full"
                            placeholder={"Please select an user."}
                            style={{
                              borderWidth: 1,
                              height: 37,
                              borderRadius: 5,
                              paddingLeft: 10,
                              paddingRight: 10,
                              width: 240,
                            }}
                            value={searchValue}
                            // {...inputProps}
                            onFocus={() => setShowList(true)}
                            onChange={(e)=>{getUserSearch(e.target.value)}}
                            // onBlur={() => setShowList(false)}
                          />

                          {/* <div style={{ height: 150 }}> */}
                          {/* //  style={{height:150,overflow:'hidden'}} */}
                           {/* > */}
                            {showList && users.length > 0 &&
                          <ul className="list">
                              {users.map((item, index) => (
                                <li onClick={()=>{updateUser(item);setShowList(false)}} className="listItem">{item.label}</li>
                              ))}
                              </ul>
                            }
                          {/* </div> */}
                        </div>
                        <div class="col-md-5">
                          <Button
                            text="Search"
                            type="primary"
                            style={{ marginLeft: 10 }}
                            // fn={() => {submit()}}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-6">
                    {/* <div style={{ width: 200, right: 30 }}>
                      <Select
                        options={subCategoryOptions}
                        placeholder="Select an option"
                        onChange={(e) => setChallengeId(e._id)}
                      />
                    </div> */}
                  </div>
                </div>
                {userId && subCategoryOptions.length > 0 && (
                  <div
                    class="grid-container card "
                    style={{ padding: 20, marginTop: 20 }}
                  >
                    {subCategoryOptions.map((item, index) => (
                      <>
                        <div
                          class="grid-item"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: item._id == ChallengeId && "green",
                          }}
                          onClick={() => setChallengeId(item._id)}
                        >
                          <div
                            className="center"
                            style={{ alignItems: "center", marginLeft: "35%" }}
                          >
                            <img
                              src={item.userDetails[0].profilePicture}
                              alt="logo"
                              style={{
                                height: 45,
                                width: 45,
                                borderRadius: 50,
                              }}
                            />
                          </div>
                          <div className="competitionTitle">Competition</div>
                          <div className="competitionTitle2">{item.name}</div>
                          <div className="dollerValue">$ 1000</div>
                        </div>
                      </>
                    ))}
                  </div>
                )}
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
