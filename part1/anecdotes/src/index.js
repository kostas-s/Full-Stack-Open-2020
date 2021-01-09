import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) =>
    <button onClick={handleClick}>{text}</button>

const Votes = ({count}) => <p>has {count} votes</p>

const Header = ({text}) => <h1>{text}</h1>

const Anecdote = ({text}) => <p>{text}</p>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const [maxIdx, setMaxIdx] = useState(0)

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    const maxIdx = copy.indexOf(Math.max(...copy))
    setVotes(copy)
    setMaxIdx(maxIdx)
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote text={props.anecdotes[selected]}/>
      <Votes count={votes[selected]}/>
      <Button text="add vote" handleClick={() => addVote()}/>
      <Button text="next anecdote" handleClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))} />
      <Header text="Anecdote with most votes"/>
      <Anecdote text={props.anecdotes[maxIdx]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)