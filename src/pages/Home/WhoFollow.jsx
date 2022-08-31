import axios from "axios";
import React from "react";
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../components/Button/Button";
import { usePlaidLink } from "react-plaid-link";

const WhoFollow = ({ data }) => {
  const authUser = useAuthUser();
  const [Follow, setFollow] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [DataForDisplay, setDataForDisplay] = useState([]);
  const [withings, setwithings] = useState(false);
  const [plaidToken, setPlaidToken] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/follower/user/?id=${
          authUser().user_id
        }`
      )
      .then((res) => {
        setFollow(res.data.users);
        setDataForDisplay(res.data.users.slice(0, 5));
      })
      .catch((err) => console.error(err));
  }, []);

  const getFollow = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/follower/user/?id=${
          authUser().user_id
        }`
      )
      .then((res) => setFollow(res.data.users))
      .catch((err) => console.log(err));
  };

  const followPost = (follow) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/follower/follow`, {
        subscriber_id: follow,
        user_id: authUser().user_id,
        followed: true,
      })
      .then((res) => {
        getFollow();
        toast.success(`Successfully followed ${follow}`);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${authUser().user_id}`)
      .then((res) => {
        if (res.data?.withings?._id) {
          setwithings(true);
        }
      });
  }, []);

  const ConnectWithWithing = () => {
    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/users/getWithingsCode?userId=${authUser().user_id}`;
  };

  useEffect(() => {
    const Plaid = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/plaid/linkToken?userId=${
            authUser().user_id
          }&products=transactions&country_codes=US`
        );
        //    console.log(res)
        setPlaidToken(res.data?.data?.link_token);
      } catch (error) {
        console.log(error);
      }
    };
    Plaid();
  }, []);

  const { open, ready } = usePlaidLink({
    token: plaidToken,
    onSuccess: async (public_token, metadata) => {
      // send public_token to server
      const account = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/users/plaid/getBalance?public_token=${public_token}&userId=${
          authUser().user_id
        }`
      );
      console.log(account);
      setAccounts(account?.data?.data);
    },
  });

  return (
    <>
      <div className="bg-yellow-700 rounded-lg p-5">
        <h6
          className="font-poppins text-small text-22xl mb-3"
          style={{ textAlign: "center" }}
        >
          Connection with Withings
        </h6>
        <div>
          <Button
            text={withings ? "Connected" : "Connect Now"}
            disabled={withings ? true : false}
            type="secondary"
            style={{ alignSelf: "center", width: "100%" }}
            className="btn-primary"
            fn={() => {
              ConnectWithWithing();
            }}
          />
        </div>
      </div>
      <div className="bg-yellow-700 rounded-lg p-5">
        <h1
          className="font-poppins text-22xl mb-3"
          style={{ textAlign: "center" }}
        >
          Plaid Account
        </h1>
        <div className="flex gap-4 justify-between items-center mb-3">
          <h1 className="p-8">Name</h1>
          <h1 className="p-8">Current Balance </h1>
        </div>
        <div>
          {accounts.length > 0 ? (
            accounts.map((account, index) => (
              <div
                key={index}
                className="flex gap-4 justify-between items-center"
              >
                <h1 className="p-8">{account.name}</h1>
                <h1 className="p-8">{account.balances.current}</h1>
              </div>
            ))
          ) : (
            <Button
              text="Connect Now"
              // disabled={withings ? true : false}
              type="secondary"
              style={{ alignSelf: "center", width: "100%" }}
              className="btn-primary"
              fn={() => {
                open();
              }}
            />
          )}
        </div>
      </div>

      <div className="bg-yellow-700 rounded-lg p-5">
        <h4 className="font-poppins text-medium text-28xl mb-3">
          Who to Follow
        </h4>
        <ul className="flex flex-col gap-5">
          {DataForDisplay
            ? DataForDisplay.map((post) => {
                return (
                  <li className="flex items-center gap-3">
                    <img
                      className="w-[30px] h-[30px] rounded-full border border-white "
                      src={post.profile_pic}
                      alt=""
                    />
                    <p className="flex items-center gap-1 flex-grow text-8xl font-montserrat text-gray-500">
                      <span className="">{post.user_name}</span>
                      <img src="/images/Frame.svg" alt="" />
                    </p>
                    <div>
                      <button
                        onClick={() => followPost(post._id)}
                        type="button"
                        className="font-medium font-montserrat text-3xl bg-white rounded-md py-2 px-3"
                      >
                        Follow
                      </button>
                    </div>
                  </li>
                );
              })
            : ""}
          <button
            type="button"
            onClick={() => {
              setDataForDisplay(expanded ? Follow.slice(0, 5) : Follow);
              setExpanded(!expanded);
            }}
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </ul>
        <ToastContainer />
      </div>
    </>
  );
};

export default WhoFollow;
