import React from 'react';

const Course = ({ course }) => (
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total total={course} />
    </div>
)
  
const Header = ({ course }) => (
    <h2>{course.name}</h2>
)
  
const Content = ({ course }) => (
    <div>   
        {course.parts.map((part, i) =>  
            <Part key={i} part={part} />
        )}
    </div>
)

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)
  
const Total = ( props ) => {
    const part = props.total.parts;
    const sum = part.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

    return (
        <div>
            <strong>total of {sum} exercises</strong>
        </div>
    )
}

export default Course;