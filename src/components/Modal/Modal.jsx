import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";


export default function MyVerticallyCenteredModal({
  show,
  handleClose,
  reportId,
}) {
  const [report, setReport] = useState(null);
  const [reportStatus, setReportStatus] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/reports/${reportId}`)
      .then((res) => {
        setReport(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reportId]);
  useEffect(() => {
    if (report?.status) {
      setReportStatus(report.status);
    }
  }, [report?.status]);
  const handleStatusChange = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/v1/reports/${reportId}`, {
        status: reportStatus,
      })
      .then((res) => {
        handleClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Report Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <h4 style={{ padding: "10px" }}>
          Challenge name:
          <span style={{ marginLeft: "10px" }}>
            {report?.challengeId?.name || "N/A"}
          </span>
        </h4>
        <h4 style={{ padding: "10px" }}>
          User name:
          <span style={{ marginLeft: "10px" }}>
            {report?.userId?.user_name || "N/A"}
          </span>
        </h4>
        <h4 style={{ padding: "10px" }}>
          Description:
          <span style={{ marginLeft: "10px" }}>{report?.description}</span>
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <h4>Status:</h4>
          <Form.Select
            style={{ marginLeft: "10px" }}
            value={reportStatus}
            onChange={(e) => setReportStatus(e.target.value)}
            size="lg"
          >
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
            <option value="pending">pending</option>
          </Form.Select>
        </div>
        <h4>
          Reported By:
          <span style={{ marginLeft: "10px" }}>
            {report?.submittedBy?.user_name || "N/A"}
          </span>
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <h4>Proof:</h4>
          {report?.proof ? (
            <Image
              thumbnail
              style={{ height: "70px", width: "70px", marginLeft: "30px" }}
              src={report?.proof}
              alt="Proof"
            />
          ) : (
            "N/A"
          )}
        </div>
        <h4 style={{ padding: "10px" }}>
          Created At:{" "}
          <span style={{ marginLeft: "10px" }}>{report?.createdAt}</span>{" "}
        </h4>
      </Modal.Body>
      <Modal.Footer className="p-10">
        <button
          className="btn btn-outline-primary p-2"
          onClick={handleStatusChange}
        >
          Update Status
        </button>

        <button className="btn btn-outline-primary p-2" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
