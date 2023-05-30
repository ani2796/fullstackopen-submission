import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({label, handleClick}) => 
<button onClick={handleClick}>
  {label}
</button>

const StatisticLine = ({name, value}) => 
<p>{name}: {value}</p>

const Statistics = ({good, neutral, bad}) => {
  const total = good + bad + neutral;
  
  if(total === 0)
      return <p>No feedback given</p>
  
  return(
    <>
      <StatisticLine name="good" value={good} />
      <StatisticLine name="bad" value={bad} />
      <StatisticLine name="total" value={total} />
      <StatisticLine name="average" value={(total === 0) ? 0 : ((good - bad)/total)} />
      <StatisticLine name="positive" value={(total === 0) ? 0 : ((good / total) * 100)} />
    </>
  )
}

function App() {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  return (
    <div>
      <Header 
        text="give feedback"
      />
      <Button 
        label="good"
        handleClick={() => setGood(good+1)}
      />
      <Button 
        label="neutral"
        handleClick={() => setNeutral(neutral+1)}
      />
      <Button 
        label="bad"
        handleClick={() => setBad(bad+1)}
      />
      <Header 
        text="statistics"
      />
      <Statistics 
          good={good}
          neutral={neutral}
          bad={bad}
        />
    </div>
  );
}

export default App;
