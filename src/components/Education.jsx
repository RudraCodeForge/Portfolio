import EduList from "./EduList";
import { useData} from "../store/DataContext";
const Education = () => {
  const {DATA} = useData();
  return (
    <div className="container mt-5">
      <h1>Experience & Certificate</h1>
      <div className="timeline">
        {DATA.map((data,index)=>{
          return <EduList 
                   key={index} 
                   Title={data.Title} 
                   Status={data.Status}
                   Year={data.Year}/>
        })}
      </div>
    </div>
  );
};
export default Education;
