import Styles from "../styles/Projects.module.css";

const filterOptions = ["ALL", "MERN", "REACT", "FULL STACK", "OTHER"];

const ProjectFilter = ({ activeFilter, onFilterChange }) => (
  <div className={Styles.projectFilters} aria-label="Filter projects">
    {filterOptions.map((filter) => (
      <button
        type="button"
        key={filter}
        className={activeFilter === filter ? Styles.activeFilter : ""}
        onClick={() => onFilterChange(filter)}
        aria-pressed={activeFilter === filter}
      >
        {filter === "REACT"
          ? "React"
          : filter.replace("FULL STACK", "Full Stack")}
      </button>
    ))}
  </div>
);

export default ProjectFilter;
