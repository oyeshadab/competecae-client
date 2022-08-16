import "./Reports.scss";
import PageContent from "../../components/PageContent/PageContent";
// import Sidebar from "../../components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Badge from "../../components/Badge/Badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import MyVerticallyCenteredModal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import Select from "react-select";

const Reports = () => {
  const [reports, setReports] = useState(["No Data"]);
  const [modalShow, setModalShow] = useState(false);
  const [reportId, setReportId] = useState(null);
  const [userId, setUserId] = useState("");
  const [ChallengeId, setChallengeId] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const authUser = useAuthUser();
  const navigate = useNavigate();

  let statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ]

  useEffect(() => {
    if (authUser().admin) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/reports/list?userId=${userId}&challengeId=${ChallengeId}&status=${selectedStatus}`)
        .then((res) => {
          setReports(res.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      navigate("/");
    }
  }, [modalShow, selectedStatus, userId, ChallengeId]);

  useEffect(() => {
    getUser();
    getCompetitions();
  }, [userId, ChallengeId]);

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
        console.log(err);
      });
  };

  const getCompetitions = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/challenges/latest`
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
        console.log(err);
      });
  };

useEffect(() => {
    if (reports.length == 0) {
    
        toast("No Reports Found", {
            type: "error",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
  }
}, [reports]);

  const handleModalShow = (id) => {
    setModalShow(true);
    setReportId(id);
  };

  const reset = () => {
    setUserId("");
    setChallengeId("");
    setSelectedStatus("");
  }

  return (
    <section className="admin-page">
      {/* <Sidebar /> */}
      <PageContent>
        <div className="admin-page__intro">
          <button
            onClick={() => navigate("/admin")}
            className="admin-page__intro-button"
          >
            Go to Admin page
          </button>
        </div>
        <div className="admin-page__content">
          <div>
            <div class="row" style={{}}>
              <div class="col-md-3">
                <Select
                  options={users}
                  placeholder="Please select an user."
                  onChange={(e) => setUserId(e._id)}
                />
              </div>
              <div class="col-md-3">
                <div style={{ width: 200, right: 30 }}>
                  <Select
                    options={subCategoryOptions}
                    placeholder="Select an option"
                    onChange={(e) => setChallengeId(e._id)}
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div style={{ width: 200, right: 10 }}>
                  <Select
                    options={statusOptions}
                    placeholder="Select an Status"
                    onChange={(e) => setSelectedStatus(e.value)}
                  />
                </div>
              </div>
              <div class="col-md-3">
                <Button
                  text="Reset"
                  type="primary"
                  fn={() => reset()}
                  style={{ marginLeft: 10 }}
                />
              </div>
            </div>
          </div>
          <div className="admin-page__competitions">
            <Table
              borderless
              style={{ verticalAlign: "middle", marginBottom: 0 }}
            >
              <thead>
                <tr>
                  <th className="competition-report__head">#</th>
                  <th className="competition-report__head">Challenge Name</th>
                  <th className="competition-report__head">User Name</th>
                  <th className="competition-report__head">Status</th>
                  <th className="competition-report__head">createdAt</th>
                </tr>
              </thead>
              <tbody>
                {reports &&
                  reports.map((report, i) => {
                    return (
                      <tr>
                        <td className="competition-report__value">{i + 1}</td>
                        <td
                          className="competition-report__value"
                          style={{ minWidth: "120px" }}
                        >
                          <h4
                            style={{ cursor: "pointer" }}
                            onClick={() => handleModalShow(report._id)}
                          >
                            {report.challengeId?.name || "N/A"}
                          </h4>
                        </td>
                        <td
                          className="competition-report__value"
                          style={{ minWidth: "120px" }}
                        >
                          <h4>{report.userId?.user_name || "N/A"}</h4>
                        </td>
                        <td className="competition-report__value">
                          <Badge
                            text={report.status}
                            bgColor={`${
                              report.status === "pending"
                                ? "#FFC107"
                                : report.status === "approved"
                                ? "#28A745"
                                : "#DC3545"
                            }`}
                            color="#F4694C"
                          />
                        </td>
                        <td
                          className="competition-report__value"
                          style={{ minWidth: "120px" }}
                        >
                          <h4>{report.createdAt || "N/A"}</h4>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </PageContent>
      <ToastContainer />
      <MyVerticallyCenteredModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        reportId={reportId}
      />
    </section>
  );
};

export default Reports;
