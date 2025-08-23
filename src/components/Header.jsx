import { useScroll } from "../store/ScrollContext";

const Header = () => {
  const { scrollToSection, skillsRef, projectsRef, contactRef } = useScroll();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid NavCon">
        <a
          className="navbar-brand"
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Prince Daksh
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => window.location.reload()}
              >
                Home
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => scrollToSection(skillsRef)}
              >
                Skills
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => scrollToSection(projectsRef)}
              >
                Projects
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => scrollToSection(contactRef)}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;