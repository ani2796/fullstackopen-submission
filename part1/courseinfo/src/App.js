const Header = (props) => {
  return(
      <h1>{props.course}</h1>
  )
}

const Section = (props) => {
  return(
    <p>{props.part} {props.exercises}</p>
  );
}

const Content = (props) => {
  return(
  <div>
    <Section part={props.sections[0].part} exercises={props.sections[0].exercises}/>
    <Section part={props.sections[1].part} exercises={props.sections[1].exercises}/>
    <Section part={props.sections[2].part} exercises={props.sections[2].exercises}/>
  </div>);
}

const Total = (props) => {
  // console.log("Content: ", props);
  let total = props.sections.reduce((acc, section) => {
    return (acc + section.exercises);
  }, 0);

  return(
    <p>Number of exercises: {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const sections = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    },
  ]

  return (
    <div>
      <Header course={course}/>
      <Content sections={sections}/>
      <Total sections={sections} />
    </div>
  )
}

export default App