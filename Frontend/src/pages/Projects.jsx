import ProjectCard from "../Components/ProjectCard";
import { ProjectsData } from "../data/Projects";
import Styles from "../styles/Projects.module.css";

const Projects = () => (
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
        {ProjectsData.slice(0, 3).map((project, index) => (
          <ProjectCard key={project.Title} project={project} index={index} />
        ))}
      </div>
      <a className={Styles.viewAllButton} href="/projects">
        View all projects <span>↗</span>
      </a>
    </div>
  </section>
);

export default Projects;
