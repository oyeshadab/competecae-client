import React from "react";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUploading from "react-images-uploading";
import Home from "./Home";

export default function CreatePost({ getHomePosts }) {
  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const authUser = useAuthUser();
  const [postImage, setPostImage] = useState([]);

  const getPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  };

  const makePost = () => {
    console.log("Did Something");
    if (newPostText !== "") {
      if (postImage.length > 0) {
        let formData = new FormData();
        formData.append("image", postImage[0]?.file);

        axios
          .post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            return axios.post(`${process.env.REACT_APP_API_URL}/posts`, {
              user: authUser()?.user_id,
              text: newPostText,
              image: res.data.url,
            });
          })
          .then(() => {
            getHomePosts();
            setNewPostText("");
            setPostImage([]);
            toast.success("New post! Make sure to share with your friends.");
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(`${process.env.REACT_APP_API_URL}/posts`, {
            user: authUser()?.user_id,
            text: newPostText,
          })
          .then(() => {
            getHomePosts();
            setNewPostText("");
            toast.success("New post! Make sure to share with your friends.");
          })
          .catch((err) => console.log(err));
      }
    } else {
      toast.warn("Post can't be empty!");
    }
  };

  return (
    <div className="bg-yellow-700 rounded-lg py-3 px-4 mb-5">
      <div className="flex gap-3 items-center">
        <div className="w-12 h-12">
          <div className="w-12 h-12">
            <img className="w-12 h-12" src="/images/img.svg" alt="" />
          </div>
        </div>
        <input
          onChange={(e) => setNewPostText(e.target.value)}
          value={newPostText}
          className="bg-yellow-50 rounded-full w-full font-light
           placeholder:text-primary-700 text-gray-200 text-17xl py-4 px-6 border border-dark border-opacity-20 h-12 focus:outline-none"
          name=""
          id=""
          placeholder="What you have in your mind?"
        />
      </div>
      {postImage[0] && (
        <div className="mt-3 home__new-post-image-container">
          <img
            className="home__new-post-image"
            src={postImage[0] && postImage[0].data_url}
            alt="post-img"
          />
          <span
            className="home__new-post-image-remove"
            onClick={() => setPostImage([])}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
        </div>
      )}
      <hr className="border-primary-700 border-b border-t border-opacity-20 my-3" />
      <div className="flex gap-4 justify-between items-center pl-[60px]">
        <ImageUploading
          multiple={false}
          value={postImage}
          onChange={(e) => setPostImage(e)}
          maxNumber={23432}
          dataURLKey="data_url"
        >
          {({ onImageUpload, dragProps }) => (
            <div
              className="home__new-post-upload"
              onClick={onImageUpload}
              {...dragProps}
            >
              <label
                htmlFor="select-image"
                className="flex px-5 py-3 bg-yellow-50 rounded-full cursor-pointer shadow-7xl gap-1"
              >
                <span>
                  <img
                    className="w-4 h-4"
                    src="/images/picture-svgrepo-com 1.svg"
                    alt=""
                  />
                </span>
                <span className="font-semibold text-7xl text-primary-700">
                  Add Image
                </span>
              </label>
            </div>
          )}
        </ImageUploading>

        <button
          onClick={makePost}
          type="button"
          className="flex items-center justify-center gap-1 bg-primary-700 text-yellow-50 text-7xl font-semibold rounded-full py-3 px-7 sm:px-14 hover:no-underline shadow-7xl"
        >
          Post
        </button>
      </div>
    </div>
  );
}
