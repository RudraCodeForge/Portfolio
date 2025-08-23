import "./App.css";
import { ScrollProvider, useScroll } from "./store/ScrollContext";
import { DataProvider } from "./store/DataContext";
import { SendEmailProvider } from "./store/SendEmail";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// ✅ AppContent me hi refs attach karenge
function AppContent() {
  const { skillsRef, projectsRef, contactRef } = useScroll();

  return (
    <>
      <DataProvider>
        <div className="TopCon">
          <Header />
          <Hero />
          <AboutMe />
        </div>

        {/* Skills */}
        <div ref={skillsRef}>
          <Skills />
        </div>

        {/* Projects */}
        <div className="PC" ref={projectsRef}>
          <Projects />
        </div>

        <Education />

        {/* Contact */}
        <SendEmailProvider>
          <div className="CC" ref={contactRef}>
            <Contact />
          </div>
        </SendEmailProvider>

        <Footer />
      </DataProvider>
    </>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <AppContent />
    </ScrollProvider>
  );
}
