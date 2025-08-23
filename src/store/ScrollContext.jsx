import { createContext, useContext, useRef } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  // section refs
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // common scroll function
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ScrollContext.Provider
      value={{ skillsRef, projectsRef, contactRef, scrollToSection }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

// custom hook for easy use
export const useScroll = () => useContext(ScrollContext);