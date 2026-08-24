import ProjectCard from "../Components/ProjectCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Styles from "../styles/Projects.module.css";

const Projects = () => {
  const projects = useSelector((state) => state.ProjectData.data);

  return (
    <section id="projects" className={Styles.projectsSection}>
      <div className={Styles.projectsInner}>
        <div className={Styles.projectsHeading}>
          <div>
            <div className={Styles.sectionLabel}>
              <span>03</span>
              <span className={Styles.labelLine} />
              <span>SELECTED WORK</span>
            </div>

            <h2>
              Things I&apos;ve
              <br />
              <span>helped build.</span>
            </h2>
          </div>
        </div>

        <div className={Styles.projectsGrid}>
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>

        <Link className={Styles.viewAllButton} to="/projects">
          View all projects <span>↗</span>
        </Link>
      </div>
    </section>
  );
};

export default Projects;
