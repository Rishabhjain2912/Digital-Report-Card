import { useState, useEffect } from "react";
import React from "react";

const Home = (props) => {

  const [name, setName] = useState("");

  useEffect(() => {
    localStorage.clear();
    setName("DIGITAL REPORT CARD");
  }, []);

  return (<div align="center"><h2>HOME PAGE-{name}</h2></div>
  );
};

export default Home;
