import React from 'react';
import './App.css';
import Timer from './Timer/Timer';

function App() {
  const [resultData, setResultData] = React.useState();
  React.useEffect(() => {
    fetch(`https://www.reddit.com/r/Pomeranians.json`)
      .then(res => res.json())
      .then((result) => {
        setResultData(result.data);
      });
  }, []);

  const randomInt = Math.floor(Math.random() * 25);

  const pomImage = <>
    {resultData ?
      <img src={resultData.children[randomInt].data.thumbnail} alt={resultData.children[randomInt].data.title} />
      : null}
  </>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>PomPomodoro</h1>
        <Timer pomImage={pomImage} />
      </header>
    </div>
  );
}

export default App;
