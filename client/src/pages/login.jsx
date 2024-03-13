import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";
import { yearData } from "../config";
import locationData from "../components/State";
import "./pre-registration.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(API_BASE_URL + "/api/getAllEvent", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await result.json();
        setEventData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [data, setData] = useState({
    States: [],
    Cities: {},
  });
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const fetchData = useCallback(async () => {
    setData(locationData[0]);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity(""); // Reset city selection
    setCityOptions(data.Cities[state] || []);
  };

  const handleemailchange = (e) => {
    const emails = e.target.value;
    const parts = emails.split("@");
    const domain = parts[1].toLowerCase();
    setemail(parts[0] + "@" + domain);
  };

  const handleEventChange = (e) => {
    const event = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedEvents([...selectedEvents, event]);
      console.log(selectedEvents);
    } else {
      setSelectedEvents(
        selectedEvents.filter((selected) => selected !== event)
      );
      console.log(selectedEvents);
    }
  };

  async function signUp(e) {
    e.preventDefault();
    let item = {
      email: email,
      password: password,
    };
    try {
      let result = await fetch(API_BASE_URL + "/register/login", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (result.status === 200) {
        result = await result.json();
        toast.success("Successfully Pre-Registered");
        setemail("");
        setpassword("");
        // console.log(result)
        localStorage.setItem("auth-token", result.token);
        alert(result.success);
        navigate("/");
      } else {
        result = await result.json();
        alert(result.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <div
        className="pre-registration-page"
        // style={{ backgroundImage: `url(${bg})` }}
      >
        {/* <div className="pre-registration-bg"></div> */}
        <div className="pre-registration-form-main">
          <div className="pre-registration-heading">Login</div>
          <br />
          <form className="" onSubmit={signUp}>
            <div className="form_main">
              <div className="pre-registration-form">
                <input
                  className="pre-registration-input field"
                  type="email"
                  name="email"
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="E-mail"
                  value={email}
                  required
                />
                <input
                  className="pre-registration-input field"
                  type="password"
                  name="password"
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="password"
                  value={password}
                  required
                />
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="textprompt"
            style={{color: "white"}}>
              Not Registered? <a href="/signup">Sign Up</a>
            </div>
            <br />
            <br />
            <div className="button_border">
              <div className="button">
                <button className="button" data-text="Awesome">
                  <span className="actual-text">Login</span>
                  <span aria-hidden="true" className="hover-text">
                    Login
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
