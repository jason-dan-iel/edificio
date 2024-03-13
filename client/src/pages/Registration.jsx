import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const token = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(API_BASE_URL + "/register/getUser", {
          method: "POST",
          body: JSON.stringify({ token: token }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await result.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="registration_main">
      {/* <p className="team">Your Team Reference Id is {user.reference_id}</p>
      <p className="team">
        It's a team registration so, only the team leader has to pay
      </p>
      <br />
      <p className="individual">
        The accomodation payment must be done individually
      </p>
      <p className="individual">The token to be used is your personal token.</p>
      <p className="team">Your Team Personal token is {user.reference_id}</p>
      <br /> */}
      {/* <button
      class = "button"
        onClick={() => {
          window.open("https://forms.eduqfix.com/iitjcte/add");
        }}
      >
        Pay
      </button> */}
      <div className="payment">
        <div className="payment1">
          Event Registration
          <button
            className="button1"
            onClick={() => {
              window.open("https://forms.eduqfix.com/iitjcte/add");
            }}
          >
            <span className="button-content">PAY </span>
          </button>
        </div>
        <div className="payment1">
          Pay the Accommodation fee of 1200/-
          <button
            className="button1"
            onClick={() => {
              window.open("https://forms.eduqfix.com/iitjcte/add");
            }}
          >
            <span className="button-content">PAY </span>
          </button>
        </div>
        <div className="payment1">
          Buy the UG pack for 1200/-
          <button
            className="button1"
            onClick={() => {
              window.open("https://forms.eduqfix.com/iitjcte/add");
            }}
          >
            <span className="button-content">PAY </span>
          </button>
        </div>
        <div className="payment1">
          Buy the PG pack for 1100/-
          <button
            className="button1"
            onClick={() => {
              window.open("https://forms.eduqfix.com/iitjcte/add");
            }}
          >
            <span className="button-content">PAY </span>
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="tnc">
        <h3>Terms and Conditions</h3>
        <ul>
          <li>Conferrence name : “Edificio"</li>
          <li>
            The registration fee is non-refundable and non-transferable under
            any circumstances.
          </li>
          <li>
            The team leader is supposed to pay for the whole team in team
            events.
          </li>
          <li>
            Team leader is expected to fill out the{" "}
            <a href="https://forms.gle/3uaBQWE5F2geHZ5A7" target="blank">
              google form
            </a>{" "}
            regarding the team members.
          </li>
          <li>
            Everyone is supposed to pay their accommodation fee individually.
          </li>
          <li>
            By clicking on the pay button, you agree to the terms and conditions
            of Edificio 2024
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Registration;
