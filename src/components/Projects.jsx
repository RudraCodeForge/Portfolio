import ProjectList from "./ProjectList";
const Projects = () => {
  const PROJECTS = [
    {
      Title: "ATIHI STAY",
      Description: "A platform for booking unique accommodations",
      Img: "./ATITHISTAY.jpg",
      LiveLink: "https://atithi-stay.onrender.com/",
      GithubLink: "",
    },
    {
      Title: "BANK MANAGEMENT",
      Description: "A Java Swing & MySQL based Bank Management System that allows users to create accounts, manage deposits/withdrawals, check balance, and maintain records securely.",
      Img: "./BANK.jpg",
      LiveLink: "#",
      GithubLink: "",
    },
  ];
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
