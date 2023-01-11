import React from "react";
import "./App.css";
import gear from "./media/icons8-settings.svg";
import Timer from "./components/Timer";
import Modal from "./components/Modal";
import Toggle from "./components/Toggle";
import ImageDisplay from "./components/ImageDisplay";
import Settings from "./components/Settings";

function App() {
  //when mode is false, break mode but when mode is true, focus mode
  const [mode, setMode] = React.useState(true);
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const [confettiEnabled, setConfettiEnabled] = React.useState(true);
  const [closeModal, setCloseModal] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const onToggleMode = React.useCallback(() => {
    setMode(!mode);
  }, [mode]);

  const onToggleSettingsMenu = React.useCallback(() => {
    setSettingsOpen(!settingsOpen);
  }, [settingsOpen]);

  const onChangeAudioEnabled = React.useCallback((arg) => {
    setAudioEnabled(arg);
  }, []);

  const onToggleConfetti = React.useCallback(() => {
    setConfettiEnabled(!confettiEnabled);
  }, [confettiEnabled]);

  const onCloseModal = React.useCallback(() => {
    setCloseModal(true);
  }, []);

  return (
    <div className="App">
      {closeModal ? null : (
        <Modal
          onChangeAudioEnabled={onChangeAudioEnabled}
          onCloseModal={onCloseModal}
        />
      )}
      <Settings
        audioEnabled={audioEnabled}
        onChangeAudioEnabled={onChangeAudioEnabled}
        confettiEnabled={confettiEnabled}
        toggleConfettiEnabled={onToggleConfetti}
        settingsOpen={settingsOpen}
        toggleSettingsMenu={onToggleSettingsMenu}
      />
      <main className="App-main">
        <h1>PomPomodoro</h1>
        <Toggle onToggle={onToggleMode} checked={mode} />
        <ImageDisplay mode={mode} />
        <Timer
          mode={mode}
          toggleMode={onToggleMode}
          audioEnabled={audioEnabled}
          confettiEnabled={confettiEnabled}
        />
        <button className="settings" onClick={onToggleSettingsMenu}>
          <img src={gear} alt="settings" />
          <span>Settings</span>
        </button>
      </main>
    </div>
  );
}

export default App;
