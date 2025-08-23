import ProjectList from "./ProjectList";
import {useData} from "../store/DataContext";
const Projects = () => {
  const {PROJECTS} = useData();
  return (
    <div className="container mt-5 mb-5">
      <h1>PROJECTS</h1>
      <div className="ProjectConn">
        {PROJECTS.map((projects, index) => {
          return (
            <ProjectList
              key={index}
              Title={projects.Title}
              Description={projects.Description}
              Img={projects.Img}
              LiveLink={projects.LiveLink}
              GithubLink={projects.GithubLink}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Projects;
