import React from "react";
import AddClientModel from "../components/AddClientModel";
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import AddProjectModal from "../components/AddProjectModal";

const Home = () => {
  return (
    <div className="container">
      <div className="d-flex gap-3 mb-4">
        <AddClientModel />
        <AddProjectModal/>
      </div>
      <Projects />
      <hr />
      <Clients />
    </div>
  );
};

export default Home;
