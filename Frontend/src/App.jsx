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
import { setEducationData } from "./redux/slices/EducationSlice";

import { getPortfolio } from "./Services/BasicApi.service";

const App = () => {
  const dispatch = useDispatch();

  const applyRemoteTheme = (theme) => {
    if (!theme?.variables) return;

    Object.entries(theme.variables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    const effects = theme.effects || {};
    document.documentElement.style.setProperty(
      "--surface-bg",
      effects.gradient || "var(--bg-card)",
    );
    document.documentElement.style.setProperty(
      "--surface-blur",
      effects.blur || "0px",
    );
    document.documentElement.style.setProperty(
      "--surface-shadow",
      effects.shadow || "none",
    );
    document.documentElement.style.setProperty(
      "--surface-radius",
      effects.radius || "16px",
    );
    document.documentElement.dataset.theme = theme.themeId;
  };

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const response = await getPortfolio();
        dispatch(setEducationData(response.Education));
        dispatch(setHeaderData(response.Header));
        dispatch(setGithubData(response.Github));
        dispatch(setstatsData(response.stats));
        dispatch(setSkillData(response.Skills));
        dispatch(setProjectData(response.Projects));
        dispatch(setExperienceData(response.Experience));
        applyRemoteTheme(response.theme);
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
