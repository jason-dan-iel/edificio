import React from "react";
import EventCard from "../components/eventcard";
import Footer from "../components/footer";
import "./events.css";
import { useEffect } from "react";
import { API_BASE_URL } from "../config";
import { useState } from "react";

export default function Events() {
  const [loading, setLoading] = useState(true);
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

  return (
    <>
      <section class="common">
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>Edificio 2024</h1>

          <h2>Events</h2>

          <div className="Eventcards">
            {eventData &&
              eventData.map((event) => (
                <EventCard
                  imgPath={event.photoURL}
                  heading={event.name}
                  content={event.description}
                  Prize={event.prize}
                  linkurl={event.brochureURL}
                />
              ))}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
