import React from 'react';
import './App.css';
import Timer from './components/Timer/Timer';
import Modal from './components/Modal/Modal';
import Settings from './components/Settings/Settings';

function App() {
  const [resultData, setResultData] = React.useState();
  const [randomInt, setRandomInt] = React.useState(0);
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const [confettiEnabled, setConfettiEnabled] = React.useState(true);
  const [closeModal, setCloseModal] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
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
      {closeModal ? null : <Modal setAudioEnabled={setAudioEnabled} setCloseModal={setCloseModal}/> }
      <Settings
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        confettiEnabled={confettiEnabled}
        setConfettiEnabled={setConfettiEnabled}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        />
      <main className="App-main">
          <h1>PomPomodoro</h1>
        <Timer
          pomImage={pomImage}
          mode={mode}
          setMode={setMode}
          audioEnabled={audioEnabled}
          confettiEnabled={confettiEnabled}
          setSettingsOpen={setSettingsOpen}
        />
      </main>
    </div>
  );
}

export default App;
