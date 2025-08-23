import SkillList from "./SkillList";
import {useData} from "../store/DataContext";
const Skills = () => {
  const {SKILLS} = useData();
  return (
    <div className="container mt-5 mb-5">
      <h1>SKILLS</h1>
      <div className="SkillConn">
        {SKILLS.map((skill,index)=>{
          return <SkillList key={index} logo={skill.logo} Name={skill.Name}/>
        })}
      </div>
    </div>
  );
};
export default Skills;
