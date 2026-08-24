import Styles from "../styles/Projects.module.css";

const ProjectCard = ({ project, index }) => (
  <article className={Styles.projectCard}>
    <div
      className={`${Styles.projectVisual} ${Styles[`tone${(index % 5) + 1}`]}`}
    >
      <span className={Styles.projectNumber}>
        {String(index + 1).padStart(2, "0")} / {project.Category}
      </span>
      <a
        href={project.LiveLink}
        className={Styles.externalLink}
        aria-label={`Open ${project.Title}`}
      >
        ↗
      </a>
      <div className={Styles.codeWindow} aria-hidden="true">
        <span className={Styles.windowDots}>••</span>
        <code>
          const result = await
          <br />
          <b>ship(&#123; product: true &#125;)</b>
        </code>
      </div>
    </div>
    <div className={Styles.projectBody}>
      <p className={Styles.projectNote}>{project.Note}</p>
      <h3>{project.Title}</h3>
      <p className={Styles.projectDescription}>{project.Description}</p>
      <div className={Styles.techStack}>
        {project.TechStack.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
    </div>
  </article>
);

export default ProjectCard;
