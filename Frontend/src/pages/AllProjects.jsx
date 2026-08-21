import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProjectCard from "../Components/ProjectCard";
import ProjectFilter from "../Components/ProjectFilter";
import { ProjectsData } from "../data/Projects";
import Styles from "../styles/Projects.module.css";

const projectsPerPage = 10;

const AllProjects = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Math.max(Number(searchParams.get("page")) || 1, 1);
  const filteredProjects =
    activeFilter === "ALL"
      ? ProjectsData
      : ProjectsData.filter((project) => project.Catagory === activeFilter);
  const pageCount = Math.max(
    1,
    Math.ceil(filteredProjects.length / projectsPerPage),
  );
  const safePage = Math.min(currentPage, pageCount);
  const visibleProjects = filteredProjects.slice(
    (safePage - 1) * projectsPerPage,
    safePage * projectsPerPage,
  );

  useEffect(() => {
    setSearchParams(safePage === 1 ? {} : { page: String(safePage) }, {
      replace: true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [safePage, setSearchParams]);

  const changeFilter = (filter) => {
    setActiveFilter(filter);
    setSearchParams({}, { replace: true });
  };

  return (
    <main className={Styles.allProjectsPage}>
      <div className={Styles.projectsInner}>
        <Link className={Styles.backLink} to="/">
          ← Back home
        </Link>
        <div className={Styles.allProjectsHeading}>
          <div className={Styles.sectionLabel}>
            <span>03</span>
            <span className={Styles.labelLine} />
            <span>ALL PROJECTS</span>
          </div>
          <h1>
            Everything I&apos;ve
            <br />
            <span>helped build.</span>
          </h1>
          <p>
            {filteredProjects.length} projects across product, commerce, and
            creative systems.
          </p>
        </div>
        <ProjectFilter
          activeFilter={activeFilter}
          onFilterChange={changeFilter}
        />
        {visibleProjects.length > 0 ? (
          <>
            <div className={Styles.projectsGrid}>
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.Title}
                  project={project}
                  index={(safePage - 1) * projectsPerPage + index}
                />
              ))}
            </div>
            <nav className={Styles.pagination} aria-label="Projects pagination">
              <button
                type="button"
                onClick={() => setSearchParams({ page: String(safePage - 1) })}
                disabled={safePage === 1}
              >
                ←
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    type="button"
                    className={page === safePage ? Styles.activePage : ""}
                    onClick={() => setSearchParams({ page: String(page) })}
                    key={page}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => setSearchParams({ page: String(safePage + 1) })}
                disabled={safePage === pageCount}
              >
                →
              </button>
            </nav>
          </>
        ) : (
          <div className={Styles.emptyProjects}>
            <div className={Styles.emptyIcon} aria-hidden="true">
              ∅
            </div>
            <p className={Styles.emptyEyebrow}>NO MATCHING WORK</p>
            <h2>No projects in this collection yet.</h2>
            <p>Try another filter to explore the rest of the work.</p>
            <button type="button" onClick={() => changeFilter("ALL")}>
              Show all projects <span>↗</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllProjects;
