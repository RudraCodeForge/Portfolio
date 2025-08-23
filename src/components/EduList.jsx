const EduList = (props) => {
  return (
    <div className="timeline-item pt-4">
      <div className="timeline-icon mt-4">💼</div>
      <div className="timeline-content ">
        <h3>{props.Title}</h3>
        <p>{props.Status}</p>
        <p>{props.Year}</p>
        <hr/>
      </div>
    </div>
  );
}; 
export default EduList;