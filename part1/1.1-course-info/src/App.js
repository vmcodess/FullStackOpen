import React from 'react'

const Header = ( props ) => {
  const { name } = props.course
  return (
    <h1>{name}</h1>
  )
}

const Content = (props) => {
  return(
    <div>
      <p>
        {props.parts.parts[0].name} {props.parts.parts[0].exercises}
      </p>
      <p>
        {props.parts.parts[1].name} {props.parts.parts[1].exercises}
      </p>
      <p>
        {props.parts.parts[2].name} {props.parts.parts[2].exercises}
      </p>
    </div>
  )
}

const Total = ( props ) => {
  return(
    <div>
      <p>Number of exercises { props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises }</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

export default App