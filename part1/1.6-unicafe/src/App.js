import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, total, average, positive}) => {
  if (total === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <table>
        <tbody>
          <Statistic text='good' value={good} /> 
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={total} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={positive} />
        </tbody>
      </table>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => {
    setGood(good + 1)
  }

  const increaseNeutralByOne = () => {
    setNeutral(neutral + 1)
  }

  const increaseBadByOne = () => {
    setBad(bad + 1)
  }

  const total = good + neutral + bad;
  const avg = total ? ((good - bad) / total).toFixed(1) : 0;
  const positive = total ? `${((good / total) * 100).toFixed(1)}%` : '0%';

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGoodByOne} text='good' />
      <Button handleClick={increaseNeutralByOne} text='neutral' />
      <Button handleClick={increaseBadByOne} text='bad' /> 
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={avg} positive={positive} />
    </div>
  )
}

export default App