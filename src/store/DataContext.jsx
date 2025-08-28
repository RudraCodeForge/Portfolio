import { createContext, useContext } from "react";
const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const badges = [
    "Quick Learner",
    "Problem Solver",
    "Full-Stack Developer",
    "Java Enthusiast",
    "Community Builder",
    "Entrepreneurial Mindset",
  ];
  const DATA = [
    {
      Title: "Backend Development Certificate",
      Status: "Completed",
      Year: "2025",
    },
    {
      Title: "Ongoing MERN Projects",
      Status: "In Progress",
      Year: "2024-25",
    },
    {
      Title: "Freelance Work",
      Status: "Open To Work",
      Year: "Available",
    },
  ];
  
  const SKILLS =[
    {
      logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png",
      Name:"JAVASCRIPT"
    },
    {
      logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRelAG0A33Y2PjZbMM8e1LUgryEJW9w4aE7sx-_N7rLYQ&s",
      Name:"JAVA"
    },
    {
      logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW3FqIXvqxPjNb8EBPUxUOUvOS0VOpwbAJHQ&usqp=CAU",
      Name:"MONGODB"
    },
    {
      logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGUVSgfBp28BsA5_XyaRemTa4gQobnsoR7TWbKKYb71heSxLC2ZJvp3k&s=10",
      Name:"EXPRESS JS"
    },
    {
      logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLP83xYtChQipXCtYEiWTCIgQPw7QOwbVVRxyGgHEF9g&s",
      Name:"REACT JS"
    },
    {
      logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsGqwRiGBWwQ7jsG_maNjSRTPeZyloHL_JAIzMWVmV-qu1_qZykV8IDNo&s=10",
      Name:"NODE JS"
    },
    {
      logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWW8Y5asB-2AjIlgRgbmSpRkVhsb4im6oCqA&s",
      Name:"BOOTSTRAP"
    },
    {
      logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIk7l7aJwcH4ETOneg6fy1tFxw4gI3kzRsl2F6gCFrdQ&s",
      Name:"GIT"
    }
    
  ];

  const PROJECTS = [
    {
      Title: "ATIHI STAY",
      Description: "A platform for booking unique accommodations",
      Img: "./ATITHISTAY.jpg",
      LiveLink: "https://atithi-stay.onrender.com/",
      GithubLink: "",
    },
    {
      Title: "BANK MANAGEMENT",
      Description: "A Java Swing & MySQL based Bank Management System that allows users to create accounts, manage deposits/withdrawals, check balance, and maintain records securely.",
      Img: "./BANK.jpg",
      LiveLink: "#",
      GithubLink: "",
    },
    {
      Title: "REACT MINOR PROJECTS",
      Description : "A collection of minor projects built using React.js, showcasing various features and functionalities.",
      Img:"./MINI_REACT.jpg",
      LiveLink:"https://rudracodeforge.github.io/LearnReact/",
      GithubLink:"#"
    }
  ];
  return (
    <DataContext.Provider value={{ badges, DATA ,SKILLS,PROJECTS}}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);