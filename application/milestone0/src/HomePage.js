import React from "react";
import "./HomePage.css";
import Developer from "./Developer";

function HomePage() {
  return (
    <div className="homePage" style={{ backgroundColor: "#000000" }}>
      <div
        className="developers"
        style={{
          display: "flex",
          width: "100vw",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Developer
          name="Ritesh"
          role="Team Lead"
          bio="I am a Computer Science Senior at SFSU.
                I am currently working as an Instructor for SCI 220 and SCI 227.
                I love to create web and android based applications."
          image={require("./images/himanshu.jpg")}
        />
        
      </div>
    </div>
  );
}

export default HomePage;
