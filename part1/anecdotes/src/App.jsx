import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(() => new Uint8Array(anecdotes.length));
  const [highestAnecdoteVote, setHighestAnecdoteVote] = useState(0);

  const handleNextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVotes = () => {
    const copyPoints = { ...points };
    copyPoints[selected] += 1;

    const pointsArr = Object.values(copyPoints);
    const maxVoteIndex = pointsArr.indexOf(Math.max(...pointsArr));

    setHighestAnecdoteVote(maxVoteIndex);
    setPoints(copyPoints);
  };

  return (
    <>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={points[selected]}
      />
      <Button handleClick={handleVotes} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote" />
      <Anecdote
        title="Anecdote with the most votes"
        anecdote={anecdotes[highestAnecdoteVote]}
        votes={points[highestAnecdoteVote]}
      />
    </>
  );
};

export default App;
