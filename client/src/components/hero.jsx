import React from "react";
import TagCloud from "@frank-mayer/react-tag-cloud";
import "./hero.css";

const Hero = () => {
    return(        
    <main id="hero" className="hero-main">
    <section className="hero-section-main">
        <div className="hero-title">
            <h1 className="title-main">Edificio '24</h1>
            <p className="text-main">Innovate Collaborate Transform</p>
        </div>
    </section>

    <section >
        <TagCloud className="hero-cloud"
            options={(w) => ({
                radius: Math.min(480, w.innerWidth, w.innerHeight) / 2,
                maxSpeed: "fast",
            })}
            onClick={(tag, ev) => alert(tag)}
            onClickOptions={{ passive: true }}
        >
            {[
                "CiviQ",
                "Hackathon", 
                "Bridge Making",
                "Ideathon",
                "Symposium",
                "Eureka",
                "Excavate",
                "3-minute thesis",
                "CADodyssey",
                "Tremblor Trials",
            ]}
        </TagCloud>
    </section>

</main>
);
};

export default Hero;

