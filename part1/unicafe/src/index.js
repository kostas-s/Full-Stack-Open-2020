import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => 
    <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value}) => 
    <tr><td>{text}</td><td>{value}</td></tr>

const Header = ({text}) => <h1>{text}</h1>

const Feedback = ({onClickBtn1, onClickBtn2, onClickBtn3}) => {
  return (
    <div>
      <Header text="give feedback"/>
      <Button text="good" handleClick={onClickBtn1}/>
      <Button text="neutral" handleClick={onClickBtn2}/>
      <Button text="bad" handleClick={onClickBtn3}/>
    </div>
  )
} 

const Statistics = ({countGood, countNeutral, countBad}) => {
  const sum = countGood + countNeutral + countBad
  if (sum === 0) {
    return (
      <div>
      <Header text="statistics" />
      <p>No feedback given</p>
      </div>
    )}
  return (
    <div>
      <Header text="statistics" />
      <table>
      <tbody>
      <Statistic text="good" value={countGood}/>
      <Statistic text="neutral" value={countNeutral}/>
      <Statistic text="bad" value={countBad}/>
      <Statistic text="all" value={sum}/>
      <Statistic text="average" value={(countGood - countBad)/sum}/>
      <Statistic text="positive" value={((countGood / sum) * 100) + "%"}/>
      </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback onClickBtn1={() => setGood(good + 1)} onClickBtn2={() => setNeutral(neutral + 1)} onClickBtn3={() => setBad(bad + 1)}/>
      <Statistics countGood={good} countNeutral={neutral} countBad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))