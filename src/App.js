import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Timer from "./Timer";
import Settings from "./Settings";
import SettingsContext from "./SettingsContext";
import NavBar from "./Navbar";
import PlayMusic from "./Playmusic";
import MyGarden from "./Mygarden"; // Import komponen MyGarden

function App() {
  // State untuk timer
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  return (
    <div className="body">
    <Router>
      <main>
        <NavBar />
        <SettingsContext.Provider value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}>
          <Routes>
            <Route path="/" element={showSettings ? <Settings /> : <Timer />} />
            <Route path="/Mygarden" element={<MyGarden />} />
          </Routes>
        </SettingsContext.Provider>
        <PlayMusic />
      </main>
    </Router>
    </div>
  );
}

export default App;