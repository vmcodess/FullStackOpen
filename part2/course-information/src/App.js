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
      {parts.map(part => 
        <span key={part.id}>
          {part.name} {part.exercises} <br /><br />
        </span>
      )}
    </div>
  )
}

const Total = ( props ) => {
  const part = props.total.parts;

  const sum = part.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

  return (
    <div>
      <strong>total of {sum} exercises</strong>
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