import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const findAverage = () => {
    if (good + bad + neutral === 0)
      return 0
    else
      return (good - bad) / (good + bad + neutral)
  }

  const findPositivePercent = () => {
    if (good + bad + neutral === 0)
      return 0
    else
      return (good / (good + bad + neutral)) * 100
  }

  if (good + bad + neutral === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Statistics</h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {good + bad + neutral}</p>
        <p>Average: {findAverage()}</p>
        <p>Positive: {findPositivePercent()}%</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
