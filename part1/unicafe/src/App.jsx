import { useState } from "react";

const Button = ({ handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ statistic }) => {
  const { good, neutral, bad } = statistic;

  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }

  const total = good + neutral + bad;
  const average = Math.round(((good - bad) / total) * 10) / 10;
  const positive = Math.round((good / total) * 100 * 10) / 10;

  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive.toString() + " %"} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const statistic = {
    good: good,
    neutral: neutral,
    bad: bad,
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick}>good</Button>
      <Button handleClick={handleNeutralClick}>neutral</Button>
      <Button handleClick={handleBadClick}>bad</Button>
      <h2>statistics</h2>
      <Statistics statistic={statistic}></Statistics>
    </div>
  );
};

export default App;
