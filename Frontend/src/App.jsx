import Navbar from "../src/Components/Navbar";
import Header from "../src/Components/Header";
import About from "../src/pages/About";
import Skills from "../src/pages/Skills";
import CursorGlow from "../src/Components/CursorGlow";

function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <Header />
      <About />
      <Skills />
    </>
  );
}

export default App;
