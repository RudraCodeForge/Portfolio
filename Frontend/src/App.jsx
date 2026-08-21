import Navbar from "../src/Components/Navbar";
import Header from "../src/Components/Header";
import About from "../src/pages/About";
import Skills from "../src/pages/Skills";
import Experience from "../src/pages/Experience";
import Education from "../src/pages/Education";
import GoodAt from "../src/pages/GoodAt";
import Github from "../src/pages/Github";
import CursorGlow from "../src/Components/CursorGlow";
import Projects from "../src/pages/Projects";
import AllProjects from "../src/pages/AllProjects";

function App() {
  return (
    <>
      <CursorGlow />
      {window.location.pathname === "/projects" ? (
        <>
          <Navbar />
          <AllProjects />
        </>
      ) : (
        <>
          <Navbar />
          <Header />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <GoodAt />
          <Github />
        </>
      )}
    </>
  );
}

export default App;
