import React from 'react';
import './App.css';
import Timer from './Timer/Timer';

function App() {
  const [resultData, setResultData] = React.useState();
  const [randomInt, setRandomInt] = React.useState(0);
  //when mode is false, break mode but when mode is true, focus mode
  const [mode, setMode] = React.useState(true);
  React.useEffect(() => {
    fetch(`https://www.reddit.com/r/Pomeranians.json`)
      .then(res => res.json())
      .then((result) => {
        setResultData(result.data);
      });
  }, []);

  React.useEffect(() => {
    setRandomInt(Math.floor(Math.random() * 25));
  }, [mode]);

  const pomImage = <>
    {resultData && resultData.children[randomInt] && resultData.children[randomInt].data && resultData.children[randomInt].data.thumbnail ?
      <img
        src={resultData.children[randomInt].data.thumbnail}
        alt={resultData.children[randomInt].data.title}
      />
      : null}
  </>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>PomPomodoro</h1>
        <Timer pomImage={pomImage} mode={mode} setMode={setMode}/>
      </header>
    </div>
  );
}

export default App;
