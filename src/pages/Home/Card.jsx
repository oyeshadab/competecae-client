import { Card } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

const Card1 = ({ data, users, toast, getPosts, authUser }) => {
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(data.likes.length);

  const deletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/posts/${data._id}`)
      .then(() => {
        getPosts();
        toast.success("Post deleted!");
      })
      .catch((err) => console.log(err));
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
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="">
      <p className="text-dark font-light text-17xl mb-4">
        Abdul Lorem IpsemLorem Ipsem Lorem IpsemLorem Ipsem Lorem Ipsem Lorem
      </p>
      <div className="bg-primary-700 rounded-t-xl rounded-b-lg">
        <img
          className="w-full rounded-lg"
          src="/images/Rectangle 58.png"
          alt=""
        />
        <div className="py-2 px-3 flex justify-between gap-2">
          <div>
            <p className="font-medium text-5xl text-white mb-1">
              Lorem Ipsem Lorem IpsemLorem Ipsem
            </p>
            <p className="text-4xl text-gray-150">Lorem Ipsem Lorem Ipsem</p>
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
  );
};

export default Card1;
