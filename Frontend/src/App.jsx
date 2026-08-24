import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import GoodAt from "./pages/GoodAt";
import Github from "./pages/Github";
import Contact from "./pages/Contact";
import CursorGlow from "./Components/CursorGlow";
import Projects from "./pages/Projects";
import AllProjects from "./pages/AllProjects";
import Footer from "./Components/Footer";
import RobotAssistant from "./Components/Robot/RobotAssistant";

import { setHeaderData } from "./redux/slices/HeaderSlice";
import { setGithubData } from "./redux/slices/GithubSlice";
import { setstatsData } from "./redux/slices/StatsSlice";
import { setSkillData } from "./redux/slices/SkillSlice";
import { setProjectData } from "./redux/slices/ProjectSlice";
import { setExperienceData } from "./redux/slices/ExperienceSlice";
import { getPortfolio } from "./Services/BasicApi.service";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const response = await getPortfolio();
        dispatch(setHeaderData(response.Header));
        dispatch(setGithubData(response.Github));
        dispatch(setstatsData(response.stats));
        dispatch(setSkillData(response.Skills));
        dispatch(setProjectData(response.Projects));
        dispatch(setExperienceData(response.Experience));
      } catch (error) {
        console.error("❌ Portfolio API Error:", error);
      }
    };

    loadPortfolioData();
  }, [dispatch]);

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

      <RobotAssistant />
    </>
  );
};

export default App;
