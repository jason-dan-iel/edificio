import React from "react";
import Footer from "../components/footer";
import "./dashboard.css";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export default function Dashboard() {
  const token = localStorage.getItem("auth-token");
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
    <>
      <div className="dash_head">
        <h1>Dashboard</h1>
      </div>
      <div className="dash_main">
        <div className="full_profile">
          <div className="profile_image">
            <img
              src="https://i.ibb.co/zsWBsxy/pbQQwgX.webp"
              alt="text"
              style={{ borderRadius: 10000 }}
              className="profile_image1"
            />
          </div>
          <div className="profile_details">
            <div> Name: {user.name}</div>
            <div> Email: {user.email}</div>
            <div> Phone: {user.contact}</div>
            <div> College: {user.college_name}</div>
            <div>
              {" "}
              Location: {user.college_city} , {user.college_state}
            </div>
            <div> Registered Events: {user.events}</div>
            <div className="dash_main1">
              Your Registration ID is : {user.reference_id}
            </div>
          </div>
        </div>
        <div className="payment">
          {!user.payment_status ? (
            <>
              <div className="dash_main2">
                Please complete your registration payment.
              </div>
              <div className="dash_main3">
                <button
                  className="button1"
                  onClick={() => {
                    window.open("https://forms.eduqfix.com/iitjcte/add");
                  }}
                >
                  <span class="button-content"> Pay</span>
                </button>
              </div>
            </>
          ) : null}
          {!user.accommodation_status ? (
            <>
              <div className="dash_main2">
                Please complete your accommodation payment.
              </div>
              <div className="dash_main3">
                <button
                  className="button1"
                  onClick={() => {
                    window.open("https://forms.eduqfix.com/iitjcte/add");
                  }}
                >
                  <span class="button-content"> Pay</span>
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
}
