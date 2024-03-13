import React from "react";


export default function EventCard({
  imgPath,
  heading,
  Prize,
  content,
  linkurl,
}) {
  return (
    <section>
    
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400&display=swap"
        rel="stylesheet"
      ></link>
      <div id="event">

      <div className="blog-wrapper">
        
        <div className="blog-card">
          <div className="card-img">
            <img src={imgPath}></img>
            <h1>{heading}</h1>
          </div>
          <div className="card-details">
          </div>
          <div className="card-text">
            <p>{content}</p>
            <br />
            <span>
              Registration: 
              {/* <i className="fa fa-calendar"></i> */}
              {Prize}/-
            </span> 
          </div>
          <a href={linkurl} target="blank">
            <div className="read-more">Read More</div>
          </a>
        </div>
      </div>
    </div>
    </section>
  );
}
