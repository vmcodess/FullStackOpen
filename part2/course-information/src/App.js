import React from 'react'

const Course = ({ course }) => {
  //console.log(course);
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total total={course} />
    </div>
  )
}

const Header = ({ course }) => (
  <h1>{course.name}</h1>
)

const Content = (props) => {
  const parts = props.course.parts;
  return (
    <div>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>
      <p>
        {parts[1].name} {parts[1].exercises}
      </p>
      <p>
        {parts[2].name} {parts[2].exercises}
      </p>
      <p>
        {parts[3].name} {parts[3].exercises}
      </p>
    </div>
  )
}

const Total = ( props ) => {
  const part = props.total.parts;
  console.log(props.total.parts);
  return(
    <div>
      <strong>total of { part[0].exercises + part[1].exercises + part[2].exercises + part[3].exercises } exercises</strong>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App