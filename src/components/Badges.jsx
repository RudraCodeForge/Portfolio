import Badeg from "./Badeg";
import {useData} from "../store/DataContext";
const Badges = () => {
  const {badges} = useData();
  return (
    <div className="container">
      {badges.map((badge, index) =>{
        return <Badeg key={index} Name={badge}/>
      })}
    </div>
  );
};
export default Badges;
