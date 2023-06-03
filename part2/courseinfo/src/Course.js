const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  // console.log("parts: ", parts.map((part, index) => part.name));
  
  return(
    <>
      {parts.map( (part, index) =>
          <Part 
            part={ part }
            key={ index }
          />
      )}
    </>
  )
}
  
const Course = ({ course, index }) => {
  // console.log("course: ", course.name, ", course exercise count: ", course.parts.reduce(((acc, part) => acc + part.exercises), 0));

  const total = course.parts.reduce((acc, part) => (acc + part.exercises), 0);
  return(
    <div>
      <Header course = { course.name } />
      <Content parts = { course.parts }/>
      <Total sum = { total } />
    </div>
  )
}

export default Course;