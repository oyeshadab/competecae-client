import axios from "axios";
import React from "react";
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../components/Button/Button";

const WhoFollow = ({ data }) => {
	const authUser = useAuthUser();
	const [Follow, setFollow] = useState(null);
	const [expanded, setExpanded] = useState(false);
	const [DataForDisplay, setDataForDisplay] = useState([]);
	const [withings, setwithings] = useState(false);

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
		axios.get(`${process.env.REACT_APP_API_URL}/users/${authUser().user_id}`).then((res)=>{
			if(res.data?.withings?._id){
				setwithings(true)
			}
			})
	},[]);


   const ConnectWithWithing = () => {
	window.location.href = `${process.env.REACT_APP_API_URL}/users/getWithingsCode?userId=${authUser().user_id}`
   };

	return (
		<>
		<div className="bg-yellow-700 rounded-lg p-5">
			<h6 className="font-poppins text-small text-22xl mb-3" style={{textAlign: 'center'}}>Connection with Withings</h6>
			<div>
				<Button
					text={ withings ? "Connected": "Connect Now"}
					disabled={withings ? true : false}
					type="secondary"
					style={{ alignSelf: 'center',width: '100%'}}
					className="btn-primary"
					fn={() => {ConnectWithWithing()}}
				/>
			</div>
		</div>


		<div className="bg-yellow-700 rounded-lg p-5">
			<h4 className="font-poppins text-medium text-28xl mb-3">Who to Follow</h4>
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
