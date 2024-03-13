import React from "react";
// import "@fortawesome/fontawesome-free/css/all.css";

export default function Teamcard({
  img,
  memberName,
  role,
  linkig,
  linkin,
  linkfa,
  github,
}) {
  return (
    <div className="pagee">
    <section className="star">
      <div className="container">
          <div className="card">
            <div className="card-image">
              <img src={img} alt="profile one" />
            </div>

            <ul className="social-icons">
              {/* <li>
                <a href={linkfa}>
                  <p>
                    <i className="fa fa-facebook"></i>
                  </p>
                </a>
              </li> */}
              <li>
                <a href={linkig}>
                  <p>
                  <i className="fa-brands fa-instagram"></i>
                  </p>
                </a>
              </li>
              {/* <li>
                <a href={linkin}>
                  <p>
                    <i className="fa fa-linkedin"></i>
                  </p>
                </a>
              </li> */}
              {/* <li>
                <a href={github}>
                  <p>
                    <i className="fa-brands fa-github"></i>
                  </p>
                </a>
              </li> */}
            </ul>

            <div className="details">
              <h2>
                {memberName}
                <br />
                <span className="job-title">{role}</span>
              </h2>
            </div>
          </div>
      </div>
    </section>
    </div>
  );
}
