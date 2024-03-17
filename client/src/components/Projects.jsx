import React from "react";
import { GET_PROJECT } from "../queries/projectQueries";
import { useQuery } from "@apollo/client";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECT);
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong!!</p>;
  return (
    <div className="" style={{ marginTop: 10 }}>
      {data?.projects.length > 0 ? (
        <div className="row">
          {data?.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Project</p>
      )}
    </div>
  );
};

export default Projects;
