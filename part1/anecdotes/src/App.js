import { useState } from 'react'

const App = () => {
  console.log("App component being rendered");

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [ selected, setSelected ] = useState(0)
  const numAnecdotes = anecdotes.length;
  const [ votes, setVotes ] = useState(Array(numAnecdotes).fill(0));

  const [ maxVote, setMaxVote ] = useState((numAnecdotes === 0) ? null : 0);

  const randomizeSelected = () => {
    setSelected(Math.floor(Math.random() * numAnecdotes))
  }

  const addVote = () => {
    const votesCopy = [ ...votes ];

    if(++votesCopy[selected] > votesCopy[maxVote]) {
      setMaxVote(selected);
    }

    setVotes(votesCopy);
  }

  return (
    <div>
    <h1>Anecdote of the day</h1>

      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} vote(s).</p>

      <button onClick={addVote}>
        vote
      </button>
      <button onClick={randomizeSelected}>
        randomize the useless anecdote
      </button>
      
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[maxVote]}</p>

    </div>
  )
}

export default App