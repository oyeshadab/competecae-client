import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Selectbar from "./Selectbar.tsx";
import CardOptions from "./CardOptions.tsx";
import SelectField from "./../../components/common/SelectField.tsx";
import LinkButton from "./../../components/common/LinkButton.tsx";
import TextField from "./../../components/common/TextField.tsx";
import SliderLevel from "./../../components/common/SliderLevel.tsx";
import ReactSlider from "react-slider";
import "../../pages/NewChallengeConfirmationDetails/slider.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import WagePayment from "../../utils/WagePayment";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Competitions from "../Competitions/Competitions";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

type LocationState = {
  selectedItems: SelectItemProps[];
};

export default function ConfirmDetails() {
  const navigate = useNavigate();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const authUser = useAuthUser();
  const [competitionName, setCompetitionsName] = useState();
  const [wager, setWager] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [level, setLevel] = useState<number>(10);
  const [status, setStatus] = useState();
  const [goal, setGoal] = useState();
  const location = useLocation();
  const { selectedItems } = location.state as LocationState;
  const today = new Date().toISOString().split("T")[0];
  console.log(selectedItems);
  const date = new Date();
  console.log(date);

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  // Stripe
  const stripe = useStripe();
  const elements = useElements();

  const selected = {
    items: selectedItems,
  };

  const handleChange = (event) => {
    setCompetitionsName(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleStartChange = (event) => {
    setStartDate(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleEndChange = (event) => {
    setEndDate(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleWagerChange = (event) => {
    setWager(event.target.value);

    console.log("value is:", event.target.value);
  };

  const makeCompetitions = async (paymentId) => {
    console.log("Payment", paymentId);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/challenges`,
      headers: {},
      data: {
        user: authUser().user_id,
        name: competitionName,
        type: selectedItems[0].id,
        category: selectedItems[1].id,
        sub_category: selectedItems[2].id,
        measurement: 0,
        calculate_by: "Percentage",
        goal: goal,
        start_date: startDate,
        end_date: endDate,
        wager: wager,
        team: null,
        participants: [
          {
            participant_id: authUser().user_id,
            team_id: null,
            start_measurement: "20",
            date_joined: new Date(),
          },
        ],
      },
    });
    navigate("/login");
  };

  const createCompetition = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      return alert(error.message);
    }

    const { id } = paymentMethod;

    axios
      .post(`${process.env.REACT_APP_API_URL}/payments`, {
        user: authUser().user_id,
        amount: wager,
        stripe_id: id,
        description: competitionName,
        date: Date.now(),
      })
      .then(() => {
        return axios.post(`${process.env.REACT_APP_API_URL}/challenges`, {
          user: authUser().user_id,
          name: competitionName,
          type: selectedItems[0].id,
          category: selectedItems[1].id,
          sub_category: selectedItems[2].id,
          measurement: 0,
          calculate_by: "Percentage",
          goal: goal,
          start_date: startDate,
          end_date: endDate,
          wager: wager,
          team: null,
          participants: [
            {
              participant_id: authUser().user_id,
              team_id: null,
              start_measurement: "20",
              date_joined: new Date(),
            },
          ],
        });
      })
      .then((res) => {
        navigate(`/competition/${res.data._id}`);
      })
      .catch((err) => alert(err));
  };

  return (
    <main>
      <div className="lg:grid lg:grid-cols-2 lg:flex-row flex-col-reverse container mt-20 gap-7 items-center">
        <div className="shadow-1xl p-2.5 bg-white rounded-lg">
          <SelectField variant="small" readonly {...selected} />
        </div>
        <Selectbar />
      </div>
      <div className="container shadow-1xl px-6 pt-5 pb-4 mt-4 mb-8 bg-white">
        <div className="grid lg:grid-cols-5 gap-[75px] mb-8">
          <div className="lg:col-span-3">
            <h4 className="font-medium text-32xl mb-4">Information</h4>
            <div className="bg-white shadow-3xl px-8 sm:px-14 py-6 rounded-md">
              <div className="grid sm:grid-cols-2 gap-14">
                <div className="flex flex-col gap-11">
                  <div className="flex flex-col gap-2">
                    <label htmlFor={"id1"} className="text-17xl font-medium">
                      Competition
                    </label>

                    <div className="relative flex-grow">
                      <input
                        id={"id2"}
                        value={competitionName}
                        type="text"
                        onChange={handleChange}
                        className="bg-yellow-100 border-primary-700 border border-opacity-25 text-primary-700 placeholder:text-primary-700 placeholder:text-opacity-40 rounded-full py-2 px-5 font-semibold text-5xl w-full"
                        placeholder={"Competion Name"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5 items-end">
                    <div className="flex flex-col gap-2">
                      <label htmlFor={"id1"} className="text-17xl font-medium">
                        Start Date
                      </label>

                      <div className="relative flex-grow">
                        <input
                          value={startDate}
                          type="date"
                          min={today}
                          onChange={handleStartChange}
                          className="bg-yellow-100 border-primary-700 border border-opacity-25 text-primary-700 placeholder:text-primary-700 placeholder:text-opacity-40 rounded-full py-2 px-5 font-semibold text-5xl w-full"
                          placeholder={"From"}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor={"id1"} className="text-17xl font-medium">
                        End Date
                      </label>

                      <div className="relative flex-grow">
                        <input
                          value={endDate}
                          type="date"
                          min={today}
                          onChange={handleEndChange}
                          className="bg-yellow-100 border-primary-700 border border-opacity-25 text-primary-700 placeholder:text-primary-700 placeholder:text-opacity-40 rounded-full py-2 px-5 font-semibold text-5xl w-full"
                          placeholder={"From"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-17xl font-medium">Level</span>
                    <div className="flex gap-4">
                      <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="horizontal-slider-thumb"
                        trackClassName="horizontal-slider-track"
                        onChange={(value) => setLevel(value)}
                        value={level}
                      />
                      <div className="w-[80px] leading-[22px] text-right">
                        {level <= 15 ? (
                          <span className="text-red-800 font-medium text-14xl">
                            Very low
                          </span>
                        ) : level <= 30 ? (
                          <span className="text-red-800 font-medium text-14xl">
                            Low
                          </span>
                        ) : level <= 50 ? (
                          <span className="text-primary-700 font-medium text-14xl">
                            Medium
                          </span>
                        ) : level <= 75 ? (
                          <span className="text-green-700 font-medium text-14xl">
                            High
                          </span>
                        ) : (
                          <span className="text-green-700 font-medium text-14xl">
                            Very High
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 items-end">
                    <div className="flex flex-col gap-2">
                      <label htmlFor={"id1"} className="text-17xl font-medium">
                        Status
                      </label>

                      <div className="relative flex-grow">
                        <input
                          id={"id2"}
                          type="number"
                          onChange={handleStatusChange}
                          value={status}
                          className="bg-yellow-100 border-primary-700 border border-opacity-25 text-primary-700 placeholder:text-primary-700 placeholder:text-opacity-40 rounded-full py-2 px-5 font-semibold text-5xl w-full"
                          placeholder={"Number"}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor={"id1"} className="text-17xl font-medium">
                        Goal
                      </label>

                      <div className="relative flex-grow">
                        <input
                          id={"id2"}
                          type="number"
                          onChange={handleGoalChange}
                          value={goal}
                          className="bg-yellow-100 border-primary-700 border border-opacity-25 text-primary-700 placeholder:text-primary-700 placeholder:text-opacity-40 rounded-full py-2 px-5 font-semibold text-5xl w-full"
                          placeholder={"Goal"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor={"id1"} className="text-17xl font-medium">
                      Wager
                    </label>

                    <div className="relative flex-grow">
                      <input
                        id={"id2"}
                        type="number"
                        onChange={handleWagerChange}
                        value={wager}
                        className="bg-yellow-100 border-primary-700 border border-opacity-25 text-primary-700 placeholder:text-primary-700 placeholder:text-opacity-40 rounded-full py-2 px-5 font-semibold text-5xl w-full"
                        placeholder={"Amount"}
                      />
                      <span className="absolute right-0 bg-yellow-700 font-medium text-17xl px-5 py-1 h-full rounded-full flex top-0 items-center justify-center ">
                        $
                      </span>
                    </div>
                  </div>

                  <p className="text-10xl font-medium">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-medium text-32xl mb-4">Payment</h4>
            <CardOptions />
            <div>
              <div className="flex flex-col gap-5">
                <div>
                  <div className="page-three">
                    <form className="page-three__form">
                      <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <LinkButton url="/new-competition" text="Back" />

          <button
            onClick={createCompetition}
            className="flex items-center justify-center gap-1 text-black bg-yellow-700 text-24xl rounded-full py-3.5 px-14 hover:no-underline"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
