import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import "./ourteam.css";
import Teamcard from "../components/teamcard";
import { API_BASE_URL } from "../config";

export default function Ourteam() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(API_BASE_URL + "/api/getAllTeam", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await result.json();
        // Sort teamData based on designation
        data.sort((a, b) => {
          const designationA = a.designation.toLowerCase();
          const designationB = b.designation.toLowerCase();
          if (designationA === "overall co-ordinator") return -1;
          if (designationB === "overall co-ordinator") return 1;
          if (designationA === "co-ordinator") return -1;
          if (designationB === "co-ordinator") return 1;
          if (designationA === "mentor") return -1;
          if (designationB === "mentor") return 1;
          return 0;
        });
        setTeamData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="team-container">
          <h1 className="ourteam">Team Edificio'24</h1>
          <div className="teamdata">
            {teamData &&
              teamData.map((e) => (
                <Teamcard
                  key={e.id} // Ensure each element has a unique key
                  img={e.photoURL}
                  memberName={e.name}
                  role={e.designation}
                  linkig={e.IgURL}
                  github={e.gitURL}
                  mail={e.mailURL}
                />
              ))}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
