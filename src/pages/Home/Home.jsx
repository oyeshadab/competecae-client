import PageContent from "../../components/PageContent/PageContent";
import Sidebar from "../../components/Side-bar-fixed/Side-bar-fixed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "./Post/Post";
import ImageUploading from "react-images-uploading";
import { v4 as uuidv4 } from "uuid";
import "../../../src/style/main.css";
import Article from "./Article.jsx";
import WhoFollow from "./WhoFollow.jsx";
import Event from "./event/Event.tsx";
import Friends from "./friends/Friends.tsx";
import "./Home.scss";

import CreatePost from "./CreatePost.jsx";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [Follow, setFollow] = useState(null);
  const [users, setUsers] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const authUser = useAuthUser();
  const [postImage, setPostImage] = useState([]);
  const [DataForDisplay, setDataForDisplay] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (posts) {
      posts.forEach((post) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/users/${post.user}`)
          .then((res) => setUsers((prevUsers) => [...prevUsers, res.data]))
          .catch((err) => console.error(err));
      });
    }
  }, [posts]);

  const getPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`)
      .then((res) => {
        setPosts(res?.data);
        setDataForDisplay(res?.data?.slice(0, 5));
      })
      .catch((err) => console.log(err));
  };

  // const getFollow = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/posts`)
  //     .then((res) => setPosts(res.data))
  //     .catch((err) => console.log(err));
  // };

  // const makePost = () => {
  //   if (newPostText !== "") {
  //     if (postImage.length > 0) {
  //       let formData = new FormData();
  //       formData.append("image", postImage[0].file);

  //       axios
  //         .post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         })
  //         .then((res) => {
  //           return axios.post(`${process.env.REACT_APP_API_URL}/posts`, {
  //             user: authUser().user_id,
  //             text: newPostText,
  //             image: res.data.url,
  //           });
  //         })
  //         .then(() => {
  //           getPosts();
  //           setNewPostText("");
  //           setPostImage([]);
  //           toast.success("New post! Make sure to share with your friends.");
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       axios
  //         .post(`${process.env.REACT_APP_API_URL}/posts`, {
  //           user: authUser().user_id,
  //           text: newPostText,
  //         })
  //         .then(() => {
  //           getPosts();
  //           setNewPostText("");
  //           toast.success("New post! Make sure to share with your friends.");
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   } else {
  //     toast.warn("Post can't be empty!");
  //   }
  // };

  return (
    <div>
      <div className="container">
        <div className="flex flex-col-reverse lg:!grid lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-5">
          <div className="flex flex-col gap-6">
            <WhoFollow />
            <Event />
            <div className="xl:hidden">
              <Friends />
            </div>
          </div>
          <div className="lg:col-span-2">
            <CreatePost getHomePosts={getPosts} />
            <div className="flex flex-col gap-5 mb-3">
              {DataForDisplay
                ? DataForDisplay?.map((post) => {
                    return (
                      <Article
                        getHomePosts={getPosts}
                        data={post}
                        users={users}
                        toast={toast}
                        getPosts={getPosts}
                        authUser={authUser}
                        key={uuidv4()}
                      />
                    );
                  })
                : ""}
              <button
                type="button"
                onClick={() => {
                  setDataForDisplay(expanded ? posts.slice(0, 5) : posts);
                  setExpanded(!expanded);
                }}
              >
                {expanded ? "Show Less" : "Show More"}
              </button>
            </div>
          </div>
          <div className="hidden xl:block">
            <Friends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
