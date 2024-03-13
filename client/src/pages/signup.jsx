import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";
import { yearData } from "../config";
import locationData from "../components/State";
import "./pre-registration.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [college, setcollege] = useState("");
  const [contact, setcontact] = useState("");
  const [state, setSelectedState] = useState("");
  const [city, setSelectedCity] = useState("");
  const [gender, setSelectedgender] = useState("");
  const [password, setpassword] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

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
  const navigate = useNavigate();

  async function signUp(e) {
    e.preventDefault();
    let item = {
      name: name,
      contact: contact,
      email: email,
      college_name: college,
      college_state: state,
      college_city: city,
      password: password,
    };
    try {
      let result = await fetch(API_BASE_URL + "/register/signup", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (result.status === 200) {
        toast.success("Successfully Pre-Registered");
        setname("");
        setemail("");
        setcollege("");
        setcontact("");
        setSelectedState("");
        setSelectedCity("");
        setpassword("");
      } else {
        console.log("error");
        toast.error("Something went wrong");
      }
      result = await result.json();
      alert(result.success);
      navigate("/login");
      // localStorage.setItem("user-info", JSON.stringify(result));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    // } else toast.error("Please enter valid phone number!");
  }

  return (
    <>
      <div
        className="pre-registration-page"
        // style={{ backgroundImage: `url(${bg})` }}
      >
        {/* <div className="pre-registration-bg"></div> */}
        <div className="pre-registration-form-main">
          <div className="pre-registration-heading">SignUp</div>
          <br />
          <form className="" onSubmit={signUp}>
            <div className="form_main">
              <div className="pre-registration-form">
                <input
                  className="pre-registration-input field"
                  type="text"
                  name="Name"
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Name"
                  value={name}
                  required
                  autoFocus
                />
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
                <input
                  className="pre-registration-input field"
                  type="college"
                  name="college"
                  onChange={(e) => setcollege(e.target.value)}
                  placeholder="College"
                  value={college}
                  required
                />

                <select
                  className="pre-registration-select field"
                  name="state"
                  value={state}
                  onChange={handleStateChange}
                >
                  <option value="" disabled>
                    Select your College State
                  </option>
                  {data.States.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <select
                  className="pre-registration-select field"
                  name="city"
                  value={city}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="" disabled>
                    Select your College City
                  </option>
                  {cityOptions.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <input
                  className="pre-registration-input field"
                  type="contact"
                  name="contact"
                  pattern="[1-9]{1}[0-9]{9}"
                  onChange={(e) => setcontact(e.target.value)}
                  value={contact}
                  placeholder="Contact Number"
                  required
                />
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="textprompt"
            style={{color: "white"}}>
              Already Registered? <a href="/login">Login</a>
            </div>
            <br />
            <br />
            <div className="button_border">
              <div className="button">
                <button className="button" data-text="Awesome">
                  <span className="actual-text">SignUp</span>
                  <span aria-hidden="true" className="hover-text">
                    SignUp
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

export default Signup;
