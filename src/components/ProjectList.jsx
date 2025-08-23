const ProjectList=(props)=>{
  return(
    <div className="card m-2" style={{ width: "18rem",border:"none",boxShadow:"0 0 10px grey"}}>
      <img src={props.Img} className="card-img-top" alt="Card" />
      <div className="card-body">
        <h5 className="card-title">{props.Title}</h5>
        <p className="card-text">
          {props.Description}
        </p>
      </div>
      <div className="card-body">
        <a href={props.LiveLink} className="card-link">View live</a>
        <a href="#" className="card-link">Github</a>
      </div>
    </div>
  )
}
export default ProjectList;