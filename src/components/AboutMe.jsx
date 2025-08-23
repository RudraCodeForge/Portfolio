import Badges from './Badges';
const AboutMe=()=>{
  return(
    <div className="container mt-5">
      <h1>About Me</h1>
      <p>
        I'm a passionate MERN stack developer with a 
        knack for crafting innovative solutions. My
        journey in tech is fulfilled by love for problem-solving, creative thinking, and exploring new
        technologies. I thrive on challenges and am
        always eager to learn and grow.
        <Badges/>
      </p>
    </div>
  )
}
export default AboutMe;