const SkillList = (props) => {
  return (
    <div className="container SkillCon">
      <div className="box">
        <img
          className="SkillImg mb-2"
          src={props.logo}
          alt={props.Name}
        />
        <p>{props.Name}</p>
      </div>
    </div>
  );
};
export default SkillList;
