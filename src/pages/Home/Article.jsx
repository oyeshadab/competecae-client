import React from "react";
// @ts-ignore
import UserInfo from "../../components/common/UserInfo.tsx";
// @ts-ignore
import Card1 from "./Card.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartBlank } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart,
  faShare,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthUser } from "react-auth-kit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import Input from "../../components/Input/Input";

const Article = ({ getHomePosts, data, users, toast, getPosts, authUser }) => {
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(data.likes.length);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [comment, setComment] = useState("");

  const customStylesModal = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "500px",
    },
  };

  useEffect(() => {
    if (data.likes.find((user) => user.user === authUser().user_id)) {
      setLiked(true);
    }
  }, []);

  const likePost = () => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/posts/${data._id}/like`, {
        user: authUser().user_id,
      })
      .then(() => {
        setLiked(true);
        setLikesCount(likesCount + 1);
        getHomePosts();
      })
      .catch((err) => console.error(err));
  };

  const disLikePost = () => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/posts/${data._id}/dislike`, {
        user: authUser().user_id,
      })
      .then(() => {
        setLiked(false);
        setLikesCount(likesCount - 1);
        getHomePosts();
      })
      .catch((err) => console.error(err));
  };

  const setModal = (data, enable) => {
    console.log("data", data);
    setCurrentPost(data);
    setModalOpen(true);
  };

  const postComment = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/posts/addComment`, {
        post_id: currentPost._id,
        user_id: authUser().user_id,
        comment: comment,
      })
      .then((res) => {
        getHomePosts();
      })
      .catch((err) => console.error(err));

    setModalOpen(false);

    setComment("");
  };

  const handleChange = (event) => {
    setComment(event.target.value);

    console.log("value is:", event.target.value);
  };

  return (
    <section>
      <div className="bg-yellow-700 rounded-lg py-3 px-4">
        <div className="mb-5">
          <UserInfo
            image={
              users.find((user) => user._id === data.user)
                ? users.find((user) => user._id === data.user).profile_pic
                : ""
            }
            name={
              users.find((user) => user._id === data.user)
                ? users.find((user) => user._id === data.user).user_name
                : ""
            }
            active={new Date(data.date)
              .toISOString()
              .replace(/T.*/, "")
              .split("-")
              .reverse()
              .join("-")}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-5 mb-4">
          <div className="">
            <p className="text-dark font-light text-17xl mb-4">{data.text}</p>
            <div className="bg-primary-700 rounded-t-xl rounded-b-lg">
              <img className="w-full rounded-lg" src={data.image} alt="" />
              <div className="py-2 px-3 flex justify-between gap-2">
                <div>
                  <p className="font-medium text-5xl text-white mb-1">
                    Lorem Ipsem Lorem IpsemLorem Ipsem
                  </p>
                  <p className="text-4xl text-gray-150">
                    Lorem Ipsem Lorem Ipsem
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-lg font-medium py-1.5 px-6 bg-white whitespace-nowrap rounded-md"
                  >
                    Join now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            {" "}
            <div className="">
              <p className="text-dark font-light text-17xl mb-4">{data.text}</p>
              <div className="bg-primary-700 rounded-t-xl rounded-b-lg">
                <img className="w-full rounded-lg" src={data.image} alt="" />
                <div className="py-2 px-3 flex justify-between gap-2">
                  <div>
                    <p className="font-medium text-5xl text-white mb-1">
                      Lorem Ipsem Lorem IpsemLorem Ipsem
                    </p>
                    <p className="text-4xl text-gray-150">
                      Lorem Ipsem Lorem Ipsem
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-lg font-medium py-1.5 px-6 bg-white whitespace-nowrap rounded-md"
                    >
                      Join now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => (liked ? disLikePost() : likePost())}
            type="button"
            className="flex gap-1 items-center"
          >
            <FontAwesomeIcon
              className="post-content-like-heart"
              icon={liked ? faHeart : faHeartBlank}
            />
            <span className="font-medium text-7xl"> {likesCount}</span>
          </button>
          <button
            onClick={() => setModal(data, false)}
            type="button"
            className="flex gap-1 items-center"
          >
            <img
              className="w-6 h-6"
              src="/images/icons8-topic-50 3.png"
              alt=""
            />
            <span className="font-medium text-7xl">{data.comments.length}</span>
          </button>
          <button type="button" className="flex gap-1 items-center">
            <img
              className="w-[18px] h-[18px]"
              src="/images/icons8-send-60 13.png"
              alt=""
            />
          </button>
        </div>

        {data.comments
          ? data.comments.map((data) => {
              return (
                <div class=" p-3 mt-2 bg-yellow-50">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center w-100">
                      <img
                        style={{ marginRight: "2%" }}
                        src={data?.image || "https://i.imgur.com/hczKIze.jpg"}
                        width="30"
                        class="user-img rounded-circle"
                      />
                      <span class="d-flex flex-column">
                        <small
                          style={{ marginRight: "2%" }}
                          class="font-weight-bold text-primary"
                        >
                          {data?.userName}
                        </small>
                        <small class="font-weight-bold">{data?.comment}</small>
                      </span>
                    </div>

                    {/* <div>
              <small>2 days ago</small>
            </div> */}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStylesModal}
        contentLabel="Place Bet"
      >
        <div>
          <Input
            style={{ width: "100%" }}
            placeholder="Enter Comment"
            type="text"
            id="bid"
            onChange={handleChange}
            value={comment}
          />

          <button
            onClick={() => postComment()}
            style={{ float: "right" }}
            className=" mt-4 flex items-center justify-center gap-1 bg-primary-700 text-yellow-50 text-7xl font-semibold rounded-full py-3 px-7 sm:px-14 hover:no-underline shadow-7xl"
          >
            Comment
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Article;
