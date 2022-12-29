import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const findAverage = () => {
    if (good + bad + neutral === 0) return 0;
    else return (good - bad) / (good + bad + neutral);
  };

  const findPositivePercent = () => {
    if (good + bad + neutral === 0) return "%";
    else return (good / (good + bad + neutral)) * 100 + "%";
  };

  if (good + bad + neutral === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good:" value={good} />
          <StatisticLine text="Neutral:" value={neutral} />
          <StatisticLine text="Bad:" value={bad} />
          <StatisticLine text="All:" value={good + bad + neutral} />
          <StatisticLine text="Average:" value={findAverage()} />
          <StatisticLine text="Positive:" value={findPositivePercent()} />
        </tbody>
      </table>
    );
  }
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" onClick={() => setGood(good + 1)} />
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" onClick={() => setBad(bad + 1)} />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
