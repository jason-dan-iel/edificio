import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";
import { yearData } from "../config";
import locationData from "../components/State";
import bg from "../assets/pre-register-lossy.webp";
import "./pre-registration.css";
import { useNavigate } from "react-router-dom";

const Preregister = () => {
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
  const [age, setage] = useState("");
  const [email, setemail] = useState("");
  const [college, setcollege] = useState("");
  const [year, setyear] = useState("");
  const [contact, setcontact] = useState("");
  const [state, setSelectedState] = useState("");
  const [city, setSelectedCity] = useState("");
  const [gender, setSelectedgender] = useState("");
  const [ca, setCA] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvents, setSelectedEvents] = useState([]);

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
      name,
      age,
      contact,
      email,
      college,
      state,
      city,
      gender,
      year,
      accommodation,
      events: selectedEvents,
    };
    // let isValid;
    // if (contact.length == 10) {
    //   isValid = true;
    // } else {
    //   isValid = false;
    // }

    // if (isValid === true) {
    try {
      let result = await fetch(API_BASE_URL + "/api/post", {
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
        setage("");
        setemail("");
        setcollege("");
        setCA("");
        setyear("");
        setcontact("");
        setSelectedState("");
        setSelectedCity("");
        setSelectedgender("");
        setCityOptions([]);
        setAccommodation("");
        setSelectedEvents([]);
      } else {
        console.log("error");
        toast.error("Something went wrong");
      }
      result = await result.json();
      alert(result.message);
      // localStorage.setItem("user-info", JSON.stringify(result));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    // } else toast.error("Please enter valid phone number!");
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
          <div className="pre-registration-heading">Pre Registration</div>
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
                  type="age"
                  name="Age"
                  onChange={(e) => setage(e.target.value)}
                  placeholder="Age"
                  value={age}
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
                  type="college"
                  name="college"
                  onChange={(e) => setcollege(e.target.value)}
                  placeholder="College"
                  value={college}
                  required
                />

                {/* <select
                    className="pre-registration-select"
                    name="ca"
                    placeholder="Apply for Campus Ambassador?"
                    value={ca}
                    // onChange={(e) => setCA(e.target.value)}
                  >
                    <option value="" disabled>
                      Apply for Campus Ambassador?
                    </option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select> */}
                <select
                  className="pre-registration-select field"
                  name="year"
                  value={year}
                  onChange={(e) => setyear(e.target.value)}
                >
                  <option value="" disabled>
                    Select your Year
                  </option>
                  {yearData.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

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
                <select
                  className="pre-registration-select field"
                  name="gender"
                  value={gender}
                  onChange={(e) => setSelectedgender(e.target.value)}
                >
                  <option value="" disabled>
                    Select your gender
                  </option>

                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
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
                <select
                  className="pre-registration-select field"
                  name="accommodation"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                >
                  <option value="" disabled>
                    Need Accommodation?
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <div className="events-container">
                  <label className="events-label">
                    Choose which event(s) you want to take part in:
                  </label>
                  {eventData.map((event, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={`${event.name}`}
                        value={event.name}
                        onChange={handleEventChange}
                        checked={selectedEvents.includes(event.name)}
                      />
                      <label htmlFor={`${event.name}`}>{event.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="button_border">
              <div className="button">
                <button className="button" data-text="Awesome">
                  <span className="actual-text">&nbsp;Submit&nbsp;</span>
                  <span aria-hidden="true" className="hover-text">
                    &nbsp;SUBMIT&nbsp;
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

export default Preregister;
