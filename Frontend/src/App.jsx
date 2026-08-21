import Navbar from "../src/Components/Navbar";
import Header from "../src/Components/Header";
import About from "../src/pages/About";
import Skills from "../src/pages/Skills";
import Experience from "../src/pages/Experience";
import Education from "../src/pages/Education";
import GoodAt from "../src/pages/GoodAt";
import Github from "../src/pages/Github";
import Contact from "../src/pages/Contact";
import CursorGlow from "../src/Components/CursorGlow";
import Projects from "../src/pages/Projects";
import AllProjects from "../src/pages/AllProjects";
import Footer from "../src/Components/Footer";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <CursorGlow />
      <Routes>
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <AllProjects />
            </>
          }
        />
        <Route
          path="*"
          element={
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
              <Contact />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
